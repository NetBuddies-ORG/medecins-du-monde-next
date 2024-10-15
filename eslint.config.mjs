import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      '@typescript-eslint/no-explicit-any': 'off', // Désactiver la règle qui empêche l'utilisation de `any`
    }
  },
  {
    ignores: [
      'src/services/GraphQL.ts',
      'dist/',
      '.next/',
      '.env.js'
    ],
  },
);
