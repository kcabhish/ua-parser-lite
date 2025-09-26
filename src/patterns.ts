export interface Rule {
  name: string;
  regex: RegExp;
  versionRegex?: RegExp;
}

// --- Browsers ---
export const browserRules: Rule[] = [
  { name: "Edge", regex: /edg\//i, versionRegex: /edg\/([\d.]+)/i },
  { name: "Chrome", regex: /chrome|crios/i, versionRegex: /(?:chrome|crios)\/([\d.]+)/i },
  { name: "Safari", regex: /safari/i, versionRegex: /version\/([\d.]+)/i },
  { name: "Firefox", regex: /firefox|fxios/i, versionRegex: /(?:firefox|fxios)\/([\d.]+)/i },
  { name: "Opera", regex: /opr|opera/i, versionRegex: /(?:opr|opera)[\/ ]([\d.]+)/i },
  { name: "Internet Explorer", regex: /msie|trident/i, versionRegex: /(?:msie |rv:)([\d.]+)/i },
];

// --- Engines ---
export const engineRules: Rule[] = [
  { name: "Blink", regex: /blink/i },
  { name: "WebKit", regex: /applewebkit/i, versionRegex: /applewebkit\/([\d.]+)/i },
  { name: "Gecko", regex: /gecko/i, versionRegex: /rv:([\d.]+)/i },
  { name: "Trident", regex: /trident/i, versionRegex: /trident\/([\d.]+)/i },
];

// --- Operating Systems (iOS before macOS) ---
export const osRules: Rule[] = [
  { name: "iOS (iPhone)", regex: /iphone os/i, versionRegex: /iphone os ([\d_]+)/i },
  { name: "iOS (iPad)", regex: /ipad; cpu os/i, versionRegex: /cpu os ([\d_]+)/i },
  { name: "Android", regex: /android/i, versionRegex: /android ([\d.]+)/i },
  { name: "Windows 10", regex: /windows nt 10.0/i },
  { name: "Windows 8.1", regex: /windows nt 6.3/i },
  { name: "Windows 8", regex: /windows nt 6.2/i },
  { name: "Windows 7", regex: /windows nt 6.1/i },
  { name: "macOS", regex: /mac os x/i, versionRegex: /mac os x ([\d_]+)/i },
  { name: "Linux", regex: /linux/i },
];

// --- CPU Architectures ---
export const cpuRules: Rule[] = [
  { name: "ARM", regex: /arm|aarch64/i },
  { name: "amd64", regex: /amd64|x86_64|win64|wow64|intel mac/i },
  { name: "x86", regex: /i[0-9]86/i },
];

// --- Device Types ---
export const deviceRules: Rule[] = [
  { name: "mobile", regex: /mobile|iphone|ipod|android.*mobile|windows phone/i },
  { name: "tablet", regex: /tablet|ipad|android(?!.*mobile)/i },
  { name: "smarttv", regex: /smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv/i },
  { name: "console", regex: /playstation|xbox|nintendo/i },
  { name: "wearable", regex: /watch|applewatch|sm-r/i },
];
