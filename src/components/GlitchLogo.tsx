"use client";

import { useEffect, useState } from "react";

interface GlitchLogoProps {
  imagePath: string;
  alt: string;
  className?: string;
}

export default function GlitchLogo({ imagePath, alt, className = "" }: GlitchLogoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`glitch-wrapper ${className}`}>
      <img
        src={imagePath}
        alt={alt}
        className="logo-img"
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
          position: "relative",
          zIndex: 1,
        }}
      />
      <img
        src={imagePath}
        alt=""
        aria-hidden="true"
        className="glitch-layer glitch-before logo-img"
      />
      <img
        src={imagePath}
        alt=""
        aria-hidden="true"
        className="glitch-layer glitch-after logo-img"
      />
    </div>
  );
}
