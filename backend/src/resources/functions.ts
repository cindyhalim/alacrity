import { Serverless } from "@utils";

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
  // onRoomCreated: {
  //   events: [
  //     {
  //       websocket: {
  //         route: FrontendWebsocketActions.RoomCreated,
  //       },
  //     },
  //   ],
  // },
  onPlayerJoined: {
    handler:  `src/functions/onPlayerJoined.handler`,
    events: [
      {
        websocket: {
          route: "player_joined",
        },
      },
    ],
  },
  // onGameStarted: {
  //   iamRoleStatementsInherit: true,
  //   iamRoleStatements: [
  //     {
  //       Effect: "Allow",
  //       Action: ["s3:*"],
  //       Resource: [
  //         { "Fn::GetAtt": ["CardsBucket", "Arn"] },
  //         { "Fn::Join": ["/", [{ "Fn::GetAtt": ["DataBucket", "Arn"] }, "*"]] },
  //       ],
  //     },
  //   ],
  // },
  // onCardDrawn: {
  //   events: [
  //     {
  //       websocket: {
  //         route: FrontendWebsocketActions.CardDrawn,
  //       },
  //     },
  //   ],
  // },
  // onCardWon: {
  //   events: [
  //     {
  //       websocket: {
  //         route: FrontendWebsocketActions.CardWon,
  //       },
  //     },
  //   ],
  // },
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
};
