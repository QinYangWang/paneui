/** Conventional Commits with a required scope: the component/item name, or site|cli|registry|docs|ci. */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [2, "never"],
  },
}
