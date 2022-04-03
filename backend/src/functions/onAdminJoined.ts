import {
  BackendWebsocketActions,
  IAdminJoinedEvent,
  IPlayerIdSetEvent,
  IPlayerPoolUpdatedEvent,
} from "alacrity-shared"

import { getSerializedPlayerPool } from "@utils"
import { database, ws } from "@services"
import { APIGatewayEvent } from "aws-lambda"

export const handler = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event
  const { roomId, username }: IAdminJoinedEvent = JSON.parse(event.body)
  console.log("onAdminJoined: recieved route key:", routeKey)

  console.log("Adding connection:", connectionId, "to room", roomId)
  await database.connection.update({ connectionId, roomId })

  console.log("Adding admin:", connectionId)
  await database.room.addPlayer({
    roomId,
    player: { id: connectionId, name: username, isAdmin: true },
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

  console.log("Sending event:", BackendWebsocketActions.PlayerPoolUpdated)
  await ws.sendMessage<IPlayerPoolUpdatedEvent>({
    connectionId,
    body: {
      action: BackendWebsocketActions.PlayerPoolUpdated,
      players: playerPool,
    },
  })

  return { statusCode: 200 }
}
