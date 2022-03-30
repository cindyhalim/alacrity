import { APIGatewayEvent } from "aws-lambda"
import {
  BackendWebsocketActions,
  IAdminDisconnectedEvent,
  IGameUpdatedEvent,
  IPlayerPoolUpdatedEvent,
} from "alacrity-shared"

import { getGame, getPlayers, getSerializedCurrentGame, middyfy } from "@utils"
import { database, ws } from "@services"

const onDisconnect = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event

  console.log("onDisconnect: recieved route key:", routeKey)
  console.log("connectionId:", connectionId)

  const roomId = (await database.connection.get({ connectionId }))?.roomId

  await database.connection.delete({ connectionId })

  if (!roomId) {
    console.log("No room id found, returning early")
    return
  }

  const room = await database.room.get({ roomId })
  const game = getGame(room)
  const players = getPlayers(room)

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

  const updatedGame = {
    ...game,
    players: game.players.filter((player) => player.id !== connectionId),
  }
  await database.room.updateGame({ roomId, game: updatedGame })

  await Promise.all(
    remainingPlayers.map(() =>
      ws.sendMessage<IPlayerPoolUpdatedEvent>({
        connectionId,
        body: {
          action: BackendWebsocketActions.PlayerPoolUpdated,
          players: remainingPlayers,
        },
      }),
    ),
  )

  const currentGame = await getSerializedCurrentGame({ roomId })

  await Promise.all(
    remainingPlayers.map(() =>
      ws.sendMessage<IGameUpdatedEvent>({
        connectionId,
        body: {
          action: BackendWebsocketActions.GameUpdated,
          currentGame,
        },
      }),
    ),
  )
}

export const handler = middyfy(onDisconnect)
