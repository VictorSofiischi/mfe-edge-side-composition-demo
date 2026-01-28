import React from "react";
import { type TypographyVariant } from "./types";
import { baseStyle, variantStyles } from "./styles";

type SharedTextProps = {
  text: string;
  variant?: TypographyVariant;
};

export const SharedTypography: React.FC<SharedTextProps> = ({
  text,
  variant,
}) => {
  const style: React.CSSProperties = {
    ...baseStyle,
    ...(variant ? variantStyles[variant] : {}),
  };

  return <span style={style}>{text}</span>;
};
