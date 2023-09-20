"use client";

import Modal from "react-modal";
import { X } from "react-feather";
import { useSearchParams, useRouter } from "next/navigation";
import AudioRecorder from "./AudioRecorder";

type NewAudioModalProps = {
  saveAudio: (audioUrl: string) => void;
};

export default function NewAudioModal({ saveAudio }: NewAudioModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNewModalAudioOpen = searchParams.get("newAudio");

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isNewModalAudioOpen == "true"}
      onRequestClose={() => router.push("/")}
      overlayClassName="flex items-center justify-center bg-black bg-opacity-50 fixed top-0 bottom-0 left-0 right-0 fixed"
      className="w-full max-w-screen-sm bg-gray-100 p-6 relative rounded"
    >
      <button
        type="button"
        onClick={() => router.push("/")}
        className="top-3 right-3 absolute border"
      >
        <X />
      </button>
      <AudioRecorder saveAudio={saveAudio} />
    </Modal>
  );
}
