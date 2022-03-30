import { APIGatewayEvent } from "aws-lambda"

import { ws } from "@services"
import { middyfy } from "@utils"

import { IPlayerIdSetEvent, BackendWebsocketActions } from "alacrity-shared"

const onConnect = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event
  console.log("onConnect: recieved route key:", routeKey)
  console.log("connectionId:", connectionId)

  await ws.sendMessage<IPlayerIdSetEvent>({
    connectionId,
    body: {
      action: BackendWebsocketActions.PlayerIdSet,
      playerId: connectionId,
    },
  })

  return { statusCode: 200 }
}

export const handler = middyfy(onConnect)
