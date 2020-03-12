import { baseHttp } from './index.js';

// 获取商铺列表
export const getShare = (data) => {
	return baseHttp('09108', data);
}