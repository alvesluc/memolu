import { createReadStream, unlinkSync } from "fs";
import { stat } from "fs/promises";
import { NextResponse } from "next/server";
import { resolve } from "path";
import { ReadableOptions } from "stream";

type RequestPathParam = {
  params: {
    path: string;
  };
};

export async function GET(_: never, { params }: RequestPathParam) {
  const { path } = params;

  const filePath = resolve("audios", `${path}.mp3`);

  try {
    const stats = await stat(filePath);
    const data: ReadableStream<Uint8Array> = streamFile(filePath);

    return new NextResponse(data, {
      status: 200,
      headers: new Headers({
        "content-type": "audio/mp3",
        "content-length": `${stats.size}`,
      }),
    });
  } catch (e: any) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
}

export async function DELETE(_: never, { params }: RequestPathParam) {
  const { path } = params;

  const filePath = resolve("audios", `${path}.mp3`);

  try {
    unlinkSync(filePath);
  } catch (e: any) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "File deleted successfully" });
}

// https://www.reddit.com/r/nextjs/comments/13toeob/nextjs_response_with_a_stream/?rdt=55245
function streamFile(
  path: string,
  options?: ReadableOptions,
): ReadableStream<Uint8Array> {
  const downloadStream = createReadStream(path, options);

  return new ReadableStream({
    start(controller) {
      downloadStream.on("data", (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk)),
      );
      downloadStream.on("end", () => controller.close());
      downloadStream.on("error", (error: NodeJS.ErrnoException) =>
        controller.error(error),
      );
    },
    cancel() {
      downloadStream.destroy();
    },
  });
}
