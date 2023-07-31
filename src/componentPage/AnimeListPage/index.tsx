import { css } from "@emotion/react";
import { Button } from "src/components/Button";
import { PageContainer } from "src/components/PageContainer";
import { colors } from "src/utils/colors";
import { MdBookmarks, MdCollections } from "react-icons/md";
import { motion } from "framer-motion";
import React from "react";
import { TrendingAnimeCarousel } from "./fragments/TrendingAnimeCarousel";
import { RecentAnime } from "./fragments/RecentAnime";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

export function AnimeListPage() {
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

const GET_POPULAR_ANIME = gql`
  query GetPopularAnime($page: Int) {
    Page(page: $page, perPage: 10) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        bannerImage
        genres
      }
    }
  }
`;

const PopularAnime = () => {
  const [page, setPage] = React.useState(1);
  const [popularAnime, setPopularAnime] = React.useState<any[]>([]); // Replace 'any' with the actual type of anime data
  const { loading, fetchMore } = useQuery(GET_POPULAR_ANIME, {
    variables: {
      page,
    },
    onCompleted: (data) => {
      setPopularAnime((prevPopularAnime) => [...prevPopularAnime, ...data?.Page?.media]);
    }
  });

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
      {popularAnime.map((anime: any) => (
        <motion.div
          css={css({
            backgroundImage: `url(${anime.bannerImage})`,
            backgroundColor: colors.gray["800"],
            width: "100%",
            borderRadius: "1rem",
            overflow: "hidden",
          })}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          key={anime.id}
        >
          <Link
            href={`/anime/${anime.id}`}
            css={css({
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              width: "100%",
              gap: "1rem",
              padding: "1rem",
              backgroundColor: "rgba(0,0,0,0.7)",
              textDecoration: "none",
            })}
          >
            <img
              src={anime.coverImage.large}
              css={css({
                width: "128px",
                height: "160px",
                objectFit: "cover",
                borderRadius: "0.5rem",
                userSelect: "none",
              })}
              draggable={false}
            />
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
                {anime.title.romaji}
              </h3>
              <p
                css={css({
                  color: colors.gray["300"],
                  fontSize: "0.75rem",
                })}
              >
                {anime.genres.map((genre: any) => (
                  <>
                    {genre +
                      (anime.genres.indexOf(genre) === anime.genres.length - 1
                        ? ""
                        : " • ")}
                  </>
                ))}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
      <motion.div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gridColumn: "span 2",
          width: "100%",
          height: "60px",
        })}
        onViewportEnter={()=>{
          if (loading) return;
          fetchMore({
            variables: {
              page: page + 1,
            },
          });
          setPage(page + 1);
        }}
      >
        <p
          css={css({
            color: colors.gray["600"],
            fontSize: "0.75rem",
          })}
        >
          Loading...
        </p>
      </motion.div>
    </div>
  );
};
const NavBar = () => {
  // check if scroll position is at the top
  const [isAtTop, setIsAtTop] = React.useState(true);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      css={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1.5rem",
        position: "fixed",
        top: 0,
        zIndex: 50,
        width: "100%",
        backgroundColor: isAtTop ? "transparent" : colors.gray["200"],
      })}
    >
      <h3
        css={css({
          color: colors.primary["500"],
          fontSize: "1.5rem",
          fontWeight: "bold",
        })}
      >
        意{" "}
        <span
          css={css({
            color: isAtTop ? colors.gray["200"] : colors.gray["800"],
          })}
        >
          Lite
        </span>
      </h3>
      <Button
        size="md"
        variant="ghost"
        colorScheme="primary"
        customCSS={css({
          padding: "0.5rem",
        })}
      >
        <MdBookmarks />
      </Button>
    </motion.nav>
  );
};
