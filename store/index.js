import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
        userInfo: {},
        incomeData: {},
	},
	mutations: {    
        // 保存会员（微商/分销商）信息
		saveIncomeData(state, provider) {
			state.incomeData = provider;
			//缓存用户登陆状态
			uni.setStorage({
			    key: 'incomeData',  
			    data: provider  
			}) 
			console.log(state.incomeData);
        },

        // 保存登录信息
		saveLoginInfo(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			//缓存用户登陆状态
			uni.setStorage({
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
        },
        

		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
	
	}
})

export default store
