<template>
  <a-list
    class="comment-list"
    :header="`${allMessages.length} messages`"
    itemLayout="horizontal"
    :dataSource="allMessages"
    style="text-align: center;"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" style="position:relative;">
      <a-comment
        :author="item.sender_name" style="font-size: 135%"
      >
        <p slot="content" style="text-align: left; margin: auto; font-size: 115%">{{item.content}}</p>
        <a-tooltip slot="datetime" :title="item.timestamp.format('YYYY-MM-DD HH:mm:ss')">
          <span>{{item.timestamp.fromNow()}}</span>
        </a-tooltip>
      </a-comment>
      <a-button :dashed="true" size="small" @click="reply(item.sender_name)"
                style="position: absolute; top: 50%; transform: translateY(-50%); right: 1%;">回复</a-button>
    </a-list-item>
  </a-list>
</template>
<script>
  import {getMessage, readAll} from '@/api/api'
  import moment from 'moment'

  export default {
    name: 'MessageBox',
    data () {
      return {
        allMessages: []
      }
    },
    computed: {
    },
    beforeCreate () {
      getMessage().then(res => {
        res = res.data
        for (var i = 0; i < res.length; i++) {
          res[i].timestamp = moment.unix(res[i].timestamp)
        }
        // 翻转列表，使得消息为时间倒序排列
        this.allMessages = res.reverse()
      }).catch(error => {
        console.log(error)
      })
      readAll().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      reply: function (senderName) {
        console.log('jump to send')
        this.$router.push({
          path: '/message/send',
          query: {
            receiver: senderName
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
