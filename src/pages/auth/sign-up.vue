<template>
  <AuthForm>
    <template slot="header">
      <LeftAreaHeader />
    </template>
    <form ref="signUpForm" class="flex flex-col" @submit.prevent="signUp">
      <label
        for="nickname"
        :class="user.nickname.isValidated === false ? 'no-validate' : ''"
        >닉네임*
        <span v-if="user.nickname.isValidated === false"
          >5자 이상 11자 이하</span
        ></label
      >
      <input
        v-model="user.nickname.val"
        type="nickname"
        name="nickname"
        @input="validateNickname"
      />
      <label
        for="email"
        :class="user.email.isValidated === false ? 'no-validate' : ''"
        >이메일*
        <span v-if="user.email.isValidated === false"
          >유효한 이메일이 아닙니다.</span
        ></label
      >
      <input
        v-model="user.email.val"
        type="email"
        name="email"
        @input="validateEmail"
      />
      <label
        for="password"
        :class="user.password.isValidated === false ? 'no-validate' : ''"
        >비밀번호*
        <span v-if="user.password.isValidated === false"
          >8자 이상 특수 문자 1개를 포함해야 합니다.</span
        ></label
      >
      <input
        v-model="user.password.val"
        type="password"
        name="password"
        @input="validatePassword"
      />
      <input
        type="submit"
        :value="waiting ? '회원가입 중...' : '회원가입'"
        :disabled="waiting || !allValidated"
        @click.prevent="signUp"
      />
    </form>
    <div v-if="signUpError" class="mt-6 text-center text-red-500 font-bold">
      무언가 잘못되었어요. 다시 시도해보세요.
    </div>
  </AuthForm>
</template>

<script>
import {
  validateNickname,
  validateEmail,
  validatePassword
} from '@/api/models/user/validate-universal'
import AuthForm from '@/components/auth/AuthForm.vue'
import LeftAreaHeader from '@/components/auth/LeftAreaHeader.vue'

export default {
  layout: 'auth-layout',

  components: {
    AuthForm,
    LeftAreaHeader
  },

  data: () => ({
    user: {
      nickname: {
        val: '',
        isValidated: null
      },
      email: {
        val: '',
        isValidated: null
      },
      password: {
        val: '',
        isValidated: null
      }
    },
    signUpError: null,
    waiting: null
  }),

  computed: {
    allValidated() {
      return (
        this.user.nickname.isValidated &&
        this.user.email.isValidated &&
        this.user.password.isValidated
      )
    }
  },

  methods: {
    validateNickname() {
      this.user.nickname.isValidated = validateNickname(this.user.nickname.val)
    },
    validateEmail() {
      this.user.email.isValidated = validateEmail(this.user.email.val)
    },
    validatePassword() {
      this.user.password.isValidated = validatePassword(this.user.password.val)
    },
    async signUp() {
      this.signUpError = null

      if (!this.allValidated) return

      this.waiting = true

      const date = this.$convertDate(new Date())

      try {
        await this.$axios.post('/api/auth/sign-up', {
          data: {
            nickname: this.user.nickname.val,
            email: this.user.email.val,
            password: this.user.password.val,
            date
          }
        })
        this.$router.push('/auth/sign-in')
      } catch (error) {
        this.signUpError = error
      } finally {
        this.waiting = false
      }
    }
  }
}
</script>
