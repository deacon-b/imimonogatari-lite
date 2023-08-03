import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import React from "react";
import { Anime } from "src/hooks/useAnimeCollections";
import { AnimeCollectionStatus } from "..";

export const Collection = ({
  collection,
  anime,
  addAnimeToCollection,
  removeAnimeFromCollection,
  animeCollectionContains,
}: {
  collection: any;
  anime: any;
  addAnimeToCollection: (collectionName: string, anime: Anime) => void;
  removeAnimeFromCollection: (collectionName: string, animeId: number) => void;
  animeCollectionContains: AnimeCollectionStatus;
}) => {
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem",
        borderRadius: "0.5rem",
      })}
    >
      <Link
        href={`/collections/${collection.id}`}
        css={css({
          color: colors.gray["800"],
          fontSize: "1rem",
          fontWeight: "bold",
          textOverflow: "ellipsis",
          overflow: "hidden",
        })}
      >
        {collection.name}
      </Link>
      <div
        css={css({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        })}
      >
        <input
          // make checkbox primary color
          css={css({
            appearance: "none",
            backgroundColor: "white",
            border: `1px solid ${colors.gray["400"]}`,
            borderRadius: "0.25rem",
            width: "1rem",
            height: "1rem",
            cursor: "pointer",
            outline: "none",
            ":checked": {
              backgroundColor: colors.primary["500"],
              borderColor: colors.primary["500"],
            },
            // add checkmark
            ":after": {
              content: '""',
              display: "block",
              position: "relative",
              top: "0rem",
              left: "0.25rem",
              width: "0.25rem",
              height: "0.5rem",
              border: `solid ${colors.gray["200"]}`,
              borderWidth: "0 0.125rem 0.125rem 0",
              transform: "rotate(45deg)",
            },
          })}
          type="checkbox"
          checked={animeCollectionContains[collection.name]}
          onChange={() => {
            if (animeCollectionContains[collection.name]) {
              removeAnimeFromCollection(collection.name, anime.id);
            } else {
              addAnimeToCollection(collection.name, {
                name: anime.title.romaji,
                id: anime.id,
                coverImage: anime.coverImage.large,
                banner: anime.bannerImage,
                genre: anime.genres,
              });
            }
          }}
        />
      </div>
    </div>
  );
};
