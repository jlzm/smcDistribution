<template>
    <view class="container">
        <view class="df df-r img">
            <image src="/static/image/step.png" mode="widthFix"></image>
        </view>
        <view class="pof footer">
            <button @click="navTo('/pages/application/application')" class="btn">立即申请</button>
        </view>
    </view>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.img {
    background: #E9D5CC;
    padding: 34rpx 16rpx 132rpx;
}

.footer {
    left: 0;
    right: 0;
    bottom: 0;
    height: 100rpx;
    .btn {
        width: 100%;
        height: 100%;
        background-color: #CB8768;
        font-size: 36rpx;
        color: #fff;
        font-weight: 500;
        border-radius: 0;
    }
}
</style>