import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";

const plugin = definePlugin({
  async setup(ctx) {
    ctx.logger.info("tactics-journal-research plugin setup complete");
  },

  async onHealth() {
    return { status: "ok", message: "Tactics Journal Research plugin ready" };
  },
});

export default plugin;
runWorker(plugin, import.meta.url);
