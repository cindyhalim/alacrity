import { database, ws } from "@services";
import { getSerializedRoom, middyfy, ValidatedAPIGatewayEvent } from "@utils";

import {
  BackendWebsocketActions,
  IAddPlayerFailed,
  IPlayerJoinedEvent,
  IRoomNotFoundEvent,
  IRoomUpdatedEvent,
} from "alacrity-shared";

const onPlayerJoined = async (
  event: ValidatedAPIGatewayEvent<IPlayerJoinedEvent>
) => {
  const {
    requestContext: { connectionId },
  } = event;

  const { roomId, username } = event.body;

  try {
    await database.room.addPlayer({
      roomId,
      player: { id: connectionId, name: username },
    });

    const room = await getSerializedRoom({ roomId });

    if (!room) {
      await ws.sendMessage<IRoomNotFoundEvent>({
        connectionId,
        body: {
          action: BackendWebsocketActions.RoomNotFound,
        },
      });

      return {statusCode: 404}
    }

    await ws.sendMessage<IRoomUpdatedEvent>({
      connectionId,
      body: {
        action: BackendWebsocketActions.RoomUpdated,
        room,
      },
    });

    return { statusCode: 200 }

  } catch (e) {
    await ws.sendMessage<IAddPlayerFailed>({
      connectionId,
      body: {
        action: BackendWebsocketActions.AddPlayerFailed,
      },
    });
  }
};

export const handler = middyfy(onPlayerJoined);
