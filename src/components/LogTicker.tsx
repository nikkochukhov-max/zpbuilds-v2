"use client";

import { useEffect, useState } from "react";

const LOG_TEMPLATES = [
  () => {
    const n = Math.floor(Math.random() * 500) + 1;
    return `build #${n} deployed ✓`;
  },
  () => {
    const n = Math.floor(Math.random() * 10000) + 100;
    return `${n} requests processed`;
  },
  () => `claude: writing code...`,
  () => {
    const total = Math.floor(Math.random() * 20) + 5;
    const passed = total - Math.floor(Math.random() * 3);
    return `tests passed (${passed}/${total})`;
  },
  () => `deploy to production ✓`,
];

export default function LogTicker() {
  const [logText, setLogText] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showRandomLog = () => {
      setVisible(false);
      setTimeout(() => {
        const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
        const now = new Date();
        const h = String(now.getHours()).padStart(2, "0");
        const m = String(now.getMinutes()).padStart(2, "0");
        const s = String(now.getSeconds()).padStart(2, "0");
        setLogText(`[${h}:${m}:${s}] ${template()}`);
        setVisible(true);
      }, 300);
    };

    showRandomLog();
    const interval = setInterval(showRandomLog, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-5 text-[11px] text-[#666] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {logText}
    </div>
  );
}
