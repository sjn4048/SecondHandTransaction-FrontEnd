<template>
  <div>
    <a-form
      :form="form"
      @submit="handleSubmit"
      style="text-align: center;"
    >
      <a-form-item
        v-bind="formItemLayout"
        label="书名"
      >
        <a-input
          v-decorator="[
              'book_name',
              {
                rules: [{
                  required: true, messageBrief: '请输入书名！',
                }]
              }
            ]"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
      >
        <span slot="label">
            ISBN&nbsp;
            <a-tooltip title="ISBN可以帮助你精确定位图书、完善图书信息">
              <a-icon type="question-circle-o"></a-icon>
            </a-tooltip>
        </span>
        <a-input
          v-decorator="[
              'isbn',
              {
                rules: [{
                  required: true, messageBrief: '请输入ISBN！'
                }]
              }
            ]"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="预期价格"
      >
        <a-input
          v-decorator="[
              'sale_price',
              {
                rules: [{
                  required: true, messageBrief: '请输入现价！'
                 }]
              }
            ]"></a-input>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="this.loading"
        >
          发布
        </a-button>
      </a-form-item>
    </a-form>
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
  import {wantBook} from '@/api/api'
  import global from '@/components/GlobalStyle'
  export default {
    name: 'WantBook',
    data () {
      return {
        messageDetail: null,
        success: null,
        confirmDirty: false,
        // content
        category: null,
        loading: false,
        // else
        autoCompleteResult: [],
        formItemLayout: global.formItemLayout,
        tailFormItemLayout: global.tailFormItemLayout
      }
    },
    beforeCreate () {
      this.form = this.$form.createForm(this)
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
      handleCategoryChange (value) {
        this.category = value
        console.log(`selected ${value}`)
      },
      handleFileChange (info) {
        console.log(info.file.status)
        if (info.file.status === 'uploading') {
          console.log(this.uploadUrl)
          this.loading = true
          return
        }
        if (info.file.status === 'done') {
          console.log(info.file.response)
          this.loading = false
          if (info.file.response.status === 1) {
            this.pic_path = info.file.response.filename
          }
        }
      },
      handleSubmit (e) {
        e.preventDefault()

        this.form.validateFieldsAndScroll((err, values) => {
          values['pic_path'] = this.pic_path
          if (!err) {
            console.log('Received values of form: ', values)
            wantBook(values)
              .then(res => {
                if (res.status === 1) {
                  this.success = true
                  this.messageDetail = res.msg
                  setTimeout(this.postSuccess, 500)
                } else {
                  // 上传失败
                  this.success = false
                  this.messageDetail = res.msg
                }
              }).catch(error => {
                console.log(error)
              })
          }
        })
      },
      handleConfirmBlur  (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      compareToFirstPassword  (rule, value, callback) {
        const form = this.form
        if (value && value !== form.getFieldValue('password')) {
          callback(new Error('Two passwords that you enter are inconsistent!'))
        } else {
          callback()
        }
      },
      validateToNextPassword  (rule, value, callback) {
        const form = this.form
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
      },
      postSuccess () {
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
