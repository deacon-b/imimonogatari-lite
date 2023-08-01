import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import React from "react";

export const Stat = ({
  title, children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      })}
    >
      <p
        css={css({
          color: colors.gray["500"],
          fontSize: "1rem",
          fontWeight: "600",
        })}
      >
        {title}
      </p>
      <p
        css={css({
          color: colors.gray["800"],
          fontSize: "1rem",
          fontWeight: "bold",
        })}
      >
        {children}
      </p>
    </div>
  );
};
