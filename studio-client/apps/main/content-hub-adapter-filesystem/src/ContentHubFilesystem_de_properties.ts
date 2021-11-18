import ResourceBundleUtil from "@jangaroo/runtime/l10n/ResourceBundleUtil";
import ContentHubFilesystem_properties from "./ContentHubFilesystem_properties";

/**
 * @see ContentHubFilesystem_properties
 */
ResourceBundleUtil.override(ContentHubFilesystem_properties, {
  author_header: "Autor",
  lastModified_header: "Zuletzt bearbeitet",
  folder_type_filesystem_folder_name: "Ordner",
  adapter_type_filesystem_name: "Dateisystem",
  item_type_filesystem_file_name: "Datei",
  metadata_sectionName: "Metadaten",
  text_sectionItemKey: "Text",
  author_sectionItemKey: "Autor",
  published_sectionItemKey: "Publiziert",
  lastModified_sectionItemKey: "Zuletzt bearbeitet",
  link_sectionItemKey: "Link",
  dimension_sectionItemKey: "Abmessung",
});
