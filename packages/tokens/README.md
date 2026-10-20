# Design values

`styles/` owns the existing generated Web theme. The theme generator remains the
source of truth for both its CSS and the registry theme values.

`pnpm tokens:gen` converts the registry's light and dark semantic colours to
portable sRGB data in `src/colors.generated.ts`, retaining alpha. Native
components consume those roles and the shared numeric scales from `src/index.ts`.
Regenerate portable colours after regenerating the Web theme.

Do not edit generated styles or colour data by hand. Web typography can remain
dense while Native uses its explicit touch dimensions and text scale.
