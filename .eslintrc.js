module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "globals": {
    "API_SERVER": true,
    __webpack_public_path__: true
  },
  "rules": {
    "@typescript-eslint/indent": [
      "warn",
      2
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-member-accessibility": "off"
  }
}
