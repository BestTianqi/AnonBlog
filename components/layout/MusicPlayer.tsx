import { MUSIC_PLAYER_ID, MUSIC_PLAYER_HEIGHT } from "@/lib/constants";

export default function MusicPlayer() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4">
      <div className="flex justify-center">
        <iframe
          title="Music Player"
          frameBorder="no"
          marginWidth={0}
          marginHeight={0}
          width="100%"
          height={MUSIC_PLAYER_HEIGHT}
          src={`//music.163.com/outchain/player?type=1&id=${MUSIC_PLAYER_ID}&auto=0&height=430`}
          className="rounded-md max-w-[500px]"
        />
      </div>
    </div>
  );
}
