/** Single source of truth for images. To swap one: replace the file at the path, or change the path here. */
const p = "/images/placeholders";
export const assets = {
  logo:            { src: `${p}/logo-placeholder.svg`,       alt: "ecoPortal",                       ratio: "4/1"  },
  homeHero:        { src: `${p}/hero-placeholder.svg`,       alt: "Team reviewing safety dashboard", ratio: "4/3"  },
  aboutBanner:     { src: `${p}/about-placeholder.svg`,      alt: "Our workplace",                   ratio: "21/9" },
  teamImage:       { src: `${p}/team-placeholder.svg`,       alt: "The ecoPortal team",              ratio: "3/2"  },
  platformPreview: { src: `${p}/platform-placeholder.svg`,   alt: "ecoPortal dashboard preview",     ratio: "16/10"},
  mobileAppPreview:{ src: `${p}/mobile-app-placeholder.svg`, alt: "ecoPortal mobile app",            ratio: "9/16" },
  industryImage:   { src: `${p}/industry-placeholder.svg`,   alt: "Industry worksite",               ratio: "3/2"  },
  contactBanner:   { src: `${p}/contact-placeholder.svg`,    alt: "Contact ecoPortal",               ratio: "21/9" },
  ctaVisual:       { src: `${p}/cta-placeholder.svg`,        alt: "",                                ratio: "4/3"  },
} as const;
export type AssetKey = keyof typeof assets;
