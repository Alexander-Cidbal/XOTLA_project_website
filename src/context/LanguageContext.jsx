import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('xotla-lang') || 'en');

  useEffect(() => {
    localStorage.setItem('xotla-lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'es' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook de conveniencia
export function useLang() {
  return useContext(LanguageContext);
}

// Componente helper: renderiza el texto según el idioma activo
export function T({ en, es }) {
  const { lang } = useLang();
  return lang === 'en' ? en : es;
}
