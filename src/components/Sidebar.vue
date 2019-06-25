<template>
    <a-menu
      @click="handleClick"
      style="width: 256px"
      :defaultSelectedKeys="['1']"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <a-switch
        @change="changeTheme"
        checkedChildren="check"
        unCheckedChildren="light">
      </a-switch>
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

<style>
  #layout-basic {
    text-align: center;
  }
  #layout-basic .ant-layout-header,
  #layout-basic .ant-layout-footer {
    /*background: #7dbcea;*/
    /*color: #fff;*/
  }
  #layout-basic .ant-layout-footer {
    line-height: 1.5;
  }
  #layout-basic .ant-layout-sider {
    /*background: #3ba0e9;*/
    /*color: #fff;*/
    line-height: 120px;
  }
  #layout-basic .ant-layout-content {
    /*background: rgba(16, 142, 233, 1);*/
    /*color: #fff;*/
    min-height: 120px;
    line-height: 120px;
  }
  #layout-basic > .ant-layout {
    margin-bottom: 48px;
  }
  #layout-basic > .ant-layout:last-child {
    margin: 0;
  }
</style>
