import { Suspense } from "react";
import { SiteShell } from "../../components/site-shell";
import { LoginClient } from "./login-client";

export default function LoginPage() {
  return (
    <SiteShell currentPath="/login">
      <div className="page-grid">
        <section className="panel login-card">
          <p className="eyebrow">Auth sample</p>
          <h1>OAuth login flow, migrated to Next.js.</h1>
          <p className="section-copy">
            The original sample login page is now a typed client component that
            reads query params, asks the backend for config, and handles the
            code exchange flow.
          </p>
          <Suspense fallback={<p className="muted">Preparing login...</p>}>
            <LoginClient />
          </Suspense>
        </section>

        <aside className="panel">
          <h2 className="section-title">What changed</h2>
          <ul className="info-list">
            <li>Frontend auth logic now lives in a reusable React component.</li>
            <li>Backend-specific values like redirect URI come from the API.</li>
            <li>The redirect behavior is preserved from the original sample.</li>
          </ul>
        </aside>
      </div>
    </SiteShell>
  );
}
