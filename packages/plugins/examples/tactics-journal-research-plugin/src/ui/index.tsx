import { usePluginData, type PluginPageProps, type PluginSidebarProps, type PluginWidgetProps } from "@paperclipai/plugin-sdk/ui";
import type { CSSProperties } from "react";

const pageLayout: CSSProperties = {
  display: "grid",
  gap: "12px",
};

const cardStyle: CSSProperties = {
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "14px",
  background: "var(--card, transparent)",
};

const linkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "1px solid var(--border)",
  borderRadius: "999px",
  padding: "8px 12px",
  textDecoration: "none",
  color: "inherit",
  fontSize: "13px",
  fontWeight: 600,
};

const frameStyle: CSSProperties = {
  width: "100%",
  minHeight: "78vh",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  background: "white",
};

type ResearchConfig = {
  dashboardUrl: string;
  helperText: string;
};

function hostPath(companyPrefix: string | null | undefined, suffix: string): string {
  return companyPrefix ? `/${companyPrefix}${suffix}` : suffix;
}

function pluginPagePath(companyPrefix: string | null | undefined): string {
  return hostPath(companyPrefix, "/research");
}

function useResearchConfig() {
  return usePluginData<ResearchConfig>("research-config");
}

export function ResearchDashboardWidget(_props: PluginWidgetProps) {
  const { data, loading, error } = useResearchConfig();

  if (loading) return <div>Loading research dashboard…</div>;
  if (error) return <div>Plugin error: {error.message}</div>;

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      <div style={{ fontWeight: 700 }}>Tactics Journal Research</div>
      <div style={{ fontSize: "13px", opacity: 0.8 }}>
        Open the live Railway-hosted research dashboard inside Paperclip.
      </div>
      <a href={data?.dashboardUrl} target="_blank" rel="noreferrer" style={linkStyle}>
        Open dashboard
      </a>
    </div>
  );
}

export function ResearchSidebarLink({ context }: PluginSidebarProps) {
  const href = pluginPagePath(context.companyPrefix);
  const isActive = typeof window !== "undefined" && window.location.pathname === href;

  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={[
        "flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium transition-colors",
        isActive
          ? "bg-accent text-foreground"
          : "text-foreground/80 hover:bg-accent/50 hover:text-foreground",
      ].join(" ")}
    >
      <span aria-hidden="true">📊</span>
      <span className="flex-1 truncate">Research</span>
    </a>
  );
}

export function ResearchPage({ context }: PluginPageProps) {
  const { data, loading, error } = useResearchConfig();

  if (loading) return <div>Loading research dashboard…</div>;
  if (error) return <div>Plugin error: {error.message}</div>;

  const dashboardUrl = data?.dashboardUrl ?? "https://research-production-a8d0.up.railway.app";
  const helperText = data?.helperText ?? "Open the full research dashboard in a new tab if the embed asks you to log in separately.";

  return (
    <div style={pageLayout}>
      <div style={cardStyle}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ display: "grid", gap: "6px" }}>
            <h2 style={{ margin: 0, fontSize: "20px" }}>Tactics Journal Research</h2>
            <div style={{ fontSize: "13px", opacity: 0.78 }}>
              Embedded view of the Railway-hosted research pipeline dashboard.
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <a href={dashboardUrl} target="_blank" rel="noreferrer" style={linkStyle}>
              Open in new tab
            </a>
            <a href={pluginPagePath(context.companyPrefix)} style={linkStyle}>
              Refresh tab
            </a>
          </div>
        </div>
        <div style={{ marginTop: "10px", fontSize: "13px", opacity: 0.78 }}>{helperText}</div>
      </div>
      <iframe title="Tactics Journal Research" src={dashboardUrl} style={frameStyle} />
    </div>
  );
}
