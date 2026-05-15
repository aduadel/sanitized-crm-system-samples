import Link from "next/link";

type SiteShellProps = {
  currentPath?: string;
  children: React.ReactNode;
};

const links = [
  { href: "/", label: "Overview" },
  { href: "/login", label: "Login" },
  { href: "/invoice-form", label: "Invoice Form" },
] as const;

export function SiteShell({ currentPath, children }: SiteShellProps) {
  return (
    <div className="shell">
      <header className="topbar">
        <Link href="/" className="brand">
          CRM System Starter
        </Link>
        <nav className="nav-row" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${currentPath === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
