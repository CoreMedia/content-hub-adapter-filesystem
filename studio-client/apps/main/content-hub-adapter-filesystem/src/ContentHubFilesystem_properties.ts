import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";

/**
 * Interface values for ResourceBundle "ContentHubFilesystem".
 * @see ContentHubFilesystem_properties
 */
interface ContentHubFilesystem_properties {

/**
 *Filesystem
 */
  author_header: string;
  lastModified_header: string;
  folder_type_filesystem_folder_name: string;
  folder_type_filesystem_folder_icon: string;
  adapter_type_filesystem_name: string;
  adapter_type_filesystem_icon: string;
  item_type_filesystem_file_name: string;
  item_type_filesystem_file_icon: string;
  metadata_sectionName: string;
  text_sectionItemKey: string;
  author_sectionItemKey: string;
  published_sectionItemKey: string;
  lastModified_sectionItemKey: string;
  link_sectionItemKey: string;
  dimension_sectionItemKey: string;
}

/**
 * Singleton for the current user Locale's instance of ResourceBundle "ContentHubFilesystem".
 * @see ContentHubFilesystem_properties
 */
const ContentHubFilesystem_properties: ContentHubFilesystem_properties = {
  author_header: "Author",
  lastModified_header: "Last Modified",
  folder_type_filesystem_folder_name: "Folder",
  folder_type_filesystem_folder_icon: CoreIcons_properties.folder,
  adapter_type_filesystem_name: "Filesystem",
  adapter_type_filesystem_icon: CoreIcons_properties.file_system,
  item_type_filesystem_file_name: "File",
  item_type_filesystem_file_icon: CoreIcons_properties.type_external_content,
  metadata_sectionName: "Metadata",
  text_sectionItemKey: "Text",
  author_sectionItemKey: "Author",
  published_sectionItemKey: "Published",
  lastModified_sectionItemKey: "Last modified",
  link_sectionItemKey: "Link",
  dimension_sectionItemKey: "Dimension",
};

export default ContentHubFilesystem_properties;
