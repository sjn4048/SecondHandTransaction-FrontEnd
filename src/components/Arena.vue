<template>
  <a-list
    class="demo-loadmore-list"
    :loading="loading"
    itemLayout="horizontal"
    :dataSource="bookData"
  >
    <div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
      <a-spin v-if="loadingMore" :spinning="spinning"></a-spin>
      <a-button v-else @click="onLoadMore">loading more</a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta
        :description="item.info"
      >
        <!-- TODO-->
        <a slot="title" href="https://vue.ant.design/">{{item.book_name}}</a>
        <a-avatar slot="avatar" :src="item.picture"></a-avatar>
      </a-list-item-meta>
      <div>{{item.category}}</div>
      <a-button @click="clickBuy(item)">购买</a-button>
    </a-list-item>
  </a-list>
</template>
<script>
  import sidebar from '@/components/Sidebar'
  import {getArena} from '@/api/api'
  export default {
    name: 'Arena',
    data () {
      return {
        loading: true,
        loadingMore: false,
        spinning: true,
        showLoadingMore: true,
        bookData: null,
        msg: null
      }
    },
    components: {
      sidebar
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData: function () {
        getArena().then(res => {
          this.loading = false
          this.bookData = res
        }).catch(error => {
          console.log(error)
        })
      },
      onLoadMore: function () {
        getArena().then(res => {
          this.loadingMore = true
          this.loading = false
          this.bookData = this.bookData.concat(res)
          this.loadingMore = false
        }).catch(error => {
          console.log(error)
        })
      },
      clickBuy: function (item) {
        console.log(item.id)
        console.log('jump to buy')
        this.$router.push({
          path: '/buy',
          query: {
            id: item.id
          }
        })
      }
    }
  }
</script>

<!--<style>-->
<!--  #layout-basic {-->
<!--    text-align: center;-->
<!--  }-->
<!--  #layout-basic .ant-layout-header,-->
<!--  #layout-basic .ant-layout-footer {-->
<!--    background: #7dbcea;-->
<!--    color: #fff;-->
<!--  }-->
<!--  #layout-basic .ant-layout-footer {-->
<!--    line-height: 1.5;-->
<!--  }-->
<!--  #layout-basic .ant-layout-sider {-->
<!--    background: #3ba0e9;-->
<!--    color: #fff;-->
<!--    line-height: 120px;-->
<!--  }-->
<!--  #layout-basic .ant-layout-content {-->
<!--    background: rgba(16, 142, 233, 1);-->
<!--    color: #fff;-->
<!--    min-height: 120px;-->
<!--    line-height: 120px;-->
<!--  }-->
<!--  #layout-basic > .ant-layout {-->
<!--    margin-bottom: 48px;-->
<!--  }-->
<!--  #layout-basic > .ant-layout:last-child {-->
<!--    margin: 0;-->
<!--  }-->
<!--</style>-->
