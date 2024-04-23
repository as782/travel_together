<script setup lang="ts">
import { login } from '@/api/user'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import authHelper from '@/utils/auth/authHelper'

const router = useRouter()
const account = ref('')
const password = ref('')
const buttonLoading = ref(false)

const resetForm = () => {
  account.value = ''
  password.value = ''
}

const onSubmit = async (values: any) => {
  console.log('submit', values)
  buttonLoading.value = true
  // 登录逻辑
  try {
    const { data } = await login({
      username: values.account,
      password: values.password
    })
    authHelper.setSessionStorage('token', data.token)
    authHelper.setSessionStorage('userInfo', data.user_info)
    authHelper.syncInfoToUserStore()
    buttonLoading.value = false
    resetForm()
    router.push('/')
  } catch (error) {
    console.error(error)
    buttonLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="account"
          name="account"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div class="button-cell m-4">
        <van-button
          round
          block
          :loading="buttonLoading"
          type="primary"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <div class="tips flex justify-end mx-5">
      <RouterLink
        class="text-blue-500"
        to="/register"
        >没有账号，去注册</RouterLink
      >
    </div>
  </div>
</template>
<style scoped></style>
@/api/user
