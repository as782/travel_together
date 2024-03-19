import { BASE_URL, CONTENT_TYPE, TIMEOUT } from '@/config/http'
import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import { showFailToast } from 'vant'

// 统一后端返回数据格式
export interface Result<T = any> {
  code: number
  msg: string
  data: T
}
// 创建Axios实例
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL, // 设置统一的请求前缀
  timeout: TIMEOUT, // 设置统一的超时时间
  headers: {
    'Content-Type': CONTENT_TYPE.application_json
  }
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    config.headers!.Authorization = 'Bearer ' + localStorage.getItem('token')
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 相应拦截
service.interceptors.response.use(
  (response) => {
    // 返回响应数据
    return response.data
  },
  (error) => {
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        // 这里可以触发退出的 action
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }

    showFailToast(message || 'Error')
    return Promise.reject(new Error(error || 'Error'))
  }
)

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  }
}
