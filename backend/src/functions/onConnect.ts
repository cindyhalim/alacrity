import { APIGatewayEvent } from "aws-lambda"

import { middyfy } from "@utils"

const onConnect = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event
  console.log("onConnect: recieved route key:", routeKey)
  console.log("connectionId:", connectionId)

  return { statusCode: 200 }
}

export const handler = middyfy(onConnect)
