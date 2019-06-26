<template>
  <a-list
    class="comment-list"
    :header="`${allMessages.length} messages`"
    itemLayout="horizontal"
    :dataSource="allMessages"
    style="text-align: center;"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-comment
        :author="item.sender_name"
      >
        <p slot="content" style="text-align: left">{{item.content}}</p>
        <a-tooltip slot="datetime" :title="item.timestamp.format('YYYY-MM-DD HH:mm:ss')">
          <span>{{item.timestamp.fromNow()}}</span>
        </a-tooltip>
      </a-comment>
    </a-list-item>
  </a-list>
</template>
<script>
  import {getMessage} from '@/api/api'
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
        for (var i = 0; i < res.length; i++) {
          res[i].timestamp = moment.unix(res[i].timestamp)
        }
        this.allMessages = res
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>

</style>
