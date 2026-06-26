# 04 — Contracts & Fees

> The contracts ARE the backend. Tooling: **Foundry** (`contracts/`). Solidity.

## Contract set

### 1. Vault (lending) — `VaultlineVault`
- ERC-4626-style. Accepts USDC, mints shares.
- Supplies principal to **Aave / Morpho**; tracks accrued yield.
- Exposes a spendable **game balance** that the rocket/market draw against.
- Holds the session-key **policy** (spend caps, expiry, allowlist, no-withdraw).
- Charges a **performance fee** on yield (not principal).

### 2. Rocket (perp) — `RocketGame`
- `launch(stake, leverage)` → opens a synthetic long anchored to the signed
  Hyperliquid oracle price; records `priceStart`.
- `eject()` → reads current oracle price, computes
  `multiplier = 1 + leverage × (priceNow/priceStart − 1)`, pays
  `stake × multiplier − rake`.
- Liquidation when `multiplier ≤ 0` → stake forfeited.
- Settles against the **pool** (vault buffer). Enforces risk caps (max leverage,
  max stake, max concurrent exposure, per-epoch loss circuit breaker).
- Takes a **rake** on each settled round.
- Optional: protocol hedges net exposure with a real Hyperliquid position to stay
  market-neutral (earns only the rake).

### 3. Market (trading) — `Market`
- Swaps crops ↔ fuel. Start with a simple internal AMM; later route to **Uniswap**.
- Optional small swap fee.

### Oracle
- Source of truth for rocket settlement = signed **Hyperliquid mark price** read
  on-chain. The client websocket is for rendering only; it cannot influence payout.
- Round seed = the signed launch price → provable fairness, replayable by anyone.

## Fee model

| Fee | Where | Rate (proposed) | Rationale |
|---|---|---|---|
| **Rocket rake** | `RocketGame` on each settled round | 2–5% of pot | Primary revenue. Scales with play; capital gets wagered many times. Poker-style, expected. |
| **Yield performance fee** | `Vault` on accrued interest | ~10% of yield | Passive; principal-safe; runs even when nobody plays. |
| **Deposit fee** | — | **none** | Rejected: eats principal, contradicts the fair positioning, kills TVL. |
| **Swap fee** (optional) | `Market` | small | Minor; only if the market gets real volume. |

- `feeBps` + `treasury` address parameterized per contract.
- Rake first funds a **variance buffer** that protects farmers' principal before
  profit is taken to treasury.

## Security / audit posture (mainnet target)

- Reentrancy guards on all value-moving paths.
- Strict on-chain enforcement of session-key limits — never trust the client.
- Risk caps + circuit breakers on `RocketGame` so a winning streak can't drain the
  pool (and thus principal).
- Use battle-tested integrations (Aave/Morpho/Uniswap/Hyperliquid official interfaces).
- **External audit before mainnet** with real funds. Testnet first.
- Immutable vs upgradeable: prefer minimal upgradeability (timelock + multisig) or
  immutable cores with a guarded treasury.

## Open questions for contracts

- Synthetic-pooled rocket vs per-player real Hyperliquid positions (recommend
  synthetic-pooled for scalability + hedge net exposure).
- Which chain hosts the contracts (HyperEVM keeps oracle + game co-located).
- Exact risk-cap parameters (need simulation before mainnet).
