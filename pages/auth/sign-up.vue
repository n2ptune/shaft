<template>
  <div class="sign-up">
    <form ref="signUpForm" @submit.prevent="signUp">
      <label
        for="nickname"
        :class="user.nickname.isValidated ? '' : 'no-validate'"
        >닉네임</label
      >
      <input
        v-model="user.nickname.val"
        type="nickname"
        name="nickname"
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

<style scoped>
.sign-up input {
  display: block;
  margin: 0.2rem 0 1rem 0;
}
label.no-validate {
  color: red;
}
</style>
