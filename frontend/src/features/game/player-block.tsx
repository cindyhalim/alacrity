import { IGamePlayer } from "alacrity-shared"
import React from "react"
import { Flex } from "rebass"
import { PlayerCard } from "src/components/player-card"

interface IPlayerBlockProps {
  player?: IGamePlayer
  isCurrentPlayerTurn: boolean
  isOpponent?: boolean
}

export const PlayerBlock: React.FC<IPlayerBlockProps> = ({
  player,
  isOpponent,
  isCurrentPlayerTurn,
}) => {
  const playPile = player?.playPile
  const card = playPile ? playPile[playPile.length - 1] : null
  const playerName = player?.name || ""

  return isOpponent ? (
    <PlayerCard
      card={card}
      playerName={playerName}
      isCurrentPlayerTurn={isCurrentPlayerTurn}
      isOpponent
    />
  ) : (
    <Flex
      sx={{
        width: "100%",
        position: "absolute",
        bottom: -20,
        justifyContent: "center",
      }}
    >
      <PlayerCard card={card} playerName={playerName} isCurrentPlayerTurn={isCurrentPlayerTurn} />
    </Flex>
  )
}
