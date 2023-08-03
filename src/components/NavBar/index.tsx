import { css } from "@emotion/react";
import { Button } from "src/components/Button";
import { colors } from "src/utils/colors";
import { MdBookmarks } from "react-icons/md";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const NavBar = ({
  hasBackButton = false,
  isAtTopStatic = false,
}: {
  hasBackButton?: boolean;
  isAtTopStatic?: boolean;
}) => {
  // check if scroll position is at the top
  const [isAtTop, setIsAtTop] = React.useState(!isAtTopStatic);
  React.useEffect(() => {
    if (isAtTopStatic) {
      setIsAtTop(false);
      return;
    }
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      css={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1.5rem",
        position: "fixed",
        top: 0,
        zIndex: 50,
        width: "100%",
        backgroundColor: isAtTop ? "transparent" : colors.gray["200"],
      })}
    >
      {hasBackButton && (
        <Button
          size="md"
          variant="ghost"
          colorScheme="primary"
          customCSS={css({
            padding: "0.5rem",
          })}
          onClick={() => {
            router.back();
          }}
        >
          {"<"}
        </Button>
      )}
      <Link
        href="/"
        css={css({
          color: colors.primary["500"],
          fontSize: "1.5rem",
          fontWeight: "bold",
          textDecoration: "none",
        })}
      >
        意{" "}
        <span
          css={css({
            color: isAtTop ? colors.gray["200"] : colors.gray["800"],
          })}
        >
          Lite
        </span>
      </Link>
      <Link href="/collections">
        <Button
          size="md"
          variant="ghost"
          colorScheme="primary"
          customCSS={css({
            padding: "0.5rem",
          })}
        >
          <MdBookmarks />
        </Button>
      </Link>
    </motion.nav>
  );
};
