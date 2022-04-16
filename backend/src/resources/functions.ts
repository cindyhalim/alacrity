import { Serverless } from "@utils"

export const functions: Serverless["functions"] = {
  onConnect: {
    handler: `src/functions/onConnect.handler`,
    events: [
      {
        websocket: {
          route: "$connect",
        },
      },
    ],
  },
  onAdminJoined: {
    handler: `src/functions/onAdminJoined.handler`,
    events: [
      {
        websocket: {
          route: "admin_joined",
        },
      },
    ],
  },
  onPlayerJoined: {
    handler: `src/functions/onPlayerJoined.handler`,
    events: [
      {
        websocket: {
          route: "player_joined",
        },
      },
    ],
  },
  onGameStarted: {
    handler: `src/functions/onGameStarted.handler`,
    events: [
      {
        websocket: {
          route: "game_started",
        },
      },
    ],
  },
  onCardDrawn: {
    handler: `src/functions/onCardDrawn.handler`,
    events: [
      {
        websocket: {
          route: "card_drawn",
        },
      },
    ],
  },
  onCardWon: {
    handler: `src/functions/onCardWon.handler`,
    events: [
      {
        websocket: {
          route: "card_won",
        },
      },
    ],
  },
  // onGameEnded: {
  //   events: [
  //     {
  //       websocket: {
  //         route: FrontendWebsocketActions.GameEnded,
  //       },
  //     },
  //   ],
  // },
  onDisconnect: {
    handler: `src/functions/onDisconnect.handler`,
    events: [
      {
        websocket: {
          route: "$disconnect",
        },
      },
    ],
  },
}
