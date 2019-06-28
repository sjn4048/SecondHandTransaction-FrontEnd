<template>
  <div>
    <p style="font-size: 130%">我的求购</p>
    <a-divider type="horizontal"></a-divider>
    <a-list
      itemLayout="horizontal"
      v-if="wantBooks"
      :dataSource="wantBooks"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-list-item-meta
          :description="item.isbn"
        >
          <!-- TODO-->
          <a slot="title">{{item.book_name}}</a>
        </a-list-item-meta>
        <a-tag :color="'blue'" style="font-size: 110%;">求购价：{{item.expect_price}}元</a-tag>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
  import {wantManage} from '@/api/api'

  export default {
    name: 'Manage',
    data () {
      return {
        wantBooks: null
      }
    },
    mounted () {
      wantManage().then(res => {
        this.wantBooks = res.data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>

</style>
