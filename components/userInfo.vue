<template>
    <view @click="loginNavTo()" class="card">
        <view class="df jc-sb ai-c user">
            <view class="df df-r info">
                <image :src="userInfo.headImage || '/static/image/default_avatar.png'" class="avatar"></image>
                <template>
                    <text v-if="incomeData.status === 0" class="name">{{userInfo.nickname}}</text>
                    <view class="no-login" v-else>
                        <view class="name">{{userInfo.nickname || '点击显示微信头像'}}</view>
                        <text class="desc">你还不是会员</text>
                    </view>
                </template>
            </view>
            <template>
                <button v-if="!hasLogin || incomeData.status === 2" @click.stop="applyNow('/pages/application/step?status=1')" class="btn">立即申请</button>
                <!-- <text v-else class="fyfont icon-right"></text> -->
            </template>
        </view>
        <view class="df jc-sb income">
            <view class="tac item">
                <view class="num">{{incomeData.totalSale || '0.00'}}</view>
                <view class="name">销售总额</view>
            </view>
            <view class="tac item">
                <view class="num">{{incomeData.totalRewards || '0.00'}}</view>
                <view class="name">奖励总额</view>
            </view>
            <view class="tac item">
                <view class="num">{{incomeData.totalAccount || '0.00'}}</view>
                <view class="name">到账总额</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {

        },
        data() {
            return {

            }
        },
        methods: {
            applyNow(url) {
                this.loginNavTo(url);
            },
        },
    }
</script>

<style lang="scss" scoped>
@import '@/common/styles/income.scss';

.card {
    padding: 48rpx 40rpx;
    background-color: #E9D5CC;
    .user {
        margin-bottom: 68rpx;
        .info {
            .avatar {
                margin-right: 20rpx;
                width: 120rpx;
                height: 120rpx;
                border-radius: 100%;
                background-color: #ccc;
            }
            .name {
                font-size: 36rpx;
                font-weight: 600;
                color: #333;
            }
            .no-login {
                name {
                    font-size: 32rpx;
                    color: #333;
                    margin-bottom: 12rpx;
                }
                .desc {
                    font-size: 20rpx;
                    color: rgba(0, 0, 0, .49);
                }
            }
        }
        .icon-right {
            width: 28rpx;
            height: 28rpx;
        }
        .btn {
            width: 192rpx;
            height: 72rpx;
            line-height: 72rpx;
            border-radius: 40rpx;
            font-size: 26rpx;
            color: #CB8768;
            background-color: #fff;
        }
    }
    .icon-right {
        color: #fff;
    }
}
</style>