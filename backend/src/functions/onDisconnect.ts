import { APIGatewayEvent } from "aws-lambda";
import { BackendWebsocketActions } from "alacrity-shared";

import { getGame, getPlayers, getSerializedRoom, middyfy } from "@utils";
import { database, ws } from "@services";

const onDisconnect = async (event: APIGatewayEvent) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event;

  console.log("onDisconnect: recieved route key:", routeKey);
  console.log("connectionId:", connectionId);

  const roomId = (await database.connection.get({ connectionId })).roomId;
  const room = await database.room.get({ roomId });

  if (!roomId) {
    return;
  }

  if (room) {
    const player = getPlayers(room).find(
      (item) => item.player.id === connectionId
    );
    const game = getGame(room);
    const totalPlayers = game.players.length;
    const remainingPlayers = game.players.filter(
      (player) => player.id !== connectionId
    );
    const updatedGame = { ...game, players: remainingPlayers };

    if (player) {
      await database.room.deletePlayer({ roomId, playerId: connectionId });
    }

    if (game) {
      totalPlayers === 1
        ? await database.room.deleteGame({ roomId, gameId: game.id })
        : await database.room.updateGame({ roomId, game: updatedGame });
    }

    await Promise.all(
      remainingPlayers.map(() =>
        ws.sendMessage({
          connectionId,
          body: {
            action: BackendWebsocketActions.RoomUpdated,
            room: getSerializedRoom({ roomId }),
          },
        })
      )
    );
  }

  return await database.connection.delete({ connectionId });
};

export const handler = middyfy(onDisconnect);
