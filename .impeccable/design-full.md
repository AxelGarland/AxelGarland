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

## Overview

**Creative North Star: "The Clay on the Canvas"**

The page is a white canvas, like the one in a design tool. The work sits on it: a sculpted and painted bust, clay icons, colored pencil and paper. The interface stays plain so the objects can be seen.

The site looks like the tools it was designed in, and the objects look like they were made by hand. That is the position: craft and code are one practice, not two portfolios side by side.

Headings are heavy capitals set tight. Everything else is quiet: one hairline, one blue. Nothing on a page explains itself. Project pages keep their own palettes (Better Eater green, Giuson navy, Kindred orange); the site around them does not change.

Rejected on purpose, and not to return: a red accent, halftone or dotted lettering and shapes, a 3D name, and a star as contact decoration.

**Key Characteristics:**
- White ground, ink type, one cobalt accent used for selection, hover, links and focus.
- Heavy uppercase display type; plain Work Sans for everything that is read.
- Square controls with no icons or arrows; hover selects them like a layer.
- Clay-and-paint objects as the only decoration.
- Clay arrow pointer, cobalt over empty space and pink over anything clickable.

## Colors

A near-monochrome ink-on-white palette with a single saturated blue.

### Primary
- **Selection Cobalt** (#2354E6): the one accent. Selection frames and handles, link hover, keyboard focus, text selection, the second line of the footer heading, the hover color of a work row's name.
- **Pressed Cobalt** (#1B43BD): hover state for cobalt text and fills where a darker step is needed.
- **Cobalt Text** (#1D49CC): small cobalt text on white that must hold 4.5:1.
- **Cobalt on Dark** (#7D9BFF): the same role on near-black sections.

### Neutral
- **Studio Ink** (#1A1916): all headings and buttons. Warm near-black, never pure black.
- **Quiet Ink** (#5C5A54) and **Soft Ink** (#6A6862): body copy, context lines, labels.
- **Canvas White** (#FFFFFF): the page ground, including the hero and the work list.
- **Paper** (#F5F4F1) and **Paper Deep** (#ECEAE5): the quiet panels behind case-study sections and the contact form.
- **Hairline** (#E1DFDA): the one divider and border color.

### Accent from the object
- **Pencil Yellow** (#FEB728): sampled from the portrait's pencil and stars; used for the heading glow when the falling stars arrive. Never as a UI fill.

### Named Rules
**The One Blue Rule.** Cobalt is the only accent. It marks what you can select, hover or focus. Red was removed on purpose; do not bring it back.
**The Warm Ink Rule.** Text is #1A1916, not #000. Black appears only inside project work and video.

## Typography

**Display Font:** Work Sans, weight 800, uppercase (fallbacks: Heebo for Hebrew, then system sans)
**Body Font:** Work Sans, weight 400 (same fallbacks)

**Character:** One family at two extremes. A very heavy, tightly tracked capital voice for names and headings; an ordinary readable sans for everything else. The same heavy face sets the name in the header, the hero name, section titles and project names.

### Hierarchy
- **Display name** (800, clamp(3.2rem, 7.3vw, 8rem), 0.86, -0.025em): the hero name and the footer heading.
- **Title** (800, clamp(1.95rem, 3.9vw, 3.31rem), 1.02): page and section titles such as "Selected work".
- **Section** (800, clamp(1.5rem, 2.4vw, 2rem), 1.12): work-row names, "More projects", sub-sections.
- **Sub** (800, clamp(1.25rem, 1.7vw, 1.5rem), 1.2): smaller headings inside case studies.
- **Body** (400, 1.125rem, 1.625): paragraphs, capped near 58 to 65 characters.
- **Label** (500, 0.875rem, 0.08em, uppercase): meta lines, form labels, the nav. Never placed above a heading as an eyebrow.

### Named Rules
**The Capital Voice Rule.** Only headings are heavy capitals. Running text stays ordinary so it can be read.
**The No Dots Rule.** Lettering is solid. Halftone and dotted type were removed because they cost legibility and clash with the clay.

## Layout

A single column container, `min(96vw, 1408px)`, with side gutters of 24px, 40px, 56px and 64px at the four breakpoints. Sections are separated by 80px (112px wide) of vertical padding and one hairline, never by color blocks except the quiet paper panels inside case studies. Base type steps up from 16px to 17px at 1280 and 18px at 1536.

The home page is a sequence: a pinned hero (about 2.4 screens of scroll), the work as a list, About, and the footer. In the hero, the name, the two role boxes and the two buttons share one left and one right edge; the buttons sit under their role boxes at the same widths. Case studies follow an outcome line, facts, problem, research, options, solution, impact.

## Elevation & Depth

Flat. Pages are white with hairlines; depth comes from layering paper panels and from the objects themselves (clay objects carry their own soft shadows). The only UI shadows are neutral, offset drop shadows on pictures inside designed clips and mockups (for example `0 14px 30px -12px rgba(0,0,0,.5)`). No colored halos, no glows, no blur-as-decoration.

### Named Rules
**The Flat Canvas Rule.** A control never lifts. Hover and focus are shown by the blue selection frame, not by shadow.

## Shapes

Rectangles with sharp corners for everything you act on: buttons, form fields, panels, preview windows, role boxes. Circles only for dots, bullets and circular media. A selection frame is a 1px cobalt rectangle with a 9px white square handle (1px cobalt border) centered on each corner. No pills, no rounded cards, no arrows or icons inside buttons.

## Components

### Buttons
- **Shape:** sharp rectangle, no radius, min height 3.9rem, 2.25rem (36px) side padding, label 1.15rem at 600.
- **Solid (primary):** Studio Ink fill, white label.
- **Line (secondary):** white fill, 1.5px Studio Ink inset border, ink label; on hover a faint ink tint.
- **Hover / Focus:** a 1px cobalt frame appears 5px outside the button with four square corner handles that scale in; no color change on the button itself. On the hero the label is `font-size: clamp(0.9rem, 1.25vw, 1.15rem)`.
- **Disabled:** 60% opacity, wait cursor.

### Text links
- **Style:** ink or quiet ink text with a 1px hairline underline. Hover turns the text and the line cobalt. Minimum 44px tall.

### Work list (signature)
- **Rows:** each project is a full-width row on white between hairlines: the name in the Section style, then a context line (client or kind) and a small uppercase meta line.
- **Hover / Focus:** the name turns cobalt and moves 6px right; the other rows fade to 35% opacity; a 16:9 preview panel appears beside the row, vertically centered on it, playing a designed seven-second clip (title, three keywords, key visuals) and hidden when nothing is pointed at. Phones show a small thumbnail per row instead.
- **Under a project:** the same list with the heading "More projects", minus the current project.

### Inputs / Fields
- **Style:** white fill, 1px soft-ink border, no radius, 16px by 12px padding, label above in the Label style.
- **Focus:** border and 2px ring turn cobalt (ring at 25%). Errors are stated in bold ink with a short ink rule, never in red.

### Navigation
- **Style:** the header is the name in the heavy capitals on the left and three small uppercase links (Home, Work, Contact) on the right, on 95% white with a hairline. The current section is marked by a small cobalt dot. On the home hero the bar is hidden until the hero has scrolled away. On a project it shrinks to a back link and the project name once the opening is passed.

### Footer (signature)
- White, closing every page except Contact and the 404 (which get a slim white row of the same links). "LET'S TALK." in the heavy capitals, the second line in Selection Cobalt, a line of text, the solid "Get in touch" button and three hairline links (email, LinkedIn, CV).
- A painted portrait peeks in from the right edge and turns while a clay fingertip comes in from the left and pushes "LET'S"; 3.6 seconds, looping, only while on screen, one still frame with reduced motion.

### Role boxes (signature)
- Two 1.6px cobalt rectangles that grow from a corner with square handles, then type "Product Designer" and "Illustrator" in Arial bold with a caret. Used only in the hero.

### Pointer (signature)
- A clay arrow drawn once from a p5 sketch: cobalt over empty space, pink over anything clickable, tip at (4, 3), 44px with an 88px copy. Mouse only; text fields and running text keep the text cursor.

## Do's and Don'ts

### Do:
- **Do** use Selection Cobalt (#2354E6) as the only accent, and show hover and focus with the thin blue frame and corner handles.
- **Do** set all headings in Work Sans 800 uppercase with tight tracking, and let body copy stay ordinary.
- **Do** keep controls square and label-only.
- **Do** let clay and paint objects, clips and project pictures carry the personality.
- **Do** keep real, plain wording and real numbers; keep every interactive state reachable by keyboard.

### Don't:
- **Don't** use red anywhere on site chrome.
- **Don't** use halftone or dotted lettering, arrows, shapes or sparkles.
- **Don't** bring back the 3D name, or put a star in the contact section.
- **Don't** put explanatory micro-copy inside interfaces; keep rationale on one quiet page.
- **Don't** put a small label above a heading as an eyebrow, and don't use rounded pills for actions.
