import { css } from "@emotion/react";
import { PageContainer } from "src/components/PageContainer";
import { colors } from "src/utils/colors";
import { motion } from "framer-motion";
import React from "react";
import { NavBar } from "src/components/NavBar";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Button } from "src/components/Button";
import Link from "next/link";
import { RecommendedAnime } from "./fragments/RecommendedAnime";
import { Stat } from "./fragments/Stat";
import { AddToCollectionModal } from "./fragments/AddToCollectionModal";

export const MotionLink = motion(Link);

const GET_ANIME_DETAILS = gql`
  query GetAnimeDetails($id: Int) {
    Media(id: $id) {
      id
      status
      meanScore
      title {
        romaji
        english
      }
      episodes
      nextAiringEpisode {
        episode
        airingAt
      }
      coverImage {
        large
      }
      format
      source
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      bannerImage
      genres
      description
      recommendations {
        nodes {
          mediaRecommendation {
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
    }
  }
`;

export const AnimeDetailsPage = () => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_ANIME_DETAILS, {
    variables: {
      id: router.query.id,
    },
  });
  const anime = data?.Media || null;

  // year month day hour minute second until next episode
  const [timeUntilNextEpisode, setTimeUntilNextEpisode] = React.useState<
    number[]
  >([0, 0, 0, 0, 0, 0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const timeUntilNextEpisode = getTimeUntilNextEpisode();
      setTimeUntilNextEpisode(timeUntilNextEpisode);
    }, 1000);
    return () => clearInterval(interval);
  }, [anime]);

  const getTimeUntilNextEpisode = () => {
    if (anime?.nextAiringEpisode == null) return [0, 0, 0, 0];
    const now = new Date().getTime();
    const nextEpisode = new Date(
      anime.nextAiringEpisode.airingAt * 1000
    ).getTime();
    const timeUntilNextEpisode = nextEpisode - now;
    const days = Math.floor(timeUntilNextEpisode / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeUntilNextEpisode % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeUntilNextEpisode % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeUntilNextEpisode % (1000 * 60)) / 1000);
    return [days, hours, minutes, seconds];
  };

  const [open, setOpen] = React.useState(false);

  if (loading)
    return (
      <PageContainer>
        <div
          css={css({
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <motion.h3
            // spin infinite
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            css={css({
              color: colors.gray["800"],
              fontSize: "2rem",
              fontWeight: "bold",
            })}
          >
            意
          </motion.h3>
          <p
            css={css({
              color: colors.gray["800"],
              fontSize: "1.5rem",
              fontWeight: "bold",
            })}
          >
            Loading...
          </p>
        </div>
      </PageContainer>
    );

  return (
    <PageContainer>
      <NavBar hasBackButton />
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        })}
      >
        <div
          key={anime.id}
          css={css({
            backgroundImage: `url(${anime.bannerImage})`,
            backgroundColor: colors.gray["800"],
            boxShadow: "inset 0px 0px 1000px 100px rgba(0,0,0,0.7)",
            width: "100%",
            backgroundSize: "cover",
          })}
        >
          <div
            css={css({
              display: "flex",
              flexDirection: "row",
              padding: "5rem 1rem 1rem 1rem",
              alignItems: "end",
              width: "100%",
              height: "100%",
              gap: "1rem",
              textDecoration: "none",
            })}
          >
            <img
              src={anime.coverImage.large}
              alt="anime cover"
              css={css({
                borderRadius: "1rem",
                width: "160px",
                height: "100%",
                objectFit: "cover",
                "@media (max-width: 768px)": {
                  height: "120px",
                  alignSelf: "start",
                  marginTop: "1rem",
                  width: "80px",
                },
              })}
            />
            <div
              css={css({
                display: "flex",
                padding: "1rem",
                paddingBottom: "0",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
                flex: 1,
                lineHeight: "2rem",
              })}
            >
              <h2
                css={css({
                  color: colors.gray["50"],
                  fontSize: "2rem",
                  fontWeight: "bold",
                  "@media (max-width: 768px)": {
                    fontSize: "1.5rem",
                  },
                })}
              >
                {anime.title.romaji}
              </h2>
              <p
                css={css({
                  color: colors.primary["500"],
                  fontSize: "1rem",
                  fontWeight: "bold",
                })}
              >
                {anime.status}
              </p>
              <Button onClick={() => setOpen(true)} size="md">
                Add to Collection
              </Button>
              <AddToCollectionModal
                open={open}
                setOpen={setOpen}
                anime={anime}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        css={css({
          display: "flex",
          flexDirection: "row",
          "@media (max-width: 768px)": {
            flexDirection: "column",
          },
          padding: "1rem",
          paddingTop: "1.5rem",
          gap: "2rem",
        })}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          css={css({
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "1rem",
          })}
        >
          {anime.status == "RELEASING" && (
            <>
              <h3
                css={css({
                  color: colors.gray["500"],
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                })}
              >
                Episode {anime.nextAiringEpisode.episode - 1 || "~"} will be
                airing in
              </h3>
              <h3
                css={css({
                  color: colors.gray["800"],
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginBottom: "1rem",
                })}
              >
                {timeUntilNextEpisode[0]} days {timeUntilNextEpisode[1]} hours{" "}
                {timeUntilNextEpisode[2]} minutes {timeUntilNextEpisode[3]}{" "}
                seconds
              </h3>
            </>
          )}
          <Stat title="Mean Score">
            <span css={css({ color: colors.primary["500"] })}>
              {anime.meanScore / 10}
            </span>
            /10
          </Stat>
          <Stat title="Total Episodes">
            {anime.nextAiringEpisode?.episode - 1 || "~"} |{" "}
            {anime.episodes || "~"}
          </Stat>
          <Stat title="Format">{anime.format || "~"}</Stat>
          <Stat title="Source">{anime.source || "~"}</Stat>
          <Stat title="Season">
            {anime.season || "~"} {anime.seasonYear || "~"}
          </Stat>
          <Stat title="Start Date">
            {anime.startDate.day || "~"}/{anime.startDate.month || "~"}/
            {anime.startDate.year || "~"}
          </Stat>
          <Stat title="End Date">
            {anime.endDate.day || "~"}/{anime.endDate.month || "~"}/
            {anime.endDate.year || "~"}
          </Stat>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          css={css({
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "1rem",
          })}
        >
          <h3
            css={css({
              color: colors.gray["800"],
              fontSize: "1.25rem",
              fontWeight: "bold",
            })}
          >
            Synopsis
          </h3>
          <p
            css={css({
              color: colors.gray["800"],
              fontSize: "1rem",
              lineHeight: "1.5rem",
            })}
            dangerouslySetInnerHTML={{ __html: anime.description }}
          ></p>
        </motion.div>
      </div>
      <h3
        css={css({
          color: colors.gray["800"],
          fontSize: "1.25rem",
          fontWeight: "bold",
          padding: "0.75rem",
        })}
      >
        Recommendations
      </h3>
      <RecommendedAnime recommendations={anime.recommendations} />
    </PageContainer>
  );
};

export type AnimeCollectionStatus = {
  [key: string]: boolean;
};


