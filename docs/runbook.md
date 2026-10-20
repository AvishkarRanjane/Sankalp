# Sankalp Protocol Incident & Operations Runbook

This runbook defines emergency procedures for protocol administrators operating the Sankalp platform on Monad.

---

## 1. Emergency Circuit Breaker (Protocol Pause)

### When to Trigger

- A confirmed critical vulnerability in the `Campaign.sol` or `PlatformConfig.sol` contracts.
- A zero-day reentrancy or token price exploit on Monad.
- Suspected widespread creator Sybil fraud across multiple campaigns.

### Execution Procedure

1. Access the Monad Safe multisig interface at `https://app.safe.global` or the admin panel at `/admin`.
2. Connect the authorized signer hardware wallets (minimum 2-of-3 threshold).
3. Call `pause()` on the `PlatformConfig` contract address:

   ```solidity
   PlatformConfig(0xa513...C853).pause();
   ```

4. **Behavior Verification**:
   - New contributions via `contribute()` will immediately revert.
   - Creator milestone withdrawals will be temporarily locked.
   - **Backer refund claims (`claimRefund()`) remain active** so backers can recover pledged capital without platform blockage.

### Recovery Procedure

Once the incident is resolved or an upgraded implementation is configured:

```solidity
PlatformConfig(0xa513...C853).unpause();
```

---

## 2. Milestone Dispute & Fraud Handling

If a creator submits falsified invoices, broken links, or misleading photos:

1. Moderator inspects evidence in the Admin Review Queue (`/admin`).
2. Click **Dispute / Request More Proof**.
3. If bad faith or fraudulent intent is confirmed:
   - Admin triggers `cancelCampaign(reasonCID)` on the specific `Campaign.sol`.
   - Contract status transitions to `Cancelled`.
   - All unreleased milestone funds remain permanently locked from creator access and are unlocked for proportional refund pull-payments by original backers.

---

## 3. Treasury Fee Disbursement

The protocol treasury collects a 3% platform fee on completed milestones.

- Funds accumulate in the Safe multisig address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`.
- Monthly disbursements for smart contract security audits and community grants require multi-signer verification.
