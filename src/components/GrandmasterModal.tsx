import { countryCodeToFlag } from "../utils/flags";
import { useClock } from "../utils/useClock";

type Player = {
  username: string;
  name?: string;
  avatar?: string;
  countryName?: string;
  countryCode?: string;
  fide?: number;
  last_online?: number;
  joined?: number;
  status?: string;
  is_streamer?: boolean;
  verified?: boolean;
  league?: string;
  streaming_platforms?: string[];
};

type Props = {
  player: Player;
  onClose: () => void;
};

export default function GrandmasterModal({ player, onClose }: Props) {
  const elapsed = useClock(player.last_online);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <img
          className="modal-avatar"
          src={
            player.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              player.username
            )}&background=000&color=fff`
          }
          alt={player.username}
        />

        <h2>
          GM{" "}
          {player.name ? (
            <>
              {player.name} <span className="username">({player.username})</span>
            </>
          ) : (
            player.username
          )}
        </h2>


        <p>
          Country:{" "}
          {player.countryName ? (
            <>
              {countryCodeToFlag(player.countryCode || "") || "🌍"}{" "}
              {player.countryName}
            </>
          ) : (
            "Unknown"
          )}
        </p>

        <p>Status: {player.status || "Unknown"}</p>
        <p>Verified: {player.verified ? "✅ Yes" : "❌ No"}</p>
        <p>Streamer: {player.is_streamer ? "🎥 Yes" : "No"}</p>
        <p>League: {player.league || "N/A"}</p>
        {player.streaming_platforms && player.streaming_platforms.length > 0 && (
          <p>
            Platforms: {player.streaming_platforms.join(", ")}
          </p>
        )}

        <p>
          Joined:{" "}
          {player.joined
            ? new Date(player.joined * 1000).toLocaleDateString()
            : "Unknown"}
        </p>

        <p>
          Last Online:{" "}
          {player.last_online
            ? new Date(player.last_online * 1000).toLocaleString()
            : "Unknown"}
        </p>

        {player.last_online && (
          <p>Time since last online: {elapsed}</p>
        )}

        <p>Rating: {player.fide || "No rating"}</p>

        <a
          href={`https://www.chess.com/member/${player.username}`}
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          Open Chess.com profile
        </a>
      </div>
    </div>
  );
}
