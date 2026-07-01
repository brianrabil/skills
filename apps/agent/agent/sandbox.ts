import { agentBrowserRevalidationKey, installAgentBrowser } from "@agent-browser/sandbox/eve";
import { defaultBackend, defineSandbox } from "eve/sandbox";

export default defineSandbox({
  // installAgentBrowser only runs generic shell commands (apt-get/npm), so it
  // works on any backend -- defaultBackend() picks Vercel Sandbox when
  // actually deployed on Vercel, Docker locally, etc. Pinning `vercel()`
  // (as agent-browser's own example does) would force hosted sandboxes even
  // in local dev.
  backend: defaultBackend({ vercel: { runtime: "node24", resources: { vcpus: 2 } } }),
  revalidationKey: () => agentBrowserRevalidationKey(),
  async bootstrap({ use }) {
    const sandbox = await use();
    await installAgentBrowser(sandbox);
  },
});
