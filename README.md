# 📦 Tracking Delivery Smart Contract

This project implements a blockchain-based delivery tracking system for logistics companies (e.g., JNE, Sicepat, etc.) using Solidity, Hardhat, and Thirdweb. It enables immutable record-keeping and transparent tracking of package delivery status.

## 🔧 Features

- Record delivery details: package ID, sender, recipient, timestamps, and status.
- Update delivery status: `Dispatched`, `InTransit`, `Delivered`.
- Immutable logs & on-chain transparency.
- Query package by ID for history and current status.
- Emits events on key actions.
- Includes access control to restrict status updates.

---

## 📁 Project Structure

```
monorepo-root/
├── contracts/                # Smart contract logic & tests
│   ├── contracts/
│   │   └── TrackingDelivery.sol
│   ├── test/
│   │   └── TrackingDelivery.test.js
│   ├── hardhat.config.js
│   └── .env                     
│   └── ...
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file inside `/contracts`:

```env
SEPOLIA_RPC=https://rpc.sepolia.org
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_key
```

---

## 🧪 Run Tests

```bash
pnpm hardhat test
```

---

## 🧱 Compile Smart Contract

```bash
pnpm hardhat compile
```

---

## 🔄 Deploy to Sepolia via Thirdweb

```bash
npx thirdweb deploy -k YOUR_PRIVATE_KEY
```

You’ll receive a link like:

```
https://thirdweb.com/sepolia/0xYourContractAddress
```

---

## ✅ Verify on Etherscan

```bash
npx hardhat verify --network sepolia 0xYourContractAddress
```

> Note: Make sure your `.env` is properly set and the contract is flattened if needed.

---

## 🔍 Verified Contract

🧾 View the verified smart contract on Etherscan:  
👉 [https://sepolia.etherscan.io/address/0x555E44Bf5A6743A7d51f4C96E531a109C4Ccdb6C#code](https://sepolia.etherscan.io/address/0x555E44Bf5A6743A7d51f4C96E531a109C4Ccdb6C#code)

---

## 📄 Smart Contract Overview

```solidity
function createDelivery(string memory packageId, address recipient) external
function updateDeliveryStatus(string memory packageId, Status status) external
function getDeliveryById(string memory packageId) public view returns (...)
```

---

## 🛡️ Security

- Only the original sender can update delivery status.
- Status cannot be downgraded.
- Event logs allow full audit trail.

---

## 🌐 Tech Stack

- Solidity ^0.8.9
- Hardhat
- Ethers.js
- Thirdweb CLI
- zkSync (optional network setup)

---

## ✍️ Author

**Aldi Nugraha** Software Engineer | Blockchain Enthusiast_

---

## 📝 License

This project is licensed under the MIT License.