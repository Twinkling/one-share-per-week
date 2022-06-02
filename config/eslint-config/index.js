module.exports = {
  //   env: {
  //     browser: true,
  //     es2021: true,
  //     node: true,
  //   },
  extends: [
    "plugin:vue/vue3-recommended",
    require.resolve("./base-config"),
    require.resolve("./rules/typescript"),
    require.resolve("./rules/vue"),
    // "eslint:recommended",
    // "plugin:vue/essential",
    // "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  //   parserOptions: {
  //     ecmaVersion: "latest",
  //     parser: "@typescript-eslint/parser",
  //     sourceType: "module",
  //   },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
};
