import type { PortableTextBlock } from "@portabletext/react";

type Options = {
  includeStyles?: Array<string>; // e.g. ["normal"]
  excludeTypes?: Array<string>; // e.g. ["image", "code"]
  separator?: string; // join separator between blocks
};

/**
 * Convert PortableText blocks to plain text by concatenating span children.
 * - Filters out unwanted blocks by `type` and optional `style`.
 * - Ignores marks; extracts raw span text only.
 */
export function portableTextToText(
  blocks: PortableTextBlock[] | undefined,
  options: Options = {}
): string {
  if (!blocks || blocks.length === 0) return "";
  const {
    includeStyles = ["normal"],
    excludeTypes = ["image", "code"],
    separator = "\n",
  } = options;

  const lines: string[] = [];

  for (const block of blocks) {
    const blockType = (block as any)._type ?? (block as any).type;
    if (excludeTypes.includes(blockType)) continue;

    const style = (block as any).style ?? "normal";
    if (includeStyles.length > 0 && !includeStyles.includes(style)) continue;

    const children = (block as any).children as Array<{ _type?: string; text?: string }> | undefined;
    if (!children || children.length === 0) continue;

    const text = children
      .filter((child) => (child._type ?? "span") === "span" && !!child.text)
      .map((child) => child.text as string)
      .join("");

    if (text.trim().length > 0) lines.push(text.trim());
  }

  return lines.join(separator);
}
