/** "One system, three scripts" — for use on Ink sections. */
export function NumeralScripts() {
  const rows = [
    { label: "Devanagari (India)", digits: "०१२३४५६७८९", lang: "hi", cls: "font-deva" },
    { label: "Eastern Arabic", digits: "٠١٢٣٤٥٦٧٨٩", lang: "ar", cls: "font-arabic" },
    { label: "Western (Europe)", digits: "0123456789", lang: "en", cls: "font-display" },
  ];
  return (
    <figure className="rounded-[6px] border border-on-dark-line p-5 sm:p-6">
      <dl className="divide-y divide-on-dark-line">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[130px_1fr] items-center gap-4 py-4 first:pt-0">
            <dt className="text-[13px] text-on-dark-muted">{r.label}</dt>
            <dd lang={r.lang} dir="ltr" className={`text-[clamp(24px,3vw,34px)] tracking-wide text-on-dark-accent ${r.cls}`}>
              {r.digits}
            </dd>
          </div>
        ))}
      </dl>
      <figcaption className="mt-3 text-[13px] text-on-dark-muted">
        One system, three scripts. What travelled was the idea: nine digits, a zero, and place value.
      </figcaption>
    </figure>
  );
}
