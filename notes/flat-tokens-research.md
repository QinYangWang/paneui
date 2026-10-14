# Flat token research (jakub.kr, oklch.fyi) — 2026-10-14
Raw CSS: /workspace/work/tokens/{jakub,oklch}.css
- Neutral gray 12-step, chroma 0. Light: bg #fcfcfc, 200 #f6f6f6, 300 #f0f0f0, 400 #e8e8e8, 500 #e0e0e0, 600 #d9d9d9, 700 #cecece, 800 #bbb, 900 #8d8d8d, 1000 #838383, 1100 #646464-#6f6f6f, 1200 #202020; paragraph #424242; surface #fff.
- Dark (oklch.fyi): bg #101010, 100 #111, 200 #191919, 300 #222, 400 #2a2a2a, 500 #313131, 600 #3a3a3a, 700 #484848, 800 #606060, 900 #6e6e6e, 1000 #7b7b7b, 1100 #b5b5b5, 1200 #eee; surface #0b0b0b, elevated #111, border #1f1f1f, paragraph #dbdbdb.
- Elevation light: raised = 0 0 0 1px #0000000f, 0 1px 2px -1px #0000000f, 0 2px 4px #0000000a; hover = same with #00000014/#00000014/#0000000f; ring 0 0 0 1px #0000000f; focus 0 0 0 3px #00000014.
- Elevation dark: ring only 0 0 0 1px #ffffff14 (hover #ffffff21); focus 0 0 0 3px #ffffff1a.
- Buttons (oklch.fyi): h-8 rounded-lg px-2.5 bg-surface shadow-raised hover:bg-gray-200 hover:shadow-raised-hover, transition color/bg/box-shadow/scale 150ms ease-out, icon buttons rounded-full hover:bg-gray-300, active:scale-[0.97]. Cards rounded-xl/2xl bg-surface shadow-raised p-1 nested. Hover lift -translate-y-2 300ms.
- No gradients, inset highlights, text-shadow. Fonts: Inter with cv01/ss03 (oklch.fyi), system sans (jakub).
Pending user decision: pill vs 8px buttons; blue vs black/white primary.
