import { CollectionDetailsPage } from "src/componentPage/CollectionDetailsPage";
import { AnimeCollectionsProvider } from "src/contexts/animeCollection";

export default function AnimeDetails() {
  return (
    <AnimeCollectionsProvider>
      <CollectionDetailsPage />
    </AnimeCollectionsProvider>
  );
}
