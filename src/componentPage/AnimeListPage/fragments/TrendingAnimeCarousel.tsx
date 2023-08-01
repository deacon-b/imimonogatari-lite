import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import React from "react";
import { Carousel } from "../../../components/Carousel";
import { CarouselChild } from "../../../components/Carousel/CarouselChild";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { SerializedStyles } from "@emotion/react";
import { useDraggable } from "src/hooks/useDraggable";

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


export const TrendingAnimeCarousel = (props: {
  customCSS?: SerializedStyles;
}) => {
  const { data, loading } = useQuery(GET_TRENDING_ANIME);

  const trendingAnime = data?.Page?.media || [];

  return (
    <Carousel customCSS={css([{
      backgroundColor: colors.gray['800'],
    }, props.customCSS])}>
      {trendingAnime.map((anime: any) => (
        <CarouselChild
          key={anime.id}
          customCSS={css({
            backgroundImage: `url(${anime.bannerImage})`,
            backgroundSize: 'cover',
          })}
        >
          <Link
            href={`/anime/${anime.id}`}
            css={css({
              display: 'flex',
              flexDirection: 'row',
              padding: '5rem 1rem 1rem 1rem',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              gap: '1rem',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textDecoration: 'none',
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
              })} />
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
              <h2
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
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                })}
              >
                {anime.title.romaji}
              </h2>
              <div
                css={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  gap: '0.5rem',
                })}
              >
                {/* {anime.genres.map((genre: string) => (
                      <Badge key={genre} colorScheme="primary">
                        {genre}
                      </Badge>
                    ))} */}
                {anime.genres.map((genre: string) => (
                  <>
                    <p css={css({
                      color: colors.gray['300'],
                      fontSize: '0.75rem',
                    })}>
                      {genre + (anime.genres.indexOf(genre) === anime.genres.length - 1 ? '' : ' • ')}
                    </p>
                  </>

                ))}
              </div>
              <p
                css={css({
                  color: colors.gray['200'],
                  fontSize: '0.9rem',
                  lineHeight: '1.25rem',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  maxHeight: '4rem',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  "& > i": {
                    fontStyle: 'italic',
                  }
                })}
                dangerouslySetInnerHTML={{ __html: anime.description }}
              >
              </p>
            </div>
          </Link>
        </CarouselChild>
      ))}
    </Carousel>
  );
};
