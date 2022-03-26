import { BackendWebsocketActions, IRoomCreatedEvent, IRoomUpdatedEvent } from "alacrity-shared"

import { getSerializedRoom, middyfy, ValidatedAPIGatewayEvent } from "@utils"
import { database, ws } from "@services"

const onRoomCreated = async (event: ValidatedAPIGatewayEvent<IRoomCreatedEvent>) => {
  const {
    requestContext: { routeKey, connectionId },
    body: { roomId, username },
  } = event

  console.log("onDisconnect: recieved route key:", routeKey)
  console.log("connectionId:", connectionId)

  await database.room.addPlayer({
    roomId,
    player: { id: connectionId, name: username },
  })

  const room = await getSerializedRoom({ roomId })

  await ws.sendMessage<IRoomUpdatedEvent>({
    connectionId,
    body: {
      action: BackendWebsocketActions.RoomUpdated,
      room,
    },
  })

  return { statusCode: 200 }
}

export const handler = middyfy(onRoomCreated)
