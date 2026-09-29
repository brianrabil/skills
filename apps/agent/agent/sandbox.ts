import { defineSandbox } from "eve/sandbox";
import { JustBashSandbox } from "eve/sandbox/just-bash";

export const environment = JustBashSandbox.environment({
  autoInstall: false,
  filesystem: async ({ defaultFilesystem, justBash, resolveProjectPath }) => {
    await defaultFilesystem.mkdir("/workspace/skills", { recursive: true });

    return new justBash.MountableFs({
      base: defaultFilesystem,
      mounts: [
        {
          mountPoint: "/workspace/skills",
          filesystem: new justBash.ReadWriteFs({
            root: resolveProjectPath("../../skills"),
          }),
        },
      ],
    });
  },
});

export default defineSandbox(() => environment.open());
