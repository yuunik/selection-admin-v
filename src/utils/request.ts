import axios from 'axios'
import { ElMessage } from 'element-plus'

// 封装 axios 请求
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做某事
    return config
  },
  (error) => {
    // 请求错误时做些事
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    let msg = ''
    const status = error.response?.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    // 错误提示
    ElMessage({
      type: 'error',
      message: msg,
    })
    // 请求错误时做些事
    return Promise.reject(error)
  },
)

export default request
