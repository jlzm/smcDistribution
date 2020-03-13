<template>
    <view class="container">
        <template v-if="qrShow">
            <view class="df df-c qr-box">
                <image :src="poster.finalPath" mode="widthFix" class="img" show-menu-by-longpress></image>
            </view>
            <view class="tac desc">长按图片选择发送好友进行分享</view>
        </template>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width || 0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
    </view>
</template>

<script>
    import { getShare } from '@/hub/api/share';
    import _app from '@/utils/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/utils/QS-SharePoster/QS-SharePoster.js';
    export default {
        data() {
			return {
                sizeNum: 3,
				poster: {},
                qrShow: false,
                shareData: {},
				canvasId: 'default_PosterCanvasId'
			}
        },
        onLoad(option) {
            this.shareData = JSON.parse(option.shareData);
            this.setPageTitle();
            this.getShopQr();
        },
        methods: {
            setPageTitle() {
                let title = '';
                if(this.shareData.type === 1) {
                    title = '购买商品';
                } else {
                    title = '推广优惠券';
                }
                uni.setNavigationBarTitle({ title })
            },

            async getShopQr() {
                if(!!this.poster.finalPath) return;
                const propsData = {
                    type: this.shareData.type,
                    itemId: this.shareData.itemId
                };

                //  const shareData = await getShare(propsData).then(res => {
                //     if(this.shareData.type === 1) {
                //         this.shareGoods(res.data);
                //     } else {
                //         this.shareCoupon(res.data);
                //     }
                 
                try {
                    const res = await getShare(propsData);
                    console.log('res', res);
                    if(this.shareData.type === 1) {
                        this.shareGoods(res.data);
                    } else {
                        this.shareCoupon(res.data);
                    }
                } catch (error) {
                    console.log('error：getShareApi', error);
                    await this.$api.showToast(error.resultInfo || '操作失败');
                    uni.navigateBack();
                }
                
            },
            
            async shareGoods(drawData = {}) {
                const sizeNum = this.sizeNum;
                let activityTxt =  '';

                if(drawData.activity === 3) {
                    activityTxt = `砍价价格：`;
                } else if(drawData.activity === 2) {
                    activityTxt = `${drawData.activityPeople}人拼团价：`;
                }
				try {
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						background: {
							width: 343 * sizeNum,
							height: 520 * sizeNum,
							backgroundColor: '#fff'
						},
						posterCanvasId: this.canvasId,
						delayTimeScale: 20, //延时系数
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							return new Promise((rs, rj) => {
								rs([
									{
										type: 'image',
										url: drawData.goodsImage || '/static/image/testBg.png',
										dWidth: 319 * sizeNum,
										dHeight: 319 * sizeNum,
										dx: 12 * sizeNum,
										dy: 12 * sizeNum,
									},
									{
										type: 'text',
										text: drawData.goodsName,
										size: 18 * sizeNum,
										color: '#210900',
										textAlign: 'left',
										textBaseline: 'top',
										fontWeight: '600',
										lineFeed: {
											maxWidth: 319 * sizeNum,
											lineNum: 2 * sizeNum,
											lineHeight: 26 * sizeNum
										},
										infoCallBack(textLength) {
											return {
												dx: 12 * sizeNum,
												dy: 351 * sizeNum
											}
										}
									},
									{
										type: 'text',
										text: activityTxt,
										size: 10 * sizeNum,
										color: '#FF5353',
										textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 319 * sizeNum,
											lineNum: 1,
										},
										infoCallBack(textLength) {
											return {
												dx: 12 * sizeNum,
												dy: 435 * sizeNum
											}
										}
									},
									{
										type: 'text',
										text: '￥',
										size: 13 * sizeNum,
										color: '#FF5353',
										textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 319 * sizeNum,
											lineNum: 1,
										},
										infoCallBack(textLength) {
											return {
												dx: 12 * sizeNum,
												dy: 457 * sizeNum
											}
										}
                                    },
                                    {
										type: 'text',
										text: `${drawData.activityPrice || drawData.price}`,
										size: 20 * sizeNum,
										color: '#FF5353',
										textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 319 * sizeNum,
										},
										infoCallBack(textLength) {
											return {
												dx: 25 * sizeNum,
												dy: 452 * sizeNum
											}
										}
									},
									{
										type: 'text',
										text: drawData.activity !== 0 ? `商品原价：￥${drawData.price}` : '',
										size: 12 * sizeNum,
										color: '#666666',
										textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 319 * sizeNum,
											lineNum: 1,
										},
										infoCallBack(textLength) {
											return {
												dx: 12 * sizeNum,
												dy: 495 * sizeNum
											}
										}
                                    },
                                    {
										type: 'image',
										url: drawData.qrUrl,
										dWidth: 88 * sizeNum,
										dHeight: 88 * sizeNum,
                                        infoCallBack(textLength) {
											return {
												dx: 236 * sizeNum,
                                                dy: 404 * sizeNum,
											}
										}
                                    },
                                    {
										type: 'text',
										text: '长按二维码购买',
										size: 10 * sizeNum,
										color: '#666666',
										textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 319 * sizeNum,
											lineNum: 1,
										},
										infoCallBack(textLength) {
											return {
												dx: 245 * sizeNum,
												dy: 498 * sizeNum
											}
										}
                                    },
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						},
					});
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
                    console.log('e', e);
					_app.hideLoading();
                    await this.$api.showToast(JSON.stringify(e));
                    uni.navigateBack();
					console.log(JSON.stringify(e));
				}
            },
            
            async shareCoupon(drawData = {}) {
                const sizeNum = this.sizeNum;
                let untilX = 0;
                let couponMoney = '';
                let couponType =  '';
                if(drawData.couponType === 1) {
                    couponType = `满${drawData.couponUpMoney}元可用`;
                } else if(drawData.couponType === 2) {
                    couponType = '无门槛券';
                } else {
                    couponMoney = `${drawData.couponMoney}折`;
                    couponType = '折扣券';
                }
				try {
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						background: {
							width: 343 * sizeNum,
							height: 506 * sizeNum,
							backgroundColor: '#E9D5CC'
						},
						posterCanvasId: this.canvasId,
						delayTimeScale: 20, //延时系数
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							return new Promise((rs, rj) => {
								rs([
									{
										type: 'image',
										url: drawData.shopImage,
										dWidth: 48 * sizeNum,
										dHeight: 48 * sizeNum,
										dx: 148 * sizeNum,
                                        dy: 16 * sizeNum,
                                        roundRectSet: {
                                            r: 48 * sizeNum
                                        }
									},
									{
										type: 'text',
										text: drawData.shopName,
										size: 18 * sizeNum,
										color: '#210900',
										textAlign: 'left',
										textBaseline: 'top',
										fontWeight: '600',
										lineFeed: {
											maxWidth: 319 * sizeNum,
											lineNum: 1,
										},
										infoCallBack(textLength) {
											return {
												dx: bgObj.width/2 - textLength/2,
												dy: 80 * sizeNum
											}
										}
                                    },
                                    {
										type: 'image',
										url: '/static/image/coupon_bg.png',
										dWidth: 319 * sizeNum,
										dHeight: 375 * sizeNum,
										dx: 12 * sizeNum,
                                        dy: 119 * sizeNum,
									},
									{
										type: 'text',
										text: drawData.couponName,
										size: 18.5 * sizeNum,
										color: '#fff',
										textAlign: 'left',
                                        textBaseline: 'top',
                                        fontWeight: '600',
										lineFeed: {
											maxWidth: 319 * sizeNum,
											lineNum: 1,
										},
										infoCallBack(textLength) {
											return {
												dx: bgObj.width/2 - textLength/2,
												dy: 151 * sizeNum
											}
										}
									},
									{
										type: 'text',
										text: `${drawData.couponMoney}`,
										size: 36 * sizeNum,
										color: '#fff',
										textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 280 * sizeNum,
											lineNum: 1
										},
										infoCallBack(textLength) {
                                            untilX = bgObj.width/2 + textLength/2;
											return {
												dx: bgObj.width/2 - textLength/2,
												dy: 185 * sizeNum
											}
										}
                                    },
									{
										type: 'text',
										text: drawData.couponType === 3 ? '折' : '元',
										size: 16 * sizeNum,
										color: '#fff',
										textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 280 * sizeNum,
											lineNum: 1
										},
										infoCallBack(textLength) {
											return {
												dx: untilX,
												dy: 201 * sizeNum
											}
										}
                                    },
									{
										type: 'text',
										text: couponType,
										size: 12 * sizeNum,
										color: '#fff',
										textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 319 * sizeNum,
											lineNum: 2 * sizeNum,
											lineHeight: 26 * sizeNum
										},
										infoCallBack(textLength) {
											return {
												dx: bgObj.width/2 - textLength/2,
												dy: 232 * sizeNum
											}
										}
                                    },
									{
										type: 'text',
										text: `使用日期：${drawData.couponUsrTime}`,
										size: 12 * sizeNum,
										color: '#999',
										textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 319 * sizeNum,
											lineNum: 2 * sizeNum,
											lineHeight: 26 * sizeNum
										},
										infoCallBack(textLength) {
											return {
												dx: bgObj.width/2 - textLength/2,
												dy: 274 * sizeNum
											}
										}
                                    },
                                    {
										type: 'image',
										url: drawData.qrUrl,
										dWidth: 100 * sizeNum,
										dHeight: 100 * sizeNum,
										dx: 118 * sizeNum,
										dy: 329 * sizeNum,
                                    },
                                    {
										type: 'text',
										text: '长按二维码领取',
										size: 12 * sizeNum,
										color: '#666666',
										// textAlign: 'left',
										textBaseline: 'top',
										lineFeed: {
											maxWidth: 84 * sizeNum,
											lineNum: 1
										},
										infoCallBack(textLength) {
											return {
												dx: bgObj.width/2 - textLength/2,
												dy: 445 * sizeNum
											}
										}
                                    },
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
                            this.poster = bgObj;
						},
					});
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
                    await this.$api.showToast(JSON.stringify(e));
                    uni.navigateBack();
					console.log(JSON.stringify(e));
				}
        },
    },
	}
</script>

<style lang="scss" scoped>
.qr-box {
    width: 100%;
    padding: 32rpx 32rpx 60rpx;
    .img {
        background: #fff;
        border-radius: 4rpx;
        box-shadow: 0 2rpx 32rpx rgba(0,0,0,0.1);
        width: 100%;
        height: 1012rpx;
        background: #ccc;
    }
}

.desc {
    font-size: 28rpx;
    color: #666;
}
</style>