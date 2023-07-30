import { SerializedStyles, css } from "@emotion/react";
import React from "react";

interface CarouselChildProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  customCSS?: SerializedStyles;
}
export const CarouselChild = (props: CarouselChildProps) => {
  const { children, customCSS, ...restProps } = props;

  return (
    <div
      css={css([
        {
          width: "100%",
          minWidth: "100%",
          height: "100%",
        },
        customCSS,
      ])}
      {...restProps}
    >
      {children}
    </div>
  );
};
