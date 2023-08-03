import { CollectionListPage } from "src/componentPage/CollectionListPage";
import { AnimeCollectionsProvider } from "src/contexts/animeCollection";

export default function AnimeDetails() {
  return (
    <AnimeCollectionsProvider>
      <CollectionListPage />
    </AnimeCollectionsProvider>
  );
}
