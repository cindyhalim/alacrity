import { IGamePlayer } from "alacrity-shared"
import React from "react"
import { Flex } from "rebass"
import { PlayerCard, IPlayerCardProps } from "src/components"
import { useGetMainPlayer } from "src/utils/helpers"

interface IPlayerBlockProps {
  player: IGamePlayer
  isCurrentPlayerTurn: boolean
}

export const PlayerBlock: React.FC<IPlayerBlockProps> = ({ player, isCurrentPlayerTurn }) => {
  const mainPlayer = useGetMainPlayer()

  const playPile = player.playPile
  const playerCard = playPile?.[playPile.length - 1] || null

  const isOpponent = !(player?.id === mainPlayer?.id)

  const sharedProps: IPlayerCardProps = {
    card: playerCard,
    playerName: player.name,
    isOpponent,
    isCurrentPlayerTurn,
  }

  return isOpponent ? (
    <PlayerCard {...sharedProps} />
  ) : (
    <Flex
      sx={{
        width: "100%",
        position: "absolute",
        bottom: -20,
        justifyContent: "center",
      }}
    >
      <PlayerCard {...sharedProps} />
    </Flex>
  )
}
