# 03 — Wallet & Deposits

## The problem

A real-time game cannot prompt MetaMask on every action (eject, plant, sell). One
popup per tick is unplayable. We need: connect once, deposit once, then let the
browser take **many fast actions** without per-action signing — while staying
non-custodial and serverless.

This is exactly your "fast wallet — deposit into the browser, browser acts in
real time" idea. The established pattern for it is **session keys / agent wallets**.

## Layer 1 — Connect (the main wallet)

- **wagmi + viem + RainbowKit** (or ConnectKit). All client-side, works with
  static export.
- User connects their real wallet (MetaMask, Rabby, etc.). This wallet holds funds
  and authorizes everything below. It signs rarely (deposit, approve session, withdraw).

## Layer 2 — Deposit (into the vault)

- User deposits USDC into the **Vault** contract (ERC-4626-style). Non-custodial:
  the contract holds funds under rules, not us.
- Vault routes principal to Aave/Morpho (farm yield) and exposes a spendable
  game balance for the rocket/market.

## Layer 3 — The fast wallet (session key) ⭐

This is the core of the real-time UX.

1. The browser **generates an ephemeral keypair** (session key), stored locally
   (IndexedDB). It never leaves the device.
2. The user signs **one** transaction granting that session key **scoped,
   capped, time-limited** authority on the Vault/Game contract — e.g. "may place
   game actions up to X USDC, for 24h, cannot withdraw."
3. From then on, the browser **signs game actions locally** with the session key →
   instant, no popups. On-chain policy enforces the limits, so even though the key
   lives in the browser, the blast radius is bounded (game balance only, no withdrawals).
4. Expiry / revoke: session keys auto-expire and can be revoked by the main wallet.

### Serverless paths (pick one)

| Path | Server-free? | Notes |
|---|---|---|
| **Local burner + on-chain policy** ✅ | Yes, fully | Browser-held key; the Vault contract enforces caps/expiry. Pure, no third party. |
| **Hyperliquid agent / API wallet** ✅ | Yes | Hyperliquid natively supports an "agent wallet" that can **trade but not withdraw** — purpose-built for exactly this. Ideal for the rocket. |
| **ERC-4337 smart account + session keys** (ZeroDev/Kernel, Biconomy) | Mostly | Richer policies + optional gasless via paymaster. More moving parts. |
| **Managed embedded wallet** (Privy / Dynamic / Turnkey) | ⚠️ No | Easiest UX (email/social login, MPC keys) but introduces a third-party *service* dependency. Not "your" server, but not pure-serverless either. Optional convenience, not required. |

**Recommendation:** local session key + on-chain policy for the vault/market, and
the **Hyperliquid native agent wallet** for rocket trades. Fully serverless,
non-custodial, and the agent-wallet model is designed for this exact use case.

## Gas

- Run real-time actions on a **cheap chain** (Hyperliquid L1 / HyperEVM, or a
  low-fee L2). Near-zero gas per action.
- Fund the session key with a small gas float at deposit time, or use a paymaster
  (4337 path) if we want gasless. Keep it simple for MVP: tiny gas float.

## Withdraw

- Only the **main wallet** can withdraw principal + winnings. Session keys never can.
- Withdraw = redeem vault shares (principal + accrued yield − fees). Honest copy:
  withdrawable minus a small protocol fee; subject to DeFi/market risk.

## Security checklist

- Session key scope: spend cap, time expiry, action allowlist, no withdraw rights.
- Revocation path from main wallet.
- Client never holds the main key; only the bounded session key.
- All limits enforced **on-chain**, never trusted from the client.
