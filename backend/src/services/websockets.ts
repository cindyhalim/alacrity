import { config } from "@utils";
import * as AWS from "aws-sdk";

type TWebsocketsAction = "player_id_set" | "room_updated" | "game_updated";

type TWebsocketsBody<B> = {
  action: TWebsocketsAction;
} & B;

const apig = new AWS.ApiGatewayManagementApi({
  endpoint: config.wsUrl,
});

const sendMessage = async <Body>({
  connectionId,
  body,
}: {
  connectionId: string;
  body: TWebsocketsBody<Body>;
}) => {
  try {
    await apig
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(body),
      })
      .promise();
  } catch (err) {
    // Ignore if connection no longer exists
    if (err.statusCode !== 400 && err.statusCode !== 410) {
      throw err;
    }
  }
};

export const ws = { sendMessage };
