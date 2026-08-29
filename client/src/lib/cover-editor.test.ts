import { describe, expect, it } from "vitest";
import { DEFAULT_REPORT_OVERLAY, DEFAULT_REPORT_PALETTE, IMAGE_TREATMENTS, REPORT_PALETTE_LABELS, readReportPaletteFromUrl, reportConfigurationQuery, resolvePaletteColour } from "./cover-editor";

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

  it("exposes exactly nine supported URL palette roles without text contrast", () => {
    expect(REPORT_PALETTE_LABELS.map(({ key }) => key)).toEqual([
      "primary",
      "positive",
      "average",
      "negative",
      "accent1",
      "accent2",
      "accent3",
      "accent4",
      "accent5",
    ]);
    expect(Object.keys(DEFAULT_REPORT_PALETTE)).toHaveLength(9);
    expect("contrast" in DEFAULT_REPORT_PALETTE).toBe(false);
  });

  it("does not emit a legacy contrast value in copied integration URLs", () => {
    const query = reportConfigurationQuery(DEFAULT_REPORT_PALETTE, DEFAULT_REPORT_OVERLAY, "1689248118661x735818826526228500", "test");
    const params = new URLSearchParams(query);
    expect([...params.keys()].filter((key) => key === "contrast")).toHaveLength(0);
    expect(params.get("primary")).toBe("173B72");
    expect(params.get("accent5")).toBe("3F6F5E");
  });
});
