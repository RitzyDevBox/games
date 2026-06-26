# Vaultline — Planning Docs

> Working name. A crypto play-to-earn game where real DeFi yield + skill-based
> stakes fund the prizes — not token emissions.

## The one-paragraph pitch

A cozy-meets-degen space-farm. You **plant** crops with deposited USDC and watch
them grow in real time (that growth is real DeFi **lending yield**, Aave/Morpho).
You take the harvest to **market** and swap it for fuel (a **trade**, Uniswap).
Then you load the fuel into a **rocket** and launch (a leveraged **perp** on
Hyperliquid): the rocket climbs with the live market, and you jump off to bank
the multiplier before it crashes. Calm, honest earning feeds high-intensity
gambling; the market is the bridge between them.

## The three loops map 1:1 to three DeFi primitives

| In-game | Primitive | Feel | Source of "earn" |
|---|---|---|---|
| 🌱 Plant & grow | Lending (Aave / Morpho) | Slow, safe, passive | Real lending interest |
| 🏪 Market | Trading (Uniswap) | Skill / timing | Swap spreads, speculation |
| 🚀 Rocket | Perp (Hyperliquid) | High-intensity, volatile | Zero-sum skill + leverage |

## Hard constraints (do not violate)

- **Pure frontend + Solidity contracts. No server, no API, no DB.** Frontend is a
  static export; all "backend" logic is on-chain or in third-party DeFi protocols.
- **No false safety claims.** Never say "can't lose your principal." DeFi carries
  smart-contract, depeg, and bad-debt risk; fees reduce returns. Copy stays honest.

## Build order (ship one thing at a time)

1. **Phase 1 — Rocket (MVP).** The perp crash game + vault deposit + fast wallet.
   This is a *complete, shippable game on its own.* Proves the core loop.
2. **Phase 2 — Farm.** Lending-yield-as-growth. Gives a reason to deposit and a
   passive earn that funds rocket fuel.
3. **Phase 3 — Market.** Trading layer connecting farm ↔ rocket (Uniswap).

## Documents

- [01 — Game design](./01-game-design.md) — the loops, the rocket/perp mechanic in detail, pacing & fairness
- [02 — Tech stack](./02-tech-stack.md) — rendering engine, frontend, real-time price feed
- [03 — Wallet & deposits](./03-wallet-deposits.md) — connect, vault, the "fast wallet" / session-key design
- [04 — Contracts & fees](./04-contracts-fees.md) — vault, rocket settlement, market, fee model

## Open decisions

- Fee numbers (recommendation: 2–5% rocket rake + ~10% yield perf fee, no deposit fee).
- Rendering engine: Phaser 3 (recommended) vs Pixi.js vs three.js.
- Fast-wallet path: pure burner/agent-wallet (serverless) vs managed embedded wallet (Privy/Dynamic).
- Chain for real-time actions: Hyperliquid L1 / HyperEVM vs an L2.
