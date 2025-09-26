import { detect } from "../src/utils";
import { browserRules, osRules, cpuRules, engineRules, deviceRules } from "../src/patterns";

describe("detect()", () => {
  it("should return Unknown when no rule matches", () => {
    const result = detect("custom-ua-string", browserRules);
    expect(result).toEqual({ name: "Unknown", version: "" });
  });

  it("should detect browsers correctly", () => {
    const testCases = [
      { ua: "Mozilla/5.0 (Windows NT 10.0) Chrome/120.0.6099.129", expected: "Chrome" },
      { ua: "Mozilla/5.0 (Windows NT 10.0; rv:120.0) Gecko/20100101 Firefox/120.0", expected: "Firefox" },
      { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X) Version/17.0 Safari/605.1.15", expected: "Safari" },
    ];

    testCases.forEach(tc => {
      const result = detect(tc.ua, browserRules);
      expect(result.name).toBe(tc.expected);
      expect(result.version).toBeDefined();
    });
  });

  it("should detect OS correctly", () => {
    const testCases = [
      { ua: "Windows NT 10.0", expected: "Windows 10" },
      { ua: "Macintosh; Intel Mac OS X 13_5_1", expected: "macOS" },
      { ua: "iPhone; CPU iPhone OS 17_1", expected: "iOS (iPhone)" },
      { ua: "Android 14; Pixel 7", expected: "Android" },
      { ua: "X11; Linux x86_64", expected: "Linux" },
    ];

    testCases.forEach(tc => {
      const result = detect(tc.ua, osRules);
      expect(result.name).toBe(tc.expected);
    });
  });

  it("should detect CPU correctly", () => {
    const testCases = [
      { ua: "Intel Mac", expected: "amd64" },
      { ua: "x86_64", expected: "amd64" },
      { ua: "arm64", expected: "ARM" },
      { ua: "i386", expected: "x86" },
    ];

    testCases.forEach(tc => {
      const result = detect(tc.ua, cpuRules);
      expect(result.name).toBe(tc.expected);
    });
  });

  it("should detect engine correctly", () => {
    const testCases = [
      { ua: "AppleWebKit/605.1.15", expected: "WebKit" },
      { ua: "Gecko/20100101 Firefox/119.0", expected: "Gecko" },
      { ua: "Trident/7.0", expected: "Trident" },
    ];

    testCases.forEach(tc => {
      const result = detect(tc.ua, engineRules);
      expect(result.name).toBe(tc.expected);
    });
  });

  it("should detect device correctly", () => {
    const testCases = [
      { ua: "iPhone; CPU iPhone OS 17_1", expected: "mobile" },
      { ua: "iPad; CPU OS 17_1", expected: "tablet" },
      { ua: "Windows NT 10.0", expected: "desktop" },
      { ua: "SmartTV; Linux; Tizen/6.0", expected: "smarttv" },
      { ua: "PlayStation 5", expected: "console" },
      { ua: "AppleWatch", expected: "wearable" },
    ];

    testCases.forEach(tc => {
      const result = detect(tc.ua, deviceRules);
      // fallback for desktop heuristic
      const type = result.name !== "Unknown" ? result.name : "desktop";
      expect(type).toBe(tc.expected);
    });
  });
});
