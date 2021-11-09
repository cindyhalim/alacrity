// import { FrontendWebsocketActions } from "alacrity-shared";
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
  // onPlayerJoined: {
  //   events: [
  //     {
  //       websocket: {
  //         route: FrontendWebsocketActions.PlayerJoined,
  //       },
  //     },
  //   ],
  // },
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
  // onDisconnect: {
  //   handler: `src/functions/onDisconnect/handler.main`,
  //   events: [
  //     {
  //       websocket: {
  //         route: FrontendWebsocketActions.Disconnected,
  //       },
  //     },
  //   ],
  // },
};
