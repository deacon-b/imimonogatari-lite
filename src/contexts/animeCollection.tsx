import React, { createContext, useContext } from 'react';

// Import the previously defined useAnimeCollections hook
import { useAnimeCollections, Anime, Collection } from 'src/hooks/useAnimeCollections';

// Define the context type
interface AnimeCollectionsContextType {
  collections: Collection[];
  createCollection: (collectionName: string) => void;
  addAnimeToCollection: (collectionName: string, anime: Anime) => void;
  editCollectionName: (oldName: string, newName: string) => void;
  removeAnimeFromCollection: (collectionName: string, animeId: number) => void;
  removeCollection: (collectionName: string) => void;
  isCollectionNameExists: (collectionName: string) => boolean;
  isAnimeInCollection: (collectionName: string, animeId: number) => boolean;
};

// Create the context
const AnimeCollectionsContext = createContext<AnimeCollectionsContextType | undefined>(undefined);

// Create the provider
const AnimeCollectionsProvider = ({ children }: { children: React.ReactNode }) => {
  const animeCollections = useAnimeCollections();

  return (
    <AnimeCollectionsContext.Provider value={animeCollections}>
      {children}
    </AnimeCollectionsContext.Provider>
  );
};

// Custom hook to access the context
const useAnimeCollectionsContext = () => {
  const context = useContext(AnimeCollectionsContext);
  if (!context) {
    throw new Error(
      'useAnimeCollectionsContext must be used within an AnimeCollectionsProvider'
    );
  }
  return context;
};

export { AnimeCollectionsProvider, useAnimeCollectionsContext };
