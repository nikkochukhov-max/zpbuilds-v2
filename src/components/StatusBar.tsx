"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [uptime, setUptime] = useState(0);
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setUptime(elapsed);

      const now = new Date();
      const uh = String(now.getUTCHours()).padStart(2, "0");
      const um = String(now.getUTCMinutes()).padStart(2, "0");
      const us = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${uh}:${um}:${us}`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (totalSeconds: number) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-7 items-center justify-between border-t border-[#222] bg-[#050505] px-3 text-[11px] text-[#777]">
      <span className="shrink-0">
        [ <span className="font-bold">ZP_BUILD</span> v2.0 ]
      </span>
      <span className="hidden sm:inline text-center">
        LOCAL: [27.11.2026 14:22] · uptime: {formatUptime(uptime)}
      </span>
      <span className="flex shrink-0 items-center gap-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        <span>{utcTime} UTC</span>
      </span>
    </div>
  );
}
