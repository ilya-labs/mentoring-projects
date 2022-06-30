import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { AWS_REGION, TABLE_NAME_DEV } from "../constants";

const client = new DynamoDBClient({ region: AWS_REGION });

exports.handler = async function (event: any) {
  const input = {
    TableName: TABLE_NAME_DEV,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: marshall({
      ":pk": "user#papa",
    }),
  };
  const command = new QueryCommand(input);

  try {
    const { Items } = await client.send(command);

    if (Items?.[0]) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(unmarshall(Items[0])),
      };
    }

    return {
      statusCode: 200,
      body: `No items`,
    };
  } catch (error) {
    console.log("ERror in getBooking Lambda", error);
    return {
      statusCode: 500,
      body: `Error occurred`,
    };
  }
};
