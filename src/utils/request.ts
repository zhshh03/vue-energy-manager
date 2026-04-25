import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig,AxiosError,AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'

export const request:AxiosInstance = axios.create({
  baseURL: 'https://www.demo.com',
  timeout: 5000,
})

request.interceptors.request.use(function (config:InternalAxiosRequestConfig) {
    // 在发送请求之前做些什么
    return config;
  }, function (error:AxiosError) {
    // 对请求错误做些什么
    ElNotification({
    title: '请求失败',
    message: '请求失败，请检查网络连接',
    type: 'error',
  })
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response:AxiosResponse) {
    const res = response.data
    // 业务状态码校验
    if (res.code === 200) {
      return res
    }
    ElNotification({
      title: '操作失败',
      message: res.message || '请求异常',
      type: 'error',
    })
    return Promise.reject(new Error(res.message || '请求异常'))
  }, function (error:AxiosError) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElNotification({
    title: '响应失败',
    message: '响应失败，请检查网络连接',
    type: 'error',
  })
    return Promise.reject(error);
  });

  export default request