"use client";

import { useState, useRef, useEffect } from "react";

const mimeType = "audio/mp3";

type AudioRecorderProps = {
  saveAudio: (audioUrl: string) => void;
};

const constraints = { audio: true };

export default function AudioRecorder({ saveAudio }: AudioRecorderProps) {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    navigator;
  }, []);

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
      } catch (err: any) {
        setPermission(false);
        alert(err);
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

  function stopRecording() {
    setRecordingStatus("inactive");
    mediaRecorder.current!.stop();

    mediaRecorder.current!.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);

      saveAudio(audioUrl);
      setAudioChunks([]);
      stream!.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }

  let canRecord = !permission || recordingStatus === "inactive";

  return (
    <div>
      {canRecord && (
        <button
          type="button"
          className="text-sm text-gray-900 bg-white border py-2 px-4 rounded hover:border-black"
          onClick={!permission ? getMicrophonePermission : startRecording}
        >
          Record audio
        </button>
      )}
      {recordingStatus === "recording" && (
        <button
          type="button"
          className="text-sm text-gray-900 bg-white border py-2 px-4 rounded hover:border-black"
          onClick={stopRecording}
        >
          Stop recording
        </button>
      )}
    </div>
  );
}
