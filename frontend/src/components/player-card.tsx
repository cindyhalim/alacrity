import { IPlayingCard } from "alacrity-shared"
import React, { useEffect } from "react"
import { Flex, Text } from "rebass"
import { theme } from "../theme"
import { useCardAnimationSequence, usePrevious } from "src/utils/helpers"
import { Card, CardEmptyState, TCardSize, AnimatedCardWrapper } from "../components"

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
      <AnimatedPlayingCard card={card} cardSize={cardSize} totalCards={totalCards} />
    </Flex>
  )
}

interface IAnimatedPlayingCardProps {
  cardSize: TCardSize
  totalCards?: number
  card: IPlayingCard | null
}

export const AnimatedPlayingCard: React.FC<IAnimatedPlayingCardProps> = ({
  cardSize,
  totalCards: currTotal = 0,
  card,
}) => {
  const { cardAnimation, addSequence, removeSequence, isFlipped } = useCardAnimationSequence()
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
    <AnimatedCardWrapper
      id={"animated-playing-card"}
      animate={cardAnimation}
      cardSize={cardSize}
      isFlipped={isFlipped}
    >
      {card ? (
        <Card {...card} size={cardSize} side={"front"} />
      ) : (
        <CardEmptyState size={cardSize} />
      )}
    </AnimatedCardWrapper>
  )
}
