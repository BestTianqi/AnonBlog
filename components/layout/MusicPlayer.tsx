import { MUSIC_PLAYER_ID } from "@/lib/constants";

export default function MusicPlayer() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4">
      <div className="flex justify-center">
        <iframe
          title="Music Player"
          frameBorder="no"
          marginWidth={0}
          marginHeight={0}
          width={330}
          height={86}
          src={`//music.163.com/outchain/player?type=2&id=${MUSIC_PLAYER_ID}&auto=0&height=66`}
          className="rounded-md"
        />
      </div>
    </div>
  );
}
