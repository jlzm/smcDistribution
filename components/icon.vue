<template>
    <i class="fyfont" :class="icon" style="font-size:{{size}}; color: {{color}}"></i>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: '24rpx'
        },
        color: {
            type: String,
            default: '#000'
        }
    }
}
</script>

<style lang="scss">
    .fyfont {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>