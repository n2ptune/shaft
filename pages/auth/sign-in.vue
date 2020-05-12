<template>
  <AuthForm>
    <template slot="header">
      SIGN IN
    </template>
    <form ref="signInForm" class="flex flex-col" @submit.prevent="signIn">
      <label for="email">
        이메일
      </label>
      <input
        id="email"
        v-model="user.email.val"
        type="email"
        name="email"
        placeholder="example@example.com"
        @input="validateEmail"
      />
      <label for="password">
        비밀번호
      </label>
      <input
        id="password"
        v-model="user.password.val"
        type="password"
        name="password"
        @input="validatePassword"
      />
      <input
        type="submit"
        value="로그인"
        :disabled="!validated"
        @click.prevent="signIn"
      />
    </form>
  </AuthForm>
</template>

<script>
import {
  validateEmail,
  validatePassword
} from '@/api/models/user/validate-universal'
import AuthForm from '@/components/auth/AuthForm'

export default {
  layout: 'auth-layout',

  components: {
    AuthForm
  },

  data: () => ({
    user: {
      email: {
        val: '',
        isValidated: false
      },
      password: {
        val: '',
        isValidated: false
      }
    }
  }),

  computed: {
    validated() {
      return this.user.email.isValidated && this.user.password.isValidated
    }
  },

  methods: {
    validateEmail() {
      this.user.email.isValidated = validateEmail(this.user.email.val)
    },
    validatePassword() {
      this.user.password.isValidated = validatePassword(this.user.password.val)
    },
    signIn() {
      if (!this.validated) return

      console.log('passed')
    }
  }
}
</script>
