import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "Note Pile",
  description: "A peer-attributed shared note pile for capturing a group's next ideas.",
  accentHex: "#527a2d",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
