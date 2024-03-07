<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const account = ref('');
const password = ref('');
const password2 = ref('');
const buttonLoading = ref(false);

const resetForm = () => {
    account.value = '';
    password.value = '';
    password2.value = '';
}

const onSubmit = (values: any) => {
    console.log('submit', values);
    buttonLoading.value = true;
    // 登录逻辑

    // 模仿发起请求
    const loginFnc = new Promise((resolve) => {
        setTimeout(() => {
            resolve('登录成功');
        }, 2000);
    })

    loginFnc.then((res) => {
        console.log(res);
        // 登录成功后的逻辑处理
        buttonLoading.value = false;

        resetForm(); // 重置表单
    })

}



</script>

<template>
    <div class="container">
        <!-- 顶部导航 -->
        <van-nav-bar title="注册" left-arrow @click-left="$router.back()" />

        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="account" name="account" label="用户名" placeholder="填写用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="填写密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />

                <van-field v-model="password2" type="password" name="password2" label="确认密码" placeholder="再次输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />

            </van-cell-group>
            <div class="button-cell m-4">
                <van-button round block :loading="buttonLoading" type="primary" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
        <div class="tips flex justify-end mx-5">
            <RouterLink class="text-blue-500" to="/accountLogin">
                已有账号，立即登录
            </RouterLink>
        </div>
    </div>
</template>
<style scoped></style>