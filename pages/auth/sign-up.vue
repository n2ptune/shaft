<template>
  <div class="sign-up">
    <form ref="signUpForm" @submit.prevent="signUp">
      <label for="nickname">닉네임</label>
      <input v-model="user.nickname" type="nickname" name="nickname" />
      <label for="email">이메일</label>
      <input v-model="user.email" type="email" name="email" />
      <label for="nickname">비밀번호</label>
      <input v-model="user.password" type="password" name="password" />
      <input type="submit" value="회원가입" @click.prevent="signUp" />
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {
      nickname: '',
      email: '',
      password: ''
    }
  }),

  methods: {
    async signUp() {
      if (this.user.nickname && this.user.email && this.user.password) {
        try {
          const { data: signUpResult } = await this.$axios.post(
            '/api/auth/sign-up',
            {
              data: {
                nickname: this.user.nickname,
                email: this.user.email,
                password: this.user.password
              }
            }
          )

          console.log(signUpResult)
        } catch (error) {
          console.error(error)
        }
      } else {
        console.error('required form')
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
</style>
