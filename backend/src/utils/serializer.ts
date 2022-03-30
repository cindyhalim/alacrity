import { IRoom } from "alacrity-shared"
import { database } from "@services"
import { getGame, getPlayers } from "./mappers"

export const getSerializedRoom = async ({ roomId }: { roomId: string }): Promise<IRoom> => {
  try {
    const room = await database.room.get({ roomId })
    const game = getGame(room)
    const players: IRoom["players"] = getPlayers(room).map(({ player }) => {
      const gamePlayer = game?.players.find((gamePlayer) => player.id === gamePlayer.id)

      return {
        id: player.id,
        name: player.name,
        points: gamePlayer?.winningPile.length,
        playPile: gamePlayer?.playPile,
      }
    })

    return {
      id: roomId,
      players,
      game: game
        ? {
            id: game.id,
            totalDrawCardsRemaining: game.drawPile.length,
            wildCard: game.wildCardPile[game.wildCardPile.length - 1],
            currentPlayerId: game.currentPlayerId,
            status: game.status,
          }
        : null,
    }
  } catch (e) {
    return null
  }
}
