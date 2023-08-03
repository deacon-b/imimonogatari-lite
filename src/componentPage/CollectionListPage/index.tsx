import { css } from "@emotion/react";
import { PageContainer } from "src/components/PageContainer";
import { colors } from "src/utils/colors";
import React from "react";
import { NavBar } from "src/components/NavBar";
import { useAnimeCollectionsContext } from "src/contexts/animeCollection";
import { Button } from "src/components/Button";
import Link from "next/link";
import { Collection } from "src/hooks/useAnimeCollections";
import { CreateCollectionModal } from "./fragments/CreateCollectionModal";
import { CollectionItem } from "./fragments/CollectionItem";

export const CollectionListPage: React.FC = () => {
  const {
    collections,
  } = useAnimeCollectionsContext();
  const [open, setOpen] = React.useState(false);

  return (
    <PageContainer>
      <NavBar hasBackButton isAtTopStatic />
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          paddingTop: "4rem",
          gap: "1rem",
          overflowX: "hidden",
        })}
      >
        <div
          css={css({
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          })}
        >
          <p
            css={css({
              color: colors.gray["800"],
              fontSize: "1.5rem",
              fontWeight: "bold",
            })}
          >
            Collections
          </p>
          <Button size="md" colorScheme="primary" onClick={() => {
            setOpen(true)
          }}>
            New
          </Button>
          <CreateCollectionModal open={open} onOpenChange={setOpen}/>
        </div>
        {collections.length === 0 && (
          <div
            css={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              padding: "1rem",
              minHeight: "20rem",
              borderRadius: "0.5rem",
            })}
          >
            <h3
              css={css({
                color: colors.gray["800"],
                fontSize: "1rem",
                fontWeight: "bold",
              })}
            >
              You have no collections
            </h3>
            <p
              css={css({
                color: colors.gray["500"],
                fontSize: "1rem",
              })}
            >
              You can create a collection to organize your animes
            </p>
            <Button size="md" colorScheme="primary" onClick={() => {
              setOpen(true)
            }
            }>
              New Collection
            </Button>
          </div>
        )
        }
        {collections.map((collection: Collection, index: number) => (
          <CollectionItem key={index} collection={collection} />
        ))}
      </div>
    </PageContainer>
  );
};

