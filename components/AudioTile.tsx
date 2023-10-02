import { Audio } from "@/types/Audio";
import { useState } from "react";
import { Edit3, Repeat, Trash2 } from "react-feather";

type AudioTileProps = {
  audio: Audio;
};

export default function AudioTile({ audio }: AudioTileProps) {
  const { path, name, audioUrl, loop } = audio;

  const [audioPath, setAudioPath] = useState(path);
  const [audioName, setAudioName] = useState(name);
  const [isLooping, setIsLooping] = useState(loop);

  function toggleAudioLoop() {
    setIsLooping(!isLooping);
  }

  function handleRename() {
    const newName = prompt(`Rename "${audioName}":`, audioName);

    if (newName === null || newName === "" || newName === audioName) {
      return;
    }

    return renameAudio(newName);
  }

  async function renameAudio(newName: string) {
    fetch(`/api/audios/${audioPath}`, {
      method: "PATCH",
      body: JSON.stringify({
        newFileName: newName,
      }),
    }).then(async (response) => {
      if (response.status === 200) {
        setAudioName(newName);

        const data = await response.json();
        setAudioPath(data.newPath);
      } else {
        alert(
          "An unexpected error occurred and the audio couldn't be renamed!",
        );
      }
    });
  }

  function handleDelete() {
    const confirmDelete = prompt(
      `Type 'confirm' and hit OK to delete ${audioName}`,
    );

    if (confirmDelete === null || confirmDelete === "") {
      return;
    }

    if (confirmDelete.trim().toLowerCase() === "confirm") {
      return deleteAudio();
    }
  }

  async function deleteAudio() {
    fetch(`/api/audios/${audioPath}`, {
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
    <li className="flex flex-col justify-between gap-x-6 gap-y-2 bg-gray-100 p-4 sm:flex-row">
      <div className="flex min-w-0 gap-x-4">
        <div className="flex min-w-0 flex-auto flex-col gap-4 ">
          <div className="flex flex-row items-center justify-between">
            <button
              className="rounded border bg-white px-2 py-2 text-center text-sm text-gray-900 transition-all hover:border-black sm:w-auto"
              onClick={handleRename}
            >
              <Edit3 size={16} />
            </button>
            <p className="w-full overflow-hidden overflow-ellipsis pl-2 text-sm font-semibold leading-6 text-gray-900">
              {audioName}
            </p>
            <button
              className="rounded border bg-white px-2 py-2 text-center text-sm text-gray-900 transition-all hover:border-black sm:hidden sm:w-auto"
              onClick={handleDelete}
            >
              <Trash2 size={16} color="red" />
            </button>
          </div>
          <audio id="audioPlayer" loop={isLooping} src={audioUrl} controls />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex flex-row gap-2">
          <button
            className={`flex items-center gap-2 text-sm text-gray-900 ${
              isLooping ? "border border-black bg-green-400" : "border bg-white"
            } rounded px-4 py-2 transition-all hover:border-black`}
            onClick={toggleAudioLoop}
          >
            <span>Loop</span>
            <Repeat size={14} />
          </button>
          <a
            className="w-full rounded border bg-white px-4 py-2 text-center text-sm text-gray-900 transition-all hover:border-black sm:w-auto"
            href={audioUrl}
            download={audioPath}
          >
            <span className="font-medium">Download</span>
          </a>
          <button
            className="hidden rounded border bg-white px-2 py-2 text-center text-sm text-gray-900 transition-all hover:border-black sm:inline-block sm:w-auto"
            onClick={handleDelete}
          >
            <Trash2 size={16} color="red" />
          </button>
        </div>
      </div>
    </li>
  );
}
