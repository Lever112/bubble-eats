import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { readFileSync } from 'fs'

// 从 CHANGELOG.md 解析最新版本号（第一个 ## x.y.z 行）
const changelog = readFileSync(new URL('./CHANGELOG.md', import.meta.url), 'utf-8')
const version = changelog.match(/^##\s+([\d]+\.[\d]+\.[\d]+)/m)?.[1] ?? '0.0.0'

export default defineConfig({
  root: 'src',
  plugins: [viteSingleFile()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    // 确保资源内联（singlefile 已处理，此处关闭分块）
    assetsInlineLimit: 100_000_000,
    rollupOptions: {
      output: {
        // 所有 chunk 合并到一个文件
        inlineDynamicImports: true,
      },
    },
  },
})
