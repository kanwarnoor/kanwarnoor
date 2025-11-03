import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

interface ProjectData {
  title: string
  description: string;
  image: string;
  link: string;
  tags: string[];
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_CLIENT!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});


export async function GET(req: NextRequest){
  try {
    const command = new GetItemCommand({
      TableName: "kanwarnoor_projects",
      Key: {
        id: { S: "1" },
      },
    })

    const response = await client.send(command);
    console.log(response.Item);
    
    return NextResponse.json(response.Item,{ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest){
  try {
    const { title, description, image, link, tags } = await req.json();

    const command = new PutItemCommand({
      TableName: "kanwarnoor_projects",
      Item: {
        id: { S: crypto.randomUUID() },
        title: { S: title },
        description: { S: description || "test"},
        image: { S: image || "test"},
        link: { S: link || "test.com"},
        tags: { S: tags || ["test"] },
      },
    })

    await client.send(command);

    return NextResponse.json({ message: "Project created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}