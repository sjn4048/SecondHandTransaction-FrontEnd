<template id="components-form-login">
  <a-form
    :form="form"
    class="login-form"
    @submit="handleLogin"
    style="text-align: center;"
  >
    <a-form-item
      label="Username"
      v-bind="formItemLayout"
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, messageBrief: 'Please input your username!' }]}
        ]"
        type="text"
        placeholder="Username"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color:rgba(0,0,0,.25)">
        </a-icon>
      </a-input>
    </a-form-item>
    <a-form-item
      label="Password"
      v-bind="formItemLayout"
      :validate-="passwordError() ? 'error' : ''"
    >
      <a-input
        v-decorator="[
          'password',
          {rules: [{ required: true, messageBrief: 'Please input your password!' }]}
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color:rgba(0,0,0,.25)"></a-icon>
      </a-input>
    </a-form-item>
    <a-form-item>
      <div>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
      >
        Remember me
      </a-checkbox>
      </div>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
        style="width: 20%"
        :compact=true
      >
        Log in
      </a-button>
      <div>
      Or <a href="/register">
      register now!
      </a>
      </div>
    </a-form-item>
    <a-alert
      v-if=displayMessage
      :message=messageBrief
      :description=messageDetail
      :type=messageType
      showIcon>
    </a-alert>
  </a-form>
</template>

<script>
  import {logIn} from '@/api/api'
  import global from '@/components/GlobalStyle'

  function hasErrors (fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  export default {
    name: 'login',
    data () {
      return {
        hasErrors,
        messageDetail: null,
        success: null,
        form: this.$form.createForm(this),
        formItemLayout: global.formItemLayout,
        tailFormItemLayout: global.tailFormItemLayout
      }
    },
    mounted () {
      this.$nextTick(() => {
        // To disabled submit button at the beginning.
        this.form.validateFields()
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
      logInSuccess () {
        this.$router.push('/arena')
      },
      userNameError () {
        const { getFieldError, isFieldTouched } = this.form
        return isFieldTouched('username') && getFieldError('username')
      },
      // Only show error after a field is touched.
      passwordError () {
        const { getFieldError, isFieldTouched } = this.form
        return isFieldTouched('password') && getFieldError('password')
      },
      handleLogin (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
            logIn({
              username: values.username,
              password: values.password
            }).then(res => {
              if (res.status === 1) {
                // 登陆成功
                this.success = true
                this.messageDetail = res.msg
                window.localStorage['token'] = res.token
                console.log(res.token)
                setTimeout(this.logInSuccess, 500)
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
      }
    }
  }
</script>

<style>
  #components-form-login .login-form {
    max-width: 300px;
  }
  #components-form-login .login-form-button {
    width: 20%;
  }
</style>
