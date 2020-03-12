import { baseHttp } from './index.js';

// 获取商铺列表
export const getShopList = (data) => {
	return baseHttp('09101', data);
}

// 关注商铺
export const attentionShop = (data) => {
	return baseHttp('09102', data);
}

// 我的关注列表
export const getMyAttentionList = (data) => {
	return baseHttp('09103', data);
}

// 商铺详情
export const getShop = (data) => {
	return baseHttp('09104', data);
}

