import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'migrations/**', 'next-env.d.ts']),
  {
    files: ['components/layout/Navbar.tsx', 'components/ui/IntroOverlay.tsx'],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);