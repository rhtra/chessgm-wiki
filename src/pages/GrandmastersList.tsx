import { useEffect, useMemo, useState } from "react";
import GrandmasterModal from "../components/GrandmasterModal";
import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { countryCodeToFlag } from "../utils/flags";

type Player = {
  username: string;
  name?: string;
  avatar?: string;
  country?: string;
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

export default function GrandmastersList() {
  const [gms, setGms] = useState<string[]>([]);
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [query, setQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [sort, setSort] = useState("username");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Player | null>(null);
  const perPage = 25;

  useEffect(() => {
    fetch("https://api.chess.com/pub/titled/GM")
      .then((res) => res.json())
      .then((data) => setGms(data.players ?? []));
  }, []);

  // Prefetch details for the current page
  useEffect(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const slice = gms.slice(start, end);

    slice.forEach((username) => {
      if (!players[username]) {
        Promise.all([
          fetch(`https://api.chess.com/pub/player/${username}`).then((res) =>
            res.json()
          ),
          fetch(`https://api.chess.com/pub/player/${username}/stats`).then(
            (res) => res.json().catch(() => ({}))
          ),
        ])
          .then(async ([profile, stats]) => {
            let countryName: string | undefined;
            let countryCode: string | undefined;
            if (profile.country) {
              try {
                const res = await fetch(profile.country);
                const c = await res.json();
                countryName = c.name;
                countryCode = c.code;
              } catch {
                countryName = undefined;
                countryCode = undefined;
              }
            }

            setPlayers((prev) => ({
              ...prev,
              [username]: {
                username,
                name: profile.name,
                avatar: profile.avatar,
                country: profile.country,
                countryName,
                countryCode,
                fide: stats?.fide?.last?.rating,
                last_online: profile.last_online,
                joined: profile.joined,
                status: profile.status,
                is_streamer: profile.is_streamer,
                verified: profile.verified,
                league: profile.league,
                streaming_platforms: profile.streaming_platforms,
              },
            }));
          })
          .catch(() => {
            setPlayers((prev) => ({
              ...prev,
              [username]: { username },
            }));
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, gms]);

  // Build unique countries list
  const countryOptions = useMemo(() => {
    const set = new Map<string, string>(); // name → code
    Object.values(players).forEach((p) => {
      if (p.countryName && p.countryCode) {
        set.set(p.countryName, p.countryCode);
      }
    });
    return [
      { value: "All", label: "All" },
      ...Array.from(set.entries())
        .map(([name, code]) => ({
          value: name,
          label: `${countryCodeToFlag(code) || "🌍"} ${name}`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [players]);

  const sortOptions = [
    { value: "username", label: "Username" },
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
  ];

  // Filter + sort
  const filtered = useMemo(() => {
    let list = gms;

    if (query) {
      list = list.filter((u) =>
        u.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (countryFilter !== "All") {
      list = list.filter(
        (u) =>
          players[u]?.countryName?.toLowerCase() ===
          countryFilter.toLowerCase()
      );
    }

    // Sorting
    if (sort === "username") {
      list = [...list].sort((a, b) =>
        order === "asc" ? a.localeCompare(b) : b.localeCompare(a)
      );
    } else if (sort === "firstName") {
      list = [...list].sort((a, b) =>
        order === "asc"
          ? (players[a]?.name?.split(" ")[0] || "").localeCompare(
              players[b]?.name?.split(" ")[0] || ""
            )
          : (players[b]?.name?.split(" ")[0] || "").localeCompare(
              players[a]?.name?.split(" ")[0] || ""
            )
      );
    } else if (sort === "lastName") {
      list = [...list].sort((a, b) =>
        order === "asc"
          ? (players[a]?.name?.split(" ").slice(-1)[0] || "").localeCompare(
              players[b]?.name?.split(" ").slice(-1)[0] || ""
            )
          : (players[b]?.name?.split(" ").slice(-1)[0] || "").localeCompare(
              players[a]?.name?.split(" ").slice(-1)[0] || ""
            )
      );
    }

    return list;
  }, [gms, query, countryFilter, sort, order, players]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section>
      <h1>Grandmasters</h1>

      {/* Filters */}
      <div className="filters">
        <Dropdown
          label="Sort by"
          value={sort}
          options={sortOptions}
          onChange={setSort}
          order={order}
          onOrderChange={setOrder}
        />
        <Dropdown
          label="Country"
          value={countryFilter}
          options={countryOptions}
          onChange={setCountryFilter}
        />
      </div>

      {/* Search */}
      <SearchBar
        value={query}
        onChange={(val) => {
          setQuery(val);
          setPage(1);
        }}
      />

      {/* Cards */}
      <ul className="gm-list">
        {paged.map((u) => {
          const p = players[u];
          return (
            <li key={u} className="gm-card tournament-card">
              <img
                className="gm-photo"
                src={
                  p?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    u
                  )}&background=000&color=fff`
                }
                alt={u}
              />
              <div className="gm-details">
                <h2>
                  <span className="gm-badge">GM</span>{" "}
                  {p?.name ? (
                    <>
                      {p.name} <span className="username">({u})</span>
                    </>
                  ) : (
                    u
                  )}
                </h2>
                <p className="muted">
                  {p?.countryName
                    ? `${countryCodeToFlag(p.countryCode || "") || "🌍"} ${
                        p.countryName
                      }`
                    : "Unknown country"}
                </p>
                <p className="bio">
                  {p?.fide ? `FIDE rating: ${p.fide}` : "No rating data"}
                </p>
                <button className="btn" onClick={() => setSelected(p!)}>
                  View profile →
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {/* Modal */}
      {selected && (
        <GrandmasterModal player={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
