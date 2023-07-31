import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { Button } from "src/components/Button";
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const GET_ONGOING_ANIME = gql`
  query GetOngoingAnime($season: MediaSeason, $seasonYear: Int) {
    Page(page: 1, perPage: 20) {
      media(
        season: $season
        seasonYear: $seasonYear
        type: ANIME
        status: RELEASING
        sort: POPULARITY_DESC
      ) {
        id
        title {
          romaji
        }
        coverImage {
          medium
        }
        episodes
        nextAiringEpisode {
          episode
        }
      }
    }
  }
`;
const getSeasonAndYear = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  switch (month) {
    case 0:
    case 1:
    case 2:
      return { season: "WINTER", seasonYear: year - 1 };
    case 3:
    case 4:
    case 5:
      return { season: "SPRING", seasonYear: year };
    case 6:
    case 7:
    case 8:
      return { season: "SUMMER", seasonYear: year };
    case 9:
    case 10:
    case 11:
      return { season: "FALL", seasonYear: year };
  }
};
export const RecentAnime = () => {
  const [seasonAndYear] = React.useState(getSeasonAndYear());

  const { data, loading } = useQuery(GET_ONGOING_ANIME, {
    variables: {
      ...seasonAndYear,
    },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        css={css({
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          width: "100%",
          height: "14.5rem",
          overflowX: "scroll",
          overflowY: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          scrollbarWidth: "none",
          "& > *": {
            scrollSnapAlign: "center",
          },
          paddingTop: "0.75rem",
          paddingLeft: "0.75rem",
          paddingRight: "0.75rem",
          scrollBehavior: "smooth",
          scrollSnapType: "x mandatory",
          userSelect: "none",
          position: "relative",
        })}
        ref={ref}
      >
        {loading ? (
          <div
            css={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              borderRadius: "0.5rem",
              backgroundColor: colors.gray["300"],
            })}
          >
            <p
              css={css({
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: colors.gray["800"],
              })}
            >
              Loading...
            </p>
          </div>
        ) : (
          data.Page.media.map((anime: any) => (
            <MotionLink
              href={`/anime/${anime.id}`}
              css={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "128px",
                minWidth: "128px",
                height: "100%",
                borderRadius: "0.5rem",
                textDecoration: "none",
              })}
              draggable={false}
              key={anime.id}
              initial={{ opacity: 0}}
              whileInView={{ opacity: 1}}
              viewport={{ root: ref }}
            >
              <img
                src={anime.coverImage.medium}
                css={css({
                  width: "100%",
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
                  alignItems: "start",
                  justifyContent: "center",
                  width: "100%",
                  borderRadius: "0.5rem",
                })}
              >
                <p
                  css={css({
                    color: colors.gray["800"],
                    fontSize: "1rem",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    maxHeight: "2.25rem",
                    WebkitLineClamp: 2,
                    marginTop: "0.5rem",
                    WebkitBoxOrient: "vertical",
                  })}
                >
                  {anime.title.romaji}
                </p>
                <p
                  css={css({
                    fontSize: "0.75rem",
                    color: colors.gray["500"],
                    marginTop: "0.25rem",
                  })}
                >
                  {anime.nextAiringEpisode.episode - 1} | {anime.episodes || "~"}
                </p>
              </div>
            </MotionLink>
          ))
        )}
      </div>
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          '@media (max-width: 768px)': {
            justifyContent: 'space-between',
          },
          alignItems: "center",
          width: "100%",
          padding: "0 1rem",
        })}
      >
        <Button
          variant="ghost"
          customCSS={css({
            fontSize: "2rem",
            padding: "0"
          })}
          colorScheme="gray"
          onClick={() => {
            if (ref.current) {
              ref.current.scrollBy({
                top: 0,
                left: -512,
                behavior: "smooth",
              });
            }
          }}
        >
          <MdArrowCircleLeft />
        </Button>
        <Button
          variant="ghost"
          customCSS={css({
            fontSize: "2rem",
            padding: "0"
          })}
          colorScheme="gray"
          onClick={() => {
            if (ref.current) {
              ref.current.scrollBy({
                top: 0,
                left: 512,
                behavior: "smooth",
              });
            }
          }}
        >
          <MdArrowCircleRight />
        </Button>
      </div>
    </>
  );
};
