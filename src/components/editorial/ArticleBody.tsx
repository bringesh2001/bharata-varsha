import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import type { Source } from "@/lib/content/schema";
import { compileMdx, evaluateMdx } from "@/lib/content/mdx";
import { slugify } from "@/lib/content/slugify";
import { Callout } from "./Callout";
import { Cite } from "./Cite";

function textOf(children: unknown): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textOf).join("");
  return "";
}

/** Renders an article's MDX body with the site's editorial components. Server-only. */
export async function ArticleBody({ body, sources }: { body: string; sources: Source[] }) {
  const code = await compileMdx(body);
  const Content = evaluateMdx(code);

  const components: MDXComponents = {
    // Ids match extractHeadings() so the table of contents links work.
    h2: ({ children, ...rest }: ComponentProps<"h2">) => (
      <h2 id={slugify(textOf(children))} {...rest}>
        {children}
      </h2>
    ),
    a: ({ href = "", children, ...rest }: ComponentProps<"a">) => {
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
          {external && <span aria-hidden="true"> ↗</span>}
        </a>
      );
    },
    Callout,
    Cite: ({ id }: { id: string }) => <Cite id={id} sources={sources} />,
  };

  // Called as a function rather than rendered as <Content />: this is a stateless
  // server component, and compiled MDX is a plain function of its props.
  return <div className="prose-article">{Content({ components })}</div>;
}
