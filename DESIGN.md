# Wheely Bits — Design Specification
> Auto-generated from Stitch Project ID: `14383869876512879994`
> Source of truth for all UI implementation. Do NOT deviate from these values.

---

## Project Overview

The Wheely Bits Stitch project contains **60+ screens** across multiple design themes,
all targeting a premium automotive customization platform. Two distinct design systems
are in use across the project:

| Design System | Used On | Character |
|---|---|---|
| **Slate & Sage** *(Primary)* | Home, Login, Community, Fitment (S&S variant), Vendors, Studio (S&S), etc. | Calm luxury — glassmorphic, organic warmth |
| **Midnight Velocity** *(Secondary)* | Studio (original), Fitment Engine (original) | High-octane — neon accents, carbon fiber, HUD aesthetic |

---

## Design System 1: Slate & Sage *(Primary)*

> Applied to: Home, Login, Sign Up, Community, Vendors, Education Hub, Tint/Wrap/Rim
> journeys, Booking Confirmation, My Profile, and all `(Slate & Sage)` screen variants.

### 1.1 Color Palette

#### Core Semantic Colors (Dark Mode)

| Token | Hex | Usage |
|---|---|---|
| `background` | `#121416` | Page background |
| `surface` | `#121416` | Base surface (same as bg) |
| `surface-dim` | `#121416` | Lowest elevation |
| `surface-container-lowest` | `#0c0e10` | Inset/recessed containers |
| `surface-container-low` | `#1a1c1e` | Subtle card backgrounds |
| `surface-container` | `#1e2022` | Standard card background |
| `surface-container-high` | `#282a2c` | Elevated card / dropdown |
| `surface-container-highest` | `#333537` | Highest elevation surface |
| `surface-bright` | `#37393b` | Highlighted surface |
| `surface-variant` | `#333537` | Variant surface (same as highest) |
| `on-surface` | `#e2e2e5` | Primary text on surfaces |
| `on-surface-variant` | `#c2c8c0` | Secondary / muted text |
| `on-background` | `#e2e2e5` | Text on background |
| `inverse-surface` | `#e2e2e5` | Inverse (light mode surface) |
| `inverse-on-surface` | `#2f3133` | Text on inverse surface |
| `outline` | `#8c928b` | Border / divider |
| `outline-variant` | `#424842` | Subtle border |

#### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#abcfb2` | Primary action color (Sage, lighter tint) |
| `primary-container` | `#8fb397` | **Sage Green** — seed/brand color, buttons |
| `on-primary` | `#163722` | Dark text on primary buttons |
| `on-primary-container` | `#254630` | Text on primary containers |
| `inverse-primary` | `#44664e` | Inverse primary (light mode) |
| `primary-fixed` | `#c6eccd` | Fixed primary (light tint) |
| `primary-fixed-dim` | `#abcfb2` | Dim fixed primary |
| `surface-tint` | `#abcfb2` | Elevation tint overlay |

#### Secondary / Accent Colors

| Token | Hex | Usage |
|---|---|---|
| `secondary` | `#f0bd8b` | **Soft Amber** — premium highlights |
| `secondary-container` | `#65411a` | Amber container background |
| `on-secondary` | `#482904` | Text on secondary |
| `on-secondary-container` | `#e1af7e` | Text on secondary container |
| `secondary-fixed` | `#ffdcbd` | Fixed secondary |
| `secondary-fixed-dim` | `#f0bd8b` | Dim secondary |

#### Tertiary / Neutral Colors

| Token | Hex | Usage |
|---|---|---|
| `tertiary` | `#c5c6ca` | Neutral grey accent |
| `tertiary-container` | `#a8aaae` | Neutral container |
| `on-tertiary` | `#2e3134` | Text on tertiary |
| `on-tertiary-container` | `#3c3f42` | Text on tertiary container |

#### Semantic / State Colors

| Token | Hex | Usage |
|---|---|---|
| `error` | `#ffb4ab` | Error state |
| `error-container` | `#93000a` | Error container bg |
| `on-error` | `#690005` | Text on error |
| `on-error-container` | `#ffdad6` | Text on error container |

#### Override Colors (Raw Brand Values)

| Role | Hex | Notes |
|---|---|---|
| **Primary Seed** | `#8fb397` | Desaturated Sage Green — primary CTA |
| **Secondary Override** | `#d4a373` | Warm Amber — premium/highlight accent |
| **Tertiary Override** | `#25282b` | Near-black slate — structural |
| **Neutral Override** | `#1a1c1e` | Deep slate — card backgrounds |

---

### 1.2 Typography

**Font Family**: `Plus Jakarta Sans` (all levels — headline, body, label)
**Google Fonts import required**: `Plus Jakarta Sans`

| Scale Token | Family | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `headline-xl` | Plus Jakarta Sans | `48px` | `500` | `1.2` | `0.02em` |
| `headline-xl-mobile` | Plus Jakarta Sans | `32px` | `500` | `1.2` | `0.02em` |
| `headline-lg` | Plus Jakarta Sans | `32px` | `500` | `1.3` | `0.01em` |
| `headline-md` | Plus Jakarta Sans | `24px` | `500` | `1.4` | `0.01em` |
| `body-lg` | Plus Jakarta Sans | `18px` | `400` | `1.6` | `0em` |
| `body-md` | Plus Jakarta Sans | `16px` | `400` | `1.6` | `0em` |
| `label-md` | Plus Jakarta Sans | `14px` | `500` | `1.4` | `0.05em` |
| `label-sm` | Plus Jakarta Sans | `12px` | `500` | `1.4` | `0.05em` |

---

### 1.3 Border Radius

| Scale | CSS Value | rem Equivalent | Usage |
|---|---|---|---|
| `sm` | `4px` | `0.25rem` | Small chips, tags |
| `DEFAULT` | `8px` | `0.5rem` | **Standard** — buttons, inputs |
| `md` | `12px` | `0.75rem` | Mid-size cards |
| `lg` | `16px` | `1rem` | Cards, panels |
| `xl` | `24px` | `1.5rem` | Large panels, floating nav |
| `full` | `9999px` | — | Pills, status chips |

> **Roundness Setting**: `ROUND_EIGHT` (8px base, scaling up from there)

---

### 1.4 Spacing

**Base Unit**: `8px`  
**Grid**: 12-column desktop / 4-column mobile  
**Container Max Width**: `1280px`

| Token | Value | Usage |
|---|---|---|
| `unit` | `8px` | Base grid unit |
| `stack-xs` | `4px` | Tightest inline spacing |
| `stack-sm` | `8px` | Small stack gap |
| `stack-md` | `16px` | Standard element gap |
| `stack-lg` | `32px` | Section internal spacing |
| `stack-xl` | `64px` | Section-to-section spacing |
| `gutter` | `24px` | Column gutter |
| `margin-mobile` | `16px` | Mobile page margin |
| `margin-desktop` | `48px` | Desktop page margin |
| `container-max` | `1280px` | Max container width |

---

### 1.5 Elevation & Depth System

| Level | Background | Border | Effect |
|---|---|---|---|
| **Base** | `#1a1c1e` | — | Page background |
| **Surface** | `#25282b` | `1px rgba(255,255,255,0.05)` | Cards, containers |
| **Floating** | Semi-transparent (`#1e2022` ~70% opacity) | `1px rgba(255,255,255,0.10)` top edge | Nav bars, dropdowns |
| **Shadows** | — | — | `blur(20–40px)`, `opacity 15–20%`, no hard black |

**Glassmorphism nav**: `backdrop-filter: blur(12px)`

---

### 1.6 Component Rules

#### Buttons
- **Primary**: Background `#8fb397` (Sage), text `#163722` (dark), min height `48px`, radius `8px`
- **Secondary/Ghost**: Transparent bg, `1px solid` outline color, white text
- All transitions: smooth CSS, hover states with soft glow

#### Cards
- Background: `#25282b` (surface-container)
- Border radius: `16px` (lg)
- No shadow by default; on hover → subtle diffused shadow (20–40px blur, 15–20% opacity)
- Hover: slight lift transform

#### Input Fields
- Dark bg with subtle border
- Focus state: `1px` Sage Green (`#8fb397`) glow ring
- Labels: above input, `label-sm` style

#### Glass Navigation
- Floating bar at top/side
- `backdrop-filter: blur(12px)`
- Top edge: `1px rgba(255,255,255,0.10)` border
- Background: semi-transparent surface container

#### Status Chips
- Pill-shaped (`border-radius: 9999px`)
- `label-sm` typography with `0.05em` letter spacing
- Desaturated colors for states

---

## Design System 2: Midnight Velocity *(Secondary)*

> Applied to: Studio (original), Fitment Engine (original), and "Daylight"/"Heritage" variants

### 2.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `background` | `#141218` | Page background |
| `surface` | `#141218` | Base surface |
| `surface-container` | `#211f24` | Card containers |
| `surface-container-high` | `#2b292f` | Elevated containers |
| `surface-container-highest` | `#36343a` | Highest elevation |
| `on-surface` | `#e6e0e9` | Primary text |
| `on-surface-variant` | `#cbc4d2` | Secondary text |
| `outline` | `#948e9c` | Borders |
| `outline-variant` | `#494551` | Subtle borders |

#### Accent / Neon Colors (applied in actual HTML, not named colors)

| Role | Hex | Usage |
|---|---|---|
| **Orange** | `#FF5C00` | Primary CTA, ignition state, performance metrics |
| **Cyan** | `#00E5FF` | AI insights, cooling, secondary nav |
| **Green** | `#00FF88` | Optimal status, "ready" state, performance tags |
| **Red** | `#FF3333` | Warnings, redline, conflict tags |

### 2.2 Typography

| Scale Token | Family | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `display-xl` | `Sora` | `80px` | `800` | `1.1` | `-0.04em` |
| `headline-lg` | `Bebas Neue` | `48px` | `400` | `1.2` | `0.05em` |
| `headline-lg-mobile` | `Bebas Neue` | `36px` | `400` | `1.1` | — |
| `headline-md` | `Bebas Neue` | `32px` | `400` | `1.2` | `0.03em` |
| `body-lg` | `DM Sans` | `18px` | `400` | `1.6` | — |
| `body-md` | `DM Sans` | `16px` | `400` | `1.5` | — |
| `spec-label` | `JetBrains Mono` | `14px` | `500` | `1.4` | `0.02em` |

> **Google Fonts required**: `Sora`, `Bebas Neue`, `DM Sans`, `JetBrains Mono`

### 2.3 Border Radius
**Shape Language**: **Sharp / 0px radius** on all elements.
- Visual interest from **45-degree diagonal chamfers** on corners, not rounding.
- Exception: Pill-shaped chips for "Performance" and "Conflict" tags.

### 2.4 Spacing

| Token | Value |
|---|---|
| `unit` | `4px` |
| `gutter` | `24px` |
| `margin` | `48px` |
| `stagger-delay` | `100ms` |
| `scroll-width` | `6px` |

### 2.5 Component Rules

#### Buttons
- **Primary**: Sharp corners, solid `#FF5C00`, black text (Sora Bold), hover → 15px orange `box-shadow` glow
- **Ghost**: Sharp corners, `1px rgba(255,255,255,0.20)` border, hover → Cyan border + matching glow

#### Cards
- "Carbon Fiber" dark header bar at top
- Glass body: `backdrop-filter: blur(12px)`, `rgba(17,17,17,0.7)` fill
- `1px` low-contrast border, highlights on hover

#### Input Fields
- Background: `#080808`, **bottom border only**, Cyan active state
- Font: `JetBrains Mono` for input text

#### Chips/Tags
- `#00FF88` border → Performance
- `#FF3333` border → Conflict

---

## Screens Inventory

> Project has 60+ screens. Below are the **visible (non-hidden)** key screens organized by category.

### Marketing / Home

| Screen Title | ID | Design System | Dimensions |
|---|---|---|---|
| Wheely Bits \| Home (Slate & Sage) | `181c7de4b1244a378e44b8c4c3ca6f45` | Slate & Sage | 2560×3774 |
| Wheely Bits \| Home (Scrollable with Footer) | `e2ad0f3b652747458adf1762d4b41fc5` | Slate & Sage | 1280×2717 |
| Wheely Bits \| Home (Daylight) | `7d8335c935294143bfc26057be70690e` | — | 1280×— |
| Wheely Bits \| Home (Heritage Stance) | `dfb1fcac4b9643a293dfc67c74624196` | — | 1280×2179 |
| Wheely Bits Automotive Platform | `cb5e4ae5669b4d42b43c33385d7f96bf` | — | — |

### Auth

| Screen Title | Design System |
|---|---|
| Wheely Bits \| Login (Slate & Sage) | Slate & Sage |
| Wheely Bits \| Sign Up (Slate & Sage) | Slate & Sage |
| Wheely Bits \| New User Welcome | Slate & Sage |
| Wheely Bits \| Login (Updated Layout) | Slate & Sage |

### Core Tools

| Screen Title | Design System | Notes |
|---|---|---|
| Wheely Bits \| Studio | Midnight Velocity | Full-screen editor |
| Wheely Bits \| Studio (Slate & Sage) | Slate & Sage | Variant |
| Wheely Bits \| Studio (Heritage Stance) | — | Variant |
| Wheely Bits \| Studio (Daylight) | — | Variant |
| Wheely Bits \| Fitment Engine | Midnight Velocity | Technical calculator |
| Wheely Bits \| Fitment Engine (Slate & Sage) ×2 | Slate & Sage | Variant |
| Wheely Bits \| Fitment Engine (Heritage) | — | Variant |
| Wheely Bits \| Fitment Engine (Daylight) | — | Variant |
| Wheely Bits \| AI Recognition | — | Camera/upload screen |
| Wheely Bits \| 3D Visualization (Slate & Sage) | Slate & Sage | — |

### Rim Journey

| Screen Title | Design System |
|---|---|
| Wheely Bits \| Rim Journey | Slate & Sage |
| Wheely Bits \| Vehicle Selection (Updated) ×2 | Slate & Sage |
| Wheely Bits \| Rim Selection | Slate & Sage |
| Wheely Bits \| Rim Detail (Vossen HF-5) | Slate & Sage |
| Wheely Bits \| Rim Fitment 101 (Slate & Sage) ×2 | Slate & Sage |

### Wrap Journey

| Screen Title | Design System |
|---|---|
| Wheely Bits \| Wrap Journey | Slate & Sage |
| Wheely Bits \| Wrap Color Selection (Slate & Sage) | Slate & Sage |
| Wheely Bits \| Wrap Visualization (Slate & Sage) | Slate & Sage |
| Wheely Bits \| Wrap Vendor Selection (Slate & Sage) | Slate & Sage |

### Tint Journey

| Screen Title | Design System |
|---|---|
| Wheely Bits \| Tint Journey | Slate & Sage |
| Wheely Bits \| Tint Shade Selection (Slate & Sage) ×2 | Slate & Sage |
| Wheely Bits \| Tint Vendor Selection (Slate & Sage) | Slate & Sage |
| Wheely Bits \| Tint Visualization (Slate & Sage) | Slate & Sage |
| Wheely Bits \| Heat Rejection Comparison (Slate & Sage) | Slate & Sage |

### Vendors & Bookings

| Screen Title | Design System |
|---|---|
| Wheely Bits \| Vendors | Slate & Sage |
| Wheely Bits \| Vendors (Heritage) | — |
| Wheely Bits \| Vendor Selection (Slate & Sage) | Slate & Sage |
| Wheely Bits \| Vendor Detail (Slate & Sage) | Slate & Sage |
| Wheely Bits \| Vendor Profile (Aura Custom Studio) | Slate & Sage |
| Wheely Bits \| Booking Confirmed | Slate & Sage |

### Community

| Screen Title | Design System |
|---|---|
| Wheely Bits \| Community | Slate & Sage |
| Wheely Bits \| Community (Slate & Sage) | Slate & Sage |
| Wheely Bits \| Community (Heritage) | — |
| Wheely Bits \| Community (Daylight) | — |
| Wheely Bits \| Community Discussion Thread | Slate & Sage |
| Wheely Bits \| Build Log: Project Nightfall | Slate & Sage |
| Wheely Bits \| Create Build Log | Slate & Sage |

### Education & Profile

| Screen Title | Design System |
|---|---|
| Wheely Bits \| Education Hub (Slate & Sage) ×2 | Slate & Sage |
| Wheely Bits \| Support & Contact (Slate & Sage) | Slate & Sage |
| Wheely Bits \| My Profile (Heritage) | — |
| Wheely Bits \| Utility States | Slate & Sage |

---

## Implementation Notes

### Tailwind v4 CSS Variable Mapping

Map Slate & Sage tokens to Tailwind theme in `index.css`:

```css
@import "tailwindcss";

@theme {
  /* Fonts */
  --font-sans: "Plus Jakarta Sans", sans-serif;

  /* Colors — Slate & Sage */
  --color-background: #121416;
  --color-surface: #121416;
  --color-surface-low: #1a1c1e;
  --color-surface-mid: #1e2022;
  --color-surface-high: #282a2c;
  --color-surface-highest: #333537;
  --color-surface-bright: #37393b;

  --color-on-surface: #e2e2e5;
  --color-on-surface-muted: #c2c8c0;
  --color-outline: #8c928b;
  --color-outline-subtle: #424842;

  --color-primary: #abcfb2;
  --color-primary-brand: #8fb397;
  --color-on-primary: #163722;
  --color-secondary: #f0bd8b;
  --color-secondary-brand: #d4a373;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-default: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-gutter: 24px;
  --spacing-margin-mobile: 16px;
  --spacing-margin-desktop: 48px;
  --spacing-container-max: 1280px;
}
```

### Google Fonts Required

Add to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Bebas+Neue&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@500&family=Sora:wght@700;800&display=swap" rel="stylesheet">
```

### Animation Defaults
- **Entry animations**: fade-in + slide-up
- **Hover transitions**: `transition: all 200ms ease`
- **Card hover lift**: `transform: translateY(-2px)`
- **Stagger delay** (Midnight Velocity): `100ms per index`
- **Glassmorphic blur**: `backdrop-filter: blur(12px)`

---

*Last updated: 2026-07-21 | Source: Stitch REST API v1 | Project: `14383869876512879994`*
