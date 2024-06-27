<script setup lang="ts">
import { changeUserPassword } from '@/api/user';
import { useUserStore } from '@/stores/modules/user'
import { showToast, type FieldRuleValidator } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const LogOut = () => {
  useUserStore().resetUserSotre()
  router.push('/login')
}

const account = ref('')
const password = ref('')
const password2 = ref('')
const buttonLoading = ref(false)

const resetForm = () => {
  account.value = ''
  password.value = ''
  password2.value = ''
}

const onSubmit = async (values: any) => {
  buttonLoading.value = true
  // 注册逻辑
  try {

    await changeUserPassword({
      user_id: useUserStore().userInfo?.user_id,
      old_password: values.password,
      new_password: values.password2
    })
    resetForm()
    buttonLoading.value = false
    showToast('成功')
    router.push('/login')
  } catch (error) {
    console.error(error)
    buttonLoading.value = false
  }
}
</script>

<template>
  <main class="bg-white p-4">


    <van-form @submit="onSubmit"  >
      <van-cell-group inset>

        <van-field v-model="password" type="password" name="password" label="旧密码" placeholder="填写旧密码"
          :rules="[{ required: true, message: '请填写密码' }]" trigger="onBlur" />

        <van-field v-model="password2" type="password" name="password2" label="新密码" placeholder="新密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div class="button-cell m-4">
        <van-button round block :loading="buttonLoading" type="primary" native-type="submit">
          修改密码
        </van-button>
      </div>
    </van-form>
    <div class=" m-4">
      <van-button class="w-full" round type="primary" @click="LogOut">退出登录</van-button>
    </div>
  </main>
</template>

<style scoped></style>
