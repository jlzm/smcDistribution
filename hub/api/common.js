import { baseHttp, testHttp3 } from './index.js';


// 查询租户轮播设置列表
export const queryTenantAppletPages = (data) => {
	return baseHttp('05030', data);
}
