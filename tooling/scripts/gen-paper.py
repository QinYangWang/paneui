# Writes packages/tokens/styles/theme-paper.css (Paper style). Re-run after changing values here.
from pathlib import Path
import json
import math
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'packages/tokens/styles/theme-paper.css'
ANCHORS = json.loads((ROOT / 'tooling/fixtures/paper-anchors.json').read_text())
def lch(hex_value):
    rgb = [int(hex_value[i:i+2], 16)/255 for i in (1,3,5)]
    r,g,b = [v/12.92 if v <= .04045 else ((v+.055)/1.055)**2.4 for v in rgb]
    l,m,s = [(a*r+b1*g+c*b)**(1/3) for a,b1,c in [(0.4122214708,0.5363325363,0.0514459929),(0.2119034982,0.6806995451,0.1073969566),(0.0883024619,0.2817188376,0.6299787005)]]
    L = .2104542553*l + .793617785*m - .0040720468*s
    a = 1.9779984951*l - 2.428592205*m + .4505937099*s
    b = .0259040371*l + .7827717662*m - .808675766*s
    return L, math.hypot(a,b), math.degrees(math.atan2(b,a)) % 360
def anchor(key):
    L,c,h = lch(ANCHORS[key]['hex'])
    return round(h,2), round(min(c,.14),4)

W=round(lch(ANCHORS['neutral']['hex'])[2],2)
def ink(a, L=0.30, C=0.004): return f"oklch({L*100:g}% {C:g} {W} / {a:g})"
def ivory(a, L=0.97, C=0.003): return f"oklch({L*100:g}% {C:g} {W} / {a:g})"
def shadow_l(*layers): return ', '.join(layers)

def state_l(name,h,c,L=0.6):
    return {name:f'oklch({L*100:g}% {c:g} {h})', f'{name}-hover':f'oklch({(L-0.04)*100:g}% {c:g} {h})', f'{name}-foreground':'oklch(100% 0 0)',
      f'{name}-subtle':f'oklch({L*100:g}% {c:g} {h} / 0.11)', f'{name}-border':f'oklch({L*100:g}% {c:g} {h} / 0.3)'}
def state_d(name,h,c,L=0.74):
    return {name:f'oklch({L*100:g}% {c:g} {h})', f'{name}-hover':f'oklch({(L+0.04)*100:g}% {c:g} {h})', f'{name}-foreground':f'oklch(21% 0.02 {h})',
      f'{name}-subtle':f'oklch({L*100:g}% {c:g} {h} / 0.14)', f'{name}-border':f'oklch({L*100:g}% {c:g} {h} / 0.32)'}
STATE_L={**state_l('destructive',*anchor('rose'),0.54), **state_l('success',*anchor('green'),0.54), **state_l('warning',*anchor('orange'),0.54)}
STATE_D={**state_d('destructive',*anchor('rose'),0.76), **state_d('success',*anchor('green'),0.76), **state_d('warning',*anchor('orange'),0.8)}
light = {
 'radius-note': None,
 'background': 'oklch(99% 0.002 255)',
 'card': 'oklch(99.8% 0.001 255)',
 'popover': 'oklch(99.8% 0.001 255)',
 'surface-sunken': ink(0.05),
 'surface-standout': 'oklch(26% 0.004 285)',
 'standout-foreground': 'oklch(98% 0.002 255)',
 'foreground': 'oklch(23% 0.004 285)',
 'card-foreground': 'oklch(23% 0.004 285)',
 'popover-foreground': 'oklch(23% 0.004 285)',
 'muted-foreground': ink(0.68, 0.24, 0.004),
 'fg-tertiary': ink(0.5, 0.26, 0.004),
 'fg-disabled': ink(0.34, 0.28, 0.004),
 'secondary': ink(0.065),
 'secondary-foreground': 'oklch(23% 0.004 285)',
 'muted': ink(0.065),
 'accent': ink(0.1),
 'accent-foreground': 'oklch(23% 0.004 285)',
 'border': ink(0.12),
 'border-subtle': ink(0.05),
 'border-strong': ink(0.2),
 'input': ink(0.14),
 'code': 'oklch(97.5% 0.003 255)',
 'scrollbar': ink(0.18),
 'scrollbar-hover': ink(0.3),
 'shell': 'oklch(97% 0.003 255)',
 'shell-border': ink(0.1),
 'shadow-border': f"0 0 0 1px {ink(0.1)}",
 'shadow-default': shadow_l(f"0 0 0 1px {ink(0.075)}", f"0 1px 2px {ink(0.05)}", f"0 4px 14px -4px {ink(0.08)}"),
 'shadow-lg': shadow_l(f"0 0 0 1px {ink(0.07)}", f"0 4px 10px -3px {ink(0.07)}", f"0 18px 40px -10px {ink(0.14)}"),
 'shadow-xl': shadow_l(f"0 0 0 1px {ink(0.06)}", f"0 12px 28px -8px {ink(0.1)}", f"0 32px 72px -16px {ink(0.2)}"),
 'skeuo-raised': 'var(--shadow-default)',
 'skeuo-raised-hover': shadow_l(f"0 0 0 1px {ink(0.12)}", f"0 2px 4px {ink(0.06)}", f"0 8px 20px -6px {ink(0.12)}"),
 'skeuo-pressed': 'var(--shadow-border)',
 'skeuo-primary': shadow_l(f"0 1px 2px {ink(0.1)}", f"0 4px 12px -4px {ink(0.14)}"),
 'skeuo-well': 'inset 0 0 0 1px var(--input)',
 'skeuo-surface': 'var(--shadow-lg)',
 'skeuo-chip': 'var(--shadow-border)',
 'image-outline': ink(0.1),
}
light.update(STATE_L)
light.pop('radius-note')
DK=lambda a: f"oklch(0% 0 0 / {a:g})"
dark = {
 'background': 'oklch(19.5% 0.004 285)',
 'card': 'oklch(22.5% 0.004 285)',
 'popover': 'oklch(25.5% 0.004 285)',
 'surface-sunken': DK(0.25),
 'surface-standout': 'oklch(30% 0.004 285)',
 'standout-foreground': 'oklch(95% 0.003 255)',
 'foreground': 'oklch(94% 0.003 255)',
 'card-foreground': 'oklch(94% 0.003 255)',
 'popover-foreground': 'oklch(94% 0.003 255)',
 'muted-foreground': ivory(0.66),
 'fg-tertiary': ivory(0.44),
 'fg-disabled': ivory(0.32),
 'secondary': ivory(0.075),
 'secondary-foreground': 'oklch(94% 0.003 255)',
 'muted': ivory(0.075),
 'accent': ivory(0.11),
 'accent-foreground': 'oklch(94% 0.003 255)',
 'border': ivory(0.11),
 'border-subtle': ivory(0.05),
 'border-strong': ivory(0.18),
 'input': ivory(0.12),
 'code': 'oklch(21.5% 0.004 285)',
 'scrollbar': ivory(0.18),
 'scrollbar-hover': ivory(0.3),
 'shell': 'oklch(16.5% 0.004 285)',
 'shell-border': ivory(0.09),
 'shadow-border': f"0 0 0 1px {ivory(0.1)}",
 'shadow-default': shadow_l(f"0 0 0 1px {ivory(0.085)} inset", f"0 1px 2px {DK(0.2)}", f"0 6px 16px -6px {DK(0.35)}"),
 'shadow-lg': shadow_l(f"0 0 0 1px {ivory(0.12)}", f"0 4px 10px -3px {DK(0.3)}", f"0 18px 40px -10px {DK(0.5)}"),
 'shadow-xl': shadow_l(f"0 0 0 1px {ivory(0.1)} inset", f"0 12px 28px -8px {DK(0.35)}", f"0 32px 72px -16px {DK(0.6)}"),
 'skeuo-raised': 'var(--shadow-default)',
 'skeuo-raised-hover': shadow_l(f"0 0 0 1px {ivory(0.14)} inset", f"0 2px 4px {DK(0.25)}", f"0 8px 20px -6px {DK(0.4)}"),
 'skeuo-pressed': 'var(--shadow-border)',
 'skeuo-primary': '0 0 0 0 transparent',
 'skeuo-well': 'inset 0 0 0 1px var(--input)',
 'skeuo-surface': 'var(--shadow-lg)',
 'skeuo-chip': 'var(--shadow-border)',
 'image-outline': ivory(0.1),
}
dark.update(STATE_D)
# accents: (hue, chroma)
ACC = {key:anchor(key) for key in ['blue','green','orange','rose','violet']}
def acc_light(h,c):
    return {'primary':f'oklch(54% {c:g} {h})','primary-hover':f'oklch(50% {c:g} {h})','primary-active':f'oklch(46% {c:g} {h})',
      'primary-foreground':'oklch(100% 0 0)','primary-subtle':f'oklch(62% {c:g} {h} / 0.12)','primary-subtle-hover':f'oklch(62% {c:g} {h} / 0.18)',
      'primary-border':f'oklch(58% {c:g} {h} / 0.32)','ring':f'oklch(58% {c:g} {h} / 0.5)'}
def acc_dark(h,c):
    c2=round(c*0.72,3)
    return {'primary':f'oklch(80% {c2:g} {h})','primary-hover':f'oklch(84% {c2:g} {h})','primary-active':f'oklch(88% {c2:g} {h})',
      'primary-foreground':f'oklch(21% 0.02 {h})','primary-subtle':f'oklch(80% {c:g} {h} / 0.14)','primary-subtle-hover':f'oklch(80% {c:g} {h} / 0.2)',
      'primary-border':f'oklch(80% {c:g} {h} / 0.32)','ring':f'oklch(80% {c:g} {h} / 0.6)'}
neutral_light={'primary':'oklch(24% 0.004 285)','primary-hover':'oklch(31% 0.004 285)','primary-active':'oklch(38% 0.004 285)',
  'primary-foreground':'oklch(99% 0.002 255)','primary-subtle':ink(0.065),'primary-subtle-hover':ink(0.1),'primary-border':ink(0.2),'ring':ink(0.32)}
neutral_dark={'primary':'oklch(94% 0.003 255)','primary-hover':'oklch(88% 0.003 255)','primary-active':'oklch(82% 0.003 255)',
  'primary-foreground':'oklch(20% 0.004 285)','primary-subtle':ivory(0.075),'primary-subtle-hover':ivory(0.11),'primary-border':ivory(0.18),'ring':ivory(0.36)}

def block(sel, d, indent=''):
    return f"{indent}{sel} {{\n"+''.join(f"{indent}  --{k}: {v};\n" for k,v in d.items())+f"{indent}}}\n"
P='html[data-style="paper"]'
E='[data-style="paper"]'
def sel(*xs): return ',\n'.join(xs)
ROLES=['primary','primary-hover','primary-active','primary-foreground','primary-subtle','primary-subtle-hover','primary-border','ring']
out=["""/*
 * Generated by tooling/scripts/gen-paper.py. Do not edit.
 * Paper style applies to a page or section.
 * Switched at runtime with data-style="paper" on <html> (no attribute = the default style); the attribute
 * also works on any element to give one section the style. Light and dark both apply.
 * Import after the theme (and after theme-accents.css when you use it).
 */

""",
f"""{sel(P, E)} {{
  /* Titles take the text serif; body text stays on --font-sans. */
  --heading-font: "Source Serif 4 Variable", "Source Serif 4", "Noto Serif SC Variable", "Noto Serif SC", ui-serif, Georgia, "Songti SC", serif;
  --heading-font-features: normal;
  /* Controls (buttons, tabs, segmented, toggles) turn into pills; every other radius stays on the scale. */
  --control-radius: 2rem;
""" + ''.join(f"  --{k}: {v};\n" for k,v in light.items()) + "}\n\n",
f"/* Softer corners by default; a radius preset or a custom value still wins. */\n{sel(P+':not([data-radius])', 'html:not([data-radius]) '+E+':not([data-radius])')} {{\n  --radius: 0.75rem;\n}}\n\n",
block(sel(P+'.dark', '.dark '+E), dark), '\n',
"/* Accents: dusty solids on paper, pastel solids with ink text in dark. Blue (no data-accent) is the default. */\n",
block(sel(P+':not([data-accent])', E+':not([data-accent])'), acc_light(*ACC['blue'])),
block(sel(P+'.dark:not([data-accent])', '.dark '+E+':not([data-accent])'), acc_dark(*ACC['blue'])),
]
for name in ['neutral','blue','green','orange','rose','violet']:
    l = neutral_light if name=='neutral' else acc_light(*ACC[name])
    d = neutral_dark if name=='neutral' else acc_dark(*ACC[name])
    a=f'[data-accent="{name}"]'
    out.append(block(sel(P+a, E+a, f'html{a} {E}:not([data-accent])', f'{P} {a}'), l))
    out.append(block(sel(P+a+'.dark', '.dark '+E+a, f'html.dark{a} {E}:not([data-accent])', f'{P}.dark {a}'), d))
out.append("/* A custom accent picked for the page carries into a Paper section. */\n")
out.append(block(f'html[data-accent="custom"] {E}:not([data-accent])', {k:'inherit' for k in ROLES}))
result = ''.join(out)
result = result.replace(' 255)', f" {lch(ANCHORS['surface']['hex'])[2]:.2f})")
result = result.replace(' 285)', f" {W})")
OUT.write_text(result)
print(OUT)
