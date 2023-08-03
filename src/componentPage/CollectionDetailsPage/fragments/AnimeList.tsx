import { css } from "@emotion/react";
import React from "react";
import { Anime } from "src/hooks/useAnimeCollections";
import { AnimeItem } from "./AnimeItem";
import { colors } from "src/utils/colors";
import { Button } from "src/components/Button";
import Link from "next/link";


export const AnimeList = ({ animes, collectionName }: { animes: Anime[]; collectionName: string; }) => {
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
      })}
    >
      {animes?.map((anime: any) => (
        <AnimeItem key={anime.id} anime={anime} collectionName={collectionName} />
      ))}
      {
        animes?.length === 0 && (
          <div
            css={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              width: "100%",
              justifyContent: "center",
              textAlign: "center",
              minHeight: "300px",
            })}
          >
            <h3
              css={css({
                color: colors.gray["800"],
                fontSize: "1.25rem",
                fontWeight: "bold",
              })}
            >
              No Animes
            </h3>
            <p
              css={css({
                color: colors.gray["500"],
                fontSize: "1rem",
              })}
            >
              Add an anime to this collection
            </p>
            <Link href={`/`}>
              <Button
                size="md"
                colorScheme="primary"
              >
                Find Animes
              </Button>
            </Link>
          </div>
        )
      }
    </div>
  );
};

