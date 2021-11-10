import React from "react";
import { Box } from "rebass";

import { getStylesFromSize, TCardSize } from "./card";

interface ICardEmptyStateProps {
  size: TCardSize;
}
export const CardEmptyState: React.FC<ICardEmptyStateProps> = ({ size }) => {
  const { containerCard } = getStylesFromSize(size);
  return (
    <Box
      sx={{
        width: containerCard.width,
        height: containerCard.height,
        bg: "grey",
        opacity: 0.3,
        borderRadius: 15,
      }}
    />
  );
};
