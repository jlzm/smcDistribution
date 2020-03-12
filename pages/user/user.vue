<template>
    <view class="container">
        <view class="df jc-sb avatar">
            <text class="name">头像</text>
            <image class="img"></image>
        </view>
        <view class="cell-list">
            <view class="df bd-b item">
                <view class="label">我的昵称</view>
                <input type="text" value="夏天一抹蓝" class="df1 input" placeholder-style="color:#999">
            </view>
            <view class="df bd-b item">
                <view class="label">手机号码</view>
                <input type="number" class="df1 input" placeholder="请输入" placeholder-style="color:#999" >
            </view>
        </view>
    </view>
</template>

<script>
import {  } from ''
    export default {
        
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
        .input {
            font-size: 32rpx;
        }
    }
}
</style>