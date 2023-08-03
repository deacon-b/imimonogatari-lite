import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import { motion } from "framer-motion";
import React from "react";
import { useAnimeCollectionsContext } from "src/contexts/animeCollection";
import { Collection } from "src/hooks/useAnimeCollections";
import { useRouter } from "next/router";
import { EditCollectionModal } from "../../../components/EditCollectionModal";
import { DeleteCollectionModal } from "./DeleteCollectionModal";
import { EditOverlay } from "src/components/Overlays/EditOverlay";
import { DeleteOverlay } from "src/components/Overlays/DeleteOverlay";

export function CollectionItem({ collection }: { collection: Collection; }) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [confirmEdit, setConfirmEdit] = React.useState(false);

  const router = useRouter();
  const { removeCollection } = useAnimeCollectionsContext();

  // Function to handle the drag direction
  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x < -100) {
      setConfirmDelete(true);
    } else if (info.offset.x > 100) {
      setConfirmEdit(true);
    }
    setIsDeleting(false);
    setIsEditing(false);
    // timeout to prevent click event from firing
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const handleDrag = (e: any, info: any) => {
    if (info.offset.x < -100) {
      setIsDeleting(true);
      setIsEditing(false);
    } else if (info.offset.x > 100) {
      setIsEditing(true);
      setIsDeleting(false);
    } else {
      setIsDeleting(false);
      setIsEditing(false);
    }
  };
  return (
    <motion.div
      css={css({
        backgroundImage: `url(${collection.animes[0]?.banner || ""})`,
        backgroundColor: colors.gray["800"],
        width: "100%",
        borderRadius: "1rem",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        position: "relative",
        overflow: "hidden",
      })}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      key={collection.name}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, info) => handleDragEnd(e, info)}
      onDrag={(e, info) => handleDrag(e, info)}
    >
      {isDeleting && <DeleteOverlay />}
      {isEditing && <EditOverlay />}
      <div
        onClick={() => {
          if (isDragging) return;
          router.push(`/collections/${collection.id}`);
        }}
        css={css({
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          minHeight: "160px",
          width: "100%",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "rgba(0,0,0,0.7)",
          textDecoration: "none",
        })}
      >
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
              lineHeight: "1.5rem",
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
            })}
          >
            {collection.name}
          </h3>
          <p
            css={css({
              color: colors.gray["300"],
              fontSize: "0.75rem",
            })}
          >
            {collection.animes.length} Animes
          </p>
        </div>
      </div>
      <DeleteCollectionModal
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        onDelete={() => removeCollection(collection.name)} />
      <EditCollectionModal
        open={confirmEdit}
        onOpenChange={setConfirmEdit}
        currentCollection={collection} />
    </motion.div>
  );
}
