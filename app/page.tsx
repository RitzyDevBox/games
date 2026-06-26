const pillars = [
  {
    title: "Capital that keeps working",
    body: "Your deposit goes into audited DeFi lending (Aave / Morpho) and earns yield while you play — so you stake from yield and winnings, not by torching your balance. Withdrawable anytime, minus a small protocol fee. DeFi carries smart-contract and market risk.",
    tag: "The floor",
  },
  {
    title: "A skill arena",
    body: "Compete in on-chain leveraged matches settled on Hyperliquid. Outcomes are decided by skill and nerve between players — not by a house that always wins.",
    tag: "The upside",
  },
  {
    title: "Real yield, not emissions",
    body: "Prizes are funded by genuine lending interest and player stakes — never by inflating a token. No emissions treadmill, no Ponzi tail. It can actually last.",
    tag: "The honesty",
  },
];

const steps = [
  {
    n: "01",
    title: "Deposit",
    body: "Connect a wallet and deposit USDC. It flows straight into DeFi lending and starts earning the moment it lands.",
  },
  {
    n: "02",
    title: "Compete",
    body: "Enter the arena. Stake from your yield, go head-to-head in leveraged matches, and climb the leaderboard.",
  },
  {
    n: "03",
    title: "Withdraw",
    body: "Cash out winnings or pull your full principal whenever you want. Non-custodial — the contracts hold the keys, not us.",
  },
];

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-[140px]"
      />

      {/* nav */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-mono text-lg font-bold tracking-tight">
          VAULT<span className="text-accent">LINE</span>
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
          Pre-launch · building on mainnet
        </span>
      </header>

      {/* hero */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-6 pb-20 pt-16 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Play-to-earn, the sustainable way
        </span>

        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Win on skill.
          <br />
          <span className="text-white/50">Backed by real yield.</span>
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          Vaultline is an on-chain arena where prizes come from real DeFi
          lending yield and player stakes — not token emissions. Your deposit
          keeps working while you play. Fair by design, high-stakes by choice.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-xl bg-accent/40 px-6 py-3 text-sm font-semibold text-black/70"
          >
            Launch app — soon
          </button>
          <div className="flex items-center gap-5 text-sm text-white/60">
            <a className="transition hover:text-white" href="#">
              Twitter / X
            </a>
            <a className="transition hover:text-white" href="#">
              Discord
            </a>
            <a className="transition hover:text-white" href="#">
              Docs
            </a>
          </div>
        </div>
        <p className="text-xs text-white/40">
          Non-custodial · You hold your keys · No sign-up required
        </p>
      </section>

      {/* pillars */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-accent/80">
                {p.tag}
              </span>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-28">
        <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl">
          How it works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col gap-3">
              <span className="font-mono text-3xl font-bold text-accent/30">
                {s.n}
              </span>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className="mt-auto border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-6 py-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <span className="font-mono">
            VAULT<span className="text-accent">LINE</span>
          </span>
          <span>
            Non-custodial · Powered by Aave / Morpho &amp; Hyperliquid · DeFi
            carries smart-contract &amp; market risk · Not financial advice.
          </span>
        </div>
      </footer>
    </main>
  );
}
