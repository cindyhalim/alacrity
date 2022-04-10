import { FrontendWebsocketActions, IGamePlayer, IPlayingCard, IWildCard } from "alacrity-shared"
import React from "react"
import { Flex } from "rebass"
import { PlayerCard, IPlayerCardProps } from "src/components"
import { useAppSelector } from "src/redux/utils"
import { useGetMainPlayer } from "src/utils/helpers"
import { useWSContext } from "src/utils/websocket-context"

interface IPlayerBlockProps {
  player: IGamePlayer
  isCurrentPlayerTurn: boolean
}

export const PlayerBlock: React.FC<IPlayerBlockProps> = ({ player, isCurrentPlayerTurn }) => {
  const mainPlayer = useGetMainPlayer()
  const { sendMessage } = useWSContext()
  const wildCard = useAppSelector((state) => state.currentGame?.wildCard)

  const playPile = player.playPile
  const playerCard = playPile?.[playPile.length - 1] || null

  const isOpponent = !(player?.id === mainPlayer?.id)

  const sharedProps: IPlayerCardProps = {
    card: playerCard,
    playerName: player.name,
    isOpponent,
    isCurrentPlayerTurn,
  }

  const handleCardClick = ({
    playerCard,
    mainPlayer,
    wildCard,
  }: {
    playerCard: IPlayingCard | null
    mainPlayer: IGamePlayer | undefined
    wildCard: IWildCard | undefined
  }) => {
    const mainPlayerPile = mainPlayer?.playPile
    const mainPlayerCard = mainPlayerPile?.[mainPlayerPile.length - 1] || null

    const matchesWildCard = wildCard?.symbols.every(
      (symbol) => symbol === mainPlayerCard?.symbol || symbol === playerCard?.symbol,
    )

    if (!playerCard) {
      return
    }

    if (mainPlayerCard?.symbol === playerCard.symbol || matchesWildCard) {
      sendMessage({
        action: FrontendWebsocketActions.CardWon,
        loserPlayerId: player.id,
      })
    }
  }

  return isOpponent ? (
    <PlayerCard
      {...sharedProps}
      onClick={() => handleCardClick({ playerCard, mainPlayer, wildCard })}
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
      <PlayerCard {...sharedProps} />
    </Flex>
  )
}
