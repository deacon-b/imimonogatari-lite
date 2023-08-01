import React from "react";
import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import { SerializedStyles } from "@emotion/react/macro";
import { CSSObject } from "@emotion/react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
  children?: React.ReactNode;
  customCSS?: SerializedStyles;
  variant?: "solid" | "outline" | "ghost";
  colorScheme?: keyof typeof colors;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  customCSS,
  variant = "solid",
  colorScheme = "primary",
  size = "md",
  onClick = () => {},
  disabled = false,
}: ButtonProps) => {
  const getSizeStyles = () => {
    const sizeStyles: Record<string, CSSObject> = {
      sm: {
        padding: "0.5rem 1rem",
        fontSize: "0.75rem",
      },
      lg: {
        padding: "1rem 2rem",
        fontSize: "1.5rem",
      },  
      md: {
        padding: "0.75rem 1rem",
        fontSize: "1rem",
      },
    };
    return sizeStyles[size];
  };

  const defaultStyles: CSSObject = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.05s ease",
    ...getSizeStyles(),
  };

  const variantStyles: Record<string, CSSObject> = {
    solid: {
      backgroundColor: colors[colorScheme]["500"],
      color: "white",
    },
    outline: {
      backgroundColor: "transparent",
      border: `2px solid ${colors[colorScheme]["500"]}`,
      color: colors[colorScheme]["500"],
    },
    ghost: {
      backgroundColor: "transparent",
      color: colors[colorScheme]["500"],
    },
  };

  const hoverStyles: CSSObject = {
    backgroundColor: variant === "solid" ? colors[colorScheme]["400"] : "transparent",
    color: variant === "solid" ? "white" : colors[colorScheme]["400"],
  };

  const activeStyles: CSSObject = {
    backgroundColor: variant === "solid" ? colors[colorScheme]["600"] : "transparent",
    color: variant === "solid" ? "white" : colors[colorScheme]["600"],
  };

  return (
    <button
      onClick={onClick}
      css={css([
        defaultStyles,
        variantStyles[variant],
        {
          "&:hover": hoverStyles,
          "&:active": activeStyles,
        },
        customCSS, // Allow custom CSS to override the default styles and variant styles
      ])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
