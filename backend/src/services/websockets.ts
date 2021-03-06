import { config } from "@utils";
import * as AWS from "aws-sdk";

const apig = new AWS.ApiGatewayManagementApi({
  endpoint: config.wsUrl,
});

const sendMessage = async <B>({
  connectionId,
  body,
}: {
  connectionId: string;
  body: B;
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
