"use client";

import { useState, useEffect } from "react";

import { Audio } from "@/types/Audio";
import AudioTile from "./AudioTile";

export default function RecentAudios() {
  const [isLoading, setIsLoading] = useState(true);
  const [audios, setAudios] = useState<Audio[]>([]);

  useEffect(() => {
    fetchAudiosPaths()
      .then(async (data) => {
        const audioPaths = data.files || [];

        await Promise.all(audioPaths.map(fetchAudio));
        return setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, []);

  async function fetchAudiosPaths() {
    return fetch("/api/audios/").then((response) => response.json());
  }

  async function fetchAudio(path: string) {
    fetch(`/api/audios/${path}`)
      .then((audio) => audio.blob())
      .then((blob) => {
        const audioUrl = URL.createObjectURL(blob);
        const audioPath = handleAudioPath(path);

        setAudios((prev) => {
          return [...prev, { path, name: audioPath, audioUrl, loop: false }];
        });
      });
  }

  function handleAudioPath(path: string): string {
    const dateSeparator = path.lastIndexOf("_");

    if (dateSeparator === -1) {
      return path;
    } else {
      return path.substring(0, dateSeparator);
    }
  }

  return (
    <div>
      <ul role="list" className="flex w-full flex-col gap-2">
        {isLoading ? <span>Loading audios...</span> : null}
        {audios.length != 0 && (
          <>
            <h2 className="text-lg font-semibold mb-2">Recent voice notes</h2>
            {audios.toReversed().map((audio) => {
              return <AudioTile key={audio.audioUrl} audio={audio} />;
            })}
          </>
        )}
      </ul>
    </div>
  );
}
