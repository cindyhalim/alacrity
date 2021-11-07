import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";

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
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { hello },
};

module.exports = serverlessConfiguration;
