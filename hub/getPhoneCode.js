
export default {
    timer: null,    // 定时器
    isCode: false,  
    isCodeNum: 10,
    phone: '',

    resetGetPhoneCode() {
        clearInterval(this.timer);
        this.timer = null;
        this.isCode = false;
        this.isCodeNum = 10;
        this.phone = '';
    },
}