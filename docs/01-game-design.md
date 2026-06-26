# 01 — Game Design

## The core loop

```
        ┌─────────────────────────────────────────────┐
        │                                             │
   deposit USDC                                       │
        │                                             │
        ▼                                             │
   🌱 FARM (lending)   ──harvest yield──▶  🏪 MARKET (trade)
   grow crops slowly                       swap crops → fuel
   = Aave/Morpho yield                     = Uniswap swap
                                                │
                                            buy fuel
                                                │
                                                ▼
                                         🚀 ROCKET (perp)
                                         launch, climb, eject
                                         = leveraged long on
                                           Hyperliquid price
                                                │
                                          winnings ──────────┘
```

Calm honest earning (farm) feeds high-intensity gambling (rocket); the market is
the bridge. Each piece is independently fun, so we ship them in order (rocket first).

---

## 🚀 Rocket — the perp game (MVP, build this first)

### The mechanic
A leveraged long's PnL **is** a multiplier. We render it as a rocket climbing.

- Player picks a **stake** (fuel) and a **leverage** (risk dial, e.g. 10×–100×).
- On launch we open a synthetic long anchored to the live Hyperliquid **mark price**.
- Altitude / multiplier in real time:

  ```
  multiplier = 1 + leverage × (priceNow / priceStart − 1)
  ```

- **Eject** anytime → bank `stake × multiplier` (minus rake).
- **Crash** = liquidation: if `multiplier ≤ 0` (price moved against you past the
  liquidation threshold), the rocket explodes and the stake is lost.

### Why this is a *real* perp, not RNG
The crash point is **driven by the real oracle price**, signed and verifiable
on-chain — not a house-controlled random number. That is the entire "fair by
design" thesis, and it's the differentiator vs Aviator/bustabit clones.

### The pacing trick (the important one)
A 1× position could climb/crash over hours — unplayable. **High leverage
compresses real volatility into arcade pacing:** at 100×, a real 1% adverse move
= liquidation, and crypto moves 1% in seconds. So rounds last seconds-to-minutes,
feel intense, and are still backed by genuine market data. Leverage is the
player's risk dial *and* the game's tempo knob.

### Provable fairness
- Round seed = the signed oracle price at launch (immutable, on-chain).
- Anyone can replay the price feed and verify the crash was real, not rigged.
- No server, no house RNG, nothing to trust except the public oracle.

### Counterparty / economic risk (the central design problem)
Players win against a **pool** (the vault). A hot streak of winners draws on it,
and that pool is partly farmers' principal. Mitigations (all on-chain):
- Max leverage + max stake + max concurrent exposure caps.
- Per-round and per-epoch loss circuit breakers for the pool.
- Rake feeds a buffer that absorbs variance before touching principal.
- Optionally: protocol hedges its *net* player exposure with a real Hyperliquid
  position, so the house is market-neutral and only earns the rake.

### Later variations (after MVP)
- **Two-lane runner:** switch long/short by tapping lanes as price wiggles.
- **Wave surfer:** ride the price line; leverage = board size; wipeout = liq.
- **Funding-drain hold:** funding rate slowly drains altitude; adds a clock.

---

## 🌱 Farm — the lending game (Phase 2)

- Deposit USDC → it supplies to Aave/Morpho → **crops grow in real time** as
  interest accrues. Growth rate = live supply APY.
- **Harvest** = realize accrued yield into crops you can sell or replant.
- Slow, safe, idle-game feel. Principal keeps working (but carries DeFi risk).
- This is the honest trickle that gives players fuel to gamble in the rocket.
- Revenue: ~10% performance fee on yield.

## 🏪 Market — the trading game (Phase 3)

- Bring crops/harvest → **swap for fuel** (the rocket's input currency).
- Backed by a Uniswap pool (or a simple internal AMM to start).
- Optional skill layer: prices move, so *when* you sell matters → light trading game.
- Connects the calm farm economy to the high-stakes rocket.

---

## Theme / art direction (placeholder)

Cozy pixel/low-poly space-farm: a little planet plot, a market stall, a launchpad.
Calm palette for farm/market, high-contrast + particle FX for the rocket. The
emotional arc per session: tend → trade → gamble → repeat. Tone honest, not scammy.
