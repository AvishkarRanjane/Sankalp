# Sankalp API & Indexer Specification

## 1. Authentication - Sign-In With Ethereum (SIWE)

### `POST /verifySiweAndLogin`

Verifies an EIP-4361 signed message from MetaMask/Rabby and issues a Firebase Auth custom token.

#### SIWE Request Body

```json
{
  "message": "sankalp.fund wants you to sign in with your Ethereum account:\n0x4B20...02db\n\nURI: https://sankalp.fund\nVersion: 1\nChain ID: 10143\nNonce: 12345678\nIssued At: 2026-10-18T10:00:00Z",
  "signature": "0x3045022100..."
}
```

#### SIWE Response (200 OK)

```json
{
  "token": "eyJhbGciOiJSUzI1NiIs...",
  "uid": "eth:0x4b20993bc481177ec7e8f571cecae8a9e22c02db",
  "role": "backer"
}
```

---

## 2. On-Chain Event Ingestion

### `POST /syncMonadEvent`

Invoked by webhook or Monad blockchain node listener upon block inclusion.

#### Event Ingestion Request Body

```json
{
  "eventType": "Contributed",
  "txHash": "0x5e8f...91a2",
  "logIndex": 0,
  "campaignAddress": "0x1388...0001",
  "backer": "0x4B20...02db",
  "amountUSDC": 50,
  "timestamp": "2026-10-18T10:30:00Z"
}
```

#### Event Ingestion Response (200 OK)

```json
{
  "success": true
}
```
