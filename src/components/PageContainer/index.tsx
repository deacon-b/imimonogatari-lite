import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import { CSSObject } from "@emotion/serialize";

interface PageContainerProps {
  children?: React.ReactNode;
  customCSS?: CSSObject;
}

export const PageContainer = (props: PageContainerProps) => {
  const { children, customCSS } = props;
  return (
    <div
      css={css([
        {
          backgroundColor: colors.gray[200],
          width: "100%",
          minHeight: "100vh",
        },
        customCSS,
      ])}
    >
      {children}
    </div>
  );
};
