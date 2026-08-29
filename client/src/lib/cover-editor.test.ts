import { describe, expect, it } from "vitest";
import { DEFAULT_REPORT_PALETTE, IMAGE_TREATMENTS, readReportPaletteFromUrl, resolvePaletteColour } from "./cover-editor";

describe("palette-aware image treatment helpers", () => {
  it("exposes original, tint, duotone, and gradient-wash treatments", () => {
    expect(IMAGE_TREATMENTS.map(({ value }) => value)).toEqual(["original", "tint", "duotone", "gradient-wash"]);
  });

  it("resolves selected treatment colours from the report palette", () => {
    expect(resolvePaletteColour(DEFAULT_REPORT_PALETTE, "primary")).toBe("#173B72");
    expect(resolvePaletteColour(DEFAULT_REPORT_PALETTE, "accent3")).toBe("#8E6AAF");
    expect(resolvePaletteColour(DEFAULT_REPORT_PALETTE)).toBe("#173B72");
  });

  it("ignores the legacy contrast parameter while retaining every supported colour role", () => {
    const { palette, inheritedCount } = readReportPaletteFromUrl("?primary=123456&contrast=FFFFFF&accent5=abcdef");
    expect(palette.primary).toBe("#123456");
    expect(palette.accent5).toBe("#ABCDEF");
    expect(inheritedCount).toBe(2);
    expect("contrast" in palette).toBe(false);
  });
});
