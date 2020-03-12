export const getLoginInfo = () => {
    return uni.getStorageSync('userInfo');
}