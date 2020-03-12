<template>
    <view class="container">
        <view class="df jc-sb avatar">
            <text class="name">头像</text>
            <image :src="userInfo.headImage" class="img"></image>
        </view>
        <view class="cell-list">
            <view class="df bd-b item">
                <view class="label">我的昵称</view>
                <text class="value">{{userInfo.nickname}}</text>
            </view>
            <view class="df bd-b item">
                <view class="label">手机号码</view>
                <input type="number" v-model="phoneNum" class="df1 input" placeholder="请输入" placeholder-style="color:#999" >
            </view>
            <view class="df item">
                <view class="label">验证码</view>
                <input type="text" v-model="phoneCode" class="df1 input" placeholder="请输入" placeholder-style="color:#999">
                <template>
                    <button v-if="!isCode" @click.stop="getPhoneCode()" class="code-btn">获取验证码</button>
                    <button v-else class="code-btn">{{isCodeNum}}秒后获取</button>
                </template>
            </view>
        </view>
        <view class="df df-r jc-fs pact">
            <checkbox-group @change="checkboxChange">
                <label>
                    <checkbox value="confirm" :checked="false" style="transform:scale(0.7)" />
                    <text class="value">同意</text>
                </label>
            </checkbox-group>
            <view class="value">
                <text @click.stop="navTo(`/pages/pact/pact?status=${1}`)" class="name">《微米享会员协议》</text>
            </view>
        </view>
        <view class="df df-c btn-group">
            <button @click="sendApply()" class="submit">提交申请</button>
        </view>
    </view>
</template>

<script>
import { sendMessage, saveApply } from '@/hub/api/user';
import getPhoneCode from '@/hub/getPhoneCode';
    export default {
        data() {
            return {
                applyPass: false,
                phoneNum: getPhoneCode.phone,
                phoneCode: '',
                isCode: getPhoneCode.isCode,
                isCodeNum: getPhoneCode.isCodeNum
            }
        },

        onLoad() {
            console.log('getPhoneCode.phone', getPhoneCode.phone);
            this.isCode && this.getPhoneCodeTimer();
        },

        methods: {
            async sendApply() {
                if(!this.validatorApply()) return;
                const propsData = {
                    phone: this.phoneNum,
                    verification: this.phoneCode
                }
                try {
                    await saveApply(propsData)
                    await this.$api.showToast('成功申请');
                    uni.reLaunch({ url: '/pages/tabbar/index/index' });
                } catch (error) {
                    console.log('error', error);
                    this.$api.showToast(error.resultInfo || '申请失败');
                }
            },

            validatorApply() {
                let msg = '';
                let pass = true;
                if(!this.phoneNum || this.phoneNum.length !== 11) {
                    msg = '请填写正确的手机号';
                    pass = false;
                }else if(!this.phoneCode) {
                    msg = '请填写验证码';
                    pass = false;
                }else if(!this.confirmPact) {
                    msg = '请勾选用户协议';
                    pass = false;
                }
                
                if(!pass) {
                    this.$api.showToast(msg);
                    return pass;
                }
                return true;
            },
            
            checkboxChange(e) {
                this.confirmPact = !!e.detail.value.length;
            },

            getPhoneCodeTimer() {
                clearInterval(getPhoneCode.timer);
                getPhoneCode.timer = setInterval(() => {
                    getPhoneCode.isCodeNum -= 1;
                    this.isCodeNum = getPhoneCode.isCodeNum;
                    if(getPhoneCode.isCodeNum == 0) {
                        getPhoneCode.isCode = false;
                        getPhoneCode.isCodeNum = 60;
                        this.isCodeNum = getPhoneCode.isCodeNum;
                        this.isCode = getPhoneCode.isCode
                        clearInterval(getPhoneCode.timer);
                    }
                }, 1000);
            },

            getPhoneCode() {
                if(this.phoneNum.length !== 11) {
                    this.$api.showToast('请输入正确的手机号');
                    return;
                }
                getPhoneCode.phone = this.phoneNum;
                const propsData = {
                    phone: this.phoneNum
                }
                sendMessage(propsData).then(res => {
                getPhoneCode.isCode = this.isCode = true;
                    this.getPhoneCodeTimer();
                    this.$api.showToast(res.resultInfo || '成功获取，请查收手机短信');
                }).catch(error => {
                    console.log('error', error);
                    this.$api.showToast(error.resultInfo || '操作失败');
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.avatar {
    margin: 20rpx 0;
    padding: 20rpx 40rpx;
    background-color: #fff;
    .name {
        font-size: 32rpx;
        color: #656565;
    }
    .img {
        width: 88rpx;
        height: 88rpx;
        border-radius: 100%;
        background-color: #ccc;
    }
}

.cell-list {
    padding: 0 40rpx;
    background-color: #fff;
    margin-bottom: 24rpx;
    .item {
        font-size: 32rpx;
        .label {
            width: 200rpx;
            padding: 28rpx 0;
            color: #656565;
        }
        .value {
            color: #333;
            font-size: 32rpx;
        }

        .input {
            font-size: 32rpx;
        }
        .code-btn {
            padding: 0;
            font-weight: 400;
            width: 140rpx;
            height: 48rpx;
            line-height: 48rpx;
            background-color: #E9D5CC;
            border-radius: 4rpx;
            font-size: 20rpx;
            color: #210900;
        }
    }
}

.pact {
    margin: 0 36rpx 102rpx;
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
    .submit{
        width: 670rpx;
        height: 96rpx;
        line-height: 96rpx;
        border-radius: 16rpx;
        background-color: #CB8768;
        color: #fff;
    }
}
</style>