import { css } from "@emotion/react";
import { Button } from "src/components/Button";
import { PageContainer } from "src/components/PageContainer";
import { colors } from "src/utils/colors";
import { MdCollections } from "react-icons/md";
import { motion } from "framer-motion";
import React from "react";
import { Carousel } from "../../components/Carousel";
import { CarouselChild } from "../../components/Carousel/CarouselChild";
import { Badge } from "../../components/Badge";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

export function AnimeListPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <PageContainer>
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        css={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1.5rem",
          position: "sticky",
          top: 0,
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
              color: colors.gray["800"],
            })}
          >
            Lite
          </span>
        </h3>
        <Button
          size="md"
          variant="ghost"
          colorScheme="gray"
          customCSS={css({
            padding: "0.75rem",
          })}
        >
          <MdCollections />
        </Button>
      </motion.nav>
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
        })}
      >
        <h2
          css={css({
            color: colors.gray["700"],
            fontSize: "1.25rem",
            fontWeight: "bold",
            width: "100%",
          })}
        >
          Trending Anime
        </h2>
        <TrendingAnimeCarousel />
      </div>
    </PageContainer>
  );
}

const GET_TRENDING_ANIME = gql`
  query GetTrendingAnime {
    Page(page: 1, perPage: 10) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        bannerImage
        genres
        description
      }
    }
  }
`;

const TrendingAnimeCarousel = () => {
  const { data, loading } = useQuery(GET_TRENDING_ANIME)

  const trendingAnime = data?.Page?.media || [];

  return (
    <Carousel customCSS={css({
      backgroundColor: colors.gray['300'],
    })}>
      {trendingAnime.map((anime: any) => (
        <CarouselChild
          key={anime.id}
          customCSS={css({
            backgroundImage: `url(${anime.bannerImage})`,
            backgroundSize: 'cover',
          })}
        >
          <div
            css={css({
              display: 'flex',
              flexDirection: 'row',
              padding: '1rem',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              gap: '1rem',
              backgroundColor: 'rgba(0,0,0,0.5)',
            })}
          >
            <img
              src={anime.coverImage.large}
              alt="anime cover"
              css={css({
                borderRadius: '1rem',
                width: '160px',
                height: '100%',
                objectFit: 'cover',
                '@media (max-width: 768px)': {
                  height: '120px',
                  alignSelf: 'start',
                  marginTop: '1rem',
                  width: '80px',
                },
              })}
            />
            <div
              css={css({
                display: 'flex',
                padding: '1rem',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
                flex: 1,
                gap: '1rem',
              })}
            >
              <Link
                href={`/anime/${anime.id}`}
                css={css({
                  color: colors.gray['50'],
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  '@media (max-width: 768px)': {  
                    fontSize: '1.5rem',
                  },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  maxHeight: '3rem',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                })}
              >
                {anime.title.romaji}
              </Link>
              <div
                css={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  gap: '0.5rem',
                })}
              >
                {anime.genres.map((genre: string) => (
                  <Badge key={genre} colorScheme="primary">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p
                css={css({
                  color: colors.gray['300'],
                  fontSize: '0.9rem',
                  lineHeight: '1.25rem',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  maxHeight: '4rem',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                })}
              >
                {anime.description}
              </p>
            </div>
          </div>
        </CarouselChild>
      ))}
    </Carousel>
  );
};
