import { APIGatewayEvent } from "aws-lambda"
import {
  BackendWebsocketActions,
  IAdminDisconnectedEvent,
  IGameUpdatedEvent,
  IPlayerPoolUpdatedEvent,
} from "alacrity-shared"

import { getGame, getPlayers, getSerializedCurrentGame } from "@utils"
import { database, ws } from "@services"

export const handler = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event

  console.log("onDisconnect: recieved route key:", routeKey)
  console.log("connectionId:", connectionId)

  const connection = await database.connection.get({ connectionId })
  console.log("connection", connection)
  const roomId = connection?.roomId

  await database.connection.delete({ connectionId })

  if (!roomId) {
    console.log("No room id found, returning early")
    return
  }

  const room = await database.room.get({ roomId })
  console.log("room", room)
  const game = getGame(room)
  console.log("game", game)
  const players = getPlayers(room)
  console.log("players", players)

  const isCurrentPlayerAdmin = players.find(
    (player) => player.id === connectionId && player.isAdmin,
  )

  await database.room.deletePlayer({ roomId, playerId: connectionId })

  const remainingPlayers = players.filter((player) => player.id !== connectionId)

  if (isCurrentPlayerAdmin) {
    if (game) {
      await database.room.deleteGame({ roomId, gameId: game.id })
    }

    const adminDisconnectedEvents = remainingPlayers.map((player) =>
      ws.sendMessage<IAdminDisconnectedEvent>({
        connectionId: player.id,
        body: {
          action: BackendWebsocketActions.AdminDisconnected,
        },
      }),
    )

    await Promise.all(adminDisconnectedEvents)
    return
  }

  await Promise.all(
    remainingPlayers.map((player) =>
      ws.sendMessage<IPlayerPoolUpdatedEvent>({
        connectionId: player.id,
        body: {
          action: BackendWebsocketActions.PlayerPoolUpdated,
          players: remainingPlayers,
        },
      }),
    ),
  )

  if (game) {
    const updatedGame = {
      ...game,
      players: game.players.filter((player) => player.id !== connectionId),
    }
    await database.room.updateGame({ roomId, game: updatedGame })
    const currentGame = getSerializedCurrentGame({ game: updatedGame })

    await Promise.all(
      remainingPlayers.map((player) =>
        ws.sendMessage<IGameUpdatedEvent>({
          connectionId: player.id,
          body: {
            action: BackendWebsocketActions.GameUpdated,
            currentGame,
          },
        }),
      ),
    )
  }

  return { statusCode: 200 }
}
