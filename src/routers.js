import LogIn from '@/components/login'
import Arena from '@/components/Arena'
import Post from '@/components/Post'
import Register from '@/components/Register'

const routers = [
  {
    path: '/',
    component: LogIn
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/arena',
    name: 'arena',
    component: Arena
  },
  {
    path: '/post',
    name: 'post',
    component: Post
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]
export default routers
