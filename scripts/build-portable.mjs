// In-process Vite build for Windows environments that disallow child-process pipes.
// The normal `npm run build` remains the preferred Vercel build command.
import { build } from 'vite'
import tailwind from '@tailwindcss/vite'
import ts from 'typescript'
import { minify } from 'terser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
await build({
  root,
  configFile: false,
  resolve: { preserveSymlinks: true, alias: { '@': path.join(root, 'src') } },
  plugins: [
    {
      name: 'portable-typescript',
      enforce: 'pre',
      transform(code, id) {
        code = code.replaceAll('process.env.NODE_ENV', JSON.stringify('production'))
        code = code.replace(/\bprocess\.env\b/g, '({})')
        code = code.replace(
          /\bimport\.meta\.env\b/g,
          '({ MODE: "production", DEV: false, PROD: true, SSR: false, BASE_URL: "/" })',
        )
        code = code.replace(/\bimport\.meta\.hot\b/g, 'undefined')
        if (!/\.[cm]?tsx?$/.test(id)) return { code, map: null }
        return {
          code: ts.transpileModule(code, {
            compilerOptions: {
              target: ts.ScriptTarget.ES2022,
              module: ts.ModuleKind.ESNext,
              jsx: ts.JsxEmit.ReactJSX,
              isolatedModules: true,
            },
            fileName: id,
          }).outputText,
          map: null,
        }
      },
    },
    tailwind(),
    {
      name: 'portable-minify',
      async renderChunk(code) {
        const result = await minify(code, { module: true, compress: true, mangle: true })
        if (!result.code) throw new Error('Minification produced no code')
        return { code: result.code, map: null }
      },
    },
  ],
  esbuild: false,
  build: {
    minify: false,
    cssMinify: false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') warn(warning)
      },
    },
  },
})
