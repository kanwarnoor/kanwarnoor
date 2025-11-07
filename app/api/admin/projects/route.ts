import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ScanCommand, PutCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { jwtVerify } from "jose";

const s3Client = new S3Client({
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

export async function GET(req: NextRequest) {
  try {
    const command = new ScanCommand({
      TableName: "kanwarnoor_projects",
    });

    const response = await dynamoClient.send(command);

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
        id: id,
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

    await dynamoClient.send(command);

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

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const command = new DeleteCommand({
      TableName: "kanwarnoor_projects",
      Key: { id: id as string },
    });

    await dynamoClient.send(command);

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, link, tags } = await req.json();

    const command = new UpdateCommand({
      TableName: "kanwarnoor_projects",
      Key: { id: id as string },
    });

    await dynamoClient.send(command);

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 500 }
    );
  }
}
