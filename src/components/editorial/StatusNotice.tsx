import type { ArticleFrontmatter } from "@/lib/content/schema";

/**
 * Tells readers plainly when a page has not yet passed editorial review
 * (build guide §6: never publish unreviewed AI-assisted material as final).
 */
export function StatusNotice({ status, updatedAt }: Pick<ArticleFrontmatter, "status" | "updatedAt">) {
  if (status === "published") return null;
  return (
    <div role="note" className="rounded-[6px] border border-caution/50 bg-paper px-4 py-3 text-[14px] text-text-2">
      <span className="mr-2 inline-block rounded-full bg-caution px-2.5 py-0.5 text-[12px] font-semibold text-paper">
        {status === "draft" ? "Draft" : "Reviewed"}
      </span>
      {status === "draft"
        ? "This guide is a draft awaiting editorial review. Check claims against the numbered sources before relying on them."
        : "This guide has been reviewed and is awaiting publication."}{" "}
      <span className="text-text-3">Last updated {updatedAt}.</span>
    </div>
  );
}
