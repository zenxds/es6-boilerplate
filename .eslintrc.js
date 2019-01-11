module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "plugins": [
    "import"
  ],
  "globals": {
    "API_SERVER": true
  },
  "rules": {
    "no-unused-vars": ["warn"],
    "no-console": ["error", {"allow": ["log", "warn", "error"]}],
    "no-empty": ["error", {"allowEmptyCatch": true}],
    "semi": ["error", "never"],
    "eol-last": ["warn"],
    "comma-dangle": ["error", "never"]
  }
}
