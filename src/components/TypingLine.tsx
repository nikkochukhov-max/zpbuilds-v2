"use client";

import { useEffect, useState } from "react";

interface TypingLineProps {
  phrases: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
}

export default function TypingLine({
  phrases,
  typingSpeed = 60,
  pauseDuration = 1500,
  deletingSpeed = 30,
}: TypingLineProps) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && text === currentPhrase) {
      setIsPaused(true);
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(() => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1));
      } else {
        setText((prev) => currentPhrase.slice(0, prev.length + 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, isPaused, phraseIndex, phrases, typingSpeed, pauseDuration, deletingSpeed]);

  return (
    <span>
      {text}
      <span className="typing-caret">█</span>
    </span>
  );
}
