<script setup lang="ts">
import { showToast } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const checked = ref<Boolean>(false);
const router = useRouter();
const toLogin = () => {
    if (!checked.value) {
        showToast('请先同意用户协议和隐私政策')
        return;
    }
    router.push('/accountLogin')
}
</script>
<template>
    <div class="container-box bg-red-300 h-screen ">
        <video class="video-background" src="../../../public/loginBgVideo.mp4" preload="auto" loop autoplay
            muted></video>

        <!-- top button -->
        <div class="w-full h-10 flex justify-between items-center p-2 text-white">
            <!-- 左边游客登陆按钮， 右边联系客服按钮客服   -->
            <div class="h-full flex justify-center  items-center">
                <span class="text-sm " @click="$router.push('/home')">游客登录</span>
            </div>
            <div class="h-full flex justify-center  items-center">
                <van-icon name="service" size="20" />
            </div>
        </div>
        <!-- login logo text -->
        <div class="w-full">
            <!-- logo -->
            <div class="w-5/6 mx-auto mt-10">
                <img src="@/assets/logo.svg" alt="logo" class="w-full h-40 mx-auto" />
            </div>
            <!-- text -->
            <div class="text-center text-white">
                <span> 和有趣的人一起旅行!</span>
            </div>
        </div>

        <!-- login button -->
        <div class="w-full fixed bottom-0 mb-20">
            <div class="w-5/6 mx-auto mt-10">
                <van-button icon="wechat" block to="/accountLogin">微信登录</van-button>

            </div>
            <div class="w-5/6 mx-auto mt-5">
                <van-button icon="lock" color="#0feff0" block @Click="toLogin" >账号密码登录</van-button>
            </div>
            <div class="flex w-4/6 mx-auto mt-5  ">
                <van-checkbox v-model="checked" icon-size="18px">
                    <span class="text-gray-600" style="font-size: 12px;"> 我已阅读并同意 <a class="text-blue-600"
                            href="#">《用户协议》</a> 和 <a class="text-blue-600" href="#">《隐私政策》</a></span>
                </van-checkbox>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container-box {
    position: relative;
    background-color: transparent;
}

.video-background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;

    z-index: -1;
}
</style>