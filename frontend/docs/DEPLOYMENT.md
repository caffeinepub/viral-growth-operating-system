# Deployment Guide — Viral Growth OS

This guide covers deploying the Viral Growth OS to the Internet Computer (IC) mainnet so it is publicly accessible.

---

## Prerequisites

1. **DFX CLI** — Install the DFINITY SDK:
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```
2. **Cycles Wallet** — You need ICP tokens converted to cycles to pay for canister computation and storage.
   - Acquire ICP via an exchange.
   - Convert ICP to cycles using the NNS dapp or `dfx ledger top-up`.
   - Ensure your cycles wallet has at least **2–4 TC** (trillion cycles) for initial deployment.
3. **DFX Identity** — Confirm your identity is set up:
   ```bash
   dfx identity whoami
   dfx identity get-principal
   ```

---

## Deploying to IC Mainnet

### 1. Build and Deploy Both Canisters

