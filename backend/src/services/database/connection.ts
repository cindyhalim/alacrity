import { config } from "@utils"

import { dynamoDb } from "./dynamoDb"
import { IConnectionItem, IConnectionIndex } from "./types"

const getConnectionIndexes = (connectionId: string): IConnectionIndex => ({
  pk: `connection_${connectionId}`,
  sk: "connection",
})

const getConnection = async ({
  connectionId,
}: {
  connectionId: string
}): Promise<IConnectionItem | null> => {
  try {
    const { pk, sk } = getConnectionIndexes(connectionId)
    const response = await dynamoDb
      .get({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
      })
      .promise()

    if (response.Item) return response.Item as IConnectionItem

    return null
  } catch (e) {
    console.log(`Error getting connection ${connectionId}`, e.message)
    throw e
  }
}

const updateConnection = async ({
  connectionId,
  roomId,
}: {
  connectionId: string
  roomId: string
}) => {
  try {
    const { pk, sk } = getConnectionIndexes(connectionId)
    return await dynamoDb
      .put({
        TableName: config.dynamoDbTableName,
        Item: {
          pk,
          sk,
          roomId,
        },
      })
      .promise()
  } catch (e) {
    console.log(`Error updating connection ${connectionId}`, e.message)
    throw e
  }
}

const deleteConnection = async ({ connectionId }: { connectionId: string }) => {
  try {
    const { pk, sk } = getConnectionIndexes(connectionId)
    return await dynamoDb
      .delete({
        TableName: config.dynamoDbTableName,
        Key: {
          pk,
          sk,
        },
      })
      .promise()
  } catch (e) {
    console.log(`Error updating connection ${connectionId}`, e.message)
    throw e
  }
}

export const connection = {
  get: getConnection,
  update: updateConnection,
  delete: deleteConnection,
}
