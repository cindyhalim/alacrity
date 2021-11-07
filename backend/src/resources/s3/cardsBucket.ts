import { AWS } from "@serverless/typescript";

export const cardsBucket: AWS["resources"]["Resources"] = {
  CardsBucket: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: "${self:provider.environment.CARDS_BUCKET_NAME}",
      AccessControl: "PublicRead",
    },
  },
};
