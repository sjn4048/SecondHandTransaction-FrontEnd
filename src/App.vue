<template>
  <a-layout style="min-height: 100vh"
            breakpoint="lg"
            collapsedWidth="0"
  >
    <a-layout-sider :theme="theme"
                    :collapsible=true
    >
      <div style="text-align: center; width: 100%">
        <a-switch
          @change="changeTheme"
          checkedChildren="dark"
          unCheckedChildren="light"
          style="position: relative; top: 50%; transform: translateY(50%);"
        >
        </a-switch>
        <a-icon
          slot="prefix"
          type="bulb"
          style="color:rgba(0,0,0,.25); font-size: 25px; position: relative; top: 50%; transform: translateY(50%);">
        </a-icon>
      </div>
      <a-divider type="horizontal"></a-divider>
      <a-menu
        @click="handleClick"
        :defaultSelectedKeys="['1']"
        :openKeys.sync="openKeys"
        mode="inline"
        :theme="theme"
      >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <span slot="title"><span><a-icon type="shop"></a-icon>买卖书籍</span></span>
          <a-menu-item-group key="g1">
            <template slot="title"><span>我是买家</span></template>
            <a-menu-item key="1">二手广场</a-menu-item>
            <a-menu-item key="2">求购图书</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g2">
            <template slot="title"><span>我是卖家</span></template>
            <a-menu-item key="3"><router-link to="/post">发布图书</router-link>></a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <span slot="title"><a-icon type="mail"></a-icon><span>消息系统&nbsp;&nbsp;&nbsp;<a-badge :count="newMsgCnt"></a-badge></span></span>
          <a-menu-item key="4">查看消息&nbsp;&nbsp;&nbsp;<a-badge :count="newMsgCnt"></a-badge></a-menu-item>
          <a-menu-item key="5">发送消息</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="home"></a-icon><span>我的主页</span></span>
          <a-menu-item key="6">修改信息</a-menu-item>
          <a-menu-item key="7">管理订单</a-menu-item>
          <a-menu-item key="8">管理求购</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title"><a-icon type="info-circle"></a-icon><span>关于本站</span></span>
          <a-menu-item key="9">站点信息</a-menu-item></a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: dimgrey; color: white; position:relative;">
        <div style="text-align: center;font-size: 125%; position: absolute; left: 2%">
          Hello, {{username()}}
        </div>
        <div style="position: absolute; top: 50%; transform: translateY(-50%); right: 1%;">
          <a-button v-if="loginStatus()" @click="logout" :ghost="true" size="small">
            <a-icon type="logout"></a-icon>登出
          </a-button>
          <a-button v-if="!loginStatus()" @click="login" :ghost="true" size="small">
            <a-icon type="login"></a-icon>登录
          </a-button>
        </div>
      </a-layout-header>
      <a-layout-content>
        <router-view style="margin: 15px"></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ZJU ©2019 Created by Jianing Shi
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
  import {getMessage} from '@/api/api'

  export default {
    data () {
      return {
        current: ['mail'],
        openKeys: ['sub1'],
        theme: 'light',
        newMsgCnt: 0,
        timer: null
      }
    },
    created () {
      this.timer = () => {
        if (this.loginStatus()) {
          console.log('heart beat')
          getMessage().then(res => {
            this.newMsgCnt = res.unread
          })
        }
      }
      setInterval(this.timer, 3000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
      this.timer = null
    },
    methods: {
      handleClick (e) {
        const path = ['', '/arena', '/want', '/post', '/message/box', '/message/send', '/home', '/home/order',
                      '/home/want', '/about']
        console.log('click', e)
        this.$router.push(path[e.key])
      },
      titleClick (e) {
        console.log('titleClick', e)
      },
      changeTheme (checked) {
        this.theme = checked ? 'dark' : 'light'
      },
      logout () {
        window.localStorage['token'] = null
        window.localStorage['username'] = null
        console.log('jump to login')
        this.$router.push('/login')
      },
      login () {
        console.log('jump to login')
        this.$router.push('/login')
      },
      loginStatus: function () { return window.localStorage.username !== 'null' },
      username: function () { return this.loginStatus() ? window.localStorage.username : '游客用户' }
    },
    watch: {
      openKeys (val) {
        console.log('openKeys', val)
      }
    }
  }
</script>
