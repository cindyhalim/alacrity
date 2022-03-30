import {
  BackendWebsocketActions,
  IAdminJoinedEvent,
  IPlayerIdSetEvent,
  IPlayerPoolUpdatedEvent,
} from "alacrity-shared"

import { getSerializedPlayerPool, middyfy, ValidatedAPIGatewayEvent } from "@utils"
import { database, ws } from "@services"

const onAdminJoined = async (event: ValidatedAPIGatewayEvent<IAdminJoinedEvent>) => {
  const {
    requestContext: { routeKey, connectionId },
    body: { roomId, username },
  } = event

  console.log("onAdminJoined: recieved route key:", routeKey)

  console.log("Adding connection:", connectionId)
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

export const handler = middyfy(onAdminJoined)
