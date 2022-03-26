import type { APIGatewayEvent } from "aws-lambda";

export type ValidatedAPIGatewayEvent<B> = Omit<APIGatewayEvent, "body"> & {
  body: B;
};
