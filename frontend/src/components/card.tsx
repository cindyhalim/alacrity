import React from "react"
import { Flex, Image, SxStyleProp, Text } from "rebass"
import { theme } from "../theme"
import { CardColor, CardSymbol, IPlayingCard, IWildCard } from "alacrity-shared"

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

type CardData = IPlayingCard | IWildCard
interface ICardProps {
  cardData?: CardData
  color: CardColor | undefined
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
  cardData,
  color,
  side = "front",
  size = "small",
  containerSx,
}) => {
  const cardSize = cardData?.type === "wildCard" ? "medium" : size
  const {
    containerCard: containerCardStyles,
    innerCard: innerCardStyles,
    symbol: symbolStyles,
    fontSize,
  } = getStylesFromSize(cardSize)

  const getFrontCard = (cardData: CardData | undefined) => {
    switch (cardData?.type) {
      case "wildCard":
        const { symbols } = cardData
        return (
          <>
            <Image sx={{ height: 40, width: 40, marginY: 10 }} src={symbolToImg[symbols[0]]} />
            <CardText
              sx={{ borderBottom: `1px solid ${theme.colors.black}` }}
              fontSize={fontSize.front}
            >
              WILD CARD
            </CardText>
            <CardText fontSize={fontSize.front} upsideDown>
              WILD CARD
            </CardText>
            <Image sx={{ height: 40, width: 40, marginY: 10 }} src={symbolToImg[symbols[1]]} />
          </>
        )
      case "playing":
        const { text, symbol } = cardData
        return (
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "space-around",
              height: "100%",
              alignItems: "center",
            }}
          >
            <CardText fontSize={fontSize.front}>{text}</CardText>
            <Image sx={{ ...symbolStyles }} src={symbolToImg[symbol]} />
            <CardText fontSize={fontSize.front} upsideDown>
              {text}
            </CardText>
          </Flex>
        )
      default:
        return null
    }
  }

  return (
    <Flex
      sx={{
        flexDirection: "column",
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        border: `2px solid ${side === "front" ? theme.colors.white : color}`,
        ...containerCardStyles,
        ...containerSx,
      }}
    >
      {side === "front" ? (
        getFrontCard(cardData)
      ) : (
        <Flex
          sx={{
            backgroundColor: color,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            ...innerCardStyles,
          }}
        >
          <Image src={CardBackground} sx={{ position: "absolute", height: "90%", width: "90%" }} />
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
  sx?: SxStyleProp
}

const CardText: React.FC<ICardTextProps> = ({ children, upsideDown, fontSize, sx }) => {
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
        ...sx,
      }}
    >
      {children}
    </Text>
  )
}
