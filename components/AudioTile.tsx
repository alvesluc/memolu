import { Audio } from "@/types/Audio";
import { useState } from "react";
import { Repeat, Trash2 } from "react-feather";

type AudioTileProps = {
  audio: Audio;
};

export default function AudioTile({ audio }: AudioTileProps) {
  const { name, audioUrl, loop } = audio;
  const [isLooping, setIsLooping] = useState(loop);

  function toggleAudioLoop() {
    setIsLooping(!isLooping);
  }

  function handleDelete() {
    const confirmDelete = prompt(`Type 'confirm' and hit OK to delete ${name}`);

    if (confirmDelete === null || confirmDelete == "") {
      return;
    }

    if (confirmDelete.toLowerCase() === "confirm") {
      deleteAudio();
    }
  }

  async function deleteAudio() {
    fetch(`/api/audios/${name}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        location.reload();
      } else {
        alert(
          "An unexpected error occurred and the audio couldn't be deleted!",
        );
      }
    });
  }

  return (
    <li className="flex flex-col justify-between gap-x-6 gap-y-2 p-4 bg-gray-100 sm:flex-row">
      <div className="flex min-w-0 gap-x-4">
        <div className="flex flex-col gap-2 min-w-0 flex-auto ">
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm w-full font-semibold leading-6 text-gray-900 overflow-ellipsis overflow-hidden">
              {name}
            </p>
            <button
              className="text-center text-sm text-gray-900 bg-white border py-2 px-2 rounded hover:border-black sm:w-auto transition-all sm:hidden"
              onClick={handleDelete}
            >
              <Trash2 size={16} color="red" />
            </button>
          </div>
          <audio id="audioPlayer" loop={isLooping} src={audioUrl} controls />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex flex-row gap-2">
          <button
            className={`flex gap-2 items-center text-sm text-gray-900 ${
              isLooping ? "border border-black bg-green-400" : "border bg-white"
            } py-2 px-4 rounded hover:border-black transition-all`}
            onClick={toggleAudioLoop}
          >
            <span>Loop</span>
            <Repeat size={14} />
          </button>
          <a
            className="text-center text-sm w-full text-gray-900 bg-white border py-2 px-4 rounded hover:border-black sm:w-auto transition-all"
            href={audioUrl}
            download
          >
            <span className="font-medium">Baixar áudio</span>
          </a>
          <button
            className="text-center text-sm text-gray-900 bg-white border py-2 px-2 rounded hover:border-black sm:w-auto transition-all hidden sm:inline-block"
            onClick={handleDelete}
          >
            <Trash2 size={16} color="red" />
          </button>
        </div>
      </div>
    </li>
  );
}
