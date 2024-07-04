import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'
import { resolve } from 'path'

//引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

//引入mock插件
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command }) => {
  return {
    plugins: [vue(),
      // mock插件
      viteMockServe({
        localEnabled: command === 'serve', // 开发环境开启mock
      }),
    // svg插件
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    })
    ],
    resolve: {
      // 路径别名
      alias: {
        '@': resolve(__dirname,'src')
      }
    },
    css: {
      // scss全局变量
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "./src/styles/variable.scss";`
        }
      }
    }
  }
})
