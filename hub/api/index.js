import {
	http,
	test,
	test2,
	test3,
	test4
} from '@/utils/request/index.js';

import { getLoginInfo } from '@/hub/storage';

const baseApi = 'getAPIData';

/**
 * 正式接口
 * @param { String } business // apiNumber
 * @param { Object } data // proprsData
 */
export const baseHttp = (business, data = {}) => {
	const distributorId = getLoginInfo().distributorId || '';
	console.log('distributorId', distributorId);
	const defData = {
		distributorId: distributorId
	}
    data = Object.assign({}, defData, data);
    console.log('data', data);
	const baseData = {
		business,
		currentPage: data.currentPage || 1,
		pageSize: data.pageSize || 10,
		data
	}
	return http.post(baseApi, baseData);
}

/**
 * 正式接口 文件上传
 * @param { String } business // apiNumber
 * @param { Object } data // proprsData
 */
export const baseFileHttp = (business, data = {}) => {
	const distributorId = getLoginInfo().distributorId || '';
	console.log('distributorId', distributorId);
	const defData = {
		tenantid,
		shopId,
		distributorId: distributorId
	}
    data = Object.assign({}, defData, data);
    console.log('data', data);
	const baseData = {
		business,
		currentPage: data.currentPage || 1,
		pageSize: data.pageSize || 10,
		data
	}
	return http.post(baseApi, baseData);
}


/**
 * 测试接口
 * @param { String } business // apiName
 * @param { Object } data // proprsData
 */
export const testHttp = (business, data = {}) => {
	const distributorId = getLoginInfo().distributorId || '';
	const defData = {
		tenantid,
		shopId,
		distributorId: distributorId
	}
    data = Object.assign({}, defData, data);
    console.log('data', data);
	const baseData = {
		currentPage: data.currentPage || 1,
		pageSize: data.pageSize || 10,
		data
	}
	return test.post(business, baseData);
}
