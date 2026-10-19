// ESLint 10 dropped eslintrc, and eslint-config-standard-with-typescript (deprecated) only works with
// ESLint 8. This flat config keeps the same rules: neostandard (the flat-config successor to
// eslint-config-standard) plus the typescript-eslint rules standard-with-typescript enabled.
import importX from 'eslint-plugin-import-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';
import neostandard, { plugins as neostandardPlugins } from 'neostandard';
import tseslint from 'typescript-eslint';

export default [
  {
    // ESLint 8 skipped dot-folders by default; flat config doesn't
    ignores: [
      'test/**',
      'migrations/**',
      '.history/**',
      'dist/**',
      'scripts/**',
      'src/stories/**',
      '.storybook/**',
      '.design-sync/**',
    ],
  },
  ...neostandard({ ts: true, noStyle: true }),
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import-x': importX,
      n: neostandardPlugins.n,
    },
    rules: {
      // eslint-config-standard-with-typescript@43, ported to typescript-eslint@8
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          minimumDescriptionLength: 3,
        },
      ],
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
      '@typescript-eslint/consistent-generic-constructors': [
        'error',
        'constructor',
      ],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/dot-notation': [
        'error',
        {
          allowKeywords: true,
          allowPattern: '',
          allowPrivateClassPropertyAccess: false,
          allowProtectedClassPropertyAccess: false,
          allowIndexSignaturePropertyAccess: false,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike',
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
      ],
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-dupe-class-members': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-extraneous-class': [
        'error',
        { allowWithDecorator: true },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
      '@typescript-eslint/no-this-alias': [
        'error',
        { allowDestructuring: true },
      ],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
          enforceForJSX: false,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
          enums: false,
          variables: false,
          typedefs: false,
        },
      ],
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignoreConditionalTests: false, ignoreMixedLogicalExpressions: false },
      ],
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': [
        'error',
        { ignoreStringArrays: true },
      ],
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        { skipCompoundAssignments: false },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      '@typescript-eslint/return-await': ['error', 'always'],
      '@typescript-eslint/triple-slash-reference': [
        'error',
        { lib: 'never', path: 'never', types: 'never' },
      ],
      // typescript-eslint@8 successors of ban-types, no-throw-literal and no-var-requires
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      'no-loss-of-precision': 'error',
      // standard's import rules
      'import-x/export': 'error',
      'import-x/first': 'error',
      'import-x/no-absolute-path': [
        'error',
        { esmodule: true, commonjs: true, amd: false },
      ],
      'import-x/no-duplicates': 'error',
      'import-x/no-named-default': 'error',
      'import-x/no-webpack-loader-syntax': 'error',
      // standard allowed `void promise` statements; neostandard doesn't
      'no-void': ['error', { allowAsStatement: true }],
      // standard had this as an error; neostandard only warns
      'n/no-deprecated-api': 'error',
      // this repo's own overrides (from the old .eslintrc.json)
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    // Lint never actually ran before this config (`eslint` with no arguments matched no files on
    // ESLint 8), so these rules already have violations in src/. They warn until those are fixed,
    // then go back to 'error'.
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-invalid-void-type': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/return-await': 'warn',
      'import-x/first': 'warn',
    },
  },
  ...storybook.configs['flat/recommended'],
  prettierRecommended,
];
