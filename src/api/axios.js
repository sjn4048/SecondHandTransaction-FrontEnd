import axios from 'axios'
import Qs from 'qs'
// import router from '../router'

// TODO: 参数化base_api
let baseApi = 'http://127.0.0.1:5000'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.auth = {
  username: '',
  password: ''
}

// 添加request拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      //   return Promise.resolve(response)
      return response
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       store.commit('del_token')
    //       router.push('/login')
    //   }
    // }
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
    axios.get(`${baseApi}url`, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
