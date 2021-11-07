import type { AWS } from "@serverless/typescript";

import { hello } from "@functions";
import { alacrityTable } from "@resources";

const serverlessConfiguration: AWS = {
  service: "alacrity",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack", "serverless-iam-roles-per-function"],
  provider: {
    name: "aws",
    stage: "dev",
    region: "us-east-2",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      TABLE_NAME: "alacrity-table-${self:provider.stage}",
      WS_ENDPOINT: {
        "Fn::Join": [
          "",
          [
            { Ref: "WebsocketsApi" },
            ".execute-api.",
            { Ref: "AWS::Region" },
            ".amazonaws.com/",
            "dev",
          ],
        ],
      },
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:DeleteItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:PutItem",
        ],
        Resource: [{ "Fn::GetAtt": ["TableName", "Arn"] }],
      },
    ],
    lambdaHashingVersion: "20201221",
  },
  functions: { hello },
  resources: {
    Resources: {
      ...alacrityTable,
    },
  },
};

module.exports = serverlessConfiguration;
