<template>
  <div class="max-w-sm w-full px-4 py-8 bg-white rounded-lg shadow mx-2">
    <div class="text-2xl font-bold text-center mb-6">
      REGISTER
    </div>
    <form ref="signUpForm" class="flex flex-col" @submit.prevent="signUp">
      <label
        for="nickname"
        :class="user.nickname.isValidated ? '' : 'no-validate'"
        >닉네임</label
      >
      <input
        v-model="user.nickname.val"
        type="nickname"
        name="nickname"
        class="w-full"
        @input="validateNickname"
      />
      <label for="email" :class="user.email.isValidated ? '' : 'no-validate'"
        >이메일</label
      >
      <input
        v-model="user.email.val"
        type="email"
        name="email"
        @input="validateEmail"
      />
      <label
        for="password"
        :class="user.password.isValidated ? '' : 'no-validate'"
        >비밀번호</label
      >
      <input
        v-model="user.password.val"
        type="password"
        name="password"
        @input="validatePassword"
      />
      <input type="submit" value="회원가입" @click.prevent="signUp" />
    </form>
    <div v-if="signUpError">
      {{ signUpError }}
    </div>
  </div>
</template>

<script>
import {
  validateNickname,
  validateEmail,
  validatePassword
} from '@/api/models/user/validate-universal'

export default {
  layout: 'auth',

  data: () => ({
    user: {
      nickname: {
        val: '',
        isValidated: true
      },
      email: {
        val: '',
        isValidated: true
      },
      password: {
        val: '',
        isValidated: true
      }
    },
    signUpError: null
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
      this.validateNickname()
      this.validateEmail()
      this.validatePassword()

      if (!this.allValidated) return

      try {
        await this.$axios.post('/api/auth/sign-up', {
          data: {
            nickname: this.user.nickname.val,
            email: this.user.email.val,
            password: this.user.password.val
          }
        })
      } catch (error) {
        this.signUpError = error
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
form label {
  @apply text-gray-600;
}
form input:not([type='submit']) {
  @apply px-2 py-1 my-2;
}
form input:not([type='submit']):focus {
  @apply outline-none;
}
</style>
