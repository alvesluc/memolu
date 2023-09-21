import { readdirSync } from "fs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { resolve } from "path";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json(
      { message: "The audio file must be provided" },
      { status: 422 },
    );
  }

  if (file.type != "audio/mp3" && file.type != "audio/mpeg") {
    return NextResponse.json(
      { message: "The audio file must be an .mp3" },
      { status: 422 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(resolve("audios", file.name), buffer);

  return NextResponse.json({ message: "Audio saved successfully!" });
}

export async function GET() {
  const files = getFilesPaths(resolve("audios"));

  return NextResponse.json({ files });
}

// https://learnwithparam.com/blog/get-all-files-in-a-folder-using-nodejs/#:~:text=To%20get%20all%20files%20in,the%20files%20in%20the%20directory.
function getFilesPaths(dir: string, files: string[] = []): string[] {
  const fileList = readdirSync(dir);

  for (const file of fileList) {
    if (file.includes(".mp3")) {
      const name = `${file.split(".mp3")[0]}`;
      files.push(name);
    }
  }

  return files;
}
