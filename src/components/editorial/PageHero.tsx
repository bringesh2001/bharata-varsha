import type { ReactNode } from "react";

/** Standard section hero: eyebrow, display heading, lead, optional aside. */
export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-stone pb-14 pt-14 sm:pt-20">
      <div className="container-page">
        <div className={aside ? "grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end" : ""}>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 font-display text-[clamp(44px,6vw,76px)] leading-[1.02]">{title}</h1>
            {lead && <p className="mt-6 max-w-[40em] text-[18px] leading-[1.55] text-text-2">{lead}</p>}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}
