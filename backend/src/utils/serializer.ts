import { IPlayer, IGame } from "alacrity-shared"
import { database, IGameModel } from "@services"
import { getPlayers } from "./mappers"

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

export const getSerializedCurrentGame = ({ game }: { game: IGameModel }): IGame => {
  try {
    if (!game || game.status === "ended") {
      return null
    }

    const players: IPlayer[] = game.players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        points: player?.winningPile.length,
        playPile: player?.playPile,
      }
    })

    return {
      id: game.id,
      players,
      totalDrawCardsRemaining: game.drawPile.length,
      wildCard: game.wildCardPile[game.wildCardPile.length - 1],
      currentPlayerId: game.currentPlayerId,
    }
  } catch (e) {
    return null
  }
}
