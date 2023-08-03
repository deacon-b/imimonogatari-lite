import { useState, useEffect } from 'react';

// Define the Anime type
export interface Anime{
  name: string;
  id: number;
  coverImage: string;
  banner: string;
  genre: string[];
};

export interface Collection{
  id: string;
  name: string;
  animes: Anime[];
};

export const useAnimeCollections = () => {
  // State to store anime collections
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Load collections from local storage on initial mount
  useEffect(() => {
    const storedCollections = localStorage.getItem('animeCollections');
    if (storedCollections) {
      setCollections(JSON.parse(storedCollections));
    }
    setIsReady(true);
  }, []);

  // Save collections to local storage whenever it changes
  useEffect(() => {
    if (isReady) localStorage.setItem('animeCollections', JSON.stringify(collections));
  }, [collections]);

  // Function to check if a collection name already exists
  const isCollectionNameExists = (collectionName: string): boolean => {
    return collections.some((collection) => collection.name === collectionName);
  };

  // Function to check if an anime already exists in a collection
  const isAnimeInCollection = (collectionName: string, animeId: number): boolean => {
    const collection = collections.find((collection) => collection.name === collectionName);
    return collection ? collection.animes.some((anime) => anime.id === animeId) : false;
  };

  // Function to create a new collection
  const createCollection = (collectionName: string): void => {
    if (!isCollectionNameExists(collectionName)) {
      const newCollection: Collection = {
        id: Date.now().toString(),
        name: collectionName,
        animes: [],
      };
      setCollections((prevCollections) => [...prevCollections, newCollection]);
    }
  };

  // Function to add anime to a collection
  const addAnimeToCollection = (collectionName: string, anime: Anime): void => {
    if (isCollectionNameExists(collectionName) && !isAnimeInCollection(collectionName, anime.id)) {
      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.name === collectionName
            ? { ...collection, animes: [...collection.animes, anime] }
            : collection
        )
      );
    }
  };

  // Function to edit the name of a collection
  const editCollectionName = (oldName: string, newName: string): void => {
    if (!isCollectionNameExists(newName)) {
      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.name === oldName ? { ...collection, name: newName } : collection
        )
      );
    }
  };

  // Function to remove anime from a collection
  const removeAnimeFromCollection = (collectionName: string, animeId: number): void => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.name === collectionName
          ? { ...collection, animes: collection.animes.filter((anime) => anime.id !== animeId) }
          : collection
      )
    );
  };

  // Function to remove a collection
  const removeCollection = (collectionName: string): void => {
    setCollections((prevCollections) =>
      prevCollections.filter((collection) => collection.name !== collectionName)
    );
  };

  return {
    collections,
    createCollection,
    addAnimeToCollection,
    editCollectionName,
    removeAnimeFromCollection,
    removeCollection,
    isCollectionNameExists,
    isAnimeInCollection,
  };
};
