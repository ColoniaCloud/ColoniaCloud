const products = ['Plata.Studio', 'ColonIA', 'MarketDeck'];

export default function ProductBarSection() {
  return (
    <section
      className="relative flex h-[10vh] min-h-[56px] w-full items-center overflow-hidden bg-black"
      data-navbar-theme="dark"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,#000000_0%,#1a1a1a_50%,#000000_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-1.5 px-7 sm:flex-row sm:justify-between sm:gap-6">
        <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-white/60 sm:text-[13px]">
          Nuestros productos
        </span>

        <ul className="flex list-none items-center gap-3 sm:gap-8">
          {products.map((product) => (
            <li
              key={product}
              className="whitespace-nowrap font-display text-[12px] font-medium text-white sm:text-[14px]"
            >
              {product}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
