import Link from "next/link";
import type { ReactNode } from "react";

/**
 * An intentional, styled placeholder for a section that is planned but not
 * yet built. States plainly what will be here and the rules it will follow.
 */
export function SectionPlaceholder({
  eyebrow,
  title,
  lead,
  milestone,
  plans,
  rules,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  milestone: string;
  plans: { title: string; text: string }[];
  rules: string[];
  aside?: ReactNode;
}) {
  return (
    <>
      <section className="bg-stone pb-16 pt-14 sm:pt-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 font-display text-[clamp(44px,6vw,76px)] leading-[1.02]">{title}</h1>
            <p className="mt-6 max-w-[38em] text-[18px] leading-[1.55] text-text-2">{lead}</p>
          </div>
          <div className="rounded-[6px] border border-border bg-paper p-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-text-3">Status</p>
            <p className="mt-2 text-[15px] text-text-2">
              <span className="mr-2 inline-block rounded-full border border-border-strong px-2.5 py-0.5 text-[12px] font-semibold text-ink">
                In preparation
              </span>
              Planned for {milestone}. Until then, this page explains what it will hold.
            </p>
            {aside}
          </div>
        </div>
      </section>

      <section className="section border-y border-border bg-paper" aria-labelledby="plans-heading">
        <div className="container-page">
          <h2 id="plans-heading" className="font-display text-[clamp(36px,4vw,44px)] leading-[1.1]">
            What you&rsquo;ll find here
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <li key={p.title} className="rounded-[6px] border border-border border-t-4 border-t-ink bg-paper p-5">
                <h3 className="text-[19px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[15px] text-text-2">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-stone" aria-labelledby="rules-heading">
        <div className="container-page max-w-[860px]">
          <h2 id="rules-heading" className="font-display text-[clamp(32px,4vw,40px)] leading-[1.1]">
            How we&rsquo;ll build it
          </h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-[16px] text-text-2">
            {rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/" className="link font-semibold">
              Meanwhile, start with the eras <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
