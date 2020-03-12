<script>
import { mapState } from 'vuex';  
export default {
    data() {
        return {
            staicBaseUri: 'https://fy.csgxcf.com/file/'
        }
    },
    computed: {
        ...mapState(['hasLogin', 'userInfo', 'incomeData'])
    },
    methods: {
        navTo(url) {
            console.log('url', url);
            uni.navigateTo({ url });
        },
        
        // 登录跳转
        loginNavTo(url) {
            if (!this.hasLogin) {
                this.navTo('/pages/login/login');
                return;
            }
            url && this.navTo(url);
        },
        
        stopPrevent(){}
    },
}
</script>