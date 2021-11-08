import "source-map-support/register";

import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
  middyfy,
} from "@utils";

import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
