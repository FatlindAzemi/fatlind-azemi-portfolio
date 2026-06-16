import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("CLIENT LOG RECEIVED:", body);
    
    const logFilePath = path.join(process.cwd(), "client-errors.log");
    const logMessage = `[${new Date().toISOString()}] ${JSON.stringify(body)}\n`;
    fs.appendFileSync(logFilePath, logMessage);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
