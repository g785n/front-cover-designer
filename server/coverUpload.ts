export type BubbleEnvironment = "test" | "live";

export const BUBBLE_COVER_WORKFLOWS: Record<BubbleEnvironment, string> = {
  test: "https://boevaluate.bubbleapps.io/version-test/api/1.1/wf/coverstudio",
  live: "https://boevaluate.bubbleapps.io/api/1.1/wf/coverstudio",
};

export function safeCoverFilename(value: string): string {
  const stem = value
    .trim()
    .replace(/\.png$/i, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `${stem || "front-cover"}.png`;
}

export function decodePngBase64(contents: string): Buffer {
  const buffer = Buffer.from(contents, "base64");
  const pngSignature = "89504e470d0a1a0a";
  if (buffer.length < 8 || buffer.subarray(0, 8).toString("hex") !== pngSignature) {
    throw new Error("The uploaded cover is not a valid PNG.");
  }
  return buffer;
}

export function requestOrigin(headers: Record<string, string | string[] | undefined>, protocol = "https"): string {
  const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value?.split(",")[0]?.trim();
  const forwardedProtocol = first(headers["x-forwarded-proto"]);
  const host = first(headers["x-forwarded-host"]) || first(headers.host);
  if (!host) throw new Error("Unable to determine the public Cover Studio URL.");
  return `${forwardedProtocol || protocol}://${host}`;
}
