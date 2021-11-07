import { Serverless } from "@utils";

export const functions: Serverless["functions"] = {
  onConnect: {
    handler: `src/functions/onConnect/handler.main`,
    events: [
      {
        websocket: {
          route: "$connect",
        },
      },
    ],
  },
  onRoomCreated: {
    events: [
      {
        websocket: {
          route: "room_created",
        },
      },
    ],
  },
  onPlayerJoined: {
    events: [
      {
        websocket: {
          route: "player_joined",
        },
      },
    ],
  },
  onGameStarted: {
    iamRoleStatementsInherit: true,
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [
          { "Fn::GetAtt": ["CardsBucket", "Arn"] },
          { "Fn::Join": ["/", [{ "Fn::GetAtt": ["DataBucket", "Arn"] }, "*"]] },
        ],
      },
    ],
  },
  onCardDrawn: {
    events: [
      {
        websocket: {
          route: "card_drawn",
        },
      },
    ],
  },
  onCardWon: {
    events: [
      {
        websocket: {
          route: "card_won",
        },
      },
    ],
  },
  onGameEnded: {
    events: [
      {
        websocket: {
          route: "game_ended",
        },
      },
    ],
  },
  onDisconnect: {
    handler: `src/functions/onDisconnect/handler.main`,
    events: [
      {
        websocket: {
          route: "$disconnect",
        },
      },
    ],
  },
};
