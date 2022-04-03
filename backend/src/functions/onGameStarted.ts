import { nanoid } from "nanoid"
import { BackendWebsocketActions, IGameStartedEvent, IGameUpdatedEvent } from "alacrity-shared"

import { cardsData, database, IGameModel, IGamePlayer, ws } from "@services"
import { getPlayers } from "@utils"
import { APIGatewayEvent } from "aws-lambda"
import { getCardPile, shuffle } from "../helpers/cards"

export const handler = async (event: APIGatewayEvent) => {
  const body: IGameStartedEvent = JSON.parse(event.body)
  const { roomId } = body

  const data = await cardsData.get()

  const { wildCardPile, drawPile } = getCardPile({ cardsData: data })

  const room = await database.room.get({ roomId })
  const rawPlayers = getPlayers(room)
  const randomOrderedPlayers = shuffle(rawPlayers)
  const players: IGamePlayer[] = randomOrderedPlayers.map((currPlayer) => ({
    ...currPlayer,
    winningPile: [],
    playPile: [],
  }))

  const newGame: IGameModel = {
    id: `game_${nanoid()}`,
    players,
    drawPile,
    wildCardPile,
    status: "started",
    currentPlayerId: randomOrderedPlayers[0],
  }

  await database.room.addGame({ roomId, game: newGame })

  const message = players.map((player) =>
    ws.sendMessage<IGameUpdatedEvent>({
      connectionId: player.id,
      body: {
        action: BackendWebsocketActions.GameUpdated,
        currentGame: {
          id: newGame.id,
          players: newGame.players,
          totalDrawCardsRemaining: newGame.drawPile.length,
          wildCard: newGame.wildCardPile[newGame.wildCardPile.length - 1],
          currentPlayerId: newGame.currentPlayerId,
          status: newGame.status,
        },
      },
    }),
  )

  await Promise.all(message)

  return { statusCode: 200 }
}
