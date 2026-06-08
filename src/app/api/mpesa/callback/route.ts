import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("M-Pesa Callback:", body);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch {
    return NextResponse.json(
      { ResultCode: 1, ResultDesc: "Failed" },
      { status: 500 }
    );
  }
}
