// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../src/PlatformConfig.sol";
import "../src/CampaignFactory.sol";

contract DeploySankalp {
    function run() external returns (address configAddr, address factoryAddr) {
        address treasury = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // Monad Safe multisig treasury
        uint256 feeBps = 300; // 3%

        PlatformConfig config = new PlatformConfig(treasury, feeBps);
        
        // Whitelist Monad testnet USDC (mock or official bridged token)
        address testnetUSDC = 0xf817257fed379853cDe0fa4F97AB987181B1E5Ea;
        config.setTokenAllowed(testnetUSDC, true);

        CampaignFactory factory = new CampaignFactory(address(config));

        configAddr = address(config);
        factoryAddr = address(factory);
    }
}
