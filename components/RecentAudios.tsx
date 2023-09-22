"use client";

import { useState, useEffect } from "react";
import { Repeat } from "react-feather";

type Audio = {
  name: string;
  audioUrl: string;
  loop: boolean;
};

export default function RecentAudios() {
  const [isLoading, setIsLoading] = useState(true);
  const [audios, setAudios] = useState<Audio[]>([]);

  useEffect(() => {
    fetch("/api/audios/")
      .then((response) => response.json())
      .then(async (data) => {
        const audioPaths = data.files || [];

        await Promise.all(audioPaths.map(fetchAudios));
        return setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  async function fetchAudios(path: string) {
    fetch(`/api/audios/${path}`)
      .then((audio) => audio.blob())
      .then((blob) => {
        const audioUrl = URL.createObjectURL(blob);

        setAudios((prev) => {
          return [...prev, { name: path, audioUrl, loop: false }];
        });
      });
  }

  function toggleAudioLoop(audioName: string) {
    const audiosWithToggledLoop = audios.map((audio) => {
      if (audio.name === audioName) {
        audio.loop = !audio.loop;
        return audio;
      }
      return audio;
    });

    setAudios(audiosWithToggledLoop);
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Recent voice notes</h2>
      <ul role="list" className="flex w-full flex-col gap-2">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            {audios.toReversed().map((audio) => {
              return (
                <li
                  key={audio.name}
                  className="flex flex-col justify-between gap-x-6 p-4 bg-gray-100 sm:flex-row"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="flex flex-col gap-2 min-w-0 flex-auto ">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {audio.name}
                      </p>
                      <audio
                        id="audioPlayer"
                        loop={audio.loop}
                        src={audio.audioUrl}
                        controls
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    {/* <p className="mt-1 text-xs leading-5 text-gray-500">
                      14/09/2023 20:06
                    </p> */}
                    <div className="flex flex-row gap-2">
                      <button
                        className={`flex gap-2 items-center text-sm text-gray-900 ${
                          audio.loop
                            ? "border border-black bg-green-400"
                            : "border bg-white"
                        } py-2 px-4 rounded hover:border-black transition-all`}
                        onClick={() => toggleAudioLoop(audio.name)}
                      >
                        <span>Loop</span>
                        <Repeat size={14} />
                      </button>
                      <a
                        className="text-center text-sm w-full text-gray-900 bg-white border py-2 px-4 rounded hover:border-black sm:w-auto transition-all"
                        href={audio.audioUrl}
                        download
                      >
                        <span className="font-medium">Baixar áudio</span>
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
}
