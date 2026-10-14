/** localStorage key shared by the pre-paint script, ThemeToggle and the theme menu. Holds "light" | "dark" | "system". */
export const THEME_KEY = "theme"

/** localStorage key for the accent preset ("neutral" | "blue" | …). Applied as `data-accent` on <html>. */
export const ACCENT_KEY = "accent"

/** Accent presets with a `html[data-accent]` block in app/globals.css. "neutral" is the default (no attribute). */
export const ACCENTS = ["neutral", "blue", "green", "orange", "rose", "violet"] as const
export type Accent = (typeof ACCENTS)[number]

/** Runs before paint (inlined in <head>) so the page never flashes the wrong theme or accent. */
export const themeScript = `(function(){try{var m=localStorage.getItem("${THEME_KEY}")||"system";var d=m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";var a=localStorage.getItem("${ACCENT_KEY}");if(a&&a!=="neutral"&&${JSON.stringify(ACCENTS)}.indexOf(a)>-1)e.setAttribute("data-accent",a)}catch(_){}})()`
