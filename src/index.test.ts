import { parseUserAgent } from "../src/index";
// @ts-ignore
global.navigator = { userAgent: "..." };
describe("parseUserAgent()", () => {
  it("parses Chrome on Windows desktop", () => {
    const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.6099.129";
    const info = parseUserAgent(ua);
    expect(info.browser.name).toBe("Chrome");
    expect(info.os.name).toBe("Windows 10");
    expect(info.cpu.architecture).toBe("amd64");
    expect(info.device.type).toBe("desktop");
    expect(info.engine.name).toBeDefined();
  });

  it("parses Safari on macOS desktop", () => {
    const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_1) Version/17.0 Safari/605.1.15";
    const info = parseUserAgent(ua);
    expect(info.browser.name).toBe("Safari");
    expect(info.os.name).toBe("macOS");
    expect(info.os.version).toBe("13.5.1");
    expect(info.cpu.architecture).toBe("amd64");
    expect(info.device.type).toBe("desktop");
  });

  it("parses iPhone (mobile)", () => {
    const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) Version/17.0 Mobile/15E148 Safari/604.1";
    const info = parseUserAgent(ua);
    expect(info.browser.name).toBe("Safari");
    expect(info.os.name).toBe("iOS (iPhone)");
    expect(info.os.version).toBe("17.1");
    expect(info.device.type).toBe("mobile");
  });

  it("parses iPad (tablet)", () => {
    const ua = "Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) Version/17.0 Safari/604.1";
    const info = parseUserAgent(ua);
    expect(info.device.type).toBe("tablet");
    expect(info.os.name).toBe("iOS (iPad)");
  });

  it("parses Android mobile", () => {
    const ua = "Mozilla/5.0 (Linux; Android 14; Pixel 7 Pro) Chrome/120.0.6099.129 Mobile Safari/537.36";
    const info = parseUserAgent(ua);
    expect(info.os.name).toBe("Android");
    expect(info.device.type).toBe("mobile");
  });

  it("parses Linux desktop", () => {
    const ua = "Mozilla/5.0 (X11; Linux x86_64) Gecko/20100101 Firefox/119.0";
    const info = parseUserAgent(ua);
    expect(info.device.type).toBe("desktop");
    expect(info.os.name).toBe("Linux");
  });

  it("parses Smart TV", () => {
    const ua = "Mozilla/5.0 (SmartTV; Linux; Tizen/6.0)";
    const info = parseUserAgent(ua);
    expect(info.device.type).toBe("smarttv");
  });

  it("parses Console", () => {
    const ua = "Mozilla/5.0 (PlayStation 5 3.11)";
    const info = parseUserAgent(ua);
    expect(info.device.type).toBe("console");
  });

  it("parses Wearable", () => {
    const ua = "Mozilla/5.0 (AppleWatch; CPU Watch OS 10_0)";
    const info = parseUserAgent(ua);
    expect(info.device.type).toBe("wearable");
  });

  it("defaults unknowns correctly", () => {
    const ua = "random-ua-string";
    const info = parseUserAgent(ua);
    expect(info.browser.name).toBe("Unknown");
    expect(info.os.name).toBe("Unknown");
    expect(info.cpu.architecture).toBeUndefined();
    expect(info.device.type).toBe("unknown");
    expect(info.engine.name).toBe("Unknown");
  });
});

describe("parseUserAgent browser branch", () => {
  const originalNavigator = globalThis.navigator;

  // @ts-ignore is needed because navigator is not a normal property of globalThis in Node.
  beforeAll(() => {
    // @ts-ignore
    globalThis.navigator = { userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_1) Safari/605.1.15" };
  });

  afterAll(() => {
    globalThis.navigator = originalNavigator;
  });

  it("should use navigator.userAgent when no ua param is passed", () => {
    const info = parseUserAgent(); // no argument
    expect(info.userAgent).toBe("Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_1) Safari/605.1.15");
    expect(info.os.name).toBe("macOS");
  });
});

describe("Device detection - tablets", () => {
  it("should detect iPad as tablet", () => {
    const ua =
      "Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
    const info = parseUserAgent(ua);
    expect(info.device.type).toBe("tablet");
  });

  it("should detect Android tablet correctly", () => {
    const ua =
      "Mozilla/5.0 (Linux; Android 14; Nexus 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    const info = parseUserAgent(ua);
    expect(info.device.type).toBe("tablet");
  });

  it("should not misclassify tablets as mobile", () => {
    const ua =
      "Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
    const info = parseUserAgent(ua);
    expect(info.device.type).not.toBe("mobile");
  });

  it("should detect Samsung tablet (SM-T series) as tablet", () => {
    const ua =
      "Mozilla/5.0 (Linux; Android 13; SM-T860) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    const info = parseUserAgent(ua);
    expect(info.device.type).toBe("tablet");
  });
});
