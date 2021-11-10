import React from "react"
import { Flex, Image, Text } from "rebass"
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

interface ICardProps {
  symbol: CardSymbol
  text: string
  side?: "front" | "back"
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

export const Card: React.FC<ICardProps> = ({
  symbol,
  text,
  side = "front",
}) => {
  const color = CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]
  return (
    <Flex
      sx={{
        flexDirection: "column",
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        width: 242,
        height: 327,
        justifyContent: "center",
        alignItems: "center",
        border: `2px solid ${side === "front" ? theme.colors.white : color}`,
      }}
    >
      {side === "front" ? (
        <>
          <CardText>{text}</CardText>
          <Image
            sx={{ height: 75, width: 75, marginY: 50, fill: "pink" }}
            src={symbolToImg[symbol]}
          />
          <CardText upsideDown>{text}</CardText>
        </>
      ) : (
        <Flex
          sx={{
            backgroundColor: color,
            width: 228,
            height: 307,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          <Image src={CardBackground} sx={{ position: "absolute" }} />
          <Text
            sx={{
              fontSize: 45,
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
}

const CardText: React.FC<ICardTextProps> = ({ children, upsideDown }) => {
  return (
    <Text
      sx={{
        fontFamily: theme.fonts.antonio,
        fontSize: 45,
        color: theme.colors.black,
        textTransform: "uppercase",
        ...(upsideDown && { transform: "rotate(180deg)" }),
      }}
    >
      {children}
    </Text>
  )
}
