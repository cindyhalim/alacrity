import { database, ws } from "@services"
import { getGame, getSerializedCurrentGame } from "@utils"

import { IGamePlayer } from "@services"
import { BackendWebsocketActions, ICardWonEvent, IGameUpdatedEvent } from "alacrity-shared"
import { APIGatewayEvent } from "aws-lambda"

export const handler = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId: winnerPlayerId },
    body,
  } = event
  const { roomId, loserPlayerId }: ICardWonEvent = JSON.parse(body)

  console.log("onCardWon: recieved route key:", routeKey)

  console.log("retrieving game")
  const room = await database.room.get({ roomId })
  const game = getGame(room)

  console.log("searching loser player", loserPlayerId)
  const loserPlayPile = game.players.find((player) => player.id === loserPlayerId).playPile
  const cardToTransfer = loserPlayPile.pop()

  const updatedPlayers = game.players.reduce((prev: IGamePlayer[], player) => {
    let updatedPlayer = player
    if (player.id === loserPlayerId) {
      updatedPlayer = {
        ...updatedPlayer,
        playPile: loserPlayPile,
      }
    }

    if (player.id === winnerPlayerId) {
      updatedPlayer = {
        ...updatedPlayer,
        winningPile: [...player.winningPile, cardToTransfer],
      }
    }

    return [...prev, updatedPlayer]
  }, [])

  const updatedGame = { ...game, players: updatedPlayers }

  console.log("db: updating game ")
  await database.room.updateGame({ roomId, game: updatedGame })

  console.log("retrieving serialized updated game")
  const serializedUpdatedGame = getSerializedCurrentGame({ game: updatedGame })

  console.log("sending event", BackendWebsocketActions.GameUpdated)
  await Promise.all(
    updatedPlayers.map((player) =>
      ws.sendMessage<IGameUpdatedEvent>({
        connectionId: player.id,
        body: {
          action: BackendWebsocketActions.GameUpdated,
          currentGame: serializedUpdatedGame,
        },
      }),
    ),
  )

  return { statusCode: 200 }
}
