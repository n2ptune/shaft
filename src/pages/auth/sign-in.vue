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
import { mapGetters } from 'vuex'
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
    },
    isError: false
  }),

  computed: {
    validated() {
      return this.user.email.isValidated && this.user.password.isValidated
    },
    ...mapGetters({
      isLogin: 'auth/getIsLogin'
    })
  },

  watch: {
    isLogin(c, p) {
      if (c) {
        this.$router.push('/')
      }
    }
  },

  methods: {
    validateEmail() {
      this.user.email.isValidated = validateEmail(this.user.email.val)
    },
    validatePassword() {
      this.user.password.isValidated = validatePassword(this.user.password.val)
    },
    async signIn() {
      if (!this.validated) return

      this.isErorr = false

      try {
        const { data } = await this.$axios.post('/api/auth/login', {
          data: {
            email: this.user.email.val,
            password: this.user.password.val
          }
        })

        await this.$store.dispatch('auth/setToken', data.accessToken)
        this.$router.push('/')
      } catch (error) {
        this.isError = true
      }
    }
  }
}
</script>
