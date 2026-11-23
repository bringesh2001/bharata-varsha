import { cacheLife } from "next/cache";
import { compile, runSync } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { MDXContent } from "mdx/types";

/**
 * Compiles an MDX body to a function-body string. Cached so each article is
 * compiled once per build/deployment, not on every request.
 */
export async function compileMdx(body: string): Promise<string> {
  "use cache";
  cacheLife("max");
  const file = await compile(body, { outputFormat: "function-body" });
  return String(file);
}

/** Turns compiled MDX code into a React component. Synchronous; does no I/O. */
export function evaluateMdx(code: string): MDXContent {
  return runSync(code, { ...runtime, baseUrl: import.meta.url }).default;
}
