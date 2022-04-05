import { config } from "@utils"
import { S3 } from "aws-sdk"

const s3 = new S3()

export enum GameDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  DIFFICULT = "difficult",
  VERY_EASY = "very_easy",
}

export type CardsDataJSON = {
  [key in GameDifficulty]: string[]
}

const getCardsData = async (): Promise<CardsDataJSON | null> => {
  try {
    const s3Response = await s3
      .getObject({ Bucket: config.bucketName, Key: config.cardsKey })
      .promise()
    return s3Response.Body ? JSON.parse(s3Response.Body.toString("utf-8")) : null
  } catch (e) {
    if (e.code === "NoSuchKey") {
      return null
    }
    throw e
  }
}

export const cardsData = { get: getCardsData }
