module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'jsx-a11y',
    '@typescript-eslint',
    'tailwindcss',
  ],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'rules': {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
    'comma-dangle': [ 'error', 'always-multiline' ],
    'arrow-parens': [ 'warn', 'always' ],
    'brace-style': [ 'warn', 'stroustrup', { 'allowSingleLine': true }],
    'class-methods-use-this': [ 'warn' ],
    'indent': [ 'error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': [ 'error', 'unix' ],
    'max-len': [
      'warn',
      {
        'code': 100,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true,
      },
    ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'never' ],
    'no-console': [ 'warn' ],
    'no-underscore-dangle': [ 'error', {
      'allow': [
        '_id',
        '_user',
        '_professional',
        '_project',
        '_members',
        '_associates',
        '_from',
        '_estimate',
        '_purchase',
        '_delivery',
        '_estimate',
        '_reviewer',
        '_offer',
        '_purchases',
        '_parent',
        '_children',
      ],
    }],
    'array-bracket-spacing': [ 'error', 'always', {
      'objectsInArrays': false,
      'arraysInArrays': false,
    }],
    'object-curly-spacing': [ 'error', 'always', {
      'objectsInObjects': false,
      'arraysInObjects': false,
    }],
    'react-hooks/exhaustive-deps': [ 'error' ],
    // 'react/jsx-filename-extension': [ 1, { 'extensions': [ '.js', '.jsx' ] } ],
    'react/no-unused-state': [ 'warn' ],
    'react/jsx-max-props-per-line': [ 'error', { 'when': 'multiline' }],
    'react/react-in-jsx-scope': [ 'off' ],
    'react/jsx-indent-props': [ 2, 2 ],
    'react/jsx-closing-bracket-location': [ 1, 'tag-aligned' ],
    'jsx-a11y/anchor-is-valid': [ 'off' ],
    'no-unused-vars': [ 'off' ],
    'react/jsx-props-no-spreading': [ 'off' ],
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': [ 'warn' ],
    'react/self-closing-comp': [ 'error' ],
    'tailwindcss/no-custom-classname': 'off',
    'import/order': [
      'warn',
      {
        // "newlines-between": "always",
        'warnOnUnassignedImports': true,
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },
        'groups': [ 'builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type' ],
        'pathGroups': [
          {
            pattern: '{react,react-dom/**,react-router-dom}',
            group: 'builtin',
            position: 'before',
          },
          {
            'pattern': '@/constants/**',
            'group': 'external',
            'position': 'after',
          },
          {
            'pattern': '@/utils/**',
            'group': 'external',
            'position': 'after',
          },
          {
            'pattern': '@/data/**',
            'group': 'external',
            'position': 'after',
          },
          {
            'pattern': '@/config/**',
            'group': 'external',
            'position': 'after',
          },
          {
            'pattern': '@/contexts/**',
            'group': 'external',
            'position': 'after',
          },
          {
            'pattern': '@/hooks/**',
            'group': 'external',
            'position': 'after',
          },
          {
            'pattern': '@/components/**',
            'group': 'external',
            'position': 'after',
          },
          {
            'pattern': './*.module.scss',
            'group': 'sibling',
            'position': 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [ 'builtin' ],
      },
    ],
    '@typescript-eslint/consistent-type-imports': [ 'warn', { prefer: 'type-imports' }],
    'object-curly-newline': [ 'warn', {
      ObjectExpression: {
        minProperties: 4, multiline: true, consistent: true,
      },
      ObjectPattern: {
        minProperties: 4, multiline: true, consistent: true,
      },
      ImportDeclaration: {
        minProperties: 4, multiline: true, consistent: true,
      },
      ExportDeclaration: {
        minProperties: 4, multiline: true, consistent: true,
      },
    }],
  },
  'overrides': [
    {
      'files': [ '*.tsx' ],
      'rules': {
        '@typescript-eslint/explicit-module-boundary-types': [ 'off' ],
      },
    },
  ],
}