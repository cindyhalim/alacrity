import { IGamePlayer, IPlayingCard } from "alacrity-shared"
import React from "react"
import { Flex, Text } from "rebass"
import { theme } from "src/theme"
import { CardEmptyState } from "../../components/card-empty-state"
import { Card } from "../../components/card"

interface IPlayerBlockProps {
  player?: IGamePlayer
  hasCurrentTurn: boolean
  isMe: boolean
}

interface IMeBlockProps {
  card?: IPlayingCard
}
interface IOpponentBlockProps extends IMeBlockProps {
  playerName: string
  hasCurrentTurn: boolean
}

export const PlayerBlock: React.FC<IPlayerBlockProps> = ({ player, isMe, hasCurrentTurn }) => {
  const playPile = player?.playPile
  const card = playPile ? playPile[playPile.length - 1] : undefined
  return isMe ? (
    <MeBlock card={card} />
  ) : (
    <OpponentBlock playerName={player?.name || ""} card={card} hasCurrentTurn={hasCurrentTurn} />
  )
}

const OpponentBlock: React.FC<IOpponentBlockProps> = ({ playerName, card, hasCurrentTurn }) => {
  return (
    <Flex flexDirection={"column"}>
      <Text
        sx={{
          fontFamily: theme.fonts.antonio,
          fontSize: 16,
          textAlign: "center",
          marginBottom: "7px",
          color: hasCurrentTurn ? theme.colors.red : theme.colors.black,
        }}
      >
        {playerName.toUpperCase()}
      </Text>
      {card ? (
        <Card text={card?.text} symbol={card?.symbol} size={"small"} side={"front"} />
      ) : (
        <CardEmptyState size={"small"} />
      )}
    </Flex>
  )
}

const MeBlock: React.FC<IMeBlockProps> = ({ card }) => (
  <Flex
    sx={{
      width: "100%",
      position: "absolute",
      bottom: -60,
      justifyContent: "center",
    }}
  >
    {card ? <Card {...card} size={"large"} side={"front"} /> : null}
  </Flex>
)
