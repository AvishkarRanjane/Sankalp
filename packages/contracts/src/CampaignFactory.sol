// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./PlatformConfig.sol";
import "./Campaign.sol";

/**
 * @title CampaignFactory
 * @notice Factory for deploying and indexing Sankalp Crowdfunding Campaigns on Monad
 */
contract CampaignFactory {
    PlatformConfig public immutable platformConfig;

    address[] public allCampaigns;
    mapping(address => address[]) public creatorCampaigns;
    mapping(address => bool) public isCampaign;

    event CampaignCreated(
        address indexed campaignAddress,
        address indexed creator,
        address indexed token,
        uint256 goal,
        uint256 deadline,
        string metadataCID,
        uint256 milestoneCount
    );

    constructor(address _platformConfig) {
        require(_platformConfig != address(0), "CampaignFactory: invalid config");
        platformConfig = PlatformConfig(_platformConfig);
    }

    /**
     * @notice Deploy a new milestone-based Campaign contract
     */
    function createCampaign(
        address token,
        uint256 goal,
        uint256 durationSeconds,
        string calldata metadataCID,
        string[] calldata milestoneTitles,
        uint256[] calldata milestonePercents
    ) external returns (address campaignAddress) {
        require(!platformConfig.paused(), "CampaignFactory: platform paused");

        Campaign newCampaign = new Campaign(
            address(platformConfig),
            msg.sender,
            token,
            goal,
            durationSeconds,
            metadataCID,
            milestoneTitles,
            milestonePercents
        );

        campaignAddress = address(newCampaign);
        allCampaigns.push(campaignAddress);
        creatorCampaigns[msg.sender].push(campaignAddress);
        isCampaign[campaignAddress] = true;

        emit CampaignCreated(
            campaignAddress,
            msg.sender,
            token,
            goal,
            block.timestamp + durationSeconds,
            metadataCID,
            milestoneTitles.length
        );
    }

    function totalCampaigns() external view returns (uint256) {
        return allCampaigns.length;
    }

    function getCreatorCampaigns(address creator) external view returns (address[] memory) {
        return creatorCampaigns[creator];
    }
}
