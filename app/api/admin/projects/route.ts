import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient} from "@aws-sdk/client-dynamodb"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import {jwtVerify} from "jose"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_CLIENT!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_CLIENT!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

export async function GET(req: NextRequest) {
  try {
    const command = new ScanCommand({
      TableName: "kanwarnoor_projects",
      Limit: 10
    });

    const response = await client.send(command);

    return NextResponse.json(response.Items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, image, link, tags } = await req.json();

    const id = crypto.randomUUID();

    const command = new PutCommand({
      TableName: "kanwarnoor_projects",
      Item: {
        id:  id,
        title,
        description: description || "test",
        link: link || "test.com",
        tags: tags || (["test"] as string[]),
      },
    });

    const s3Command = new PutObjectCommand({
      Bucket: "kanwarnoor",
      Key: `projects/${id}.${image.split(".").pop()}`,
      Body: Buffer.from(image),
    });

    await s3Client.send(s3Command);

    await client.send(command);

    return NextResponse.json(
      { message: "Project created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
