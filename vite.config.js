import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  root: 'src',
  plugins: [viteSingleFile()],
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
