import { css } from "@emotion/react";
import { PageContainer } from "src/components/PageContainer";
import { colors } from "src/utils/colors";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { NavBar } from "src/components/NavBar";
import { useRouter } from "next/router";
import { useAnimeCollectionsContext } from "src/contexts/animeCollection";
import Link from "next/link";
import { Collection } from "src/hooks/useAnimeCollections";
import { Button } from "src/components/Button";
import { MdEdit } from "react-icons/md";
import { EditCollectionModal } from "src/components/EditCollectionModal";
import { AnimeList } from "./fragments/AnimeList";

export const CollectionDetailsPage = () => {
  const { collections } = useAnimeCollectionsContext();
  const router = useRouter();
  const [collection, setCollection] = React.useState({} as Collection);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      const _collection = collections.find(
        (collection: Collection) => collection.id == id
      );
      if (_collection) {
        setCollection(_collection);
      } 
    }
  }, [router.query, collections]);

  return (
    <PageContainer>
      <NavBar hasBackButton isAtTopStatic />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        css={css({
          display: "flex",
          paddingTop: "3rem",
          flexDirection: "column",
          overflowX: "hidden",
        })}
      >
        <p
          css={css({
            color: colors.gray["500"],
            fontSize: "1rem",
            fontWeight: "500",
            padding: "2rem",
            paddingTop: "1rem",
          })}
        >
          You can delete animes from your collection by swiping left or right
        </p>
        <div
          css={css({
            padding: "0.5rem",
            paddingLeft: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "0.5rem",
          })}
        >
          <div
            css={css({
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              gap: "0.5rem",
            })}
          >
            <h3
              css={css({
                color: colors.gray["800"],
                fontSize: "1.25rem",
                fontWeight: "bold",
              })}
            >
              {collection.name}
            </h3>
            <Button
              onClick={() => setOpen(true)}
              size="md"
              variant="ghost"
              colorScheme="primary"
            >
              <MdEdit />
            </Button>
            <EditCollectionModal
              open={open}
              onOpenChange={setOpen}
              currentCollection={collection}
            />
          </div>
          <p
            css={css({
              color: colors.gray["500"],
              fontSize: "1rem",
              fontWeight: "500",
            })}
          >
            {collection.animes?.length} Animes
          </p>
        </div>
        <AnimeList animes={collection.animes} collectionName={collection.name}/>
      </motion.div>
    </PageContainer>
  );
};


