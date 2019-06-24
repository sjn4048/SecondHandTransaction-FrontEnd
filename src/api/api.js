// eslint-disable-next-line no-unused-vars
import {get, post, deletes, put} from '@/api/axios'
import {baseUrl} from '@/config/env'

/**
 * 登录
 */
export const logIn = data => post('/login', data)

/**
 * 注册
 */
export const register = data => post('/register', data)

/**
 * 退出
 */
export const logOut = () => get('/logout')

/**
 * 首页
 */
export const arena = () => get('/arena')

/**
 * 个人信息
 */
export const userinfo = idx => get('/user/' + idx)

/**
 * 发布书籍
 */
export const postBook = data => post('/post', data)

/**
 * 上传图片
 */
export const uploadFile = data => post('/upload', data)

/**
 * 上传图片地址
 */
export const uploadUrl = `${baseUrl}/upload`

/**
 * 购买书籍
 */
export const buyBook = data => get('/buy', data)

/**
 * 书籍详情
 */
export const bookInfo = data => get('/detail', data)

/**
 * 求购
 */
export const wantBook = data => post('/want', data)
