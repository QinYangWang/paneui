# Third-party notices

## Synara (visual style reference)

The library's native desktop structure (the 13px UI type scale, translucent fills, the Codex
rail shell layout, control densities) is adapted from the design tokens and UI components of
Synara, https://github.com/Emanuele-web04/synara (`apps/web/src/index.css`,
`apps/web/src/components/ui/*`, `apps/web/src/lib/appTypography.ts`). Values were re-expressed
as this project's own tokens and Tailwind classes; no source files were copied verbatim. Since
2026-10-16 the font, colour, radius and shadow values come from the foundation reference below.

MIT License

Copyright (c) 2026 T3 Tools Inc.
Copyright (c) 2026 Emanuele Di Pietro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## BoardUI (chart palette; colour system until 2026-10-16)

The categorical chart palette (`chart-1`…`chart-8`) in `app/globals.css` comes from BoardUI's
colour system, https://github.com/BoardUI/boardui (`styles/theme.css`, commit ec5c5eb, and
https://www.boardui.com/components/color). From 2026-10-14 to 2026-10-16 the rest of the theme
colours followed it too: the Tailwind neutral OKLCH ramp with BoardUI's primitive overrides
(neutral-100 #f7f7f7, neutral-200 #ebebeb, neutral-925 #121212, blue-400 #3392ff), the role
mapping of text, background, border and focus tokens, and an `--accent-50…950` ramp behind the
call-to-action colour. Values were re-expressed under this project's shadcn token names;
no source files were copied verbatim.

MIT License

Copyright (c) 2026 Mertcan Dundar Esmergul (BoardUI)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Foundation reference (colour roles, radius, shadow and type parameters, since 2026-10-16)

The default foundation in `app/globals.css` (and the `theme`, `theme-<accent>`, `theme-radius-*`
and `fonts` registry items) re-expresses design parameters published at
https://design.interfere.com (Colors, Radius, Shadows and Fonts pages, read 2026-10-16): the role
mapping of surfaces, text, fills, borders and the brand/positive/warning/danger colours onto
12-step scale steps, the page/shell/container/modal surface values, the 2–24px radius scale, the
four shadow strings (border, default, large, extra large) and the 400/450/500/600/700 weight
scale. Values were mapped onto this project's own shadcn token names; no stylesheet, script or
font file was copied. The reference's commercial typefaces are not used: this project
substitutes the open-licence fonts listed below. No licence is published for the reference
site; this notice records provenance only.

## Radix Colors (colour scales)

The gray, blue, green, orange, tomato, crimson and violet scales (and the black/white alpha
scales), in sRGB hex and display-p3, whose steps the theme colours and accent presets use, are
from Radix Colors, https://github.com/radix-ui/colors. Only the individual step values are
used, written directly into the theme tokens.

MIT License

Copyright (c) 2022 WorkOS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Fonts (Inter, Noto Sans SC, JetBrains Mono, Newsreader, Noto Serif SC)

The theme's font stacks name these typefaces. The docs site and the `fonts` registry item
install them from npm as the Fontsource packages (`@fontsource-variable/inter`,
`@fontsource-variable/noto-sans-sc`, `@fontsource-variable/jetbrains-mono`,
`@fontsource-variable/newsreader`, `@fontsource-variable/noto-serif-sc`); the font files are not
vendored or modified. All five are licensed under the SIL Open Font License, Version 1.1
(https://openfontlicense.org); each package ships the full licence text in its `LICENSE` file.

- Inter: Copyright 2016 The Inter Project Authors (https://github.com/rsms/inter)
- Noto Sans SC and Noto Serif SC: Copyright Google Inc. (https://github.com/notofonts/noto-cjk)
- JetBrains Mono: Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)
- Newsreader: Copyright 2020 The Newsreader Project Authors (https://github.com/productiontype/Newsreader)

## @pierre/diffs (runtime dependency of `file-diff`)

`registry/base-nova/ui/file-diff.tsx` renders its rows with `@pierre/diffs`
(https://diffs.com), Copyright 2025 Pierre Computer Company,
licensed under the Apache License, Version 2.0 (https://www.apache.org/licenses/LICENSE-2.0).
It is installed from npm as a dependency and not vendored or modified; the package ships no
NOTICE file. Its full license text is in `node_modules/@pierre/diffs/LICENSE.md`.

## DiceBear and Notionists (generated avatars)

`registry/base-nova/ui/generated-avatar.tsx` (and the `avatar-generator` registry item) draws its
avatars with DiceBear's Notionists style. Both packages are installed from npm as dependencies
(`@dicebear/core`, `@dicebear/notionists`) and not vendored or modified; the component crops the
output, swaps in its own background, prefixes the SVG ids and strips DiceBear's `<metadata>`.
The library no longer ships any avatar artwork of its own.

### Artwork: Notionists by Zoish (CC0 1.0)

Source: Notionists, https://heyzoish.gumroad.com/l/notionists
Designer: Zoish, https://bio.link/heyzoish
License: CC0 1.0 Universal (public domain dedication),
https://creativecommons.org/publicdomain/zero/1.0/
No attribution is required; it is credited here and on the Avatar Generator docs page.

### Code: DiceBear (MIT)

https://www.dicebear.com, https://github.com/dicebear/dicebear

MIT License

Copyright (c) 2024 Florian Körner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## maily.to (feature reference for `email-editor`) and Tiptap (runtime dependency)

The block set of `email-editor` (logo, button variants, variables, image, alignment, divider,
spacer, footer, section, columns, repeat, show-if) follows the feature list of maily.to,
https://github.com/arikchakma/maily.to, MIT License, Copyright (c) Arik Chakma. No maily source
code was copied; the editor is written from scratch on this project's notion-editor base.

`notion-editor` and `email-editor` depend at runtime on Tiptap's open-source packages
(https://github.com/ueberdosis/tiptap, MIT License; no Tiptap Pro extensions), lowlight and
highlight.js (BSD-3-Clause), the unified / remark packages (MIT) and React Email
(`@react-email/components`, `@react-email/render`, MIT). They are npm dependencies, not vendored.

## shadcn/typeset (`app/typeset.css`, registry item `typeset`)

`app/typeset.css` is the typeset stylesheet from shadcn/ui, https://ui.shadcn.com/docs/typeset
(https://ui.shadcn.com/typeset.css), with the heading font defaulting to `inherit` and this
library's presets (`typeset-docs`, `typeset-reading`, `typeset-chat`) appended.

MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## xterm.js (runtime dependency of `terminal`)

`registry/base-nova/ui/terminal.tsx` draws the terminal with `@xterm/xterm`, `@xterm/addon-fit`
and `@xterm/addon-web-links` (https://github.com/xtermjs/xterm.js), installed from npm as
dependencies. The component inlines the package's base stylesheet (`css/xterm.css`, minified,
with the scrollbar shadow rules removed, the IME composition colours switched to theme tokens and
a thinner scrollbar slider) so it works without a CSS import. MIT License:

Copyright (c) 2017-2019, The xterm.js authors (https://github.com/xtermjs/xterm.js)
Copyright (c) 2014-2016, SourceLair Private Company (https://www.sourcelair.com)
Copyright (c) 2012-2013, Christopher Jeffrey (https://github.com/chjj/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## node-pty and ws (used by `terminal-server/pty-bridge.mjs`)

The PTY bridge shipped with `terminal` imports `ws` (https://github.com/websockets/ws, MIT;
Copyright (c) 2011 Einar Otto Stangvik, (c) 2013 Arnout Kazemier and contributors, (c) 2016 Luigi
Pinca and contributors) and a PTY binding that users install themselves: `node-pty`
(https://github.com/microsoft/node-pty, MIT; Copyright (c) 2012-2015 Christopher Jeffrey,
(c) 2016 Daniel Imms, (c) 2018-present Microsoft Corporation) or its prebuilt fork
`@homebridge/node-pty-prebuilt-multiarch` (MIT, same notices). Neither binding is a dependency of
this repository and no code from them is vendored.


## @monaco-editor/react and the editor it loads (used by the `vscode` template)

The `vscode` template depends on `@monaco-editor/react` (https://github.com/suren-atoyan/monaco-react,
MIT; Copyright (c) 2018 Suren Atoyan), which loads `monaco-editor` (https://github.com/microsoft/monaco-editor,
MIT; Copyright (c) 2016 - present Microsoft Corporation) from the jsDelivr CDN at runtime. No code from
either is vendored in this repository.
