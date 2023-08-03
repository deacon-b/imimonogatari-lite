import { AnimeDetailsPage } from "src/componentPage/AnimeDetailsPage";
import { AnimeCollectionsProvider } from "src/contexts/animeCollection";

export default function AnimeDetails() {
  return (
    <AnimeCollectionsProvider>
      <AnimeDetailsPage />
    </AnimeCollectionsProvider>
  );
}
