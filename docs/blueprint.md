# **App Name**: GreyShacks Landing Hub

## Core Features:

- Responsive Navigation: Dynamic header navigation with desktop (logo, links, CTA) and mobile (logo, hamburger menu with overlay) states, including scroll-triggered glassmorphism effects.
- Hero Section Display: Captivating hero section featuring a multi-line headline, supportive subtext, and a pair of call-to-action buttons, designed for impactful first impressions.
- Particle Background Canvas: Static starfield particle effect rendered within an HTML5 canvas, confined exclusively to the hero section, dynamically resizing with the viewport.
- Eyebrow Tag with Pulse Animation: Prominent eyebrow tag displaying core value proposition with a subtle, infinite pulsating animation to draw attention.
- Enterprise Trust Bar: Section showcasing brand credibility through a strip of 'trusted by' styled text pills, demonstrating key partnerships.
- Key Metrics Bar: Interactive display of critical performance metrics immediately below the hero section, featuring animated statistics upon viewport entry.

## Style Guidelines:

- A dark color scheme evokes a professional and high-tech feel suitable for agentic systems. The primary color is a strong, modern blue (#3399FF) representing innovation and clarity, chosen to stand out clearly on dark backgrounds. The background color is a heavily desaturated dark blue (#0A0B0D), providing a sleek, deep base. The accent color is a vibrant turquoise (#19D1D1), which, as an analogous hue to the primary, offers visual pop and highlights interactive elements with a fresh, tech-forward touch.
- Headlines utilize 'Playfair Display' (serif), chosen for its elegant and contemporary feel, offering sophistication. Body text, navigation links, and functional elements employ 'Inter' (sans-serif), providing excellent readability and a modern, objective aesthetic. Note: currently only Google Fonts are supported.
- Minimalistic iconography featuring a stylized 'G' for the logo, a sleek right arrow for CTA buttons, and a dynamic hamburger icon that animates to an 'X' on interaction.
- A fluid and responsive layout is key, with elements adapting seamlessly across desktop (1200px+), tablet landscape (1024px–1199px), tablet portrait (600px–1023px), and mobile (<600px). The navbar transitions from a floating transparent state to a sticky glassmorphism style on scroll. Content is center-aligned with constrained maximum widths for optimal readability. Metric cards dynamically adjust from a grid on desktop to stacked on mobile.
- Framer Motion is used extensively to provide a polished user experience. Animations include navbar state transitions (initial, scrolled, mobile menu open), hero content staggered reveals (eyebrow, headline, subtext, CTAs), subtle CTA button hovers, a pulsating effect for the eyebrow dot, and a staggered fade-in for metrics when they enter the viewport.