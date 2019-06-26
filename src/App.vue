<template>
  <a-layout style="min-height: 100vh"
            breakpoint="lg"
            collapsedWidth="0"
  >
    <a-layout-sider :theme="theme"
                    :collapsible=true
    >
      <div style="text-align: center; width: 100%">
        <a-icon
          slot="prefix"
          type="bulb"
          style="color:rgba(0,0,0,.25); font-size: 25px; position: relative; top: 50%; transform: translateY(50%);">
        </a-icon>
      <a-switch
        @change="changeTheme"
        checkedChildren="dark"
        unCheckedChildren="light"
        style="position: relative; top: 50%; transform: translateY(50%);"
      >
      </a-switch>
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
            <a-menu-item key="4">管理订单</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <span slot="title"><a-icon type="mail"></a-icon><span>消息系统</span></span>
          <a-menu-item key="5">查看消息</a-menu-item>
          <a-menu-item key="6">发送消息</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="home"></a-icon><span>我的主页</span></span>
          <a-menu-item key="7">修改信息</a-menu-item></a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title"><a-icon type="info-circle"></a-icon><span>关于本站</span></span>
          <a-menu-item key="8">站点信息</a-menu-item></a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ZJU ©2019 Created by Jianing Shi
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
  export default {
    data () {
      return {
        current: ['mail'],
        openKeys: ['sub1'],
        theme: 'light'
      }
    },
    methods: {
      handleClick (e) {
        const path = ['', '/arena', '/want', '/post', '/manage', '/message/box', '/message/send', '/home', '/about']
        console.log('click', e)
        this.$router.push(path[e.key])
      },
      titleClick (e) {
        console.log('titleClick', e)
      },
      changeTheme (checked) {
        this.theme = checked ? 'dark' : 'light'
      }
    },
    watch: {
      openKeys (val) {
        console.log('openKeys', val)
      }
    }
  }
</script>
