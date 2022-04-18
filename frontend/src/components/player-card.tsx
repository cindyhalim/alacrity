import { IPlayingCard } from "alacrity-shared"
import React, { useEffect } from "react"
import { Flex, Text } from "rebass"
import { theme } from "../theme"
import { useCardAnimationSequence, usePrevious } from "src/utils/helpers"
import { Card, CardEmptyState, TCardSize } from "../components"
import { motion } from "framer-motion"

export interface IPlayerCardProps {
  card: IPlayingCard | null
  playerName: string
  isCurrentPlayerTurn: boolean
  isOpponent?: boolean
  totalCards?: number
  onClick?: () => void
}

export const PlayerCard: React.FC<IPlayerCardProps> = ({
  playerName,
  card,
  isCurrentPlayerTurn,
  isOpponent = false,
  onClick,
  totalCards,
}) => {
  const cardSize: TCardSize = isOpponent ? "small" : "large"

  return (
    <Flex flexDirection={"column"} onClick={onClick}>
      <Text
        sx={{
          fontFamily: theme.fonts.antonio,
          fontSize: isOpponent ? 16 : 20,
          textAlign: "center",
          marginBottom: "7px",
          color: isCurrentPlayerTurn ? theme.colors.red : theme.colors.black,
        }}
      >
        {playerName.toUpperCase()}
      </Text>
      <PlayingCard card={card} cardSize={cardSize} totalCards={totalCards} />
    </Flex>
  )
}

interface IPlayingCardProps {
  cardSize: TCardSize
  totalCards?: number
  card: IPlayingCard | null
}

export const PlayingCard: React.FC<IPlayingCardProps> = ({
  cardSize,
  totalCards: currTotal = 0,
  card,
}) => {
  const { cardAnimation, addSequence, removeSequence, isRevealed } = useCardAnimationSequence()
  const prevTotal = usePrevious(currTotal)

  useEffect(() => {
    if (prevTotal === currTotal) {
      return
    }

    if (prevTotal && currTotal < prevTotal) {
      removeSequence()
      return
    }

    addSequence()
  }, [currTotal])

  return (
    <motion.div id={"animated-playing-card"} animate={cardAnimation}>
      {card ? (
        <Card
          cardData={card}
          color={card.color}
          size={cardSize}
          side={isRevealed ? "front" : "back"}
        />
      ) : (
        <CardEmptyState size={cardSize} />
      )}
    </motion.div>
  )
}
