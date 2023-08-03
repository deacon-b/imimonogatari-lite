import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import { motion } from "framer-motion";
import React from "react";

export const EditOverlay = () => (
  <motion.div
    css={css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: colors.blue["500"],
      opacity: 0.8,
    })}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.8 }}
  >
    <h4
      css={css({
        color: colors.gray["50"],
        fontSize: "1.5rem",
        fontWeight: "bold",
      })}
    >
      Edit
    </h4>
  </motion.div>
);
