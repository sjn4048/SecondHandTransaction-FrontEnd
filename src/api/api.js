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
export const getArena = () => get('/arena')

/**
 * 个人信息
 */
export const userinfo = idx => get('/user/' + idx)

/**
 * 个人主页
 */
export const userHome = () => get('/home')

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
export const buyBook = data => post('/buy', data)

/**
 * 书籍详情
 */
export const bookInfo = id => get(`/detail/${id}`)

/**
 * 求购
 */
export const wantBook = data => post('/want', data)

/**
 * 发送消息
 */
export const sendMessage = data => post('/send', data)

/**
 * 查看消息
 */
export const getMessage = data => get('/box', data)

/**
 * 修改信息
 */
export const changeInfo = data => post('/home/change', data)
