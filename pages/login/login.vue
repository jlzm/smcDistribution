<template>
    <view class="container">
        <view class="tac logo">
            <image src="/static/image/logo.png" class="dib img"></image>
        </view>
        <view class="df df-r jc-fs pact">
            <checkbox-group @change="checkboxChange">
                <label>
                    <checkbox value="confirm" :checked="true" style="transform:scale(0.7)" />
                    <text class="value" >
                        同意
                    </text>
                </label>
            </checkbox-group>
            <view class="value">
                <text @click="navTo(`/pages/pact/pact?status=${2}`)" class="name">《微米享用户协议》</text>和<text @click="navTo(`/pages/pact/pact?status=${3}`)" class="name">《微米享隐私政策》</text>
            </view>
        </view>
        <view class="df df-c btn-group">
            <button :disabled="!confirmPact" :class="{'btn-full' : confirmPact}" open-type="getUserInfo" @getuserinfo="onLogin" class="btn">微信登录</button>
            <button class="btn">取消</button>
        </view>
    </view>
</template>

<script>
import loginMixin from '@/mixins/login';
    export default {
        mixins: [loginMixin],
        data() {
            return {
                confirmPact: true,
                status: 0   // 0: 跳转首页 1: 跳转到申请页面
            }
        },
        onLoad(option) {
            this.status = parseInt(option.status) || 0;
        },
        methods: {
            async onLogin(e) {
                if(!this.confirmPact) {
                    this.$api.showToast('请勾选用户协议');
                    return;
                }
                try {
                    await this.login(e);
                    await this.$api.showToast('登录成功');

                    const url = this.status === 1 ? '/pages/application/step' : '/pages/tabbar/index/index'
                    uni.reLaunch({url});
                } catch (error) {
                    console.log('error', error);
                    this.$api.showToast(error.resultInfo || '登入失败');
                }
            },

            checkboxChange(e) {
                this.confirmPact = !!e.detail.value.length;
            },
        },
    }
</script>

<style lang="scss" scoped>
.container {
    background-color: #fff;
}
.logo {
    .img {
        width: 200rpx;
        height: 200rpx;
        margin: 160rpx 0;
        border-radius: 20rpx;
        background-color: #ccc;
    }

}

.pact {
    margin: 0 38rpx 24rpx;
    font-size: 24prx;
    color: #656565;
    .value {
        font-size: 24rpx;
        color: #656565;
        .name {
            color: #4582E5;
        }
    }
}

.btn-group {
    .btn {
        width: 670rpx;
        height: 96rpx;
        font-size: 36rpx;
        font-weight: 500;
        color: #999;
        background-color: #F7F8FA;
        border: 2rpx solid #E3E3E3;
        margin-bottom: 60rpx;
        border-radius: 16rpx;
    }
    .btn-full {
        color: #fff;
        background-color: #CB8768;
    }
}
</style>