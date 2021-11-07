import { handlerPath } from "@libs";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      websocket: {
        route: "$connect",
      },
    },
  ],
};
