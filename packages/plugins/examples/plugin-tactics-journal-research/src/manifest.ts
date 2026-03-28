import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

const PLUGIN_ID = "tactics-journal-research";
const PLUGIN_VERSION = "0.1.0";

const manifest: PaperclipPluginManifestV1 = {
  id: PLUGIN_ID,
  apiVersion: 1,
  version: PLUGIN_VERSION,
  displayName: "Tactics Journal Research",
  description: "Embeds the Tactics Journal Railway research dashboard directly inside Paperclip with a company page, sidebar entry, and dashboard widget.",
  author: "Kyle Boas",
  categories: ["ui"],
  capabilities: [
    "ui.page.register",
    "ui.sidebar.register",
    "ui.dashboardWidget.register"
  ],
  entrypoints: {
    worker: "./dist/worker.js",
    ui: "./dist/ui"
  },
  ui: {
    slots: [
      {
        type: "page",
        id: "tactics-journal-research-page",
        displayName: "Research",
        exportName: "TacticsJournalResearchPage",
        routePath: "research"
      },
      {
        type: "sidebar",
        id: "tactics-journal-research-sidebar",
        displayName: "Research",
        exportName: "TacticsJournalResearchSidebarLink",
        order: 30
      },
      {
        type: "dashboardWidget",
        id: "tactics-journal-research-widget",
        displayName: "Research Dashboard",
        exportName: "TacticsJournalResearchDashboardWidget",
        order: 30
      }
    ]
  }
};

export default manifest;
