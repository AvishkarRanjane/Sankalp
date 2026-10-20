# Sankalp Threat Model & Security Mitigations

### 1. Fraudulent Creators & Project Abandonment
- **Threat**: A creator launches an attractive campaign, collects funds, and disappears.
- **Mitigation**: All campaign funds are locked in smart contract escrow. Funds are released strictly in stages upon milestone verification. Unreleased funds remain refundable. Identity verification is required prior to launch.

### 2. Contract Reentrancy & Gas Exhaustion
- **Threat**: Attacker attempts reentrancy during contribution refunds or milestone withdrawals.
- **Mitigation**: Implementation of OpenZeppelin `ReentrancyGuard`, checks-effects-interactions pattern, and strict pull-payments (users call `claimRefund()` and `withdrawMilestone()` themselves).

### 3. Admin Key Compromise
- **Threat**: Platform private key is stolen, attempting to redirect escrowed money.
- **Mitigation**: Admin functions are owned by a Monad Safe multisig. Smart contracts cannot redirect backer escrow balances to arbitrary accounts; money can only flow to creator upon milestone approval, or back to original backers.

### 4. Regulatory & Compliance Risk (India)
- **Threat**: Platform classified as unauthorized securities exchange.
- **Mitigation**: Strict ban on equity, profit-sharing, or dividend promises. Plain-language Risk Disclosures on every contribute box. No personal medical campaigns to prevent compliance fraud.
