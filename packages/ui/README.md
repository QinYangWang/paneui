# Web UI

The only source of Web components, blocks, icons and browser utilities.
Applications import explicit source subpaths such as
`@paneui/ui/components/button`. Components never import application code.

The registry manifest lives in `packages/registry/registry.json`. Its build reads
these source files and rewrites workspace imports for source installation.
Do not maintain a second copy of component implementations in the registry.

After adding a source entry, add its explicit subpath to `package.json` exports.
Theme styles belong to `@paneui/tokens`; platform-independent state belongs to
`@paneui/core`. Native components live in `@paneui/ui-native`.
