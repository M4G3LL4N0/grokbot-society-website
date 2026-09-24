import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Society", href: "/society" },
    { name: "Architecture", href: "/architecture" },
    { name: "Cost Model", href: "/cost" },
    { name: "Roles", href: "/roles" },
    { name: "Developers", href: "/developers" },
  ],
  developers: [
    { name: "Quickstart", href: "#developers" },
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "https://github.com/M4G3LL4N0/grokbot-society/tree/main/src" },
    { name: "Examples", href: "/examples" },
    { name: "Contributing", href: "/contributing" },
  ],
  community: [
    { name: "GitHub", href: "https://github.com/M4G3LL4N0/grokbot-society", external: true },
    { name: "Roadmap", href: "/roadmap", external: false },
    { name: "FAQ", href: "/faq", external: false },
  ],
  legal: [
    { name: "License (Apache 2.0)", href: "/license" },
    { name: "Security", href: "/security" },
    { name: "Code of Conduct", href: "/code-of-conduct" },
    { name: "Privacy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-display font-semibold text-heading-sm text-foreground mb-4"
              aria-label="GrokBot Society Home"
            >
              <svg
                className="h-7 w-7 text-primary"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="3" fill="currentColor" />
                <path
                  d="M16 2v4M16 26v4M2 16h4M26 16h4M6.34 6.34l2.83 2.83M22.83 22.83l2.83 2.83M6.34 25.66l2.83-2.83M22.83 9.17l2.83-2.83"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>GrokBot Society</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              A provider-neutral runtime for persistent synthetic people. Population is cheap; intelligence is invoked only when interaction requires it.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/M4G3LL4N0/grokbot-society"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Developers</h3>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              GrokBot Society is an independent open-source project. Not affiliated with xAI, Grok, or any other company.
            </p>
            <p className="text-sm text-muted-foreground">
              Licensed under Apache 2.0 &mdash; {new Date().getFullYear()} GrokBot Society Contributors
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}