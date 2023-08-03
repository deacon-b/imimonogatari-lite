import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import React from "react";
import { useDraggable } from "src/hooks/useDraggable";
import { MotionLink } from "..";

export const RecommendedAnime = ({
  recommendations,
}: {
  recommendations: any;
}) => {
  const ref =
    React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        width: "100%",
        marginBottom: "1rem",
        overflowX: "scroll",
        overflowY: "hidden",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        padding: "1rem",
        userSelect: "none",
        position: "relative",
      })}
      ref={ref}
      {...events}
    >
      {recommendations.nodes?.map((recommendation: any) => {
        const animeData = recommendation.mediaRecommendation;
        if (!animeData) return null;
        return (
          <MotionLink
            key={animeData.id}
            href={`/anime/${animeData.id}`}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ root: ref }}
          >
            <img
              src={animeData.coverImage.medium}
              alt="anime cover"
              css={css({
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "0.5rem",
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
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
                {animeData.title.romaji}
              </p>
              <p
                css={css({
                  fontSize: "0.75rem",
                  color: colors.gray["500"],
                  marginTop: "0.25rem",
                })}
              >
                {animeData.nextAiringEpisode
                  ? `${animeData.nextAiringEpisode.episode - 1} | ${
                      animeData.episodes || "~"
                    }`
                  : animeData.episodes || "~"}
              </p>
            </div>
          </MotionLink>
        );
      })}
    </div>
  );
};
