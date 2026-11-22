# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: design recruiters and hiring leads at tech companies, reading the portfolio quickly after Axel applies for a first product-design (UX/UI) role. They arrive from applications and CVs, skim in minutes, and decide whether to open a case study or reach out.
Secondary: collaborators and freelance clients looking at the same work.

## Product Purpose
axelgarland.com is the portfolio of Axel Garland, a product designer and illustrator who recently finished a B.Des in Visual Communication Design at Shenkar College and works at ALUT (recruitment department). It exists to get him interviews for product-design roles by showing real work, how he thinks, and what he can build. Success is a recruiter understanding within the first screen who he is, opening a case study, and getting in touch.

## Positioning
A person who makes things by hand (clay, colored pencil, painting) and also builds with code and AI tools, so the craft and the product work are one practice. The hero, the cursor, the clay objects and the generative work are the proof; a typical UX portfolio template could not truthfully claim it.

## Operating Context
Live site on Vercel, source on GitHub (AxelGarland/AxelGarland). Visitors are mostly on desktop at work, some on phones from a link. Case studies are the product's depth: outcome line, facts bar, problem, research, options and trade-offs, solution, AI use, impact, learnings. Project order: Smart Giuson, Better Eater, Kindred, AfterLife, Alutit, Mundos Mejores, Jabberwocky. Some content is in Hebrew (project names, ALUT materials). Work with Remotion, p5.js and Framer Motion is part of what the site shows, not only how it is built.

## Capabilities and Constraints
- Next.js 15 (App Router), Tailwind, Framer Motion, p5.js sketches embedded as same-origin iframes, deployed on Vercel.
- Pages: home (hero, work list with hover previews, About, contact block), Contact (form), one page per project, 404.
- Hover previews are designed seven-second clips (title, three keywords, key visuals) per project; phones show thumbnails instead.
- Weight is a known issue: the hero carries three p5 pages of about 1 to 2.4 MB each; combining the p5 scripts and converting images to WebP is planned before the next push.
- Nothing is pushed until Axel says "push". The ALUT explainers page and its assets are on hold and must stay out of any push.
- Professional title used across materials: "Product & Visual Designer".

## Brand Commitments
- Do not mention his psychology studies or his years working with autistic people in portfolio copy. Alut as employer and client is fine; the biography is not.
- No explanatory micro-copy inside interfaces. A control's label carries its meaning; any rationale belongs on one quiet page reached by a single link.
- Real numbers only, never invented metrics.

## Evidence on Hand
- Case studies in `app/work/*`: Smart Giuson (internal ALUT tool; used in regular recruitment work, with at least four coordinators handling specialized healthcare calls instead of one), Better Eater (Shenkar course project), Kindred (generative illustration system, 27 hand-drawn tiles, live web app), AfterLife (concept project), Alutit (ALUT recruitment character; the Alutit page became the second-biggest source of steady applicants, with more than 60 hires; reels grew from about 73 views to regularly 1,500 and up to 3,500), Mundos Mejores (graduation project, five retablos), Jabberwocky (illustrated book).
- Pictures in `public/pictures/`, designed preview clips in `public/home/previews/`, CV at `/Axel Garland CV.pdf`, clay portrait and tool icons as generated assets in `public/home/`.
- No testimonials, press or third-party quotes exist yet; do not fabricate any.

## Product Principles
1. The work leads; the interface recedes. Nothing on the page should talk about itself.
2. Craft and code are one practice: hand-made objects and working software appear side by side, never in separate worlds.
3. A recruiter should understand who he is and where to click within one screen, on desktop or phone.
4. Be truthful: real outcomes, real numbers, plain wording, no inflated claims.
5. Every page connects: a visitor can always get from any project to the others and to contact.

## Accessibility & Inclusion
Keyboard operation and visible focus everywhere; reduced-motion respected (animations stop or show a still); contrast at WCAG AA or better; touch screens get thumbnails instead of hover previews; Hebrew text must render in a proper Hebrew face; meaningful alt text on project imagery.
