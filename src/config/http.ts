// axios 请求的一些配置

const BASE_URL = import.meta.env.VITE_BASE_API // 设置API基础URL
const TIMEOUT = 5000 // 设置请求超时时间
const CONTENT_TYPE = {
  application_json: 'application/json;charset=UTF-8',
  form_data: 'application/x-www-form-urlencoded;charset=UTF-8'
}
 

export { BASE_URL, TIMEOUT, CONTENT_TYPE }

