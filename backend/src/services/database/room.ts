import { config } from "@utils"
import { dynamoDb } from "./dynamoDb"
import { IGame, IPlayer, IRoomIndex, TRoomItems } from "./types"

const getPlayerIndexes = ({
  playerId,
  roomId,
}: {
  playerId: string
  roomId: string
}): IRoomIndex => ({
  pk: `room_${roomId}`,
  sk: `player_${playerId}`,
})

const getGameIndexes = ({
  gameId,
  roomId,
}: {
  gameId: string
  roomId: string
}): IRoomIndex => ({
  pk: `room_${roomId}`,
  sk: `game_${gameId}`,
})

const getRoomItems = async ({
  roomId,
}: {
  roomId: string
}): Promise<TRoomItems | null> => {
  try {
    const pk: IRoomIndex["pk"] = `room_${roomId}`
    const response = await dynamoDb
      .query({
        TableName: config.dynamoDbTableName,
        IndexName: "pk",
        KeyConditionExpression: `pk = :pk`,
        ExpressionAttributeValues: {
          ":pk": pk,
        },
      })
      .promise()

    if (response.Items) return response.Items as TRoomItems

    return null
  } catch (e) {
    console.log(`Error getting room ${roomId}`, e.message)
    throw e
  }
}

const deleteGame = async ({
  roomId,
  gameId,
}: {
  roomId: string
  gameId: string
}) => {
  try {
    const pk: IRoomIndex["pk"] = `room_${roomId}`
    const sk: IRoomIndex["sk"] = `game_${gameId}`

    await dynamoDb
      .delete({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
      })
      .promise()
  } catch (e) {
    console.log(`Error deleting room ${roomId}`, e.message)
    throw e
  }
}

const updateGame = async ({
  roomId,
  game,
}: {
  roomId: string
  game: IGame
}) => {
  try {
    const { pk, sk } = getGameIndexes({ gameId: game.id, roomId })
    await dynamoDb
      .update({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
        UpdateExpression: "set game = :game",
        ExpressionAttributeValues: {
          game,
        },
      })
      .promise()
  } catch (e) {
    console.log(`Error updating game ${game.id} for`, e.message)
    throw e
  }
}

const addGame = async ({ roomId, game }: { roomId: string; game: IGame }) => {
  try {
    const { pk, sk } = getGameIndexes({ gameId: game.id, roomId })
    await dynamoDb
      .put({
        TableName: config.dynamoDbTableName,
        Item: {
          pk,
          sk,
          game,
        },
      })
      .promise()
  } catch (e) {
    console.log(`Error creating game ${game.id} for`, e.message)
    throw e
  }
}

const addPlayer = async ({
  roomId,
  player,
}: {
  roomId: string
  player: IPlayer
}) => {
  try {
    const { pk, sk } = getPlayerIndexes({ roomId, playerId: player.id })
    await dynamoDb
      .put({
        TableName: config.dynamoDbTableName,
        Item: {
          pk,
          sk,
          player,
        },
      })
      .promise()
  } catch (e) {
    console.log(`Error adding player ${player.id}`, e.message)
    throw e
  }
}

const deletePlayer = async ({
  roomId,
  playerId,
}: {
  roomId: string
  playerId: string
}) => {
  try {
    const { pk, sk } = getPlayerIndexes({ roomId, playerId })
    await dynamoDb
      .delete({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
      })
      .promise()
  } catch (e) {
    console.log(`Error updating players to db`, e.message)
    throw e
  }
}

export const room = {
  get: getRoomItems,
  addPlayer,
  deletePlayer,
  addGame,
  updateGame,
  deleteGame,
}
