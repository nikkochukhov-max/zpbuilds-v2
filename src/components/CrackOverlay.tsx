"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";

export interface CrackState {
  x: number;
  y: number;
  url: string;
  width: number;
  height: number;
}

type CrackPath = {
  d: string;
  length: number;
  branch: boolean;
  delay: number;
};

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

const distance = (a: [number, number], b: [number, number]) =>
  Math.hypot(b[0] - a[0], b[1] - a[1]);

function createCrackPaths(crack: CrackState): CrackPath[] {
  const paths: CrackPath[] = [];
  const rayCount = Math.floor(randomBetween(10, 13));
  for (let ray = 0; ray < rayCount; ray += 1) {
    const angle = (ray / rayCount) * Math.PI * 2 + randomBetween(-0.14, 0.14);
    const points: [number, number][] = [[crack.x, crack.y]];
    let currentAngle = angle;
    let current = points[0];
    let totalLength = 0;
    const segmentCount = Math.floor(randomBetween(5, 9));

    for (let segment = 0; segment < segmentCount; segment += 1) {
      currentAngle += randomBetween(-0.3, 0.3);
      const length = randomBetween(30, 70);
      const next: [number, number] = [
        current[0] + Math.cos(currentAngle) * length,
        current[1] + Math.sin(currentAngle) * length,
      ];
      points.push(next);
      totalLength += distance(current, next);
      current = next;
    }

    const d = points
      .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(" ");
    paths.push({
      d,
      length: totalLength,
      branch: false,
      delay: randomBetween(0, 150),
    });

    const branchCount = Math.floor(randomBetween(1, 3));
    for (let branch = 0; branch < branchCount; branch += 1) {
      const startIndex = Math.floor(randomBetween(1, points.length - 1));
      const start = points[startIndex];
      const branchAngle = currentAngle + randomBetween(-1.1, 1.1);
      const branchPoints: [number, number][] = [start];
      let branchCurrent = start;
      let branchLength = 0;
      const branchSegments = Math.floor(randomBetween(2, 4));

      for (let part = 0; part < branchSegments; part += 1) {
        const next: [number, number] = [
          branchCurrent[0] + Math.cos(branchAngle + randomBetween(-0.25, 0.25)) * randomBetween(12, 30),
          branchCurrent[1] + Math.sin(branchAngle + randomBetween(-0.25, 0.25)) * randomBetween(12, 30),
        ];
        branchPoints.push(next);
        branchLength += distance(branchCurrent, next);
        branchCurrent = next;
      }

      const branchD = branchPoints
        .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
        .join(" ");
      paths.push({
        d: branchD,
        length: branchLength,
        branch: true,
        delay: randomBetween(0, 150),
      });
    }
  }

  return paths.slice(0, 40);
}

export function useCrack() {
  const [crack, setCrack] = useState<CrackState | null>(null);
  const busy = useRef(false);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
      busy.current = false;
      setCrack(null);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
    };
  }, []);

  const trigger = (event: ReactMouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault();
    if (busy.current) return;

    busy.current = true;
    setCrack({
      x: event.clientX,
      y: event.clientY,
      url,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    navigationTimer.current = setTimeout(() => {
      window.location.href = url;
    }, 2000);
  };

  return { crack, busy, trigger };
}

export default function CrackOverlay({ crack }: { crack: CrackState | null }) {
  const paths = useMemo(() => (crack ? createCrackPaths(crack) : []), [crack]);

  if (!crack) return null;

  return (
    <div className="crack-overlay" role="presentation" aria-hidden="true">
      <svg
        className="crack-svg"
        width={crack.width}
        height={crack.height}
        viewBox={`0 0 ${crack.width} ${crack.height}`}
        preserveAspectRatio="none"
      >
        <g className="crack-lines">
          {paths.map((path, index) => (
            <path
              key={`${index}-${path.d}`}
              d={path.d}
              className={`crack-path${path.branch ? " crack-path--branch" : ""}`}
              style={
                {
                  strokeDasharray: path.length,
                  strokeDashoffset: path.length,
                  animationDelay: `${path.delay}ms`,
                  "--crack-length": `${path.length}px`,

                } as CSSProperties & { "--crack-length": string }
              }
            />
          ))}
        </g>
        <circle className="crack-impact" cx={crack.x} cy={crack.y} r="3" />
      </svg>
    </div>
  );
}
