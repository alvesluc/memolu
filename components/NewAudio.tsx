"use client";

import { DragEvent, ChangeEvent, useState } from "react";
import AudioRecorder from "./AudioRecorder";

export default function NewAudio() {
  const [dragIsOver, setDragIsOver] = useState(false);

  function handleSelectedFiles(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;

    if (!selectedFiles) return;

    const validFiles = [...selectedFiles].filter(isValidFiles);
    uploadAudios(validFiles);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragIsOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragIsOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragIsOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(isValidFiles);
    uploadAudios(validFiles);
  }

  function isValidFiles(file: File): boolean {
    return file.type === "audio/mp3" || file.type === "audio/mpeg";
  }

  async function uploadAudios(audioFiles: File[]): Promise<void> {
    try {
      const formData = new FormData();

      audioFiles.forEach((file) => {
        formData.append("files", file);
      });

      await fetch("/api/audios/", {
        method: "POST",
        body: formData,
      });

      location.reload();
    } catch (e: any) {
      alert("An unexpected error occurred and the audio couldn't be uploaded!");
      console.log(e);
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex flex-col items-center justify-between w-full gap-2"
    >
      <label
        htmlFor="dropzone-file"
        className={`flex flex-[1] flex-col items-center justify-center w-full h-32 border-2  border-dashed rounded-lg cursor-pointer transition-all duration-500 ${
          dragIsOver ? "bg-white border-black" : "bg-gray-100 border-gray-300"
        }`}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <p className="mb-2 text-center text-sm text-gray-500">
            You can click to upload or drag and drop your audio files
          </p>
          <p className="mb-2 text-xs text-gray-500">Valid file types: MP3</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          multiple={true}
          accept="audio/mp3, audio/mpeg"
          onChange={handleSelectedFiles}
        />
      </label>
      <p>or</p>
      <div className="flex">
        <AudioRecorder />
      </div>
    </div>
  );
}
