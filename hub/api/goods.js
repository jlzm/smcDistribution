import { baseHttp } from './index.js';

// 商品分类列表查询接口
export const getGoodsList = (data) => {
	return baseHttp('09105', data);
}
