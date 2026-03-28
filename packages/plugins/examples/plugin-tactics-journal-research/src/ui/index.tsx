import type { CSSProperties } from "react";
import type { PluginPageProps, PluginSidebarProps, PluginWidgetProps } from "@paperclipai/plugin-sdk/ui";

const RESEARCH_URL = "https://research-production-a8d0.up.railway.app";
const PAGE_ROUTE = "research";

const stackStyle: CSSProperties = {
  display: "grid",
  gap: "16px",
};

const cardStyle: CSSProperties = {
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "16px",
  background: "color-mix(in srgb, var(--card, transparent) 82%, transparent)",
};

const buttonRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const buttonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: "999px",
  border: "1px solid var(--border)",
  textDecoration: "none",
  color: "inherit",
  fontSize: "13px",
  fontWeight: 600,
};

const primaryButtonStyle: CSSProperties = {
  ...buttonStyle,
  background: "var(--foreground)",
  color: "var(--background)",
  borderColor: "var(--foreground)",
};

const iframeStyle: CSSProperties = {
  width: "100%",
  minHeight: "78vh",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  background: "white",
};

function pluginPagePath(companyPrefix: string | null | undefined): string {
  return companyPrefix ? `/${companyPrefix}/${PAGE_ROUTE}` : `/${PAGE_ROUTE}`;
}

function isActivePath(href: string): boolean {
  return typeof window !== "undefined" && window.location.pathname === href;
}

export function TacticsJournalResearchSidebarLink({ context }: PluginSidebarProps) {
  const href = pluginPagePath(context.companyPrefix);
  const active = isActivePath(href);

  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium transition-colors",
        active
          ? "bg-accent text-foreground"
          : "text-foreground/80 hover:bg-accent/50 hover:text-foreground",
      ].join(" ")}
    >
      <span aria-hidden="true">⚽</span>
      <span className="flex-1 truncate">Research</span>
    </a>
  );
}

export function TacticsJournalResearchDashboardWidget({ context }: PluginWidgetProps) {
  return (
    <section style={cardStyle} aria-label="Tactics Journal Research dashboard widget">
      <div style={{ display: "grid", gap: "8px" }}>
        <strong>Tactics Journal Research</strong>
        <div style={{ fontSize: "13px", opacity: 0.78, lineHeight: 1.45 }}>
          Open the live Railway-hosted research pipeline dashboard directly from Paperclip.
        </div>
        <div style={buttonRowStyle}>
          <a href={pluginPagePath(context.companyPrefix)} style={primaryButtonStyle}>Open in Paperclip</a>
          <a href={RESEARCH_URL} style={buttonStyle} target="_blank" rel="noreferrer">Open direct</a>
        </div>
      </div>
    </section>
  );
}

export function TacticsJournalResearchPage({ context }: PluginPageProps) {
  return (
    <div style={stackStyle}>
      <section style={cardStyle}>
        <div style={{ display: "grid", gap: "10px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>Tactics Journal Research</h1>
            <p style={{ margin: "8px 0 0", fontSize: "14px", lineHeight: 1.55, opacity: 0.82 }}>
              This embeds the live Railway research dashboard so the team can monitor and operate the pipeline from inside Paperclip.
            </p>
          </div>
          <div style={buttonRowStyle}>
            <a href={RESEARCH_URL} style={primaryButtonStyle} target="_blank" rel="noreferrer">Open full dashboard</a>
            <a href={`${RESEARCH_URL}/login.html`} style={buttonStyle} target="_blank" rel="noreferrer">Open login page</a>
          </div>
        </div>
      </section>

      <section style={cardStyle}>
        <div style={{ display: "grid", gap: "10px" }}>
          <strong>Embedded dashboard</strong>
          <div style={{ fontSize: "13px", opacity: 0.78, lineHeight: 1.45 }}>
            If Safari or Paperclip blocks the embedded session, use “Open full dashboard” above as a fallback.
          </div>
          <iframe
            title="Tactics Journal Research Dashboard"
            src={RESEARCH_URL}
            style={iframeStyle}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
    </div>
  );
}
