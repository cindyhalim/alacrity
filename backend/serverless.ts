import { alacrityTable, cardsBucket, functions } from "@resources"
import { Serverless } from "@utils"

const serverlessConfiguration: Serverless = {
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
      CARDS_BUCKET_NAME: "${self:service.name}-cards-${self:provider.stage}",
      CARDS_DATA_KEY: "cards-data.json",
      TABLE_NAME: "${self:service.name}-${self:provider.stage}",
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
          "dynamodb:Query",
        ],
        Resource: [{ "Fn::GetAtt": ["AlacrityTable", "Arn"] }],
      },
    ],
    lambdaHashingVersion: "20201221",
  },
  functions,
  resources: {
    Resources: {
      ...alacrityTable,
      ...cardsBucket,
    },
  },
}

module.exports = serverlessConfiguration
