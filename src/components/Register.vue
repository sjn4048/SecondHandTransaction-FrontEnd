<template>
  <div>
    <a-form
      :form="form"
      @submit="handleSubmit"
      id="components-form-login"
      style="text-align: center;"
    >
      <a-form-item
        v-bind="formItemLayout"
        label="邮箱"
      >
        <a-input
          v-decorator="[
              'email',
              {
                rules: [{
                  type: 'email', messageBrief: 'The input is not valid E-mail!',
                }, {
                  required: true, messageBrief: 'Please input your E-mail!',
                }]
              }
            ]"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
      >
          <span slot="label">
            用户名&nbsp;
            <a-tooltip title="You will use this name to log in, and this name will be displayed to others.">
              <a-icon type="question-circle-o"></a-icon>
            </a-tooltip>
          </span>
        <a-input
          v-decorator="[
              'username',
              {
                rules: [{ required: true, messageBrief: 'Please input your username!', whitespace: true }]
              }
            ]"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="密码"
      >
        <a-input
          v-decorator="[
              'password',
              {
                rules: [{
                  required: true, messageBrief: 'Please input your password!',
                }, {
                  validator: validateToNextPassword,
                }],
              }
            ]"
          type="password"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="确认密码"
      >
        <a-input
          v-decorator="[
              'confirm',
              {
                rules: [{
                  required: true, messageBrief: 'Please confirm your password!',
                }, {
                  validator: compareToFirstPassword,
                }],
              }
            ]"
          type="password"
          @blur="handleConfirmBlur"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="居住地址"
      >
        <a-cascader
          v-decorator="[
              'residence',
              {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [{ type: 'array', required: true, messageBrief: 'Please select your habitual residence!' }],
              }
            ]"
          :options="residences">
        </a-cascader>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="电话号码"
      >
        <a-input
          v-decorator="[
              'phone',
              {
                rules: [{ required: true, messageBrief: 'Please input your phone number!' }],
              }
            ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="[
                'prefix',
                { initialValue: '86' }
              ]"
            style="width: 70px"
          >
            <a-select-option value="86">
              +86
            </a-select-option>
            <a-select-option value="87">
              +87
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout" style="text-align: center">
        <a-checkbox
          v-decorator="['agreement', {valuePropName: 'checked'}]"
          :checked="checkAgreement"
          @change="handleChange"
        >
          我同意注册、并遵守本网站的规定
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="!checkAgreement"
        >
          注册
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
  import {register} from '@/api/api'
  import global from '@/components/GlobalStyle'
  import globalD from '@/components/GlobalData'

  export default {
    data () {
      return {
        checkAgreement: null,
        messageDetail: null,
        success: null,
        confirmDirty: false,
        residences: globalD.residences,
        autoCompleteResult: [],
        // global
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
      handleSubmit  (e) {
        e.preventDefault()
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
            register(values)
              .then(res => {
                if (res.status === 1) {
                  this.success = true
                  this.messageDetail = res.msg
                  setTimeout(this.registerSuccess, 500)
                } else {
                  // 登录失败
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
      registerSuccess () {
        this.$router.push('/login')
      },
      handleChange (e) {
        this.checkAgreement = e.target.checked
      }
    }
  }
</script>
