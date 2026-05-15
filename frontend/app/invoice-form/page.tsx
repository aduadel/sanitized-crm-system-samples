import { SiteShell } from "../../components/site-shell";
import { InvoiceFormClient } from "./invoice-form-client";

export default function InvoiceFormPage() {
  return (
    <SiteShell currentPath="/invoice-form">
      <div className="page-grid">
        <section className="panel">
          <p className="eyebrow">Frontend sample migration</p>
          <h1>Invoice form converted from vanilla JavaScript.</h1>
          <p className="section-copy">
            This page keeps the original dynamic student field behavior, but now
            it uses typed React state and is ready to connect to your real API.
          </p>
          <InvoiceFormClient />
        </section>

        <aside className="panel">
          <h2 className="section-title">Ready for next steps</h2>
          <ul className="info-list">
            <li>Hook this form to your backend invoice endpoints.</li>
            <li>Add server validation and persistence.</li>
            <li>Reuse the component patterns for other CRM entities.</li>
          </ul>
        </aside>
      </div>
    </SiteShell>
  );
}
