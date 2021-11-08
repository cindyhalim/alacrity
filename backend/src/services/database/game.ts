import { config } from "@utils";
import { dynamoDb } from "./dynamoDb";
import { IDynamoDbItem, IGame } from "./types";

const getGamePk = (roomId: string) => `game:${roomId}`;
const sk: IDynamoDbItem["sk"] = "game";

const getGame = async ({
  gameId,
}: {
  gameId: string;
}): Promise<IGame | null> => {
  try {
    const pk = getGamePk(gameId);
    const response = await dynamoDb
      .get({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
      })
      .promise();

    if (response.Item) return response.Item as IGame;

    return null;
  } catch (e) {
    console.log(`Error getting game ${gameId}`, e.message);
    throw e;
  }
};

const createGame = async (game: IGame) => {
  try {
    const pk = getGamePk(game.id);
    return await dynamoDb
      .put({
        TableName: config.dynamoDbTableName,
        Item: {
          pk,
          sk,
          attributes: game,
        },
      })
      .promise();
  } catch (e) {
    console.log(`Error creating game ${game.id}`, e.message);
    throw e;
  }
};

const updateGame = async (game: IGame) => {
  try {
    const pk = getGamePk(game.id);
    return await dynamoDb
      .put({
        TableName: config.dynamoDbTableName,
        Item: {
          pk,
          sk,
          attributes: game,
        },
      })
      .promise();
  } catch (e) {
    console.log(`Error updating game ${game.id}`, e.message);
    throw e;
  }
};

const deleteRoom = async ({ gameId }: { gameId: string }) => {
  try {
    const pk = getGamePk(gameId);
    await dynamoDb
      .delete({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
      })
      .promise();
  } catch (e) {
    console.log(`Error deleting game ${gameId} from db`, e.message);
    throw e;
  }
};

export const game = {
  get: getGame,
  create: createGame,
  update: updateGame,
  delete: deleteRoom,
};
