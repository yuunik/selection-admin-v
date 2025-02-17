import {
  Moon,
  MoonNight,
  Sunny,
  Sunrise,
  Sunset,
} from '@element-plus/icons-vue'
import type { Component } from 'vue'

// 时间问候函数返回的数据类型
interface GreetingResType {
  timeMsg: string
  timeIcon: Component
}

// 根据当前时间, 返回不同的问候语
const greeting = (): GreetingResType => {
  // 获取当前时间的小时数
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 8) {
    return {
      timeMsg: '早上好',
      timeIcon: Sunrise,
    }
  } else if (hour >= 8 && hour < 11) {
    return {
      timeMsg: '上午好',
      timeIcon: Sunny,
    }
  } else if (hour >= 11 && hour < 13) {
    return {
      timeMsg: '中午好',
      timeIcon: Sunny,
    }
  } else if (hour >= 13 && hour < 18) {
    return {
      timeMsg: '下午好',
      timeIcon: Sunset,
    }
  } else if (hour >= 18 && hour < 22) {
    return {
      timeMsg: '晚上好',
      timeIcon: Moon,
    }
  } else if (hour >= 22 || hour < 1) {
    return {
      timeMsg: '不早了, 早点休息',
      timeIcon: MoonNight,
    }
  } else {
    return {
      timeMsg: '夜深了, 洗洗睡吧',
      timeIcon: MoonNight,
    }
  }
}

export default greeting
