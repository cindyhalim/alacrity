import { database, ws } from "@services"
import { getGame, getPlayers, getSerializedCurrentGame, getSerializedPlayerPool } from "@utils"

import {
  BackendWebsocketActions,
  IPlayerJoinedEvent,
  IRoomNotFoundEvent,
  IPlayerIdSetEvent,
  IPlayerPoolUpdatedEvent,
  IGameUpdatedEvent,
} from "alacrity-shared"
import { APIGatewayEvent } from "aws-lambda"

export const handler = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
    body,
  } = event
  const { roomId, username }: IPlayerJoinedEvent = JSON.parse(body)

  console.log("onAdminJoined: recieved route key:", routeKey)

  const room = await database.room.get({ roomId })

  const currentPlayers = getPlayers(room)

  if (!currentPlayers.some((player) => player.isAdmin)) {
    await ws.sendMessage<IRoomNotFoundEvent>({
      connectionId,
      body: {
        action: BackendWebsocketActions.RoomNotFound,
      },
    })
    console.log("Admin not found")
    return { statusCode: 200 }
  }

  console.log("Adding connection:", connectionId)
  await database.connection.update({ connectionId, roomId })

  console.log("Adding player:", connectionId)
  await database.room.addPlayer({
    roomId,
    player: { id: connectionId, name: username, isAdmin: false },
  })

  const playerPool = await getSerializedPlayerPool({ roomId })

  console.log("Player pool:", playerPool)

  console.log("Sending event:", BackendWebsocketActions.PlayerIdSet)
  await ws.sendMessage<IPlayerIdSetEvent>({
    connectionId,
    body: {
      action: BackendWebsocketActions.PlayerIdSet,
      playerId: connectionId,
    },
  })

  const playerPoolUpdatedEvents = playerPool.map((player) =>
    ws.sendMessage<IPlayerPoolUpdatedEvent>({
      connectionId: player.id,
      body: {
        action: BackendWebsocketActions.PlayerPoolUpdated,
        players: playerPool,
      },
    }),
  )

  console.log("Sending event:", BackendWebsocketActions.PlayerPoolUpdated)
  await Promise.all(playerPoolUpdatedEvents)

  console.log("checking if there is a current game")
  const currentGame = getGame(room)

  if (currentGame && currentGame.status === "started") {
    console.log("game in progress found!")
    await ws.sendMessage<IGameUpdatedEvent>({
      connectionId,
      body: {
        action: BackendWebsocketActions.GameUpdated,
        currentGame: getSerializedCurrentGame({ game: currentGame }),
      },
    })
  }

  return { statusCode: 200 }
}
