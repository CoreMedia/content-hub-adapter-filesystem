import ContentHub_properties from "@coremedia/studio-client.main.content-hub-editor-components/ContentHub_properties";
import CopyResourceBundleProperties from "@coremedia/studio-client.main.editor-components/configuration/CopyResourceBundleProperties";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
import ContentHubFilesystem_properties from "./ContentHubFilesystem_properties";

interface ContentHubStudioFilesystemPluginConfig extends Config<StudioPlugin> {
}

class ContentHubStudioFilesystemPlugin extends StudioPlugin {
  declare Config: ContentHubStudioFilesystemPluginConfig;

  static readonly xtype: string = "com.coremedia.labs.plugins.adapters.filesystem.client.ContentHubStudioFilesystemPlugin";

  constructor(config: Config<ContentHubStudioFilesystemPlugin> = null) {
    super(ConfigUtils.apply(Config(ContentHubStudioFilesystemPlugin, {

      configuration: [
        new CopyResourceBundleProperties({
          destination: resourceManager.getResourceBundle(null, ContentHub_properties),
          source: resourceManager.getResourceBundle(null, ContentHubFilesystem_properties),
        }),
      ],

    }), config));
  }
}

export default ContentHubStudioFilesystemPlugin;
