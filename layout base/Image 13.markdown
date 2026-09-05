---
name: Architectural Broker System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#5a4138'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#8e7166'
  outline-variant: '#e2bfb2'
  surface-tint: '#a73a00'
  primary: '#a33900'
  on-primary: '#ffffff'
  primary-container: '#cc4900'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb599'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006194'
  on-tertiary: '#ffffff'
  tertiary-container: '#007bb9'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb599'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#7f2b00'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  gutter: 1.25rem
  card-padding: 1.75rem
  container-max: 1120px
---

## Brand & Style

This design system serves high-performing real estate professionals and architectural consultants handling official commercialization agreements, property registration, and broker dashboards. It blends the technical precision of architecture with the velocity and trust of modern real estate brokerage.

The visual style is **Corporate / Modern** injected with warm architectural energy:
- **Precision & Structure:** Clean surfaces, structured data grouping, deliberate alignment, and modular step-by-step progress flows.
- **Trust & Clutter-Free Clarity:** High-density forms require generous breathing room, intuitive focus indicators, and crisp distinction between primary actions, secondary utilities, and informational guidelines.
- **Warm Authority:** Deep slate navy anchors legal certainty and readability, balanced by vibrant architectural orange that steers momentum and guides brokers through complex authorizations without cognitive fatigue.

## Colors

The palette is engineered for prolonged data entry sessions and high-stakes document completion.

- **Primary (`#ea580c` - `#f97316`):** The signature architectural ember. Applied exclusively to key navigational drivers, active stepper states, primary call-to-actions, and focal interactions.
- **Secondary (`#0f172a` - `#1e293b`):** Midnight slate. Delivers maximum typographic contrast, institutional authority, and crisp dark backgrounds for summary cards and terminal form actions ("Gerar Ficha").
- **Tertiary (`#0284c7`):** Precision sky accent for auxiliary technical alerts, verified stamps, and external legal references.
- **Neutral Foundation:**
  - Background: `#f8fafc` (Slate 50) for effortless eye comfort.
  - Surface: `#ffffff` (Pure White) with micro-borders (`#e2e8f0`).
  - Text: Primary `#0f172a`, Muted `#475569`, Placeholders `#94a3b8`.
  - Functional States: Success `#16a34a`, Warning `#d97706`, Error `#dc2626`.

## Typography

The type system pairs **Plus Jakarta Sans** for headlines, labels, and numeric parameters with **Inter** for form controls, instructions, and dense legal text.

- **Headlines & Titles:** Plus Jakarta Sans provides clean geometric clarity with modern warmth, elevating section titles (`1. Proprietário`, `2. Imóvel`, `3. Condições`) and dashboard headers.
- **Data & Controls:** Inter ensures maximum legibility in complex forms with strict horizontal baseline discipline across numbers, currencies (R$), dates, and CPF/CNPJ masks.
- **Section Headers:** Uppercase tracking is reserved exclusively for micro-labels (`label-sm`), such as table column headers and verification tags.

## Layout & Spacing

A 12-column adaptive layout built on an 8px base spacing grid.

- **Desktop (≥ 1024px):** Centered layout container capped at `1120px` to maintain optimal scanning ergonomics for complex multi-input forms. 12-column grid with `1.25rem` gutters. Inputs are logically grouped: Full width (12 cols) for Logradouro; 3-col or 4-col sets for RG/CPF, CEP/Bairro/Cidade, and dimension metrics.
- **Tablet (768px - 1023px):** 8-column layout. 4-column desktop inputs collapse into 2-column sets. Side margins fixed at `1.5rem`.
- **Mobile (< 768px):** 4-column single-stack flow. Stepper transforms into an active step pill indicator with numeric progress (`Passo 1 de 3`). Form fields stretch full width with `1rem` vertical intervals. Action bars dock sticky at the viewport bottom.

## Elevation & Depth

Visual hierarchy uses a hybrid of **tonal layering** and **soft ambient shadows**, keeping the interface lightweight, professional, and crisp.

- **Base Layer (Canvas):** `#f8fafc` serves as the structural floor.
- **Layer 1 (Card & Module Surfaces):** `#ffffff` layered with `border: 1px solid #e2e8f0` and an ultra-subtle shadow (`0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`).
- **Layer 2 (Interactive Floating / Active Steps / Focus):** Elements under focus or dropdown open states elevate with `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` with a vibrant focus ring (`rgba(234, 88, 12, 0.25)`).
- **Layer 3 (Modals & Confirmation Drawers):** `0 20px 25px -5px rgba(15, 23, 42, 0.12)` with a tinted backdrop overlay (`rgba(15, 23, 42, 0.4)`).

## Shapes

The design system adopts a **Soft (Level 1)** geometric standard. This conveys architectural drafting precision while avoiding cold or harsh industrial angles.

- Inputs, select dropdowns, and buttons feature `0.375rem` (6px) corner radius.
- Cards, step containers, and dashboard table wrappers feature `0.5rem` (8px) corner radius.
- Badges and status pills feature `0.25rem` (4px) or full circular rounding for numeric step markers.

## Components

### Buttons
- **Primary Action ("Próximo", "Salvar"):** Solid `#ea580c` background, `#ffffff` text, font weight 600, height 44px, padding 0 24px. Hover transforms to `#c2410c` with subtle `scale(0.99)` transition.
- **Terminal Action ("Gerar Ficha"):** Deep slate `#0f172a` with white text and orange micro-accent border on focus to differentiate final authorization issuance.
- **Secondary / Ghost ("Anterior", "Cancelar", "Sair"):** Transparent background, `#475569` text, `#e2e8f0` border on secondary; text-only underline hover for dismiss actions.

### Stepper (Wizard)
- Horizontal continuous track with three milestones: `1. Proprietário`, `2. Imóvel`, `3. Condições`.
- **Active Step:** Highlighted with orange baseline accent (`2px solid #ea580c`), bold font weight (`#ea580c`), and distinct step numbering.
- **Completed Step:** Slate text (`#0f172a`) with a checkmark badge and interactive clickability to return without loss of state.
- **Pending Step:** Muted neutral (`#94a3b8`).

### Input Fields & Selects
- Height 42px (desktop) / 46px (mobile touch targets).
- Background `#ffffff`, border `1px solid #cbd5e1`, text `#0f172a`, placeholder `#94a3b8`.
- Focus state: Border color changes to `#ea580c` with a 3px outer glow ring of `rgba(234, 88, 12, 0.15)`.
- Currency (R$) and dimensional prefix/suffixes (m²) are embedded inside left/right sub-boxes with `#f1f5f9` backgrounds.

### Checkboxes & Radio Buttons
- Grouped inside custom clickable chip tiles or clean row lists with `0.75rem` gap.
- Custom radio: 18px circle, active border `#ea580c` with centered `#ea580c` pip.
- Custom checkbox: 18px square, soft 3px radius, active `#ea580c` background with white check icon.

### Form Cards & Data Panels
- Main wrapper card uses white background with soft border `#e2e8f0`, separated into logical fieldsets with `1.5rem` row spacing.
- Sub-panels (e.g., "Documentação e Financiamento" or "Condições de Locação/Venda") feature a tinted inset background (`#f8fafc`) with dashed or refined borders to denote conditional groupings.

### Data Tables (Broker Dashboard)
- Header: Dark graphite/navy `#0f172a` background with white uppercase label typography (`label-sm`).
- Rows: Alternating hover state `#f8fafc`, row height 52px, divider `1px solid #f1f5f9`.
- Status Tags: Soft pill badges with semantic colors (e.g., Em Andamento: Orange tint `#ffedd5` with `#c2410c` text; Concluído: Green tint `#dcfce7` with `#15803d` text).