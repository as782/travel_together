<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { showToast, type FieldRuleValidator } from 'vant';
import { register } from '@/api/user';

const rouetr = useRouter();
const account = ref('');
const password = ref('');
const password2 = ref('');
const buttonLoading = ref(false);

const resetForm = () => {
    account.value = '';
    password.value = '';
    password2.value = '';
}
const passwordValidator: FieldRuleValidator = (val) => {
    return val === password.value;

}
const onSubmit = async (values: any) => {

    buttonLoading.value = true;
    // 注册逻辑
    try {
        await register({
            username: values.account,
            password: values.password2
        })
        resetForm();
        buttonLoading.value = false;
        showToast('注册成功');
        rouetr.push('/accountLogin')
    } catch (error) {
        console.error(error);
        buttonLoading.value = false;
    }
    
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
                    :rules="[{ required: true, message: '请填写密码' }]" trigger="onBlur" />

                <van-field v-model="password2" type="password" name="password2" label="确认密码" placeholder="再次输入密码"
                :rules="[{ validator: passwordValidator, message: '两次密码输入不一致' }]"  />

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