<template>
    <view class="notice">
        <view class="left-box">
            <fyIcon :icon="leftIcon" size="22rpx" color="#000"></fyIcon>
        </view>
        <view class="conter-box">
            <view class="left"></view>
            <view class="conter">
                <view :animation="animationData" class="text">
                    <text>{{text}}</text>
                </view>
            </view>
            <view class="right"></view>
        </view>
        <view class="right-box"></view>
    </view>
</template>

<script>
import fyIcon from "@/components/icon";

export default {
    components: {
        fyIcon
    },
    props: {
        leftIcon: {
            type: String,
            default: 'icon-notice'
        },

        text: {
            type: String,
            default: '就阿九阿九急啊急啊急啊急啊经济阿萨大大是利空打击拉萨看得见拉克丝打赏'
        }
    },

    data() {
        return{

        }
    },

    methods: {
        
    },
}
</script>

<style lang="scss">
.notice {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: space-between;
}

.left-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.conter-box {
    position: relative;
    display: flex;
    align-items: center;
    .conter {
        width: 600rpx;
        overflow: hidden;
        .text {
            white-space: nowrap;
            font-size: 24rpx;
            color: #333333;
        }
    }
}
</style>