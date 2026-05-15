import Link from "next/link";
import { SiteShell } from "../components/site-shell";

const cards = [
  {
    title: "Next.js Frontend",
    body: "App Router, TypeScript, typed API calls, and a structure you can grow into a real product.",
  },
  {
    title: "Express Backend",
    body: "Dedicated TypeScript API with routes, middleware, controllers, utilities, and a sample store you can replace with PostgreSQL.",
  },
  {
    title: "Clean Separation",
    body: "Frontend and backend now live independently, with the browser talking to the API instead of mixed sample files.",
  },
];

export default function HomePage() {
  return (
    <SiteShell currentPath="/">
      <section className="hero">
        <p className="eyebrow">Sanitized sample turned starter architecture</p>
        <h1>Modern CRM starter with a split frontend and backend.</h1>
        <p className="hero-copy">
          This repo now has a dedicated Next.js frontend and a dedicated
          TypeScript + Express backend so you can evolve the sample into a real
          CRM without fighting the project structure.
        </p>
        <div className="cta-row">
          <Link href="/login" className="pill pill-primary">
            Open login flow
          </Link>
          <Link href="/invoice-form" className="pill pill-secondary">
            Try the invoice form
          </Link>
        </div>
      </section>

      <section className="card-grid">
        {cards.map((card) => (
          <article key={card.title} className="card">
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
