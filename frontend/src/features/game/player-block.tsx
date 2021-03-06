import { FrontendWebsocketActions, IGamePlayer, IPlayingCard, IWildCard } from "alacrity-shared"
import React from "react"
import { Flex } from "rebass"
import { PlayerCard, IPlayerCardProps } from "src/components"
import { useAppSelector } from "src/redux/utils"
import { useMainPlayer } from "src/utils/helpers"
import { useWSContext } from "src/utils/websocket-context"

interface IPlayerBlockProps {
  player: IGamePlayer
  isCurrentPlayerTurn: boolean
}

export const PlayerBlock: React.FC<IPlayerBlockProps> = ({ player, isCurrentPlayerTurn }) => {
  const mainPlayer = useMainPlayer()
  const { sendMessage } = useWSContext()
  const wildCard = useAppSelector((state) => state.currentGame?.wildCard)
  const roomId = useAppSelector((state) => state.roomId)

  const playPile = player.playPile
  const playerCard = playPile?.[playPile.length - 1] || null

  const isOpponent = player?.id !== mainPlayer?.id

  const sharedProps: IPlayerCardProps = {
    card: playerCard,
    playerName: player.name,
    isOpponent,
    isCurrentPlayerTurn,
  }

  const handleCardWon = ({
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
        roomId,
        loserPlayerId: player.id,
      })
    }
  }

  return isOpponent ? (
    <PlayerCard
      {...sharedProps}
      totalCards={player.playPile?.length}
      onClick={() => handleCardWon({ playerCard, mainPlayer, wildCard })}
    />
  ) : (
    <Flex
      sx={{
        width: "100%",
        position: "absolute",
        bottom: -80,
        justifyContent: "center",
      }}
    >
      <PlayerCard {...sharedProps} totalCards={mainPlayer.playPile?.length} />
    </Flex>
  )
}
