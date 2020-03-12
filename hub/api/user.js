import { baseHttp } from './index.js';

// 登录
export const login = (data) => {
	return baseHttp('09107', data);
}

// 获取会员详情
export const getDistributor = (data) => {
	return baseHttp('09109', data);
}

// 保存会员申请
export const saveApply = (data) => {
	return baseHttp('09110', data);
}

// 获取验证码
export const sendMessage = (data) => {
	return baseHttp('09111', data);
}

