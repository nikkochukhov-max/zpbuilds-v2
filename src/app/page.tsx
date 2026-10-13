"use client";

import { useState } from "react";
import BootScreen from "@/components/BootScreen";
import LogoImage from "@/components/LogoImage";
import TypingLine from "@/components/TypingLine";
import StatusBar from "@/components/StatusBar";
import LogTicker from "@/components/LogTicker";
import ScrollReveal from "@/components/ScrollReveal";
import CrackOverlay, { useCrack } from "@/components/CrackOverlay";
import { contacts } from "@/config";
import { translations, Lang } from "@/i18n";

export default function Home() {
  const [lang, setLang] = useState<Lang>("ru");
  const t = translations[lang];
  const { crack, trigger } = useCrack();

  return (
    <>
      <div className={crack ? "shake" : ""}>
        <BootScreen />
      <div className="crt-overlay" />
      <div className="vignette-overlay" />

      {/* Language toggle */}
      <div className="fixed top-10 right-4 z-40 flex items-center gap-2">
        {(["ru", "en"] as const).map((l) => {
          const active = lang === l;
          return (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={active}
              className={`border bg-[#050505] px-2 py-1 text-[10px] uppercase transition-colors ${
                active
                  ? "border-[#eaeaea] text-[#eaeaea]"
                  : "border-[#222] text-[#777] hover:border-[#eaeaea] hover:text-[#eaeaea]"
              }`}
            >
              {l}
            </button>
          );
        })}
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center px-4 pt-16 pb-10">
        {/* ── HERO ── */}
        <ScrollReveal className="flex w-full max-w-2xl flex-col items-center gap-8">
          {/* мобильный: ZP сверху, BUILDS снизу */}
          <div className="md:hidden mx-auto flex w-[260px] max-w-[85vw] flex-col items-center gap-3">
            <LogoImage src="/zp-logo.png" className="w-[52%]" />
            <LogoImage src="/builds-logo.png" className="w-full" />
          </div>

          {/* десктоп */}
          <div className="hidden md:block mx-auto w-[640px] max-w-[90vw]">
            <LogoImage src="/full-logo.png" className="w-full" />
          </div>

          <div className="flex h-8 items-center text-sm text-[#eaeaea]">
            <span className="mr-2 text-[#777]">$</span>
            <TypingLine phrases={t.typingPhrases} />
          </div>

          <LogTicker />

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={contacts.telegram}
              onClick={(e) => trigger(e, contacts.telegram)}
              className="btn-terminal"
            >
              {t.contact.telegram}
            </a>
            <a
              href={contacts.channel}
              onClick={(e) => trigger(e, contacts.channel)}
              className="btn-terminal"
            >
              {t.contact.channel}
            </a>
          </div>
        </ScrollReveal>

        {/* ── УСЛУГИ ── */}
        <ScrollReveal className="mt-24 w-full max-w-2xl">
          <div className="section-heading">{t.services.heading}</div>
          <div className="border border-[#222] p-4">
            {t.services.items.map((item, i) => (
              <div key={i} className="service-row">
                <span className="service-arrow">&gt;</span>
                <span>{item.name}</span>
                <span className="service-dots">
                  {".".repeat(Math.max(0, 20 - item.name.length))}
                </span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── КАК РАБОТАЮ ── */}
        <ScrollReveal className="mt-24 w-full max-w-2xl">
          <div className="section-heading">{t.howItWorks.heading}</div>
          <div className="flex flex-col gap-2 text-sm">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i}>
                <span className="text-[#777]">$ 0{i + 1} →</span>{" "}
                <span className="text-[#eaeaea]">{step}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── КОНТАКТ ── */}
        <ScrollReveal className="mt-24 flex w-full max-w-2xl flex-col items-center gap-8">
          <div className="section-heading text-center">{t.contact.heading}</div>
          <div className="flex flex-col items-center gap-6">
            <div className="text-4xl font-bold text-[#eaeaea]">
              {t.contact.title}[
              <span className="typing-caret">█</span>]
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={contacts.telegram}
                onClick={(e) => trigger(e, contacts.telegram)}
                className="btn-terminal"
              >
                {t.contact.telegram}
              </a>
              <a
                href={contacts.channel}
                onClick={(e) => trigger(e, contacts.channel)}
                className="btn-terminal"
              >
                {t.contact.channel}
              </a>
            </div>
            <p className="text-sm text-[#777]">{t.contact.signature}</p>
          </div>
        </ScrollReveal>

        {/* ── FOOTER ── */}
        <footer className="mt-24 text-xs text-[#777]">{t.footer}</footer>
      </main>

        <StatusBar />
      </div>
      <CrackOverlay crack={crack} />
    </>
  );
}
