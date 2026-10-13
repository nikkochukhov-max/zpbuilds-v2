export type Lang = "ru" | "en";

export const translations = {
  ru: {
    typingPhrases: [
      "собираю ботов, которые продают",
      "сайты за дни, а не недели",
      "автоматизация рутинного зла",
    ],
    services: {
      heading: "── [ услуги ] ──────────",
      items: [
        { name: "тг-боты", price: "от $100" },
        { name: "сайты / лендинги", price: "от $180" },
        { name: "автоматизация", price: "от $120" },
      ],
    },
    howItWorks: {
      heading: "── [ как работаю ] ──────────",
      steps: [
        "ты пишешь задачу",
        "я называю цену и срок",
        "предоплата 50%",
        "сдача работы",
      ],
    },
    contact: {
      heading: "────── [ контакт ] ──────",
      title: "есть задача?",
      signature: "отвечаю быстро. обычно в течение часа.",
      copyButton: "[ скопировать тг ]",
      copied: "[ скопировано ✓ ]",
      telegram: "[ telegram → ]",
      channel: "[ канал → ]",
    },
    footer: `© ${new Date().getFullYear()} ZP Builds`,
  },
  en: {
    typingPhrases: [
      "building bots that sell",
      "sites in days, not weeks",
      "automating routine evil",
    ],
    services: {
      heading: "── [ services ] ──────────",
      items: [
        { name: "tg bots", price: "from $100" },
        { name: "sites / landing pages", price: "from $180" },
        { name: "automation", price: "from $120" },
      ],
    },
    howItWorks: {
      heading: "── [ how i work ] ──────────",
      steps: [
        "you describe the task",
        "i give price and deadline",
        "50% prepayment",
        "delivery",
      ],
    },
    contact: {
      heading: "────── [ contact ] ──────",
      title: "have a task?",
      signature: "i reply fast. usually within an hour.",
      copyButton: "[ copy tg ]",
      copied: "[ copied ✓ ]",
      telegram: "[ telegram → ]",
      channel: "[ channel → ]",
    },
    footer: `© ${new Date().getFullYear()} ZP Builds`,
  },
};
