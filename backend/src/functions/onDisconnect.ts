import { BackendWebsocketActions, IDisconnected } from "alacrity-shared";

import { room as roomDb, game as gameDb, ws } from "@services";
import { middyfy, ValidatedAPIGatewayEvent } from "@utils";

const onDisconnect = async (event: ValidatedAPIGatewayEvent<IDisconnected>) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event;

  const { roomId } = event.body;

  console.log("onDisconnect: recieved route key:", routeKey);
  console.log("connectionId:", connectionId);

  const room = await roomDb.get({ roomId });

  if (!room) {
    console.log("No room found, skipping...");
    return;
  }
  const totalPlayers = room.players.length;
  const gameId = room.gameIds[room.gameIds.length - 1] || "";

  if (gameId) {
    const game = await gameDb.get({ gameId });
    const players = game.players.filter(({ id }) => id !== connectionId);
    const updatedGame = { ...game, players };

    totalPlayers === 1
      ? await Promise.all([gameDb.delete({ gameId })])
      : await Promise.all([
          gameDb.update(updatedGame),
          ws.sendMessage({
            connectionId,
            body: {
              action: BackendWebsocketActions.GameUpdated,
              game: updatedGame,
            },
          }),
        ]);
  }

  const players = room.players.filter(({ id }) => id !== connectionId);
  const updatedRoom = { ...room, players };
  totalPlayers === 1
    ? await roomDb.delete({ roomId })
    : await Promise.all([
        roomDb.updatePlayer({ roomId, players }),
        ws.sendMessage({
          connectionId,
          body: {
            action: BackendWebsocketActions.RoomUpdated,
            room: updatedRoom,
          },
        }),
      ]);
};

export const handler = middyfy(onDisconnect);
