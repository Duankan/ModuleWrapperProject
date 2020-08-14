module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  // extends: ['prettier', 'plugin:vue/strongly-recommended', 'plugin:prettier/recommended'],
  extends: ["plugin:vue/recommended"],
  // https://github.com/vuejs/eslint-plugin-vue
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    // eslint-plugin-vue config
    "vue/no-parsing-error": [1, { "x-invalid-end-tag": false }],
    "vue/html-self-closing": "off",
    // eslint config
    "generator-star-spacing": "off", // 生成器函数*的前后空格
    semi: ["error", "always"], // 语句强制分号结尾
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "always",
        imports: "never",
        exports: "never",
        functions: "ignore"
      }
    ], // 数组和对象键值对最后一个逗号
    "brace-style": [2, "1tbs", { allowSingleLine: false }], // 大括号风格
    quotes: [
      "error",
      "single",
      {
        avoidEscape: true
      }
    ], // 引号类型
    "no-console": 0, // 禁止使用console
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 禁止在线上环境使用debugger
    "no-multiple-empty-lines": [2, { max: 1 }] //空行最多不能超过1行
  }
};
