<template>
  <div>
    <a-comment>
      <div slot="content" style="text-align: center">
        <a-form-item
          label="接收者"
          v-bind="formItemLayout"
        >
          <a-input
            v-decorator="[
              'userName',
              {rules: [{ required: true, messageBrief: '请输入接收者用户名' }]}
            ]"
            type="text"
            placeholder="Username"
            @change="handleUserChange"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color:rgba(0,0,0,.25)">
            </a-icon>
          </a-input>
        </a-form-item>
        <a-form-item
          label="消息内容"
          v-bind="formItemLayout"
        >
          <a-textarea :rows="4" @change="handleContentChange" :value="content">
          </a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button
            htmlType="submit"
            :loading="submitting"
            @click="handleSubmit"
            type="primary"
          >
            发送消息
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
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
  import {sendMessage} from '@/api/api'
  import global from '@/components/GlobalStyle'
  export default {
    data () {
      return {
        comments: [],
        submitting: false,
        content: '',
        receiver: '',
        messageDetail: null,
        success: null,
        formItemLayout: global.formItemLayout,
        tailFormItemLayout: global.tailFormItemLayout
      }
    },
    computed: {
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
    methods: {
      handleSubmit () {
        if (!this.content || !this.receiver) {
          return
        }
        this.submitting = true

        setTimeout(() => {
          sendMessage({
            receiver: this.receiver,
            content: this.content
          }).then(res => {
            console.log(res)
            if (res.status === 1) {
              this.success = true
              this.messageDetail = res.msg
              this.submitting = false
              setTimeout(this.sendSuccess, 500)
            } else {
              // 发送失败
              this.success = false
              this.messageDetail = res.msg
              this.submitting = false
            }
          }).catch(err => {
            console.log(err)
          })
        }, 500)
      },
      sendSuccess () {
        this.$router.push('/message/box')
      },
      handleContentChange (e) {
        this.content = e.target.value
      },
      handleUserChange (e) {
        this.receiver = e.target.value
      }
    }
  }
</script>
