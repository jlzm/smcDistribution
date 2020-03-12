<template>
    <view class="container">
        <web-view :src="staicBaseUri + uri"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                uri: '' // 根据status传参更改链接 1: pact/fy_member.html 2: pact/fy_user.html 3: pact/fy_pryvacy.html
            }
        },
        onLoad(option) {
            this.uri = this.setPactUrl(option.status);
        },
        
        methods: {
            setPactUrl(status) {
                status = parseInt(status);
                switch (status) {
                    case 1:
                        return 'pact/fy_member.html';
                    case 2:
                        return 'pact/fy_user.html';
                    case 3:
                        return 'pact/fy_pryvacy.html';                
                    default:
                        break;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.container {
    padding: 10rpx;
}
</style>