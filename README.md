# Artur Sucila — Mobile-First Systems & Executive Portfolio

Live site: **[artur-su.github.io/Artur_Sucila-personal_website](https://artur-su.github.io/Artur_Sucila-personal_website/)**

Mobile-first executive HUD and systems architecture portfolio for **Artur Sucila** — Systems Architect, Strategist, and Multi-Venture Operator based in Norway.

## Cutting-Edge Web Platform Stack (Chrome 155+ & Mobile WebGL)

- **Interactive 3D Geodesic Earth Globe & Live IP Telemetry (`assets/js/globe.js`)**:
  - Real Natural Earth continent coastlines + 10,000-node Fibonacci land dot-matrix + highlighted emerald **Norway** border and Oslo HQ beacon (`59.91°N, 10.75°E`).
  - Automatically detects the visitor's location via IP geolocation, computes the exact **Haversine great-circle distance (`km`)** to Norway, measures live **HTTP round-trip latency (`ms`)**, and renders a 3D geodesic arc with traveling telemetry packets.
  - Smooth mobile finger-drag & desktop mouse-spin physics with momentum inertia and 3D-to-2D projected floating HUD pin labels.
- **Calibrated 3D WebGL Starfield (`assets/js/network.js`)**:
  - Calm, non-distracting ambient 3D star/node field with touch, scroll, and gyroscope parallax.
- **Chrome 155+ Modern CSS (`assets/css/style.css`)**:
  - **CSS Houdini `@property` (`--laser-angle`)**: Hardware-accelerated rotating conic-gradient laser borders on cards and badges.
  - **CSS Scroll-Driven Animations (`animation-timeline: scroll(root)` & `animation-timeline: view()`)**: Native scroll laser progress bar and 3D perspective card entry transforms without main-thread scroll jank.
  - **Wide-Gamut `oklch()` & `color-mix(in oklch, ...)`**: High-contrast OLED color system.
  - **Native CSS Nesting, `@starting-style`, `interpolate-size: allow-keywords`, and `<dialog>` Popover Modal**.
- **Custom Animated Vector Schematics (`assets/img/`)**:
  - `venture-nutravit.svg` — Animated WooCommerce + n8n + AI Agent pipeline schematic.
  - `venture-pcin.svg` — Animated hardware diagnostic waveform & Custom ERP schematic.
  - `venture-vareautomater.svg` — Animated smart vending fleet telemetry schematic.
- **Mobile Thumb-Zone OS Dock**:
  - App-like floating glass dock pinned to the mobile thumb zone (`Globe`, `Ventures`, `Core OS`, `Stack`, `Cmd`).
