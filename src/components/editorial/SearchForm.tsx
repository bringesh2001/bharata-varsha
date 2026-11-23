/** Plain GET form to /search — works without JavaScript. */
export function SearchForm({ defaultValue = "", id = "site-search" }: { defaultValue?: string; id?: string }) {
  return (
    <form action="/search" method="get" role="search">
      <label htmlFor={id} className="mb-2 block text-[14px] font-semibold">
        Search a ruler, place, idea or event
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder="e.g. Ashoka, Pataliputra, edicts"
          className="min-h-11 min-w-0 flex-1 rounded-[4px] border border-border-strong bg-paper px-3 text-[16px] placeholder:text-text-3"
        />
        <button
          type="submit"
          className="min-h-11 rounded-[4px] bg-ink px-5 text-[15px] font-semibold text-paper hover:bg-ink/90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
