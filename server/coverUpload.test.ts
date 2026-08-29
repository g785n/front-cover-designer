import { describe, expect, it } from "vitest";
import { BUBBLE_COVER_WORKFLOWS, decodePngBase64, requestOrigin, safeCoverFilename } from "./coverUpload";

describe("Cover Studio Bubble upload helpers", () => {
  it("routes explicitly to Bubble test and live workflows", () => {
    expect(BUBBLE_COVER_WORKFLOWS.test).toContain("/version-test/");
    expect(BUBBLE_COVER_WORKFLOWS.live).not.toContain("/version-test/");
  });

  it("normalises cover filenames safely", () => {
    expect(safeCoverFilename(" Board Report 2026.PNG ")).toBe("board-report-2026.png");
    expect(safeCoverFilename("***")).toBe("front-cover.png");
  });

  it("accepts PNG bytes and rejects non-PNG content", () => {
    const png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
    expect(decodePngBase64(png).subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(() => decodePngBase64(Buffer.from("not a png").toString("base64"))).toThrow("valid PNG");
  });

  it("builds the externally reachable origin from proxy headers", () => {
    expect(requestOrigin({ "x-forwarded-proto": "https", "x-forwarded-host": "cover.example.com" })).toBe("https://cover.example.com");
  });
});
