import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import { motion } from "framer-motion";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

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
export const PopularAnime = () => {
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
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
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
                {anime.title.romaji}
              </h3>
              <p
                css={css({
                  color: colors.gray["300"],
                  fontSize: "0.75rem",
                })}
              >
                {anime.genres.map((genre: any, i: number) => (
                  <span key={i}>
                    {genre +
                      (anime.genres.indexOf(genre) === anime.genres.length - 1
                        ? ""
                        : " • ")}
                  </span>
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
        onViewportEnter={() => {
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
