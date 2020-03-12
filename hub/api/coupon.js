import { baseHttp, testHttp4 } from './index.js';

// 获取优惠券列表
export const getCouponList = (data) => {
	return baseHttp('09106', data);
}