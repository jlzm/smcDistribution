## User

### 04001 查询会员信息接口
	queryVIPInfo
| 参数名   | 必选 | 类型   | 说明     |
|:---------|:-----|:-------|----------|
| tenantId | 是   | String | 租户编号 |
| typeName | 是   | String | 分类名称 |
	
### 04002 查询会员详细信息接口
	queryCustomerInfo

### 04010 会员登录
	customerLogin
	``` 
	{
		"data": {
			"avatarUrl": "",
			"city": "",
			"code": "",		// 登陆凭证，必传
			"gender": "",
			"nickName": "",
			"province": "",
			"tenantId": "",	// 租户编号，必传
			"type": 0	// 类型，必传，1：微信，2：支付宝，3：百度，4：头条，5：QQ
		}
	}
	```

### 04006 会员等级信息查询接口
	getMemberLevelList
	
### 04007 会员等级信息更新接口
	updateMemberLevel
	``` 
	{	
		"data": {
			"discount": 0,	// 折扣，必传
			"maxGrowthValue": 0,	// 最大成长值，必传
			"memberId": "",	// 编号，必传
			"memberName": "",	// 名称，必传
			"tenantId": ""	// 租户编号，必传
		}
	}
	```
## Order
### 03004 提交订单接口
		submitOrder
| 参数名      | 必选 | 类型   | 说明       |
|:------------|:-----|:-------|------------|
| tenantid    | 是   | String | 租户ID     |
| shopid      | 是   | String | 店铺ID     |
| customer_id | 是   | String | 用户ID     |
| addr_id     | 是   | String | 收货地址ID |
| goods       | 是   | Array  | 商品数组   |
| cart_id     | 否   | String | 购物车ID   |
| myself      | 否   | String | 是否自取   |

### 03005 查询订单列表接口
queryOrderList
| 参数名   | 必选 | 类型   | 说明   |
|:---------|:-----|:-------|--------|
| tenantid | 是   | String | 租户ID |
| shopid   | 是   | String | 用户ID |
	
### 03006 查询订单接口
	queryOrder
	
### 03007 下单接口
	unifiedOrder

### 修改订单地址
	updateOrderAddrFromApp
	
### 03008 取消支付（关闭订单）接口
	closeOrder
	
### 04003 收货地址列表查询接口
	queryAddrInfos
	
### 04004 收货信息新增接口
	addAddrInfo
	
### 04005 收货信息修改接口
	updAddrInfo

### 04012 查询单个收货地址
	queryOneCustomerAddress

### 02015 查询物流信息接口
	queryLogistics


## Cart
### 03001 商品加入购物车接口
	addGoodsToCart
	
### 03002 更新购物车商品数量接口
	updGoodsToCart
	
### 03003 查询购物车商品信息接口
	queryCart

### 03011 删除购物车商品
	deleteCustomerCart

### 03013 查询购物车数量
	queryCartCount


## product

### 05001 商品列表查询接口
	getGoodsList
	
### 05011 查询商品分类
	listGoodsType

### 05020 查询具体规格商品价格
	queryByGoodIdAndValueNames

	
## Activity
###  正在进行的拼团活动列表
	getGroupActivityGoodsListFromApp

### 06001 促销活动列表接口
	goodsPromotion
	
### 06004 获得拼团活动信息
	getPromotionTeam
	
### 06007 获得拼团团队信息
	getTeamInfo
	
### 06008 添加砍价活动信息接口
	addPromotionCut
	
### 06009 获得砍价活动信息
	getPromotionCut
	
### 06011 获得砍价活动参与信息
	getCutCustomers
	
### 06013 获得限时秒杀活动
	getPromotionLimited
	
### 06015 获得限时秒杀活动参与名单
	getLimitedCustomers
	
### 06017 获得优惠券活动信息
	getPromotionCoupon
	
### 06019 优惠券领取接口
	getCoupon
	
### 06022 可用优惠券接口
	canUseCoupon

### 微信支付
	wxPay

## refunds
### 创建退款申请页面
	createRefundApplyFromApp

### 我的退货列表
	getMyRefundFromApp
	
### 我的退款详情
	getMyRefundInfoFromApp

### 新增退款申请
	addRefundApplyFromApp

### 退货的商品列表
	getRefundGoodsListByOrderIdFromApp

### 更新退款申请
	updateRefundApply



## 获取字典列表 
### getDictListByType