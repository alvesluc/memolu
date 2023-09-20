"use client";

import Navbar from "@/components/Navbar";
import NewAudio from "@/components/NewAudio";
import RecentAudios from "@/components/RecentAudios";
import { useState } from "react";

export default function Home() {
  const [audios, setAudios] = useState<string[]>([]);

  function addToAudiosList(audioUrl: string) {
    setAudios([...audios, audioUrl]);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto flex flex-col gap-y-4 max-w-4xl p-6 lg:px-8">
        <NewAudio saveAudio={addToAudiosList} />
        <RecentAudios audios={audios} />
      </main>
    </>
  );
}
