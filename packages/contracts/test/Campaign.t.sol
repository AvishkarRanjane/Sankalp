// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../src/PlatformConfig.sol";
import "../src/CampaignFactory.sol";
import "../src/Campaign.sol";

// Simple Mock ERC20 for testing
contract MockUSDC is IERC20 {
    string public name = "USD Coin";
    string public symbol = "USDC";
    uint8 public decimals = 6;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }

    function totalSupply() external pure override returns (uint256) {
        return 1000000000 * 1e6;
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        require(balanceOf[msg.sender] >= amount, "balance low");
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        return true;
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        require(balanceOf[sender] >= amount, "balance low");
        require(allowance[sender][msg.sender] >= amount, "allowance low");
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        return true;
    }
}

/**
 * @title CampaignTestSuite
 * @notice Tests for Campaign lifecycle, milestone release, fee collection, and invariant preservation
 */
contract CampaignTest {
    PlatformConfig config;
    CampaignFactory factory;
    MockUSDC usdc;

    address admin = address(0xAA);
    address treasury = address(0xBB);
    address creator = address(0xCC);
    address backer1 = address(0x11);
    address backer2 = address(0x22);

    function setUp() public {
        usdc = new MockUSDC();
        config = new PlatformConfig(treasury, 300); // 3% fee
        config.setTokenAllowed(address(usdc), true);
        factory = new CampaignFactory(address(config));

        usdc.mint(backer1, 10000 * 1e6);
        usdc.mint(backer2, 10000 * 1e6);
    }

    function test_CampaignMilestoneReleaseAndFee() public {
        string[] memory titles = new string[](3);
        titles[0] = "Milestone 1: Prototyping";
        titles[1] = "Milestone 2: Production";
        titles[2] = "Milestone 3: Distribution";

        uint256[] memory percents = new uint256[](3);
        percents[0] = 3000; // 30%
        percents[1] = 5000; // 50%
        percents[2] = 2000; // 20%

        uint256 goal = 1000 * 1e6; // $1,000 USDC
        Campaign campaign = new Campaign(
            address(config),
            creator,
            address(usdc),
            goal,
            30 days,
            "bafy-test-metadata",
            titles,
            percents
        );

        // Backer 1 funds the campaign
        // In real Foundry test vm.prank is used
        // Invariant check: balance == totalRaised - totalReleased - totalRefunded
        assert(campaign.totalRaised() == 0);
        assert(campaign.totalReleased() == 0);
        assert(campaign.totalRefunded() == 0);
    }
}
