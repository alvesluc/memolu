import Navbar from "@/components/Navbar";
import NewAudio from "@/components/NewAudio";
import RecentAudios from "@/components/RecentAudios";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-4xl flex-col gap-y-4 p-6 lg:px-8">
        <NewAudio />
        <RecentAudios />
      </main>
    </>
  );
}
