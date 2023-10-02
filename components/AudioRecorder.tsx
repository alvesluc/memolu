"use client";

import { useState, useRef } from "react";
import { Mic, StopCircle } from "react-feather";

const mimeType = "audio/mp3";
const constraints: MediaStreamConstraints = { audio: true, video: false };

export default function AudioRecorder() {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  function getMicrophonePermission() {
    if ("MediaRecorder" in window) {
      try {
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
          setPermission(true);
          startRecording();
        });
      } catch (e: any) {
        setPermission(false);
        alert(e);
      }
    }
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    setStream(stream);

    const recorder = new MediaRecorder(stream);
    mediaRecorder.current = recorder;

    setRecordingStatus("recording");
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === undefined) return;
      if (event.data.size === 0) return;

      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");
    mediaRecorder.current!.stop();

    mediaRecorder.current!.onstop = async () => {
      stream!.getTracks().forEach((track) => {
        track.stop();
      });

      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioFile = audioFileFromBlob(audioBlob);
      await uploadAudio(audioFile);

      setAudioChunks([]);
    };
  }

  function audioFileFromBlob(blob: Blob, fileName: string | null = null): File {
    const audioFile = new File([blob], handleFileName(fileName), {
      type: mimeType,
    });

    return audioFile;
  }

  function handleFileName(fileName: string | null): string {
    if (!fileName) {
      fileName = `${new Date().getTime()}`;
    }

    return `${fileName}.mp3`;
  }

  async function uploadAudio(audioFile: File) {
    try {
      const formData = new FormData();
      formData.set("files", audioFile);

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

  const canRecord = !permission || recordingStatus === "inactive";

  return (
    <div>
      {canRecord && (
        <button
          type="button"
          className="rounded border bg-white px-4 py-2 text-sm text-gray-900 transition-all hover:border-black"
          onClick={!permission ? getMicrophonePermission : startRecording}
        >
          <div className="flex items-center gap-2">
            <span>Record audio</span>
            <Mic size={14} />
          </div>
        </button>
      )}
      {recordingStatus === "recording" && (
        <button
          type="button"
          className="rounded border bg-white px-4 py-2 text-sm text-gray-900 transition-all hover:border-black"
          onClick={stopRecording}
        >
          <div className="flex items-center gap-2">
            <span>Stop recording</span>
            <StopCircle size={16} color="red" />
          </div>
        </button>
      )}
    </div>
  );
}
