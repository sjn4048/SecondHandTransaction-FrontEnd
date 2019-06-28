<template>
  <div>
<!--    搜索器-->
    <div>
      <a-select defaultValue="all" style="width: 120px" @change="handleCategoryChange">
        <a-select-option value="all">所有</a-select-option>
        <a-select-option value="culture">文化</a-select-option>
        <a-select-option value="life">生活</a-select-option>
        <a-select-option value="history">历史</a-select-option>
        <a-select-option value="sci-fi">科幻</a-select-option>
        <a-select-option value="textbook">教辅</a-select-option>
        <a-select-option value="love">爱情</a-select-option>
        <a-select-option value="classic">经典</a-select-option>
      </a-select>
      <a-select defaultValue="book_name" style='width: 120px' @change="handleKeyChange">
        <a-select-option value="book_name">名称</a-select-option>
        <a-select-option value="sale_price">价格</a-select-option>
        <a-select-option value="discount">折扣</a-select-option>
      </a-select>
      <a-select defaultValue="asc" style='width: 120px' @change="handleOrderChange">
        <a-select-option value="asc">升序</a-select-option>
        <a-select-option value="desc">降序</a-select-option>
      </a-select>
      <a-checkbox @change="onCheckOnlyUnsold">只看未售出</a-checkbox>
      <a-checkbox @change="onCheckOnlyhasPic">只看有图片</a-checkbox>
    </div>
    <a-divider type="horizontal"></a-divider>
<!--    列表 -->
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      itemLayout="horizontal"
      v-if="bookData"
      :dataSource="bookData"
    >
      <div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-spin v-if="loadingMore" :spinning="spinning"></a-spin>
        <a-button v-else @click="onLoadMore">刷新列表</a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-list-item-meta
          :description="`${value2label[item.category]}, ${item.sale_price}元 (${(item.discount * 10).toFixed(1)}折)
          ${item.bought ? '已售' : '可购'}`"
        >
          <!-- TODO-->
          <a slot="title" :href="isbnLink(item.isbn)">{{item.book_name}}</a>
          <a-avatar slot="avatar" :src="item.picture"></a-avatar>
        </a-list-item-meta>
        <a-button @click="clickBuy(item)" :disabled="item.bought">购买</a-button>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
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
        pageNo: 0,
        msg: null,
        keyOptions: ['key'],
        orderOptions: ['升序', '降序'],
        category: null,
        key: 'book_name',
        order: 'desc',
        hasPic: 0,
        unsold: 0,
        value2label: {
          'culture': '文化',
          'life': '生活',
          'history': '历史',
          'sci-fi': '科幻',
          'textbook': '教辅',
          'love': '爱情',
          'classic': '经典'
        }
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData: function () {
        getArena({
          category: this.category,
          key: this.key,
          order: this.order,
          hasPic: this.hasPic,
          unsold: this.unsold
        }).then(res => {
          this.loading = false
          this.bookData = res
        }).catch(error => {
          console.log(error)
        })
      },
      onLoadMore: function () {
        this.getData()
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
      },
      onCheckOnlyhasPic (e) {
        this.hasPic = e.target.checked ? 1 : 0
        this.getData()
      },
      onCheckOnlyUnsold (e) {
        this.unsold = e.target.checked ? 1 : 0
        this.getData()
      },
      handleCategoryChange (value) {
        if (value === 'all') {
          this.category = null
        }
        this.category = value
        this.getData()
      },
      handleKeyChange (value) {
        this.key = value
        this.getData()
      },
      handleOrderChange (value) {
        this.order = value
        this.getData()
      },
      isbnLink (isbn) {
        return `https://isbnsearch.org/isbn/${isbn}`
      }
    }
  }
</script>
