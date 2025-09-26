# ua-parser-lite

A lightweight, pure TypeScript utility to parse browser User-Agent strings and detect **browser, operating system, CPU, device, and engine information**.

---

## Features

- Detect browser name and version  
- Detect operating system name and version  
- Detect CPU architecture  
- Detect device type (mobile, tablet, desktop, smart TV, console, wearable)  
- Detect rendering engine name and version  
- Works in **Node.js** and **browser** environments  
- Pure TypeScript, no external dependencies  

---

## Installation

```bash
pnpm add ua-parser-lite
# or
npm install ua-parser-lite
yarn add ua-parser-lite
```

---

## Usage

### Parse default User-Agent (browser environment)

```ts
import { parseUserAgent } from "ua-parser-lite";

const info = parseUserAgent();
console.log(info);
```

### Parse a custom User-Agent string

```ts
const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) Version/17.0 Mobile/15E148 Safari/604.1";
const info = parseUserAgent(ua);

console.log(info.browser.name);       // Safari
console.log(info.browser.version);    // 17.0
console.log(info.os.name);            // iOS (iPhone)
console.log(info.os.version);         // 17.1
console.log(info.device.type);        // mobile
console.log(info.cpu.architecture);   // undefined
console.log(info.engine.name);        // WebKit
```

---

## API

### `parseUserAgent(userAgent?: string): UserAgentInfo`

| Property | Type | Description |
|----------|------|-------------|
| `userAgent` | `string` | Original User-Agent string |
| `browser` | `{ name: string; version: string }` | Browser name and version |
| `os` | `{ name: string; version: string }` | Operating system name and version |
| `cpu` | `{ architecture?: string }` | CPU architecture (if detected) |
| `device` | `{ type?: string }` | Device type: `mobile`, `tablet`, `desktop`, `smarttv`, `console`, `wearable`, `unknown` |
| `engine` | `{ name: string; version: string }` | Rendering engine name and version |

---

## Example Output

```ts
{
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X)...",
  browser: { name: "Safari", version: "17.0" },
  os: { name: "iOS (iPhone)", version: "17.1" },
  cpu: { architecture: undefined },
  device: { type: "mobile" },
  engine: { name: "WebKit", version: "605.1.15" }
}
```

---

## Testing

We use **Jest** for unit testing.

```bash
pnpm test           # Run all tests
pnpm test:coverage  # Run tests with coverage and open HTML report
```

---

## Contributing

1. Fork the repository  
2. Install dependencies: `pnpm install`  
3. Run tests: `pnpm test`  
4. Generate coverage report: `pnpm test:coverage`  

---

## License

MIT