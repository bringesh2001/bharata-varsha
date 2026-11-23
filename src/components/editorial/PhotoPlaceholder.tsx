/**
 * Striped placeholder until a real, credited photo arrives (Style Guide §03).
 * Decorative: the caption is visible text, so the box itself is hidden from screen readers.
 */
export function PhotoPlaceholder({
  caption,
  className = "aspect-[4/3]",
}: {
  caption: string;
  className?: string;
}) {
  return (
    <div className={`photo-placeholder relative overflow-hidden rounded-[4px] ${className}`}>
      <span className="absolute bottom-3 left-3 rounded-[2px] bg-paper/90 px-2 py-1 text-[13px] text-text-2">
        Photo — {caption}
      </span>
    </div>
  );
}
