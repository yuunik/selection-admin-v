import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // load env file
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      // import on demand
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // svg icon
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      // unocss plugin
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // javascriptEnabled: true,
          additionalData: '@use "@/styles/variable.scss" as *;',
        },
      },
    },
    // server configuration
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_APP_SERVER_URL,
          // 是否允许跨域
          changeOrigin: true,
          // 重写路径
          rewrite: (path) =>
            path.replace(
              new RegExp(`^${env.VITE_APP_BASE_API}`),
              '1111111111111111111111111111111',
            ),
        },
      },
    },
  }
})
