import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import React from "react";

export const Badge = (props: { children: React.ReactNode; colorScheme?: keyof typeof colors; }) => {
  const { children, colorScheme } = props;

  return (
    <div
      css={css({
        padding: "0.5rem",
        borderRadius: "0.5rem",
        backgroundColor: colorScheme ? colors[colorScheme]["500"] : colors.gray["500"],
        color: colorScheme ? colors[colorScheme]["50"] : colors.gray["50"],
        fontSize: "0.75rem",
        fontWeight: "bold",
        "@media (max-width: 640px)": {
          padding: "0.25rem",
        },
      })}
    >
      {children}
    </div>
  );
};
