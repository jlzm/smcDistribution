<template>
    <view class="por card">
        <template>
            <view class="df shop-login">
                <image :src="shopDetail.image" class="logo"></image>
                <view class="df1">
                    <view class="clamp name">{{shopDetail.shopName}}</view>
                    <view class="clamp desc">{{shopDetail.content}}</view>
                </view>
            </view>
            <view class="poa tac follow follow-login">{{shopDetail.attention === 1 ? '已关注' : '未关注'}}</view>
        </template>
    </view>
</template>

<script>
    export default {
        props: {
            shopDetail: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@/static/styles/income.scss';

.card {
    padding: 38rpx 75rpx 40rpx;
    background-color: #E9D5CC;
    // 未登录 begin
    .shop {
        .logo {
            width: 160rpx;
            height: 160rpx;
            margin-bottom: 24rpx;
            border-radius: 24rpx;
        }
        .name {
            width: 600rpx;
            margin-bottom: 12rpx;
            font-size: 36rpx;
            font-weight: 600;
            color: #210900;
        }
        .desc {
            width: 600rpx;
            font-size: 24rpx;
            color: #333;
        }
    }
    
    // 未登录 end

    .shop-login{
        margin-bottom: 32rpx;
        .logo {
            width: 136rpx;
            height: 136rpx;
            border-radius: 20rpx;
            margin-right: 24rpx;
        }
        .name {
            width: 408rpx;
            margin-bottom: 20rpx;
            font-size: 36rpx;
            font-weight: 600;
            color: #210900;
        }
        .desc {
            width: 408rpx;
            font-size: 24rpx;
            color: #333;
        }
    }


    .follow {
        width: 144rpx;
        height: 48rpx;
        line-height: 48rpx;
        right: 0;
        top: 108rpx;
        font-size: 20rpx;
        border-radius: 40rpx 0 0 40rpx;
        background-color: #DEBAAB;
        color: #fff;
    }
    .follow-login {
        width: 108rpx;
        top: 78rpx;
    }
}
</style>