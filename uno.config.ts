/**
 * unoss config file
 */
// 预设 rem 转 px
import presetRemToPx from '@unocss/preset-rem-to-px'
// transformerDirectives 可以使用 @apply @screen theme 函数
import transformerDirectives from '@unocss/transformer-directives'
import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerVariantGroup,
  presetIcons,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetRemToPx({
      baseFontSize: 4,
    }),
    // 自动引入图标配置
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  // 自定义配置
  rules: [
    [/^hp([\.\d]+)$/, ([_, num]) => ({ height: `${num}%` })],
    // calc 函数写法
    [/^hc([\.\d]+)$/, ([_, num]) => ({ height: `calc(100% - ${num}px)` })],
    // 菜单栏未折叠宽度
    ['wb-menu-width', { width: '250px' }],
    // 菜单栏未折叠宽度
    ['wf-menu-width', { width: '65px' }],
  ],
  // 自定义属性 一个属性可以对应多个 unocss 类值
  shortcuts: [
    {
      // 垂直水平居中
      'flex-center': 'flex items-center justify-center',
      // 放在最后
      'flex-end': 'flex items-center justify-end',
      // 垂直居中
      'flex-middle': 'flex items-center',
      // 分开两边
      'flex-between': 'flex items-center justify-between',
      // 竖着居中
      'flex-col-center': 'flex flex-col items-center',
      // 图标大小
      'icon-style': 'inline-block w-25 h-25 cursor-pointer',
    },
  ],
  theme: {
    colors: {
      menuColor: '#001529',
    },
    extend: {
      // 自定义配置
      menuWidth: '250px',
    },
  },
})
