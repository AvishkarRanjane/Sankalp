// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./PlatformConfig.sol";

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

/**
 * @title Campaign
 * @notice Milestone-based Crowdfunding Smart Contract deployed on Monad EVM
 * @dev Enforces milestone-locked escrow, pull-based refunds, and immutable on-chain proof.
 */
contract Campaign {
    enum CampaignStatus {
        Live,
        Funded,
        Failed,
        Completed,
        Cancelled
    }

    enum MilestoneStatus {
        Locked,
        PendingReview,
        Approved,
        Released
    }

    struct Milestone {
        uint256 index;
        string title;
        uint256 percent; // Base points out of 10000 (e.g., 3000 = 30%)
        uint256 amount;
        string evidenceCID;
        MilestoneStatus status;
    }

    PlatformConfig public immutable platformConfig;
    address public immutable creator;
    IERC20 public immutable token; // USDC on Monad or mock
    uint256 public immutable goal;
    uint256 public immutable deadline;
    string public metadataCID;

    CampaignStatus public status;
    uint256 public totalRaised;
    uint256 public totalReleased;
    uint256 public totalRefunded;
    uint256 public backersCount;

    Milestone[] public milestones;
    mapping(address => uint256) public contributions;
    mapping(address => bool) public hasClaimedRefund;

    bool private locked;

    event Contributed(address indexed backer, uint256 amount, uint256 totalRaisedNow);
    event MilestoneSubmitted(uint256 indexed index, string evidenceCID);
    event MilestoneApproved(uint256 indexed index);
    event MilestoneReleased(uint256 indexed index, uint256 creatorAmount, uint256 feeAmount);
    event RefundClaimed(address indexed backer, uint256 amount);
    event CampaignStatusChanged(CampaignStatus newStatus);
    event CampaignCancelled(string reasonCID);

    modifier nonReentrant() {
        require(!locked, "Campaign: reentrant call");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyCreator() {
        require(msg.sender == creator, "Campaign: caller is not creator");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == platformConfig.owner(), "Campaign: caller is not platform admin");
        _;
    }

    constructor(
        address _platformConfig,
        address _creator,
        address _token,
        uint256 _goal,
        uint256 _durationSeconds,
        string memory _metadataCID,
        string[] memory _milestoneTitles,
        uint256[] memory _milestonePercents
    ) {
        require(_platformConfig != address(0), "Campaign: invalid config");
        require(_creator != address(0), "Campaign: invalid creator");
        require(_goal > 0, "Campaign: goal must be > 0");
        require(_durationSeconds >= 1 days && _durationSeconds <= 60 days, "Campaign: invalid duration");
        require(_milestoneTitles.length == _milestonePercents.length, "Campaign: milestone length mismatch");
        require(_milestoneTitles.length >= 1 && _milestoneTitles.length <= 5, "Campaign: 1 to 5 milestones required");

        platformConfig = PlatformConfig(_platformConfig);
        require(platformConfig.isTokenAllowed(_token), "Campaign: token not whitelisted");

        creator = _creator;
        token = IERC20(_token);
        goal = _goal;
        deadline = block.timestamp + _durationSeconds;
        metadataCID = _metadataCID;
        status = CampaignStatus.Live;

        uint256 totalPercent = 0;
        for (uint256 i = 0; i < _milestoneTitles.length; i++) {
            totalPercent += _milestonePercents[i];
            uint256 milestoneAmount = (_goal * _milestonePercents[i]) / 10000;
            milestones.push(
                Milestone({
                    index: i,
                    title: _milestoneTitles[i],
                    percent: _milestonePercents[i],
                    amount: milestoneAmount,
                    evidenceCID: "",
                    status: MilestoneStatus.Locked
                })
            );
        }
        require(totalPercent == 10000, "Campaign: milestone percents must sum to 10000 (100%)");
    }

    /**
     * @notice Contribute USDC to the campaign
     * @param amount Amount in token smallest units
     */
    function contribute(uint256 amount) external nonReentrant {
        require(!platformConfig.paused(), "Campaign: platform paused");
        require(status == CampaignStatus.Live, "Campaign: campaign not live");
        require(block.timestamp <= deadline, "Campaign: deadline passed");
        require(amount > 0, "Campaign: contribution must be > 0");

        if (contributions[msg.sender] == 0) {
            backersCount++;
        }
        contributions[msg.sender] += amount;
        totalRaised += amount;

        // Transfer funds into escrow contract
        bool success = token.transferFrom(msg.sender, address(this), amount);
        require(success, "Campaign: token transfer failed");

        emit Contributed(msg.sender, amount, totalRaised);

        if (totalRaised >= goal) {
            status = CampaignStatus.Funded;
            emit CampaignStatusChanged(CampaignStatus.Funded);
        }
    }

    /**
     * @notice Checks and finalizes campaign if deadline has passed
     */
    function checkDeadline() external {
        if (status == CampaignStatus.Live && block.timestamp > deadline) {
            if (totalRaised >= goal) {
                status = CampaignStatus.Funded;
                emit CampaignStatusChanged(CampaignStatus.Funded);
            } else {
                status = CampaignStatus.Failed;
                emit CampaignStatusChanged(CampaignStatus.Failed);
            }
        }
    }

    /**
     * @notice Creator submits proof of milestone completion (IPFS CID)
     */
    function submitMilestoneEvidence(uint256 milestoneIndex, string calldata evidenceCID) external onlyCreator {
        require(status == CampaignStatus.Funded, "Campaign: not funded");
        require(milestoneIndex < milestones.length, "Campaign: invalid index");
        Milestone storage m = milestones[milestoneIndex];
        require(m.status == MilestoneStatus.Locked, "Campaign: milestone not locked");

        if (milestoneIndex > 0) {
            require(milestones[milestoneIndex - 1].status == MilestoneStatus.Released, "Campaign: previous milestone not released");
        }

        m.evidenceCID = evidenceCID;
        m.status = MilestoneStatus.PendingReview;
        emit MilestoneSubmitted(milestoneIndex, evidenceCID);
    }

    /**
     * @notice Admin verifies evidence and approves milestone for payout
     */
    function approveMilestone(uint256 milestoneIndex) external onlyAdmin {
        require(milestoneIndex < milestones.length, "Campaign: invalid index");
        Milestone storage m = milestones[milestoneIndex];
        require(m.status == MilestoneStatus.PendingReview, "Campaign: not pending review");

        m.status = MilestoneStatus.Approved;
        emit MilestoneApproved(milestoneIndex);
    }

    /**
     * @notice Creator withdraws approved milestone funds (pull-payment pattern)
     */
    function withdrawMilestone(uint256 milestoneIndex) external onlyCreator nonReentrant {
        require(milestoneIndex < milestones.length, "Campaign: invalid index");
        Milestone storage m = milestones[milestoneIndex];
        require(m.status == MilestoneStatus.Approved, "Campaign: milestone not approved");

        m.status = MilestoneStatus.Released;
        uint256 grossAmount = m.amount;
        
        // Ensure contract has sufficient balance
        uint256 currentBal = token.balanceOf(address(this));
        if (grossAmount > currentBal) {
            grossAmount = currentBal;
        }

        uint256 feeBps = platformConfig.feeBps();
        uint256 feeAmount = (grossAmount * feeBps) / 10000;
        uint256 creatorAmount = grossAmount - feeAmount;

        totalReleased += grossAmount;

        // Platform fee to treasury
        if (feeAmount > 0) {
            bool feeSuccess = token.transfer(platformConfig.treasury(), feeAmount);
            require(feeSuccess, "Campaign: fee transfer failed");
        }

        // Net payout to creator
        bool creatorSuccess = token.transfer(creator, creatorAmount);
        require(creatorSuccess, "Campaign: creator transfer failed");

        emit MilestoneReleased(milestoneIndex, creatorAmount, feeAmount);

        // Check if all milestones are released
        bool allDone = true;
        for (uint256 i = 0; i < milestones.length; i++) {
            if (milestones[i].status != MilestoneStatus.Released) {
                allDone = false;
                break;
            }
        }
        if (allDone) {
            status = CampaignStatus.Completed;
            emit CampaignStatusChanged(CampaignStatus.Completed);
        }
    }

    /**
     * @notice Backer claims refund if campaign failed or was cancelled (pull payment)
     */
    function claimRefund() external nonReentrant {
        if (status == CampaignStatus.Live && block.timestamp > deadline) {
            if (totalRaised < goal) {
                status = CampaignStatus.Failed;
                emit CampaignStatusChanged(CampaignStatus.Failed);
            }
        }

        require(status == CampaignStatus.Failed || status == CampaignStatus.Cancelled, "Campaign: refunds not enabled");
        require(!hasClaimedRefund[msg.sender], "Campaign: refund already claimed");

        uint256 contributed = contributions[msg.sender];
        require(contributed > 0, "Campaign: no contribution found");

        hasClaimedRefund[msg.sender] = true;

        uint256 refundAmount;
        if (status == CampaignStatus.Failed) {
            // Full refund
            refundAmount = contributed;
        } else {
            // Cancelled: proportional refund of remaining unreleased funds
            uint256 remainingBal = token.balanceOf(address(this));
            uint256 refundablePool = totalRaised - totalReleased;
            if (refundablePool > 0) {
                refundAmount = (contributed * remainingBal) / refundablePool;
            } else {
                refundAmount = 0;
            }
        }

        require(refundAmount > 0, "Campaign: no refund balance");
        totalRefunded += refundAmount;

        bool success = token.transfer(msg.sender, refundAmount);
        require(success, "Campaign: refund transfer failed");

        emit RefundClaimed(msg.sender, refundAmount);
    }

    /**
     * @notice Admin emergency cancellation (in case of confirmed creator malfeasance)
     */
    function cancelCampaign(string calldata reasonCID) external onlyAdmin {
        require(status != CampaignStatus.Completed, "Campaign: already completed");
        status = CampaignStatus.Cancelled;
        emit CampaignCancelled(reasonCID);
        emit CampaignStatusChanged(CampaignStatus.Cancelled);
    }

    function getMilestonesCount() external view returns (uint256) {
        return milestones.length;
    }

    function getMilestone(uint256 index) external view returns (Milestone memory) {
        require(index < milestones.length, "Campaign: invalid index");
        return milestones[index];
    }
}
