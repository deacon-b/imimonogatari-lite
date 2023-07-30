import { SerializedStyles, css } from "@emotion/react";
import { Button } from "src/components/Button";
import { colors } from "src/utils/colors";
import React from "react";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  customCSS?: SerializedStyles;
}

export const Carousel = (props: CarouselProps) => {
  const { children, customCSS, ...restProps } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div
      css={css([{
        width: "100%",
        height: "256px",
        overflow: "hidden",
        borderRadius: "1rem",
        position: "relative",
      }, customCSS])}
      {...restProps}
    >
      <div
        css={css({
          display: "flex",
          width: "100%",
          height: "100%",
          overflowX: "scroll",
          borderRadius: "1rem",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          scrollbarWidth: "none",
          "& > *": {
            scrollSnapAlign: "start",
          },
        })}
        ref={ref}
      >
        {children}
      </div>
      <div
        css={css({
          display: "flex",
          justifyContent: "end",
          gap: "1rem",
          padding: "1rem",
          alignItems: "end",
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          "@media (max-width: 768px)": {
            justifyContent: "space-between",
          },
        })}
      >
        <Button
          customCSS={css({
            borderRadius: "100%",
            color: colors.gray["50"],
            "&:hover": {
              color: colors.gray["100"],
            },
            "&:active": {
              color: colors.gray["200"],
            },
          })}
          variant="ghost"
          onClick={() => {
            if ((ref.current?.scrollLeft || 0) === 0) {
              ref.current?.scrollTo({
                top: 0,
                left: ref.current?.scrollWidth,
                behavior: "smooth",
              });
              return;
            }
            if (ref.current) {
              ref.current.scrollBy({
                top: 0,
                left: -ref.current.clientWidth,
                behavior: "smooth",
              });
            }
          }}
        >
          {"<"}
        </Button>
        <Button
          customCSS={css({
            borderRadius: "100%",
            color: colors.gray["50"],
            "&:hover": {
              color: colors.gray["100"],
            },
            "&:active": {
              color: colors.gray["200"],
            },
          })}
          variant="ghost"
          // onClick scroll to next child
          onClick={() => {
            // Calculate the maximum scroll position
            if (!ref.current) return;
            const maxScrollLeft = ref.current?.scrollWidth - ref.current?.clientWidth;
            
            // Check if the carousel is at the end (considering floating-point errors)
            if (ref.current && Math.abs(maxScrollLeft - ref.current.scrollLeft) < 1) {
              // Snap back to the beginning
              ref.current.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
              return;
            }
        
            // Scroll to the next child
            if (ref.current) {
              ref.current.scrollBy({
                top: 0,
                left: ref.current.clientWidth,
                behavior: "smooth",
              });
            }
          }}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};
