<template>
  <a-form
    id="components-form-login"
    :form="form"
    class="login-form"
    @submit="handleLogin"
  >
    <a-form-item
      label="Username"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
        v-decorator="[
          'userName',
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
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      :validate-status="passwordError() ? 'error' : ''"
      :help="passwordError() || ''"
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
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        Log in
      </a-button>
      Or <a href="Register.vue">
      register now!
    </a>
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

  function hasErrors (fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  // function sleep (ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms))
  // }

  export default {
    name: 'login',
    data () {
      return {
        hasErrors,
        messageDetail: null,
        success: null,
        form: this.$form.createForm(this)
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
        return isFieldTouched('userName') && getFieldError('userName')
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
              username: values.userName,
              password: values.password
            }).then(res => {
              if (res.status === 1) {
                // 登陆成功
                this.success = true
                this.messageDetail = res.msg
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
