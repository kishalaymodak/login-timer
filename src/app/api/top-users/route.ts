import { NextResponse } from "next/server";

import { User } from "@/db/db";

export async function GET() {
  try {
    const topUsers = await User.find({}).sort({ totalLoginTime: -1 }).limit(10);

    return NextResponse.json(topUsers);
  } catch (error) {
    return NextResponse.json(
      { error: error + "Error fetching top users" },
      { status: 500 }
    );
  }
}
