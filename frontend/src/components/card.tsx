import React from "react"
import { Flex, Image, SxStyleProp, Text } from "rebass"
import { theme } from "../theme"
import { CardSymbol } from "../types"

import Circle from "src/assets/circle.svg"
import Diamond from "src/assets/diamond.svg"
import Dots from "src/assets/dots.svg"
import Hash from "src/assets/hash.svg"
import Pause from "src/assets/pause.svg"
import Plus from "src/assets/plus.svg"
import Star from "src/assets/star.svg"
import Wave from "src/assets/wave.svg"
import CardBackground from "src/assets/card-background.svg"

export type TCardSize = "small" | "medium" | "large"
interface ICardProps {
  symbol: CardSymbol
  text: string
  side?: "front" | "back"
  size?: TCardSize
  containerSx?: SxStyleProp
}

const symbolToImg: { [key in CardSymbol]: string } = {
  CIRCLE: Circle,
  DIAMOND: Diamond,
  DOTS: Dots,
  HASH: Hash,
  PAUSE: Pause,
  PLUS: Plus,
  STAR: Star,
  WAVE: Wave,
}

const CARD_COLORS = [
  theme.colors.black,
  theme.colors.navy,
  theme.colors.orange,
  theme.colors.red,
  theme.colors.sand,
]

export const getStylesFromSize = (size: TCardSize) => {
  switch (size) {
    case "large":
      return theme.styles.largeCard
    case "medium":
      return theme.styles.mediumCard
    case "small":
    default:
      return theme.styles.smallCard
  }
}

export const Card: React.FC<ICardProps> = ({
  symbol,
  text,
  side = "front",
  size = "small",
  containerSx,
}) => {
  const {
    containerCard: containerCardStyles,
    innerCard: innerCardStyles,
    symbol: symbolStyles,
    fontSize,
  } = getStylesFromSize(size)

  const color = CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]

  return (
    <Flex
      sx={{
        flexDirection: "column",
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        justifyContent: "center",
        alignItems: "center",
        border: `2px solid ${side === "front" ? theme.colors.white : color}`,
        ...containerCardStyles,
        ...containerSx,
      }}
    >
      {side === "front" ? (
        <>
          <CardText fontSize={fontSize.front}>{text}</CardText>
          <Image
            sx={{ ...symbolStyles, fill: "pink" }}
            src={symbolToImg[symbol]}
          />
          <CardText fontSize={fontSize.front} upsideDown>
            {text}
          </CardText>
        </>
      ) : (
        <Flex
          sx={{
            backgroundColor: color,
            justifyContent: "center",
            alignItems: "center",
            ...innerCardStyles,
          }}
        >
          <Image
            src={CardBackground}
            sx={{ position: "absolute", height: "85%", width: "85%" }}
          />
          <Text
            sx={{
              fontSize: fontSize.back,
              fontFamily: theme.fonts.sancreek,
              color: theme.colors.white,
            }}
          >
            alacrity
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

interface ICardTextProps {
  upsideDown?: boolean
  fontSize?: number
}

const CardText: React.FC<ICardTextProps> = ({
  children,
  upsideDown,
  fontSize,
}) => {
  return (
    <Text
      sx={{
        fontFamily: theme.fonts.antonio,
        color: theme.colors.black,
        textTransform: "uppercase",
        overflowWrap: "break-word",
        textAlign: "center",
        fontSize,
        ...(upsideDown && { transform: "rotate(180deg)" }),
      }}
    >
      {children}
    </Text>
  )
}
