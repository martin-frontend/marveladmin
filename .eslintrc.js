module.exports = {
  root: true,
  parserOptions: {
    // parser: ['@typescript-eslint/parser', ''],
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // 'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/typescript',
  ],

  rules: {
      "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "off" : "off",
      "@typescript-eslint/no-use-before-define":  "off",
      "@typescript-eslint/camelcase":  "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "prettier/prettier": "off",
      "no-unused-vars": "off",
      "no-useless-escape": "off",
      // "parser": "vue-eslint-parser"
  }
}
