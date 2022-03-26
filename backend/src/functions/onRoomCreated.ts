import { APIGatewayEvent } from "aws-lambda"
import {
  BackendWebsocketActions,
  IRoomCreatedEvent,
  IRoomUpdatedEvent,
} from "alacrity-shared"

import { getSerializedRoom, middyfy } from "@utils"
import { database, ws } from "@services"

const onRoomCreated = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event

  console.log("onDisconnect: recieved route key:", routeKey)
  console.log("connectionId:", connectionId)

  const { roomId, username }: IRoomCreatedEvent = JSON.parse(event.body)

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
