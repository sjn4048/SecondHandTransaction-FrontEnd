import LogIn from '@/components/login'
import Arena from '@/components/Arena'
import Post from '@/components/Post'
import Register from '@/components/Register'
import About from '@/components/About'
import SendMessage from '@/components/SendMessage'
import MessageBox from '@/components/MessageBox'
import Buy from '@/components/Buy'
import WantBook from '@/components/WantBook'
import Home from '@/components/Home'
import Orders from '@/components/Orders'
import WantBooks from '@/components/WantBooks'

const routers = [
  {
    path: '/',
    name: 'index',
    component: Arena,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/arena',
    name: 'arena',
    component: Arena,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/post',
    name: 'post',
    component: Post,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/message/send',
    component: SendMessage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/message/box',
    component: MessageBox,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home/order',
    component: Orders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/buy',
    component: Buy,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/want',
    component: WantBook,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home/want',
    component: WantBooks,
    meta: {
      requiresAuth: true
    }
  }
]
export default routers
