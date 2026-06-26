# 02 — Tech Stack

## Frontend shell (already scaffolded)

- **Next.js 16 (App Router) + TypeScript + Tailwind v4**, `output: "export"` →
  fully static `./out`. No Node runtime. Deployable to IPFS / Arweave / any CDN.
- The game canvas mounts inside a **client component** on a static page. Next is
  just the shell/router/landing; the game itself is a self-contained canvas app.

## Rendering engine — recommendation: **Phaser 3**

The gameplay is 2D arcade (a value going up/down, a farm grid, a market stall).
You do **not** need 3D. Options:

| Engine | Fit | Notes |
|---|---|---|
| **Phaser 3** ✅ recommended | Batteries-included 2D game framework | Scene management (Farm / Market / Rocket as scenes), sprites, tweens, input, particles, audio — all built in. Fastest path to a polished arcade feel. Mounts in a `<div>` inside a client component. |
| **Pixi.js** | 2D WebGL renderer, lower level | More control, smaller, but you build your own loop/scene/input. Good if you want custom rendering. |
| **three.js** | 3D | Overkill for MVP. The rocket is inherently a 1D value over time. Consider only later as a 3D polish skin for the launch sequence. |

**Decision:** start with **Phaser 3** for the game scenes; keep React/Next for
the shell, wallet UI, and menus. Bridge the two with a thin event bus (Phaser
emits game events → React updates HUD/wallet; React sends actions → Phaser).

> Phaser SSR note: import Phaser only inside a `useEffect`/`dynamic(..., {ssr:false})`
> client component so the static export build doesn't try to render it on the server.

## Real-time price feed (drives the rocket)

- Subscribe **directly from the browser** to the Hyperliquid **websocket** mark-price
  feed (`wss://...`). Serverless ✓ — no backend relay.
- That live price drives the rocket multiplier each tick.
- Keep a short rolling buffer client-side for smooth interpolation between ticks.
- For settlement, the **on-chain oracle price** at launch/eject is the source of
  truth — the websocket is only for rendering; the contract reads the signed
  oracle so the client can't cheat the result.

## App state

- **zustand** (or Context) for game/UI state — light, no boilerplate.
- **viem** for on-chain reads; **wagmi** hooks for wallet/connection (see doc 03).
- Round state lives ephemerally in the client during play; the *result* is what
  gets settled on-chain.

## Project layout (proposed)

```
app/                    # Next static shell: landing, app page, menus
  page.tsx              # landing (done)
  play/page.tsx         # mounts the game (client-only)
game/                   # Phaser game (engine-agnostic of React)
  scenes/Rocket.ts
  scenes/Farm.ts
  scenes/Market.ts
  bus.ts                # event bus between React <-> Phaser
lib/
  price.ts             # Hyperliquid ws subscription
  contracts/           # viem ABIs + typed reads/writes
contracts/             # Solidity (Foundry) — the real backend
docs/
```

## Build / deploy

- `npm run build` → static `./out`.
- Deploy target: static host or IPFS (fits the "no server" constraint).
- No env-dependent server secrets; only public RPC/WS endpoints + contract addresses.
