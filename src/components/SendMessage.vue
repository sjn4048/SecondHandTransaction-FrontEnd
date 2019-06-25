<template>
  <div>
    <a-comment>
      <div slot="content">
        <a-form-item
          label="接收者"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'userName',
              {rules: [{ required: true, messageBrief: '请输入接收者id' }]}
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
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
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
  </div>
</template>
<script>
  import moment from 'moment'
  import {sendMessage} from '@/api/api'
  export default {
    data () {
      return {
        comments: [],
        submitting: false,
        content: '',
        targetUser: '',
        moment
      }
    },
    methods: {
      handleSubmit () {
        if (!this.content || !this.targetUser) {
          return
        }
        this.submitting = true

        setTimeout(() => {
          sendMessage({
            receiver: this.targetUser,
            message: this.content
          }).then(res => {
            console.log(res)
            this.submitting = false
          }).catch(err => {
            console.log(err)
          })
        }, 500)
      },
      handleContentChange (e) {
        this.content = e.target.value
      },
      handleUserChange (e) {
        this.targetUser = e.target.value
      }
    }
  }
</script>
