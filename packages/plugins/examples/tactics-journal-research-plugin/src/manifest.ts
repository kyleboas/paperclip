import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

const manifest: PaperclipPluginManifestV1 = {
  id: "kyleboas.tactics-journal-research-plugin",
  apiVersion: 1,
  version: "0.1.0",
  displayName: "Tactics Journal Research",
  description: "Embeds the Tactics Journal research dashboard inside Paperclip.",
  author: "Kyle Boas",
  categories: ["ui"],
  capabilities: [
    "ui.page.register",
    "ui.sidebar.register",
    "ui.dashboardWidget.register",
  ],
  entrypoints: {
    worker: "./dist/worker.js",
    ui: "./dist/ui",
  },
  instanceConfigSchema: {
    type: "object",
    properties: {
      dashboardUrl: {
        type: "string",
        title: "Research dashboard URL",
        default: "https://research-production-a8d0.up.railway.app",
      },
      openInNewTabLabel: {
        type: "string",
        title: "Optional helper text",
        default: "Open the full research dashboard in a new tab if the embed asks you to log in separately.",
      },
    },
  },
  ui: {
    slots: [
      {
        type: "page",
        id: "research-page",
        displayName: "Research",
        exportName: "ResearchPage",
        routePath: "research",
      },
      {
        type: "sidebar",
        id: "research-sidebar-link",
        displayName: "Research",
        exportName: "ResearchSidebarLink",
      },
      {
        type: "dashboardWidget",
        id: "research-dashboard-widget",
        displayName: "Research Dashboard",
        exportName: "ResearchDashboardWidget",
      },
    ],
  },
};

export default manifest;
