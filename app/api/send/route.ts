import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true" ? true : false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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

    // send email
    await transporter.sendMail({
      from: `Kanwarnoor.com <${process.env.SMTP_FROM}>`,
      to: "wellitsnoor@gmail.com",
      replyTo: email,
      subject: `Contact form submitted by ${name} ${email}`,
      html: `<p>Name: ${name}</p><p>${email}</p><p>${message}</p>`,
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("Error sending mail: ", error);
    return NextResponse.json(
      { message: "Error sending message" },
      { status: 500 }
    );
  }
}
