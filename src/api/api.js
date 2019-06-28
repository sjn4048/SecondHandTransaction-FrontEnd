// eslint-disable-next-line no-unused-vars
import {get, post, deletes, put} from '@/api/axios'
import {baseUrl} from '@/config/env'

/**
 * 登录
 */
export const logIn = data => post('/api/login', data)

/**
 * 注册
 */
export const register = data => post('/api/register', data)

/**
 * 退出
 */
export const logOut = () => get('/api/logout')

/**
 * 首页
 */
export const getArena = (data) => get('/api/arena', data)

/**
 * 个人信息
 */
export const userinfo = idx => get('/api/user/' + idx)

/**
 * 个人主页
 */
export const userHome = () => get('/api/home')

/**
 * 发布书籍
 */
export const postBook = data => post('/api/post', data)

/**
 * 上传图片
 */
export const uploadFile = data => post('/api/upload', data)

/**
 * 上传图片地址
 */
export const uploadUrl = `${baseUrl}/api/upload`

/**
 * 购买书籍
 */
export const buyBook = data => post('/api/buy', data)

/**
 * 书籍详情
 */
export const bookInfo = id => get(`/api/detail/${id}`)

/**
 * 求购
 */
export const wantBook = data => post('/api/want', data)

/**
 * 发送消息
 */
export const sendMessage = data => post('/api/message/send', data)

/**
 * 查看消息
 */
export const getMessage = data => get('/api/message/box', data)

/**
 * 修改信息
 */
export const changeInfo = data => post('/api/home/change', data)

/**
 * 订单信息
 */
export const orderManage = () => get('/api/home/order')

/**
 * 求购信息
 */
export const wantManage = () => get('/api/home/want')

/**
 * 全部已读
 */
export const readAll = () => get('/api/message/readall')
