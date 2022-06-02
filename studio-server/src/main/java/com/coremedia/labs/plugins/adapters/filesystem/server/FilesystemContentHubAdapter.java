package com.coremedia.labs.plugins.adapters.filesystem.server;

import com.coremedia.contenthub.api.ContentHubAdapter;
import com.coremedia.contenthub.api.ContentHubContext;
import com.coremedia.contenthub.api.ContentHubObject;
import com.coremedia.contenthub.api.ContentHubObjectId;
import com.coremedia.contenthub.api.ContentHubTransformer;
import com.coremedia.contenthub.api.ContentHubType;
import com.coremedia.contenthub.api.Folder;
import com.coremedia.contenthub.api.GetChildrenResult;
import com.coremedia.contenthub.api.Item;
import com.coremedia.contenthub.api.exception.ContentHubException;
import com.coremedia.contenthub.api.pagination.PaginationRequest;
import com.coremedia.contenthub.api.search.ContentHubSearchResult;
import com.coremedia.contenthub.api.search.ContentHubSearchService;
import com.coremedia.contenthub.api.search.Sort;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


class FilesystemContentHubAdapter implements ContentHubAdapter, ContentHubSearchService {
  private static final Logger LOGGER = LoggerFactory.getLogger(FilesystemContentHubAdapter.class);
  private static final List<ContentHubType> SEARCH_TYPES = Arrays.asList(new ContentHubType(FilesystemFolder.TYPE), new ContentHubType(FilesystemItem.TYPE));

  private final FilesystemContentHubSettings settings;
  private final String connectionId;

  private final File rootFile;
  private final boolean filterNoAccess;


  FilesystemContentHubAdapter(@NonNull FilesystemContentHubSettings settings, @NonNull String connectionId) {
    this.settings = settings;
    this.connectionId = connectionId;

    String rootPath = settings.getRootFolder();
    File file = new File(rootPath);
    this.rootFile = file;
    this.filterNoAccess = settings.getFilterNoAccess();

    if (!file.exists()) {
      LOGGER.warn("File Connector folder '" + file.getAbsolutePath() + " does not exist, connector will be ignored.");
    }
  }

  @Override
  public ContentHubSearchResult search(String s, @Nullable Folder folder, @Nullable ContentHubType contentHubType, Collection<String> collection, List<Sort> list, int i) {
    if (folder == null) {
      folder = getRootFolder(null);
    }

    FilesystemFolder f = (FilesystemFolder) folder;
    //no recursive search to avoid performance issues
    File[] files = f.getFile().listFiles((dir, name) -> {
      if (contentHubType != null) {
        File child = new File(dir, name);
        if (child.isDirectory() && contentHubType.getName().equals(FilesystemItem.TYPE)) {
          return false;
        }
        if (child.isFile() && contentHubType.getName().equals(FilesystemFolder.TYPE)) {
          return false;
        }
      }
      return s == null || name.toLowerCase().contains(s.toLowerCase());
    });
    List<Item> collect = Arrays.stream(files).map(file -> item(f, file)).collect(Collectors.toList());
    return new ContentHubSearchResult(collect);
  }

  @Override
  public Optional<ContentHubSearchService> searchService() {
    return Optional.of(this);
  }

  @Override
  public Collection<ContentHubType> supportedTypes() {
    return SEARCH_TYPES;
  }

  @Override
  public boolean supportsSearchBelowFolder() {
    return false;
  }

  @NonNull
  @Override
  public Folder getRootFolder(@NonNull ContentHubContext context) throws ContentHubException {
    if (!rootFile.canRead()) {
      throw new ContentHubException("Cannot read content of configured folder due to missing permissions.");
    }

    ContentHubObjectId rootId = new ContentHubObjectId(connectionId, connectionId);
    return new FilesystemFolder(rootId, null, rootFile);

  }

  @Nullable
  @Override
  public Item getItem(@NonNull ContentHubContext context, @NonNull ContentHubObjectId id) throws ContentHubException {
    File file = new File(id.getExternalId());
    return new FilesystemItem(null, id, file);
  }

  @Nullable
  @Override
  public Folder getFolder(@NonNull ContentHubContext context, @NonNull ContentHubObjectId id) throws ContentHubException {
    File file = new File(id.getExternalId());
    return new FilesystemFolder(id, null, file);
  }

  @NonNull
  @Override
  public GetChildrenResult getChildren(@NonNull ContentHubContext context, @NonNull Folder folder, @Nullable PaginationRequest paginationRequest) {
    List<ContentHubObject> children = new ArrayList<>();

    List<File> result = ((FilesystemFolder) folder).getChildren();
    for (File entry : result) {
      ContentHubObjectId id = new ContentHubObjectId(connectionId, entry.getPath());
      if (!filterNoAccess || entry.canRead()) {
        if (entry.isDirectory()) {
          children.add(new FilesystemFolder(id, (FilesystemFolder) folder, entry));
        } else {
          children.add(new FilesystemItem((FilesystemFolder) folder, id, entry));
        }
      }
    }

    return new GetChildrenResult(children);
  }

  @Nullable
  @Override
  public Folder getParent(@NonNull ContentHubContext context, @NonNull ContentHubObject contentHubObject) throws ContentHubException {
    if (!contentHubObject.getId().equals(getRootFolder(context).getId())) {
      return getRootFolder(context);
    }
    return null;
  }

  @Override
  @NonNull
  public ContentHubTransformer transformer() {
    return new FilesystemContentHubTransformer();
  }


  //------------------------ Helper ------------------------------------------------------------------------------------

  private Item item(@NonNull FilesystemFolder parent, @NonNull File file) {
    String id = file.getPath();
    ContentHubObjectId objectId = new ContentHubObjectId(connectionId, id);
    return new FilesystemItem(parent, objectId, file);
  }

}
