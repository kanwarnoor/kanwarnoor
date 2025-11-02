import {
  GetItemCommand,
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextRequest, NextResponse } from "next/server";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_CLIENT!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_CLIENT!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

const RATE_LIMIT = 2;
const RATE_LIMIT_TIME = 86400; // 1 day

export async function POST(req: NextRequest) {
  try {
    const { email, name, message } = await req.json();

    if (!email || !name || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // origin checking
    const origin = req.headers.get("origin");
    if (origin !== process.env.URL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // rate limiting
    let ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    if (!ip) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const now = Math.floor(Date.now() / 1000);
    const window = Math.floor(now / RATE_LIMIT_TIME);

    const getCommand = new GetItemCommand({
      TableName: "ratelimit",
      Key: {
        ip: { S: ip + "#" + window.toString() },
      },
    });

    const response = await dynamoClient.send(getCommand);
    const item = response.Item;

    if (item) {
      const count = Number(item.count.N);

      if (count >= RATE_LIMIT) {
        return NextResponse.json(
          { message: "Rate limit exceeded, come back tommorow!" },
          { status: 429 }
        );
      }

      const command = new UpdateItemCommand({
        TableName: "ratelimit",
        Key: { ip: { S: ip + "#" + window.toString() } },
        UpdateExpression: "SET #count = :count",
        ExpressionAttributeNames: {
          "#count": "count",
        },
        ExpressionAttributeValues: {
          ":count": { N: (count + 1).toString() },
        },
      });
      await dynamoClient.send(command);
    } else {
      const putCommand = new PutItemCommand({
        TableName: "ratelimit",
        Item: {
          ip: { S: ip + "#" + window.toString() },
          count: { N: "1" },
        },
      });
      await dynamoClient.send(putCommand);
    }

    // send email
    const emailCommand = new SendEmailCommand({
      Source: `Kanwarnoor.com <contact@kanwarnoor.com>`,
      Destination: {
        ToAddresses: ["wellitsnoor@gmail.com"],
      },
      Message: {
        Subject: { Data: `Contact form submitted by ${name} (${email})` },
        Body: {
          Text: {
            Data: `${message}`,
          },
        },
      },
      ReplyToAddresses: [email],
    });

    await sesClient.send(emailCommand);

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("Error sending mail: ", error);
    return NextResponse.json(
      { message: "Error sending message" },
      { status: 500 }
    );
  }
}
