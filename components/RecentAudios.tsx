type RecentAudiosProps = {
  audios: string[];
};

export default function RecentAudios({ audios }: RecentAudiosProps) {
  // const [isLooping, setIsLooping] = useState(false);

  // const toggleLoop = () => {
  //   setIsLooping(!isLooping);
  // };

  return (
    <ul role="list" className="flex w-full flex-col gap-2">
      {audios.map((audio) => {
        return (
          <li
            key={audio}
            className="flex flex-col justify-between gap-x-6 p-4 bg-gray-100 sm:flex-row"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="flex flex-col gap-2 min-w-0 flex-auto ">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  even-dumber-awful-song-from-hell
                </p>
                <audio
                  id="audioPlayer"
                  // loop={isLooping}
                  src={audio}
                  controls
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mt-1 text-xs leading-5 text-gray-500">
                14/09/2023 20:06
              </p>
              <div className="flex flex-row gap-2">
                <a
                  className="text-center text-sm w-full text-gray-900 bg-white border py-2 px-4 rounded hover:border-black sm:w-auto"
                  href={audio}
                  download
                >
                  <span className="font-medium">Baixar áudio</span>
                </a>
                {/* <button
                  className={`text-sm text-gray-900 ${
                    isLooping
                      ? "border border-black bg-green-300"
                      : "border bg-white"
                  } py-2 px-4 rounded hover:border-black`}
                  onClick={toggleLoop}
                >
                  Loop
                </button> */}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
