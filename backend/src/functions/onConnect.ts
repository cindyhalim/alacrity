import { APIGatewayEvent } from "aws-lambda";

import { ws } from "@services";
import { middyfy } from "@utils";

interface IPlayerIdSetBody {
  playerId: string;
}

const onConnect = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event;
  console.log("onConnect: recieved route key:", routeKey);
  console.log("connectionId:", connectionId);

  await ws.sendMessage<IPlayerIdSetBody>({
    connectionId,
    body: { action: "player_id_set", playerId: connectionId },
  });
};

export const handler = middyfy(onConnect);
