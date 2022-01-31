const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.labs.plugins__studio-client.content-hub-adapter-filesystem",
    namespace: "com.coremedia.labs.plugins.adapters.filesystem.client",
    studioPlugins: [
      {
        mainClass: "com.coremedia.labs.plugins.adapters.filesystem.client.ContentHubStudioFilesystemPlugin",
        name: "Content Hub Filesystem",
      },
    ],
  },
});
