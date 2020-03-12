import Vue from 'vue'
import App from './App'
import store from './store'
import commomMixin from './mixins/common'
Vue.config.productionTip = false
Vue.prototype.$store = store;

App.mpType = 'app'
const showToast = function(title, duration = 1500, mask = false, icon = 'none') {
	if (Boolean(title) === false) {
		return;
	}
	//统一提示方便全局修改
	return new Promise((resolve, reject) => {
		uni.showToast({
			title,
			duration,
			mask,
			icon,
			success: (res) => {
				setTimeout(() => {
					resolve(res) 
			}, duration);
			},
			fail: (error) => { 
				setTimeout(() => {
					reject(error) 
				}, duration);
			}
		});
	})
	
}


// 待优化
const showModal = (data = {}) => {
	//统一提示方便全局修改
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: data.title || '提示',
			content: data.content || '',
			showCancel: data.showCancel || false,
			cancelText: data.cancelText || '取消',
			confirmText: data.confirmText || '确定',
			success: res => {
                // resolve(res)
                if(res.confirm) {
                    resolve(res)
                } else {
                    reject({
                        resultInfo: '操作已取消'
                    })
                }
			},
			fail: error => {
				reject(error)
			}
		});
	})
	
}

const prePage = () => {
	let pages = getcurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.prototype.$api = {
	showToast,
	showModal,
	prePage,
};
Vue.mixin(commomMixin)
const app = new Vue({
    ...App
})
app.$mount()
