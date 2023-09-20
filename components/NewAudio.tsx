import AudioRecorder from "./AudioRecorder";

type NewAudioProps = {
  saveAudio: (audioUrl: string) => void;
};

export default function NewAudio({ saveAudio }: NewAudioProps) {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <label
        htmlFor="dropzone-file"
        className="flex flex-[1] flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
      >
        <div className="flex flex-col items-center justify-center p-4">
          <p className="mb-2 text-sm text-gray-500">
            You can click to upload, drag and drop
          </p>
          <p className="mb-2 text-xs text-gray-500">Valid file types: MP3</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
      <p>or</p>
      <div className="flex">
        <AudioRecorder saveAudio={saveAudio} />
      </div>
    </div>
  );
}
