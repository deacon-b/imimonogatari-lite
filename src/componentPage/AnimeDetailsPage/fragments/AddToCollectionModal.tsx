import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import React, { useEffect } from "react";
import { Button } from "src/components/Button";
import { Modal } from "src/components/Modal";
import { useAnimeCollectionsContext } from "src/contexts/animeCollection";
import { AnimeCollectionStatus } from "..";
import { Collection } from "./Collection";

export const AddToCollectionModal = ({
  open,
  setOpen,
  anime,
}: {
  open?: boolean;
  setOpen: (open: boolean) => void;
  anime: any;
}) => {
  const [newCollectionName, setNewCollectionName] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const {
    collections,
    createCollection,
    addAnimeToCollection,
    removeAnimeFromCollection,
    isAnimeInCollection,
    isCollectionNameExists: _isCollectionNameExists,
  } = useAnimeCollectionsContext();

  const [animeCollectionContains, setAnimeCollectionContains] =
    React.useState<AnimeCollectionStatus>({});
  const [isCollectionNameExists, setIsCollectionNameExists] =
    React.useState(false);

  useEffect(() => {
    const _animeCollectionContains: AnimeCollectionStatus = {};
    collections.forEach((collection) => {
      _animeCollectionContains[collection.name] = isAnimeInCollection(
        collection.name,
        anime.id
      );
    });
    setAnimeCollectionContains(_animeCollectionContains);
  }, [collections]);

  useEffect(() => {
    setIsCollectionNameExists(_isCollectionNameExists(newCollectionName));
  }, [newCollectionName]);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Add to Collection"
      description="Add this anime to your collection. You can create new collections aswell"
    >
      <div
        css={css({
          display: "flex",
          minHeight: "3rem",
          flexDirection: "column",
        })}
      >
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
          <input
            css={css({
              borderRadius: "0",
              padding: "0rem",
              // only bottom border
              border: "none",
              borderBottom: `1px solid ${colors.gray["500"]}`,
              outline: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              background: "none",
              color: colors.gray["800"],
              "::placeholder": {
                color: colors.gray["500"],
              },
            })}
            type="text"
            placeholder="New Collection"
            value={newCollectionName}
            onChange={(e) => {
              setNewCollectionName(e.target.value);
              setIsValid(e.target.value.length > 0 && /^[a-zA-Z0-9- ]*$/.test(newCollectionName)) ;
            }}
          />
          <div
            css={css({
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            })}
          >
            <Button
              onClick={() => {
                createCollection(newCollectionName);
                setNewCollectionName("");
                setIsValid(false);
              }}
              size="sm"
              disabled={!isValid || isCollectionNameExists}
            >
              Create
            </Button>
          </div>
        </div>
        {collections.map((collection: any) => (
          <Collection
            key={collection.name}
            collection={collection}
            anime={anime}
            addAnimeToCollection={addAnimeToCollection}
            removeAnimeFromCollection={removeAnimeFromCollection}
            animeCollectionContains={animeCollectionContains}
          />
        ))}
      </div>
    </Modal>
  );
};
