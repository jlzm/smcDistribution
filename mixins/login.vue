<script>
import { login } from "@/hub/api/user";
import { mapMutations } from "vuex";
export default {

  methods: {
    ...mapMutations(['saveLoginInfo']),

    async login(e) {
      console.log('e', e);
      const userInfo = e.detail.userInfo;
      
        if (!userInfo) {
          throw new Error({
              resultInfo: '登录失败'
          });
        }
        const code = await this.getCode();
        await this.codeLogin(code, userInfo);
    },

    getCode: function() {
      return new Promise((resolve, reject) => {
        uni.login({
          success: res => {
            console.log("res", res);
            resolve(res.code);
          },
          fail: error => {
            console.log("error", error);
            reject(error);
          }
        });
      });
    },

    /**
     * @param { string } code // platform code
     * @param { Object } userInfo // platform userInfo
     */
    codeLogin(code, userInfo) {
      const propsData = {
        js_code: code,
        headImage: userInfo.avatarUrl,
        nickname: userInfo.nickName,
      };
      return login(propsData)
        .then(res => {
          this.saveLoginInfo(res.data);
        })
    }
  }
};
</script>