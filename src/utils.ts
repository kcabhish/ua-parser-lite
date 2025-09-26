import { Rule } from "./patterns";

/**
 * Generic matcher: returns first rule that matches UA
 */
export function detect(ua: string, rules: Rule[]): { name: string; version: string } {
  for (const rule of rules) {
    if (rule.regex.test(ua)) {
      const version = rule.versionRegex?.exec(ua)?.[1]?.replace(/_/g, ".") ?? "";
      return { name: rule.name, version };
    }
  }
  return { name: "Unknown", version: "" };
}
