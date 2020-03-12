<template>
    <view class="notice">
        <view class="left-box">
            <fyIcon :icon="leftIcon" size="28rpx" color="#000"></fyIcon>
        </view>
        <view class="conter-box">
            <view class="left"></view>
            <view class="conter">
                <view :animation="animationData" class="text-box">
                    <text class="text">{{text}}</text>
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
        return {
            animation: null,
            animationData: null,
            timer: null,
            duration: 0,
            textWidth: 0,
            wrapWidth: 0
        }
    },

    onHide() {
        this.destroyTimer()
        this.timer = null;
    },

    onUnload() {
        this.destroyTimer()
        this.timer = null;
    },

    mounted() {
        setTimeout(() => {
            this.initAnimation(this.text);
        }, 10);
    },

    methods: {
        destroyTimer() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },

        // 准备动画
        initAnimation(text) {
            this.duration = 15000,
            this.animation = uni.createAnimation({
                duration: this.duration
            })

            const query = uni.createSelectorQuery().in(this);
            query.select('.conter').boundingClientRect();
            query.select('.text').boundingClientRect();
            query.exec((rect) => {
                this.wrapWidth = rect[0].width;
                this.textWidth = rect[1].width;
                this.startAnimation();
            })

        },
        
        // 动画开始
        startAnimation() {
            const resetAnimation = this.animation.translateX(this.wrapWidth).step({ 
                duration: 0
            });
            this.animationData = resetAnimation.export();

            const animationData = this.animation.translateX(-this.textWidth).step({
                duration: this.duration
            })

            setTimeout(() => {
                this.animationData = animationData.export();
            }, 100);

            const timer = setTimeout(() => {
                this.startAnimation()
            }, this.duration);

            this.timer = timer;
        }
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
    width: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.conter-box {
    position: relative;
    display: flex;
    align-items: center;
    .conter {
        width: 650rpx;
        overflow: hidden;
        .text-box {
            white-space: nowrap;
            font-size: 24rpx;
            color: #333333;
        }
    }
}

.right-box {
    width: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>