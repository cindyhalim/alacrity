import { config } from "@utils";
import { S3 } from "aws-sdk";

const s3 = new S3();

interface CardsDataJSON {}

const getCardsData = async (): Promise<CardsDataJSON | null> => {
  try {
    const s3Response = await s3
      .getObject({ Bucket: config.bucketName, Key: config.articlesKey })
      .promise();
    return s3Response.Body
      ? JSON.parse(s3Response.Body.toString("utf-8"))
      : null;
  } catch (e) {
    if (e.code === "NoSuchKey") {
      return null;
    }
    throw e;
  }
};

export const cardsData = { get: getCardsData };
