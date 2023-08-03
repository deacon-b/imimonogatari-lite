import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/router";
import { useAnimeCollectionsContext } from "src/contexts/animeCollection";
import { Anime } from "src/hooks/useAnimeCollections";
import { DeleteOverlay } from "src/components/Overlays/DeleteOverlay";
import { DeleteAnimeModal } from "./DeleteAnimeModal";

export const AnimeItem = ({ anime, collectionName }: { anime: Anime; collectionName: string; }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const router = useRouter();

  const { removeAnimeFromCollection } = useAnimeCollectionsContext();

  // Function to handle the drag direction
  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x < -100 || info.offset.x > 100) {
      setConfirmDelete(true);
    }
    setIsDeleting(false);
    // timeout to prevent click event from firing
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const handleDrag = (e: any, info: any) => {
    if (info.offset.x < -100 || info.offset.x > 100) {
      setIsDeleting(true);
      return;
    }
    setIsDeleting(false);
  };
  return (
    <motion.div
      css={css({
        backgroundImage: `url(${anime.banner})`,
        backgroundColor: colors.gray["800"],
        width: "100%",
        borderRadius: "1rem",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        overflow: "hidden",
      })}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, info) => handleDragEnd(e, info)}
      onDrag={(e, info) => handleDrag(e, info)}
    >
      {isDeleting && <DeleteOverlay />}
      <div
        onClick={() => {
          if (isDragging) return;
          router.push(`/anime/${anime.id}`);
        }}
        css={css({
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          width: "100%",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "rgba(0,0,0,0.7)",
          textDecoration: "none",
          "&:hover": {
            cursor: "pointer",
          },
          userSelect: "none",
        })}
      >
        <img
          src={anime.coverImage}
          css={css({
            width: "128px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "0.5rem",
            userSelect: "none",
          })}
          draggable={false} />
        <div
          css={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.5rem",
            padding: "0.5rem",
            flex: 1,
          })}
        >
          <h3
            css={css({
              color: colors.gray["50"],
              fontSize: "1.25rem",
              fontWeight: "bold",
            })}
          >
            {anime.name}
          </h3>
          <p
            css={css({
              color: colors.gray["300"],
              fontSize: "0.75rem",
            })}
          >
            {anime.genre?.map((genre: any, i: number) => (
              <span key={i}>
                {genre +
                  (anime.genre.indexOf(genre) === anime.genre.length - 1
                    ? ""
                    : " • ")}
              </span>
            ))}
          </p>
        </div>
      </div>
      <DeleteAnimeModal
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        onDelete={() => {
          setIsDeleting(false);
          removeAnimeFromCollection(collectionName, anime.id);
        }} />
    </motion.div>
  );
};
