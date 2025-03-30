// app/api/register/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, contact, profilePicture } = body;

    // Validate the profile picture (optional)
    if (profilePicture && !profilePicture.startsWith("data:image")) {
      return NextResponse.json(
        { success: false, message: "Invalid profile picture format." },
        { status: 400 }
      );
    }

    // Connect to DB
    const client = await clientPromise;
    const db = client.db("myDBClass");

    // Check if email already exists
    const existingUser = await db
      .collection("myCollectionMyDBClass")
      .findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1) Generate a custom user ID
    const customUserId = uuidv4();

    // 2) Insert user with the custom userID
    const result = await db.collection("myCollectionMyDBClass").insertOne({
      userID: customUserId, // <-- Custom ID
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contact,
      profilePicture,
      createdAt: new Date(),
    });

    // 3) Return the custom userID so the client can store it
    return NextResponse.json({
      success: true,
      data: result,
      userID: customUserId, // <-- Return the userID to client
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
