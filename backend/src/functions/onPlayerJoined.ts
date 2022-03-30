import { database, ws } from "@services"
import { getPlayers, getSerializedPlayerPool, middyfy, ValidatedAPIGatewayEvent } from "@utils"

import {
  BackendWebsocketActions,
  IPlayerJoinedEvent,
  IRoomNotFoundEvent,
  IPlayerIdSetEvent,
  IPlayerPoolUpdatedEvent,
} from "alacrity-shared"

const onPlayerJoined = async (event: ValidatedAPIGatewayEvent<IPlayerJoinedEvent>) => {
  const {
    requestContext: { routeKey, connectionId },
    body: { roomId, username },
  } = event

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
    return
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

  return { statusCode: 200 }
}

export const handler = middyfy(onPlayerJoined)
