import { APIGatewayEvent } from "aws-lambda"

export const handler = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event
  console.log("onConnect: recieved route key:", routeKey)
  console.log("connectionId:", connectionId)

  return { statusCode: 200 }
}
