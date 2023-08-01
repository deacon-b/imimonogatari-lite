import { css } from "@emotion/react";
import { PageContainer } from "src/components/PageContainer";
import { colors } from "src/utils/colors";
import { motion } from "framer-motion";
import React from "react";
import { TrendingAnimeCarousel } from "./fragments/TrendingAnimeCarousel";
import { RecentAnime } from "./fragments/RecentAnime";
import { NavBar } from "src/components/NavBar";
import { PopularAnime } from "./fragments/PopularAnime";

export const AnimeListPage= () => {
  return (
    <PageContainer>
      <NavBar />
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        })}
      >
        <TrendingAnimeCarousel
          customCSS={css({
            height: "18.75rem",
            borderRadius: "0",
          })}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        css={css({
          display: "flex",
          flexDirection: "column",
          marginTop: "0.5rem",
        })}
      >
        <h3
          css={css({
            color: colors.gray["800"],
            fontSize: "1.25rem",
            fontWeight: "bold",
            padding: "0.75rem",
          })}
        >
          Ongoing Anime
        </h3>
        <RecentAnime />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        css={css({
          display: "flex",
          flexDirection: "column",
        })}
      >
        <h3
          css={css({
            color: colors.gray["800"],
            fontSize: "1.25rem",
            fontWeight: "bold",
            padding: "0.75rem",
          })}
        >
          Popular Anime
        </h3>
        <PopularAnime />
      </motion.div>
    </PageContainer>
  );
}


