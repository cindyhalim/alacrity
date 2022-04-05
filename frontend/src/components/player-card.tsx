import { IPlayingCard } from "alacrity-shared"
import React from "react"
import { Flex, Text } from "rebass"
import { TCardSize } from "."
import { theme } from "../theme"
import { Card } from "./card"
import { CardEmptyState } from "./card-empty-state"

interface IPlayerCardProps {
  card: IPlayingCard | null
  playerName: string
  isCurrentPlayerTurn: boolean
  isOpponent?: boolean
}

export const PlayerCard: React.FC<IPlayerCardProps> = ({
  playerName,
  card,
  isCurrentPlayerTurn,
  isOpponent = false,
}) => {
  const cardSize: TCardSize = isOpponent ? "small" : "large"
  return (
    <Flex flexDirection={"column"}>
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
      {card ? (
        <Card {...card} size={cardSize} side={"front"} />
      ) : (
        <CardEmptyState size={cardSize} />
      )}
    </Flex>
  )
}
