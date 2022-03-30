import { IPlayer, IGame } from "alacrity-shared"
import { database } from "@services"
import { getGame, getPlayers } from "./mappers"

export const getSerializedPlayerPool = async ({
  roomId,
}: {
  roomId: string
}): Promise<IPlayer[]> => {
  const room = await database.room.get({ roomId })
  const players = getPlayers(room).map((player) => ({
    id: player.id,
    name: player.name,
  }))

  return players
}

export const getSerializedCurrentGame = async ({ roomId }: { roomId: string }): Promise<IGame> => {
  try {
    const room = await database.room.get({ roomId })
    const game = getGame(room)
    const players: IPlayer[] = getPlayers(room).map((player) => {
      const gamePlayer = game?.players.find((gamePlayer) => player.id === gamePlayer.id)

      return {
        id: player.id,
        name: player.name,
        points: gamePlayer?.winningPile.length,
        playPile: gamePlayer?.playPile,
      }
    })

    return game
      ? {
          id: game.id,
          players,
          totalDrawCardsRemaining: game.drawPile.length,
          wildCard: game.wildCardPile[game.wildCardPile.length - 1],
          currentPlayerId: game.currentPlayerId,
          status: game.status,
        }
      : null
  } catch (e) {
    return null
  }
}
