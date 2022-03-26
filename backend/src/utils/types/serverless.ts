import { AWS, AwsIamPolicyStatements } from "@serverless/typescript";

type AWSFunction = AWS["functions"][0];

interface AWSFunctionWithIAmRoleStatementsPerFunction extends AWSFunction {
  iamRoleStatementsInherit?: boolean;
  iamRoleStatements?: AwsIamPolicyStatements;
}

export interface Serverless extends AWS {
  functions?: {
    [k: string]: AWSFunctionWithIAmRoleStatementsPerFunction;
  };
}
