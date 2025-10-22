import React, { JSX } from "react";
import Link from "next/link";

type Feature = {
    id: string;
    title: string;
    description: string;
};

const features: Feature[] = [
    { id: "fast", title: "Fast", description: "Optimized for performance and quick load times." },
    { id: "scalable", title: "Scalable", description: "Build with composition and scale components easily." },
    { id: "accessible", title: "Accessible", description: "Semantic markup and keyboard-friendly interactions." },
];

const styles: { [k: string]: React.CSSProperties } = {
    root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        color: "#0f172a",
        background: "#f8fafc",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 1.25rem",
        borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
        background: "#ffffff",
    },
    brand: { margin: 0, fontSize: "1.125rem", fontWeight: 600 },
    nav: { display: "flex", alignItems: "center" },
    navLink: { marginLeft: "1rem", color: "#0f172a", textDecoration: "none", fontSize: "0.95rem" },
    hero: {
        padding: "3.25rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
    },
    heroInner: { maxWidth: 900, textAlign: "center" },
    lead: { margin: "0.75rem 0 1.25rem", color: "#475569" },
    ctaRow: { display: "inline-flex", gap: "0.75rem", flexWrap: "wrap" },
    btn: {
        display: "inline-block",
        padding: "0.6rem 0.9rem",
        borderRadius: 8,
        textDecoration: "none",
        color: "#0f172a",
        background: "transparent",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        fontWeight: 600,
    },
    btnPrimary: { background: "#0ea5e9", color: "white", border: "none" },
    features: { padding: "2rem 1.25rem", maxWidth: 1100, margin: "0 auto" },
    sectionTitle: { margin: "0 0 1rem", fontSize: "1.125rem", color: "#0f172a" },
    featureList: {
        listStyle: "none",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
        padding: 0,
        margin: 0,
    },
    feature: {
        background: "#fff",
        padding: "1rem",
        borderRadius: 10,
        border: "1px solid rgba(15, 23, 42, 0.04)",
    },
    featureTitle: { margin: "0 0 0.5rem", fontSize: "1rem" },
    featureDesc: { margin: 0, color: "#475569", fontSize: "0.95rem" },
    footer: { marginTop: "auto", padding: "1rem 1.25rem", textAlign: "center", fontSize: "0.9rem", color: "#64748b" },
};

export default function Home(): JSX.Element {
    return (
        <main style={styles.root}>
            <header style={styles.header}>
                <h1 style={styles.brand}>Ric Website</h1>
                <nav style={styles.nav} aria-label="Main navigation">
                    <Link href="/home" style={styles.navLink}>
                        Home
                    </Link>
                    <Link href="/about" style={styles.navLink}>
                        About
                    </Link>
                    <Link href="/contact" style={styles.navLink}>
                        Contact
                    </Link>
                </nav>
            </header>

            <section style={styles.hero} aria-labelledby="hero-title">
                <div style={styles.heroInner}>
                    <h2 id="hero-title">Build beautiful experiences with Next.js</h2>
                    <p style={styles.lead}>
                        A minimal example home component built with TypeScript + React for the app directory.
                    </p>
                    <div style={styles.ctaRow}>
                        <Link href="/get-started" style={{ ...styles.btn, ...styles.btnPrimary }}>
                            Get started
                        </Link>
                        <Link href="/docs" style={styles.btn}>
                            Docs
                        </Link>
                    </div>
                </div>
            </section>

            <section style={styles.features} aria-labelledby="features-title">
                <h3 id="features-title" style={styles.sectionTitle}>
                    Core features
                </h3>
                <ul style={styles.featureList}>
                    {features.map((f) => (
                        <li key={f.id} style={styles.feature}>
                            <h4 style={styles.featureTitle}>{f.title}</h4>
                            <p style={styles.featureDesc}>{f.description}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <footer style={styles.footer}>
                <p>© {new Date().getFullYear()} Ric Website — Built with Next.js</p>
            </footer>
        </main>
    );
}
