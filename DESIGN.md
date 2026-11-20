---
name: Axel Garland Portfolio
description: Hand-made clay and paint objects on a clean white design-tool canvas, set in heavy capitals with one cobalt accent.
colors:
  ink: "#1A1916"
  ink-muted: "#5C5A54"
  ink-subtle: "#6A6862"
  canvas-white: "#FFFFFF"
  paper: "#F5F4F1"
  paper-deep: "#ECEAE5"
  hairline: "#E1DFDA"
  cobalt: "#2354E6"
  cobalt-pressed: "#1B43BD"
  cobalt-text: "#1D49CC"
  cobalt-on-dark: "#7D9BFF"
  pencil-yellow: "#FEB728"
typography:
  display-name:
    fontFamily: "Work Sans, Heebo, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 7.3vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Work Sans, Heebo, system-ui, sans-serif"
    fontSize: "clamp(1.95rem, 3.9vw, 3.31rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  section:
    fontFamily: "Work Sans, Heebo, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.12
  sub:
    fontFamily: "Work Sans, Heebo, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.7vw, 1.5rem)"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "Work Sans, Heebo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Work Sans, Heebo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  gutter-sm: "24px"
  gutter-md: "40px"
  gutter-lg: "56px"
  gutter-xl: "64px"
  section: "80px"
  section-wide: "112px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas-white}"
    rounded: "{rounded.none}"
    padding: "0 36px"
    height: "3.9rem"
  button-line:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 36px"
    height: "3.9rem"
  field:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "40px"
---

# Design System: Axel Garland Portfolio

<!-- impeccable:design-map -->
Name: Axel Garland Portfolio
Colors: primary: cobalt #2354E6; tertiary: pencil-yellow #FEB728; neutral: ink #1A1916; primary: cobalt-pressed #1B43BD; primary: cobalt-text #1D49CC; primary: cobalt-on-dark #7D9BFF (+6 more in the sidecar)
Fonts: Work Sans (display-name, title, section, sub, body, label)
Spacing: gutter-sm 24px, gutter-md 40px, gutter-lg 56px, gutter-xl 64px, section 80px, section-wide 112px
Radius: none 0px, full 9999px
North Star: "The Clay on the Canvas"
Rules:
- The One Blue Rule. Cobalt is the only accent.
- The Warm Ink Rule. Text is #1A1916, not #000.
- The Capital Voice Rule. Only headings are heavy capitals.
- The No Dots Rule. Lettering is solid.
- The Flat Canvas Rule. A control never lifts.
Don't:
- Don't use red anywhere on site chrome.
- Don't use halftone or dotted lettering, arrows, shapes or sparkles.
- Don't bring back the 3D name, or put a star in the contact section.
- Don't put explanatory micro-copy inside interfaces; keep rationale on one quiet page.
- Don't put a small label above a heading as an eyebrow, and don't use rounded pills for actions.
Do:
- Do use Selection Cobalt (#2354E6) as the only accent, and show hover and focus with the thin blue frame and corner handles.
- Do set all headings in Work Sans 800 uppercase with tight tracking, and let body copy stay ordinary.
- Do keep controls square and label-only.
- Do let clay and paint objects, clips and project pictures carry the personality.
- Do keep real, plain wording and real numbers; keep every interactive state reachable by keyboard.
Full: .impeccable/design-full.md (read a section when you need its detail)
