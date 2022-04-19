import {
  BackendWebsocketActions,
  IGameScoreUpdatedEvent,
  IGameStartedEvent,
  IGameUpdatedEvent,
  IPlayerScoreInfo,
} from "alacrity-shared"

import { database, ws } from "@services"
import { getGame, getPlayers, getSerializedCurrentGame } from "@utils"
import { APIGatewayEvent } from "aws-lambda"

export const handler = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey },
  } = event
  const { roomId }: IGameStartedEvent = JSON.parse(event.body)

  console.log("onGameEnded: recieved route key:", routeKey)

  const room = await database.room.get({ roomId })
  const allPlayers = getPlayers(room)

  let currentGame = getGame(room)

  const scores = currentGame.players
    .map(
      (player): IPlayerScoreInfo => ({
        id: player.id,
        name: player.name,
        score: player.winningPile.length,
      }),
    )
    .sort((a, b) => b.score - a.score)

  await Promise.all(
    currentGame.players.map((player) =>
      ws.sendMessage<IGameScoreUpdatedEvent>({
        connectionId: player.id,
        body: {
          action: BackendWebsocketActions.GameScoreUpdated,
          scores,
        },
      }),
    ),
  )

  if (currentGame.status !== "ended") {
    currentGame = {
      ...currentGame,
      status: "ended",
    }
    await database.room.updateGame({
      roomId,
      game: currentGame,
    })
  }

  const updatedGame = getSerializedCurrentGame({ game: currentGame })

  await Promise.all(
    allPlayers.map((player) =>
      ws.sendMessage<IGameUpdatedEvent>({
        connectionId: player.id,
        body: {
          action: BackendWebsocketActions.GameUpdated,
          currentGame: updatedGame,
        },
      }),
    ),
  )

  return { statusCode: 200 }
}
