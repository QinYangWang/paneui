# Third-party notices

## Synara (visual style reference)

The library's default visual style ("native desktop": system UI font on a 13px scale,
translucent fills, hairline borders, near-flat elevation, 0.625rem radius steps, the Codex
rail shell layout, control densities) is adapted from the design tokens and UI components of
Synara, https://github.com/Emanuele-web04/synara (`apps/web/src/index.css`,
`apps/web/src/components/ui/*`, `apps/web/src/lib/appTypography.ts`). Values were re-expressed
as this project's own tokens and Tailwind classes; no source files were copied verbatim.

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

## @pierre/diffs (runtime dependency of `file-diff`)

`registry/base-nova/ui/file-diff.tsx` renders its rows with `@pierre/diffs`
(https://diffs.com), Copyright 2025 Pierre Computer Company,
licensed under the Apache License, Version 2.0 (https://www.apache.org/licenses/LICENSE-2.0).
It is installed from npm as a dependency and not vendored or modified; the package ships no
NOTICE file. Its full license text is in `node_modules/@pierre/diffs/LICENSE.md`.
