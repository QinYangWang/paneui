/** localStorage key shared by the pre-paint script, ThemeToggle and the theme menu. Holds "light" | "dark" | "system". */
export const THEME_KEY = "theme"

/** localStorage key for the accent ("neutral" | a preset | "custom"). Applied as `data-accent` on <html>. */
export const ACCENT_KEY = "accent"

/**
 * localStorage key for a custom accent picked on the Colors page: JSON `{ hex, light, dark }`, where light/dark are
 * `{ primary, foreground, ring }` OKLCH strings. Only read while ACCENT_KEY is "custom".
 */
export const CUSTOM_ACCENT_KEY = "accent-custom"

/** id of the <style> that carries the custom accent's `html[data-accent="custom"]` rules. */
export const CUSTOM_ACCENT_STYLE_ID = "accent-custom"

/** Same-tab broadcast when the accent changes (storage events only reach other tabs). */
export const ACCENT_CHANGE_EVENT = "qy-accent-change"

/** Accent presets with a `html[data-accent]` block in app/globals.css. "neutral" is the default (no attribute). */
export const ACCENTS = ["neutral", "blue", "green", "orange", "rose", "violet"] as const
export type Accent = (typeof ACCENTS)[number]

/** Runs before paint (inlined in <head>) so the page never flashes the wrong theme or accent. */
export const themeScript = `(function(){try{var m=localStorage.getItem("${THEME_KEY}")||"system";var d=m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";var a=localStorage.getItem("${ACCENT_KEY}");if(a&&a!=="neutral"&&${JSON.stringify(ACCENTS)}.indexOf(a)>-1)e.setAttribute("data-accent",a);else if(a==="custom"){var c=JSON.parse(localStorage.getItem("${CUSTOM_ACCENT_KEY}")||"null"),v=function(o){return"--primary:"+o.primary+";--primary-foreground:"+o.foreground+";--ring:"+o.ring};if(c&&c.light&&c.dark){var s=document.createElement("style");s.id="${CUSTOM_ACCENT_STYLE_ID}";s.textContent='html[data-accent="custom"]{'+v(c.light)+'}html[data-accent="custom"].dark{'+v(c.dark)+"}";document.head.appendChild(s);e.setAttribute("data-accent","custom")}}}catch(_){}})()`
