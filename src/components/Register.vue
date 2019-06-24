<template>
  <div>
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item
        v-bind="formItemLayout"
        label="E-mail"
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
            Username&nbsp;
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
        label="Password"
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
        label="Confirm Password"
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
        label="Habitual Residence"
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
        label="Phone Number"
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
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox
          v-decorator="['agreement', {valuePropName: 'checked'}]"
          :checked="checkAgreement"
          @change="handleChange"
        >
          I have agreed to register and follow rules here!
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="!checkAgreement"
        >
          Register
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

  const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'zijingang',
        label: 'Zijingang Campus, ZJU'
      }, {
        value: 'yuquan',
        label: 'Yuquan Campus, ZJU'
      }]
    }]
  }]

  export default {
    data () {
      return {
        checkAgreement: null,
        messageDetail: null,
        success: null,
        confirmDirty: false,
        residences,
        autoCompleteResult: [],
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 }
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
          }
        },
        tailFormItemLayout: {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0
            },
            sm: {
              span: 16,
              offset: 8
            }
          }
        }
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
