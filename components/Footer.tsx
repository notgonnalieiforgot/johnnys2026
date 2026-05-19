import Image from "next/image";
import { Instagram, Facebook, Mail, Lock } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-crimson-700/20 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-10 lg:grid-cols-4">
        <div>
          <Image
            src="/johnnys-logo.png"
            alt="Johnny's Smoke Shop & Kava Bar"
            width={999}
            height={461}
            className="h-12 w-auto drop-shadow-[0_4px_18px_rgba(220,38,38,0.35)]"
          />
          <p className="mt-4 text-sm text-bone/55 max-w-xs leading-relaxed">
            Tampa Bay&rsquo;s premier smoke shop &amp; kava bar since 2014. Eight locations,
            one standard.
          </p>
        </div>
        <FooterCol
          title="Shop"
          links={[
            { label: "Kava", href: "#products" },
            { label: "Kratom", href: "#products" },
            { label: "Delta-8", href: "#products" },
            { label: "Vapes", href: "#products" },
            { label: "Glass", href: "#products" },
            { label: "Apparel", href: "#products" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { label: "Our Story", href: "#story" },
            { label: "Locations", href: "#locations" },
            { label: "Rewards", href: "#rewards" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
          ]}
        />
        <div>
          <h4 className="text-sm uppercase tracking-[0.22em] text-bone/55 mb-4">
            Follow
          </h4>
          <div className="flex gap-3">
            <SocialLink href="#" label="Instagram">
              <Instagram className="w-4 h-4" />
            </SocialLink>
            <SocialLink href="#" label="Facebook">
              <Facebook className="w-4 h-4" />
            </SocialLink>
            <SocialLink href="mailto:hello@johnnyssmokeshop.com" label="Email">
              <Mail className="w-4 h-4" />
            </SocialLink>
          </div>
          <p className="mt-6 text-xs text-bone/40 leading-relaxed">
            Must be 21+ to enter. All products comply with the 2018 Farm Bill.
            Not for use during pregnancy or by those operating heavy machinery.
          </p>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-bone/40">
          <span>© {year} Johnny&rsquo;s Smoke Shop &amp; Kava Bar LLC. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-crimson-400">Privacy</a>
            <a href="#" className="hover:text-crimson-400">Terms</a>
            <a
              href="/login"
              aria-label="Staff sign in"
              title="Staff"
              className="grid place-items-center w-6 h-6 rounded-full text-bone/25 hover:text-crimson-400 transition-colors"
            >
              <Lock className="w-3 h-3" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm uppercase tracking-[0.22em] text-bone/55 mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-bone/80 hover:text-crimson-400 transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid place-items-center w-9 h-9 rounded-full border border-white/10 text-bone/70 hover:text-crimson-400 hover:border-crimson-400/40 transition-colors"
    >
      {children}
    </a>
  );
}
