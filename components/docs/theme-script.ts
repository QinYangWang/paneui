/** localStorage key shared by the pre-paint script, ThemeToggle and the theme menu. Holds "light" | "dark" | "system". */
export const THEME_KEY = "theme"

/** localStorage key for the accent ("blue" | another preset | "custom"). Applied as `data-accent` on <html>; blue, the default, has no attribute. */
export const ACCENT_KEY = "accent"

/**
 * localStorage key for a custom accent picked on the Colors page: JSON `{ v: 2, hex, light, dark }`, where light/dark map
 * each accent role (`primary`, `primary-hover`, … `ring`) to a colour. Only read while ACCENT_KEY is "custom".
 */
export const CUSTOM_ACCENT_KEY = "accent-custom"

/** id of the <style> that carries the custom accent's `html[data-accent="custom"]` rules. */
export const CUSTOM_ACCENT_STYLE_ID = "accent-custom"

/** Same-tab broadcast when the accent changes (storage events only reach other tabs). */
export const ACCENT_CHANGE_EVENT = "qy-accent-change"

/** localStorage key for the radius: a preset from RADII ("default" has no attribute) or "custom". Applied as `data-radius` on <html>. */
export const RADIUS_KEY = "radius"

/** localStorage key for a custom radius in rem (a number as a string), set inline as `--radius` on <html>. Only read while RADIUS_KEY is "custom". */
export const CUSTOM_RADIUS_KEY = "radius-custom"

/** Same-tab broadcast when the radius changes. */
export const RADIUS_CHANGE_EVENT = "qy-radius-change"

/** Radius presets, each a `html[data-radius]` block in app/globals.css; "default" is the :root value. */
export const RADII = ["none", "sm", "default", "lg", "xl"] as const
export type RadiusPreset = (typeof RADII)[number]

/** Accent presets. "blue" is the default (its roles are on :root and .dark, no attribute); the rest have a `html[data-accent]` block in app/globals.css. */
export const ACCENTS = ["blue", "neutral", "green", "orange", "rose", "violet"] as const

/** Mirrors accent-color.ts DEFAULT_ACCENT (kept here so the pre-paint script has no extra import). */
const DEFAULT = "blue"

export type Accent = (typeof ACCENTS)[number]

/** Runs before paint (inlined in <head>) so the page never flashes the wrong theme or accent. */
export const themeScript = `(function(){try{var m=localStorage.getItem("${THEME_KEY}")||"system";var d=m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";var a=localStorage.getItem("${ACCENT_KEY}");if(a&&a!=="${DEFAULT}"&&${JSON.stringify(ACCENTS)}.indexOf(a)>-1)e.setAttribute("data-accent",a);else if(a==="custom"){var c=JSON.parse(localStorage.getItem("${CUSTOM_ACCENT_KEY}")||"null"),v=function(o){var r="";for(var k in o)if(/^(primary|ring)[a-z-]*$/.test(k)&&typeof o[k]==="string"&&!/[;{}<]/.test(o[k]))r+="--"+k+":"+o[k]+";";return r};if(c&&c.v===2&&c.light&&c.dark){var s=document.createElement("style");s.id="${CUSTOM_ACCENT_STYLE_ID}";s.textContent='html[data-accent="custom"]{'+v(c.light)+'}html[data-accent="custom"].dark{'+v(c.dark)+"}";document.head.appendChild(s);e.setAttribute("data-accent","custom")}}var q=localStorage.getItem("${RADIUS_KEY}");if(q&&q!=="default"&&${JSON.stringify(RADII)}.indexOf(q)>-1)e.setAttribute("data-radius",q);else if(q==="custom"){var n=parseFloat(localStorage.getItem("${CUSTOM_RADIUS_KEY}")||"");if(n>=0&&n<=2){e.setAttribute("data-radius","custom");e.style.setProperty("--radius",n+"rem")}}}catch(_){}})()`
