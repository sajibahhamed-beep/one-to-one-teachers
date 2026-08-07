"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  t: typeof translations["bn"];
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("bn"); // DEFAULT LANGUAGE IS BANGLA

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("data-lang", lang);
      document.body.setAttribute("data-lang", lang);
      if (lang === "en") {
        document.documentElement.classList.add("lang-en");
        document.documentElement.classList.remove("lang-bn");
        document.body.classList.add("lang-en");
        document.body.classList.remove("lang-bn");
      } else {
        document.documentElement.classList.add("lang-bn");
        document.documentElement.classList.remove("lang-en");
        document.body.classList.add("lang-bn");
        document.body.classList.remove("lang-en");
      }
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === "bn" ? "en" : "bn"));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
