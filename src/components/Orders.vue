<template>
  <div>
  <p style="font-size: 130%">出售的订单</p>
    <a-divider type="horizontal"></a-divider>
  <a-list
    itemLayout="horizontal"
    v-if="orders"
    :dataSource="orders.sell"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta
        :description="`${item.category}, ${item.sale_price}元 (${(item.discount * 10).toFixed(1)}折)`"
      >
        <!-- TODO-->
        <a slot="title">{{item.book_name}}</a>
        <a-avatar slot="avatar" :src="item.picture"></a-avatar>
      </a-list-item-meta>
      <a-tag :color="item.bought ? 'blue' : 'red'" style="font-size: 110%;">{{item.bought ? '已售出' : '未售出'}}</a-tag>
    </a-list-item>
  </a-list>
    <a-divider type="horizontal"></a-divider>
    <p style="font-size: 130%">购买的订单</p>
    <a-divider type="horizontal"></a-divider>
  <a-list
    itemLayout="horizontal"
    v-if="orders"
    :dataSource="orders.buy"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta
        :description="`${item.category}, ${item.sale_price}元 (${(item.discount * 10).toFixed(1)}折)`"
      >
        <!-- TODO-->
        <a slot="title">{{item.book_name}}</a>
        <a-avatar slot="avatar" :src="item.picture"></a-avatar>
      </a-list-item-meta>
      <a-tag color="blue" style="font-size: 110%;">已购买</a-tag>
    </a-list-item>
  </a-list>
  </div>
</template>

<script>
  import {orderManage} from '@/api/api'

  export default {
    name: 'Manage',
    data () {
      return {
        orders: null
      }
    },
    mounted () {
      orderManage().then(res => {
        this.orders = res
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>

</style>
