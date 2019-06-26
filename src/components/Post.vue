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
            原价&nbsp;
            <a-tooltip title="以书籍背面印刷的信息为准">
              <a-icon type="question-circle-o"></a-icon>
            </a-tooltip>
          </span>
        <a-input
          v-decorator="[
              'original_price',
              {
                rules: [{
                  required: true, messageBrief: '请输入原价！'
                }]
              }
            ]"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="现价"
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
      <a-form-item
        v-bind="formItemLayout"
        label="类别"
      >
        <a-select defaultValue="文化" style="width: 120px" @change="handleCategoryChange"
                  v-decorator="[
                      'category',
                       {
                         rules: [{
                          required: true, messageBrief: '请选择类别价！'
                        }]
                   }
          ]">
          <a-select-option value="文化">文化</a-select-option>
          <a-select-option value="生活">生活</a-select-option>
          <a-select-option value="历史">历史</a-select-option>
          <a-select-option value="科幻">科幻</a-select-option>
          <a-select-option value="教辅">教辅</a-select-option>
          <a-select-option value="爱情">爱情</a-select-option>
          <a-select-option value="经典">经典</a-select-option>
        </a-select>
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
        label="外观照片"
      >
        <a-upload name="file"
                  :action=uploadUrl
                  :multiple="false"
                  listType="picture-card"
                  @change="handleFileChange"
        >
          <a-button>
            <a-icon type="upload"></a-icon> 点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="this.loading"
        >
          提交
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
  import {postBook} from '@/api/api'
  import global from '@/components/GlobalStyle'
  export default {
    data () {
      return {
        messageDetail: null,
        success: null,
        confirmDirty: false,
        // content
        uploadUrl: 'http://127.0.0.1:5000/upload',
        category: null,
        loading: false,
        pic_path: '',
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
            postBook(values)
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
