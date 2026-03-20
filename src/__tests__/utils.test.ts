import { describe, it, expect } from "vitest";
import { escapeXml } from "@/shared/lib/utils/escape-xml";
import { truncateText } from "@/shared/lib/utils/truncate";
import { isValidGitHubUsername } from "@/shared/lib/utils/validate-username";

describe("escapeXml", () => {
  it("escapes &", () => {
    expect(escapeXml("a&b")).toBe("a&amp;b");
  });

  it("escapes <", () => {
    expect(escapeXml("<script>")).toBe("&lt;script&gt;");
  });

  it("escapes quotes", () => {
    expect(escapeXml('"hello"')).toBe("&quot;hello&quot;");
  });

  it("returns empty string unchanged", () => {
    expect(escapeXml("")).toBe("");
  });

  it("handles multiple special chars", () => {
    expect(escapeXml('<a href="x">&')).toBe("&lt;a href=&quot;x&quot;&gt;&amp;");
  });
});

describe("truncateText", () => {
  it("returns short text unchanged", () => {
    expect(truncateText("hello", 10)).toBe("hello");
  });

  it("truncates long text with ellipsis", () => {
    const result = truncateText("abcdefghij", 5);
    expect(result.length).toBe(5);
    expect(result.endsWith("\u2026")).toBe(true);
  });

  it("handles exact length", () => {
    expect(truncateText("abc", 3)).toBe("abc");
  });
});

describe("isValidGitHubUsername", () => {
  it("accepts valid usernames", () => {
    expect(isValidGitHubUsername("chahyunwoo")).toBe(true);
    expect(isValidGitHubUsername("torvalds")).toBe(true);
    expect(isValidGitHubUsername("user-name")).toBe(true);
    expect(isValidGitHubUsername("a")).toBe(true);
  });

  it("rejects invalid usernames", () => {
    expect(isValidGitHubUsername("")).toBe(false);
    expect(isValidGitHubUsername("-start")).toBe(false);
    expect(isValidGitHubUsername("end-")).toBe(false);
    expect(isValidGitHubUsername("has space")).toBe(false);
    expect(isValidGitHubUsername("has@special")).toBe(false);
    expect(isValidGitHubUsername("a".repeat(40))).toBe(false);
  });
});
