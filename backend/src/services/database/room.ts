import { IPlayer, IRoom } from "alacrity-shared";
import { config } from "@utils";
import { dynamoDb } from "./dynamoDb";
import { IDynamoDbItem } from "./types";

const getRoomPk = (roomId: string) => `room:${roomId}`;
const sk: IDynamoDbItem["sk"] = "room";

const getRoom = async ({
  roomId,
}: {
  roomId: string;
}): Promise<IRoom | null> => {
  try {
    const pk = getRoomPk(roomId);
    const response = await dynamoDb
      .get({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
      })
      .promise();

    if (response.Item) return response.Item as IRoom;

    return null;
  } catch (e) {
    console.log(`Error getting room ${roomId}`, e.message);
    throw e;
  }
};

const createRoom = async ({
  roomId,
  startingPlayer,
}: {
  roomId: string;
  startingPlayer: IPlayer;
}) => {
  try {
    const pk = getRoomPk(roomId);
    const attributes: IRoom = {
      id: roomId,
      players: [startingPlayer],
      gameIds: [],
    };
    await dynamoDb
      .put({
        TableName: config.dynamoDbTableName,
        Item: {
          pk,
          sk,
          attributes,
        },
      })
      .promise();
  } catch (e) {
    console.log(`Error adding room ${roomId} to db`, e.message);
    throw e;
  }
};

const updatePlayer = async ({
  roomId,
  players,
}: {
  roomId: string;
  players: IPlayer[];
}) => {
  try {
    const pk = getRoomPk(roomId);
    await dynamoDb
      .update({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
        UpdateExpression: "set attributes.players = :players",
        ExpressionAttributeValues: { ":players": players },
      })
      .promise();
  } catch (e) {
    console.log(`Error updating players to db`, e.message);
    throw e;
  }
};

const updateGame = async ({
  roomId,
  gameId,
}: {
  roomId: string;
  gameId: string;
}) => {
  try {
    const pk = getRoomPk(roomId);
    await dynamoDb
      .update({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
        UpdateExpression: "set attributes.gameIds = :games",
        ExpressionAttributeValues: { ":games": gameId },
      })
      .promise();
  } catch (e) {
    console.log(`Error updating game ${gameId} to db`, e.message);
    throw e;
  }
};

const deleteRoom = async ({ roomId }: { roomId: string }) => {
  try {
    const pk = getRoomPk(roomId);
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
    console.log(`Error deleting room ${roomId} from db`, e.message);
    throw e;
  }
};

export default {
  create: createRoom,
  updateGame,
  updatePlayer,
  get: getRoom,
  delete: deleteRoom,
};
