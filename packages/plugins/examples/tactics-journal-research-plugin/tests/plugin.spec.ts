import { describe, expect, it } from "vitest";
import { createTestHarness } from "@paperclipai/plugin-sdk/testing";
import manifest from "../src/manifest.js";
import plugin from "../src/worker.js";

describe("tactics journal research plugin", () => {
  it("returns the configured dashboard URL", async () => {
    const harness = createTestHarness({
      manifest,
      config: {
        dashboardUrl: "https://example.com/research",
        openInNewTabLabel: "Open externally if needed.",
      },
    });

    await plugin.definition.setup(harness.ctx);

    const data = await harness.getData<{ dashboardUrl: string; helperText: string }>("research-config");
    expect(data.dashboardUrl).toBe("https://example.com/research");
    expect(data.helperText).toBe("Open externally if needed.");
  });
});
