module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "airbnb",
    "eslint-config-prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.js"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "prettier"],
  rules: {
    "max-len": ["error", { "code": 100 }],
    "no-shadow": "off",
    "object-curly-newline": "off",
    "jsx-a11y/no-autofocus": "off",
    "indent": ["error", 2],
    "prettier/prettier": ["error", { "semi": false, "trailingComma": "all", "singleQuote": true }],
    "linebreak-style": [0, "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "import/no-unresolved": [2, { "caseSensitive": false }],
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": ["error", "always", { "ignoreClassFields": true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-target-blank": "off",
    "react/prop-types": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      2,
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always"
      }
    ]
  },
}
