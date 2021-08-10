/** @type { import('@jangaroo/core').IJangarooConfig } */
module.exports = {
  type: "code",
  extName: "com.coremedia.labs.plugins__studio-client.content-hub-adapter-filesystem",
  extNamespace: "com.coremedia.labs.plugins.adapters.filesystem.client",
  sencha: {
    studioPlugins: [
      {
        mainClass: "com.coremedia.labs.plugins.adapters.filesystem.client.ContentHubStudioFilesystemPlugin",
        name: "Content Hub Filesystem",
      },
    ],
  },
};
