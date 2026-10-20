// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title PlatformConfig
 * @notice Protocol-level configuration for Sankalp on Monad
 * Controls platform fees, treasury address, token whitelist, and global pause switch.
 * Ownership is intended for a Safe multisig contract on Monad.
 */
contract PlatformConfig {
    address public owner;
    address public pendingOwner;
    address public treasury;
    uint256 public feeBps; // Base points (300 = 3%)
    bool public paused;

    mapping(address => bool) public isTokenAllowed;

    event OwnershipTransferStarted(address indexed currentOwner, address indexed newOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event TreasuryUpdated(address indexed previousTreasury, address indexed newTreasury);
    event FeeUpdated(uint256 previousFeeBps, uint256 newFeeBps);
    event TokenWhitelistUpdated(address indexed token, bool allowed);
    event Paused(address account);
    event Unpaused(address account);

    modifier onlyOwner() {
        require(msg.sender == owner, "PlatformConfig: caller is not owner");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "PlatformConfig: protocol is paused");
        _;
    }

    constructor(address _treasury, uint256 _feeBps) {
        require(_treasury != address(0), "PlatformConfig: zero address treasury");
        require(_feeBps <= 1000, "PlatformConfig: fee cannot exceed 10%");
        owner = msg.sender;
        treasury = _treasury;
        feeBps = _feeBps;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "PlatformConfig: zero address");
        pendingOwner = newOwner;
        emit OwnershipTransferStarted(owner, newOwner);
    }

    function acceptOwnership() external {
        require(msg.sender == pendingOwner, "PlatformConfig: caller is not pending owner");
        emit OwnershipTransferred(owner, pendingOwner);
        owner = pendingOwner;
        pendingOwner = address(0);
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "PlatformConfig: zero address");
        emit TreasuryUpdated(treasury, _treasury);
        treasury = _treasury;
    }

    function setFeeBps(uint256 _feeBps) external onlyOwner {
        require(_feeBps <= 1000, "PlatformConfig: fee cannot exceed 10%");
        emit FeeUpdated(feeBps, _feeBps);
        feeBps = _feeBps;
    }

    function setTokenAllowed(address token, bool allowed) external onlyOwner {
        isTokenAllowed[token] = allowed;
        emit TokenWhitelistUpdated(token, allowed);
    }

    function pause() external onlyOwner {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external onlyOwner {
        paused = false;
        emit Unpaused(msg.sender);
    }
}
