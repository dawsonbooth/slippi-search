module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  },
  env: {
    es6: true,
    node: true
  }
};
