"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "$ initializing zp_builds...",
  "$ loading modules [██████████] 100%",
  "$ access granted",
];

const BOOT_KEY = "zp_builds_boot_seen";

export default function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(BOOT_KEY)) {
      setVisible(false);
      return;
    }

    sessionStorage.setItem(BOOT_KEY, "1");

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    BOOT_LINES.forEach((_, i) => {
      const delay = 150 + Math.random() * 150;
      elapsed += delay;
      const t = setTimeout(() => {
        const el = document.getElementById(`boot-line-${i}`);
        if (el) el.classList.add("boot-line--visible");
      }, elapsed);
      timeouts.push(t);
    });

    const totalTime = elapsed + 500;
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, totalTime);
    timeouts.push(fadeTimer);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, totalTime + 300);
    timeouts.push(removeTimer);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const handleSkip = () => {
    if (skipped) return;
    setSkipped(true);
    setFading(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`boot-screen${fading ? " fade-out" : ""}`}
      onClick={handleSkip}
    >
      <div className="boot-text">
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            id={`boot-line-${i}`}
            className="boot-line"
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
