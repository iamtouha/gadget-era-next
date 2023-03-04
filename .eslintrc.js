module.exports = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "next"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/restrict-plus-operands": [
      "error",
      { checkCompoundAssignments: false, allowAny: true },
    ],
    "@typescript-eslint/no-floating-promises": ["warn"],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowNumber: true, allowNullish: true },
    ],
  },
};
