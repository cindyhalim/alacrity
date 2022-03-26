import * as env from "env-var";

export const config = {
  bucketName: env.get("CARDS_BUCKET_NAME").required().asString(),
  cardsKey: env.get("CARDS_DATA_KEY").required().asString(),
  dynamoDbTableName: env.get("TABLE_NAME").required().asString(),
  wsUrl: env.get("WS_ENDPOINT").required().asString(),
};
