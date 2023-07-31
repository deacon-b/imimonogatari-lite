import { SerializedStyles, css } from "@emotion/react";
import { MotionProps, motion } from "framer-motion";
import React from "react";

interface CarouselChildProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  customCSS?: SerializedStyles;
}
export const CarouselChild = (props: CarouselChildProps) => {
  const { children, customCSS, ...restProps } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      css={css([
        {
          width: "100%",
          minWidth: "100%",
          height: "100%",
        },
        customCSS,
      ])}
    >
      {children}
    </motion.div>
  );
};