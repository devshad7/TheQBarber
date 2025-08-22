import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ allowed: false, reason: "Missing email" });
  }

  // find user by email
  const client = await clerkClient();
  const usersResponse = await client.users.getUserList({
    emailAddress: [email],
  });
  const users = usersResponse.data;

  if (users.length === 0) {
    return NextResponse.json({ allowed: false, reason: "not_found" });
  }

  const user = users[0];
  const role = user.unsafeMetadata.role;

  if (role === "user") {
    return NextResponse.json({ allowed: true });
  } else {
    return NextResponse.json({ allowed: false, reason: "invalid_role" });
  }
}
