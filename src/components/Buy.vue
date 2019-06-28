<template>
  <div style="text-align: center;">
    <a-row>
      <a-col :span="12" :offset="6" >
        <div>
        <a-card
          hoverable
          style="width: 280px; text-align: center; left: 50%; margin-left: -140px"
        >
          <img
            alt="example"
            :src="showPic"
            slot="cover"
            style="max-height: 480px; max-width: 260px; margin-left: 10px; margin-right: 10px; margin-top: 10px"
          />
          <a-card-meta
            :title="item ? item['book_name'] : ''">
            <template slot="description">{{this.priceStr}}</template>
          </a-card-meta>
        </a-card>
        </div>
        <br>
        <a-button
          type="primary"
          @click="handleBuy"
        >
          购买
        </a-button>
      </a-col>
    </a-row>
    <a-alert
      v-if=displayMessage
      :message=messageBrief
      :description=messageDetail
      :type=messageType
      showIcon>
    </a-alert>
  </div>
</template>
<script>
  import {bookInfo, buyBook} from '@/api/api'

  export default {
    name: 'Buy',
    data () {
      return {
        checkAgreement: null,
        messageDetail: null,
        success: null,
        confirmDirty: false,
        book_id: null,
        item: null
      }
    },
    computed: {
      showPic: function () {
        if (this.item && this.item['picture']) {
          console.log('pic provided. picfile: ' + this.item['picture'])
          return this.item.picture
        }
        console.log('no pic provided. use no_pic as default.')
        return './static/no_pic.jpg'
      },
      priceStr: function () {
        if (this.item) {
          return `${this.item.sale_price}元 (${(this.item.discount * 10).toFixed(1)}折) | 出售者：${this.item.seller_id}`
        } else {
          return ''
        }
      },
      displayMessage: function () {
        return this.success !== null
      },
      messageBrief: function () {
        return this.success ? 'Success' : 'Failed'
      },
      messageType: function () {
        return this.success ? 'success' : 'error'
      }
    },
    mounted () {
      this.book_id = this.$route.query.id
      if (this.book_id) {
        bookInfo(this.book_id).then(res => {
          if (res.status === 1) {
            this.item = res.data
          } else {
            // TODO  图书不存在
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    methods: {
      handleBuy () {
        buyBook({
          book_id: this.book_id
        }).then(resp => {
          if (resp.status === 1) {
            this.success = true
            this.messageDetail = resp.msg
            setTimeout(this.registerSuccess, 500)
          } else {
            this.success = false
            this.messageDetail = resp.msg
          }
        }).catch(error => {
          console.log(error)
        })
      },
      registerSuccess () {
        this.$router.push('/arena')
      }
    }
  }
</script>

<style>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
