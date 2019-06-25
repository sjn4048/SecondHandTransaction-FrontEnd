<template>
  <div>
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item
        v-bind="formItemLayout"
        label="用户名"
      >
        <a-input
          v-decorator="[
              'username',
              {
                rules: [{ required: true, messageBrief: 'Please input your username!', whitespace: true }]
              }
            ]"
        >
        </a-input>
      </a-form-item>
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
            ]"
        ></a-input>
      </a-form-item>

      <a-form-item
        v-bind="formItemLayout"
        label="原密码"
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
        label="修改密码"
      >
        <a-input
          v-decorator="[
              'new_password',
              {
              }
            ]"
          type="password"
          @blur="handleConfirmBlur"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="居住地点"
      >
        <a-cascader
          v-decorator="[
              'residence',
              {
                initialValue: ['zhejiang', 'hangzhou', 'zijingang'],
                rules: [{ type: 'array', required: true, messageBrief: 'Please select your habitual residence!' }],
              }
            ]"
          :options="residences">
        </a-cascader>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="手机号"
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
      <a-form-item
        v-bind="formItemLayout"
        label="运送模式"
      >
        <a-checkbox-group :options="sendOptions" @change="onCheckboxChange" v-decorator="[
            'send',
            {
            }
          ]"></a-checkbox-group>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button
          type="primary"
          html-type="submit"
        >
          修改
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
  import {changeInfo, userHome} from '@/api/api'
  const sendOptions = ['邮寄运送', '线下交易']

  const residences = [{
    value: 'zhejiang',
    label: '浙江',
    children: [{
      value: 'hangzhou',
      label: '杭州',
      children: [{
        value: 'zijingang',
        label: '浙江大学 紫金港校区'
      }, {
        value: 'yuquan',
        label: '浙江大学 玉泉校区'
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
        currentInfo: null,
        checkedList: null,
        residences,
        sendOptions,
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
    created () {
      userHome()
        .then(res => {
          this.currentInfo = res
          this.form.setFieldsValue({username: res.username,
                                    email: res.email,
                                    residence: ['zhejiang', 'hangzhou', res.residence],
                                    phone: res.phone_number,
                                    send: [res.delivery, res.face2face]})
        }).catch(error => {
          console.log(error)
        })
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
            values['delivery'] = values.send.includes(sendOptions[0])
            values['face2face'] = values.send.includes(sendOptions[1])
            console.log(values)
            changeInfo(values).then(res => {
              if (res.status === 1) {
                this.success = true
                this.messageDetail = res.msg
                setTimeout(this.changeSuccess, 500)
              } else {
                // 登录失败
                this.success = false
                this.messageDetail = res.msg
              }
            }).catch(error => {
              console.log(error)
            }
            )
          }
        })
      },
      onCheckboxChange (checkedList) {
        console.log(checkedList)
      },
      handleConfirmBlur  (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      validateToNextPassword  (rule, value, callback) {
        const form = this.form
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
      },
      changeSuccess () {
      },
      handleChange (e) {
        this.checkAgreement = e.target.checked
      }
    }
  }
</script>
