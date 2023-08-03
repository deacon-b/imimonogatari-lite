import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import React from "react";
import { useAnimeCollectionsContext } from "src/contexts/animeCollection";
import { Button } from "src/components/Button";
import { Collection } from "src/hooks/useAnimeCollections";
import { Modal } from "src/components/Modal";

export const EditCollectionModal = ({
  open, onOpenChange, currentCollection,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCollection: Collection;
}) => {
  const { editCollectionName, isCollectionNameExists } = useAnimeCollectionsContext();
  const [newCollectionName, setNewCollectionName] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  React.useEffect(() => {
    if (isCollectionNameExists(newCollectionName) ||
      newCollectionName === "" ||
      newCollectionName === currentCollection.name ||
      !/^[a-zA-Z0-9- ]*$/.test(newCollectionName)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [newCollectionName]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Collection Name"
      description="Edit the name of this collection."
    >
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "stretch",
          gap: "0.5rem",
          padding: "0.5rem",
          paddingRight: "1rem",
          paddingBottom: "2rem",
        })}
      >
        <p
          css={css({
            color: colors.gray["600"],
            fontSize: "0.75rem",
            fontWeight: "700",
          })}
        >
          Collection Name
        </p>
        <input
          css={css({
            borderRadius: "0",
            width: "100%",
            // only bottom border
            border: "none",
            borderBottom: `1px solid ${colors.gray["500"]}`,
            outline: "none",
            fontSize: "1rem",
            padding: "0.5rem",
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
          }} />
      </div>

      <div
        css={css({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "0.5rem",
        })}
      >
        <Button
          size="md"
          colorScheme="primary"
          disabled={!isValid}
          onClick={() => {
            onOpenChange(false);
            editCollectionName(currentCollection.name, newCollectionName);
          }}
        >
          Submit
        </Button>
        <Button
          size="md"
          colorScheme="primary"
          variant="ghost"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
