import { useEffect, useState } from "react";

export function useClock(since: number | undefined) {
  const [elapsed, setElapsed] = useState("00:00:00");

  useEffect(() => {
    if (!since) return;

    const update = () => {
      const diff = Math.floor(Date.now() / 1000) - since;
      const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const seconds = String(diff % 60).padStart(2, "0");
      setElapsed(`${hours}:${minutes}:${seconds}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [since]);

  return elapsed;
}
