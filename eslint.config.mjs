import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  extends: [
    prettier,
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    // ...tseslint.configs.stylisticTypeChecked,
    // ...tseslint.configs.recommendedTypeChecked
  ],
  ignores: ['*.mjs', 'node_modules/', 'dist/', 'out/'],

  languageOptions: {
    globals: globals.node,
    parser: tseslint.parser,
    parserOptions: {
      project: true
    }
  },
  rules: {
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error'
  }
})
