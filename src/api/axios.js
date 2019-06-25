import axios from 'axios'
import Qs from 'qs'
// import router from '../router'

// TODO: 参数化base_api
let baseApi = 'http://127.0.0.1:5000'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 添加request拦截器
axios.interceptors.request.use(
  config => {
    if (window.localStorage.token) {
      config.headers.Authorization = 'token ' + window.localStorage.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
      case 401:
        console.log('Login Required!')
        break

      default:
      }
    }
    return Promise.reject(error)
  }
)
// 封装post请求
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(`${baseApi}${url}`, Qs.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(`${baseApi}${url}`, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
