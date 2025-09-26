import { browserRules, engineRules, osRules, cpuRules, deviceRules } from "./patterns";
import { detect } from "./utils";

export interface BrowserInfo { name: string; version: string; }
export interface CPUInfo { architecture?: string; }
export interface DeviceInfo { model?: string; type?: string; vendor?: string; }
export interface EngineInfo { name: string; version: string; }
export interface OSInfo { name: string; version: string; }
export interface UserAgentInfo {
  userAgent: string;
  browser: BrowserInfo;
  cpu: CPUInfo;
  device: DeviceInfo;
  engine: EngineInfo;
  os: OSInfo;
}

/**
 * Parse a user agent string into structured information.
 * Defaults to `navigator.userAgent` if none provided.
 */
export function parseUserAgent(ua?: string): UserAgentInfo {
  const userAgent = ua || (typeof navigator !== "undefined" ? navigator.userAgent : "");

  const browser = detect(userAgent, browserRules);
  const engine = detect(userAgent, engineRules);
  const os = detect(userAgent, osRules);

  const cpuMatch = detect(userAgent, cpuRules);
  const cpu: CPUInfo = cpuMatch.name !== "Unknown" ? { architecture: cpuMatch.name } : {};

  const deviceMatch = detect(userAgent, deviceRules);
  let device: DeviceInfo;

  if (deviceMatch.name !== "Unknown") {
    device = { type: deviceMatch.name };
  } else {
    // Fallback heuristic for desktop
    if (/windows|macintosh|x11|linux/i.test(userAgent)) {
      device = { type: "desktop" };
    } else {
      device = { type: "unknown" };
    }
  }

  return { userAgent, browser, cpu, device, engine, os };
}
