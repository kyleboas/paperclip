import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";

function normalizeConfig(config: Record<string, unknown>) {
  const dashboardUrl = typeof config.dashboardUrl === "string" && config.dashboardUrl.trim()
    ? config.dashboardUrl.trim()
    : "https://research-production-a8d0.up.railway.app";
  const helperText = typeof config.openInNewTabLabel === "string" && config.openInNewTabLabel.trim()
    ? config.openInNewTabLabel.trim()
    : "Open the full research dashboard in a new tab if the embed asks you to log in separately.";
  return { dashboardUrl, helperText };
}

const plugin = definePlugin({
  async setup(ctx) {
    ctx.data.register("research-config", async () => {
      const config = await ctx.config.get();
      return normalizeConfig(config);
    });
  },

  async onHealth() {
    return { status: "ok", message: "Tactics Journal Research plugin worker is running" };
  },
});

export default plugin;
runWorker(plugin, import.meta.url);
