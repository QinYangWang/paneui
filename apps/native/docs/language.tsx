import * as React from "react";
export const ExampleLanguage = React.createContext<"en" | "zh">("en");
export function useExampleText() {
  const language = React.useContext(ExampleLanguage);
  return (en: string, zh: string) => (language === "zh" ? zh : en);
}
