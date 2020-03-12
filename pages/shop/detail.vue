<template>
    <view @click.stop="goodsSortMask = false" class="container">
        <!-- 固定区域 begin -->
            <view class="titile">
                <fy-shopInfo :shopDetail="shopDetail"></fy-shopInfo>
            </view>
            <!-- 商品筛选 begin -->
                <view id="filter-wrap" :class="{'filter-wrap-fixed': filterWrap.fixed}" class="df jc-sa por bd-b filter-wrap">
                    <view @click="toggleCateMask(1)" :class="{current: navIndex === '0101'}" class="item">
                        <text>全部商品</text>
                        <text class="fyfont icon-down-hollow"></text>
                    </view>
                    <view @click="goodsPriceSort()" :class="{current: navIndex === '0102'}" class="df df-r item">
                        <text>销量</text>
                    </view>
                    <view @click="goodsIncomeSort()" :class="{current: navIndex === '0103'}" class="df df-r item">
                        <text>价格</text>
                        <view class="df df-c icon-box">
                            <text :class="{active: goodsSort === 5}" class="fyfont icon-up"></text>
                            <text :class="{active: goodsSort === 6}" class="fyfont icon-down"></text>
                        </view>
                    </view>
                </view>
            <!-- 商品筛选 end -->

            <!-- 商品列表 begin -->
            <view v-if="navIndex.substr(0, 2) === '01'" @scrolltolower="loadingGoodsMore()" scroll-y class="product-wrap goods-wrap">
                <view class="goods-list">
                    <view v-for="(item, index) in goodsList" :key="index" class="df por item">
                        <view class="por img-box">
                            <image :src="item.image" class="img"></image>
                        </view>
                        <view class="df1 df-c info">
                            <view class="clamp name">{{item.goodsName}}</view>
                            <view class="clamp type">
                                <text v-if="item.activity !== 0" class="activity">{{item.activity === 2 ? '拼团：' : item.activity === 3 ? '砍价：' : ''}}</text>
                                <template v-if="item.priceMax && item.priceMax > 0">
                                    <text class="type price-sm">{{item.priceMin}}~</text>
                                    <text class="type price-sm">{{item.priceMax}}</text>
                                </template>
                                <template v-else>
                                    <text class="type price-sm">{{item.priceMin}}</text>
                                </template>
                            </view>
                            <view class="clamp bonus">奖励：
                                <!-- {{item.proportion}}% -->
                                <template v-if="item.priceMax && item.priceMax > 0">
                                    ￥{{item.proportionPriceMin}}~￥{{item.proportionPriceMax}}
                                </template>
                                <template v-else>￥{{item.proportionPriceMin}}</template>
                            </view>
                            <button @click="shareGoods(item.goodsId)" class="poa btn">分享</button>
                        </view>
                    </view>
                </view>
                <fy-loadMore :status="loadingGoodsType"></fy-loadMore>
            </view>
            <!-- 商品列表 end -->

            <!-- 优惠券列表 begin -->
            <view v-if="navIndex.substr(0, 2) === '02'" @scrolltolower="loadingCouponMore()" scroll-y class="product-wrap">
                <view class="coupon-list">
                    <view v-for="(item, index) in couponList" :key="index" class="df item">
                        <view class="df df-c price-box">
                            <template>
                                <text v-if="item.type === 3" class="discount">{{item.money}}</text>
                                <text v-else class="price">{{item.money}}</text>
                            </template>
                            <template>
                                <text v-if="item.type === 1" class="condition">满{{item.upMoney}}元可用</text>
                                <text v-else-if="item.type === 2" class="condition">无门槛券</text>
                                <text v-else class="condition">折扣券</text>
                            </template>
                        </view>
                        <view class="df1 df df-r info">
                            <view class="df1 content">
                                <view class="name">{{item.name}}</view>
                                <view class="date">{{item.usrTime}}</view>
                            </view>
                            <view @click.stop="shareCoupon(item.couponId)"  class="df df-c share-btn">
                                <text>立即</text>
                                <text>分享</text>
                            </view>
                        </view>
                    </view>
                </view>
                <fy-loadMore :status="loadingCouponType"></fy-loadMore>
            </view>
            <!-- 优惠券列表 end -->
            
            <!-- 店铺二维码 begin -->
            <view v-if="navIndex.substr(0, 2) === '03'" class="share-wrap">
                <template v-if="qrShow">
                    <view class="df df-c qr-box">
                        <image :src="poster.finalPath" mode="widthFix" class="img" show-menu-by-longpress></image>
                    </view>
                    <view class="tac desc">长按图片选择发送好友进行分享</view>
                </template>
                <view class="hideCanvasView">
                    <canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
                </view>
            </view>
            <!-- 店铺二维码 end -->

        <!-- 底部关注店铺按钮 begin -->
        <view v-if="shopDetail.attention === 0" class="pof footer">
            <button @click="onFollowShop()" class="btn">收藏店铺</button>
        </view>
        <!-- 底部关注店铺按钮 end -->

        <!-- 分类列表 begin -->
		<view class="cate-mask" :class="cateTypeMask || ''" @click="toggleCateMask()">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<view scroll-y class="cate-list">
						<view 
							@click.stop="selectedGoodsType(item)"
							v-for="(item, index) in shopDetail.goodsType" :key="index" 
							class="cate-item b-b" 
							:class="{active: item.typeId === goodsTypeItem.id}">
							{{item.typeName}}
						</view>
				</view>
			</view>
		</view>
        <!-- 分类列表 end -->
    </view>
</template>

<script>
    import { getShop, attentionShop } from '@/hub/api/shop';
    import { getGoodsList } from '@/hub/api/goods';
    import { getShare } from '@/hub/api/share';
    import { getCouponList } from '@/hub/api/coupon';
    import fyLoadMore from '@/components/loadMore';
    import fyShopInfo from '@/components/shopInfo';
    import _app from '@/utils/QS-SharePoster/app.js';
    import {
        getSharePoster
    } from '@/utils/QS-SharePoster/QS-SharePoster.js';
    let goodsCurrentPage = 1, couponCurrentPage = 1;
    export default {
        components: {
            fyShopInfo,
            fyLoadMore
        },
        data() {
            return {
                filterWrap: {
                    top: 0,   //  商品筛选元素距离顶部距离
                    fixed: false
                },
                showMask: false,    // 为关注弹窗
                navIndex: '0101',   // '0101': 全部; '0102': 价格 '0103': 奖励; '0104': '全部'; '0201': '优惠券'; '0301': 店铺
                goodsSort: '1', // 排序状态
                goodsSortName: '全部商品',
                shopDetail: {},
                goodsList: [],
                goodsTypeItem: {
                    id: '',
                    name: '全部'
                },
                goodsSortList: [
                    {
                        sort: 1,
                        name: '最新上架'
                    },
                    {
                        sort: 2,
                        name: '价格降序'
                    },
                    {
                        sort: 3,
                        name: '价格升序'
                    },
                    {
                        sort: 4,
                        name: '活动参与'
                    },
                ],
                couponList: [],
                loadingCouponType: 'more',
                loadingGoodsType: 'more',
                goodsSortMask: false,
                productStatus: 0,
                cateTypeMask: 'none',
                poster: {
                    finalPath: ''
                },
				qrShow: false,
				canvasId: 'default_PosterCanvasId'
            }
        },

        onLoad(option) {
            // this.shopId = option.shopId;
            this.shopId = "000888";
            this.getShopDetail();
            this.getGoodsList();
        },

        //加载更多
		async onReachBottom(){
            switch (this.navIndex.substr(0, 2)) {
                case '01':
                    this.loadingGoodsMore();
                    break;
                    
                case '02':
                    this.loadingCouponMore();
                    break;
            
                default:
                    break;
            }
		},

        onPageScroll(e) {
            if(e.scrollTop >= this.filterWrap.top) {
                this.filterWrap.fixed = true;
            } else {
                this.filterWrap.fixed = false;
            }
        },

        mounted() {
            setTimeout(() => {
                const filterWrap = uni.createSelectorQuery().select('#filter-wrap');
                filterWrap.boundingClientRect(res => {
                    console.log("节点离页面顶部的距离为" + res.top);
                    this.filterWrap.top = res.top;
                }).exec();
            }, 500);
        },

        methods: {


            // 价格升降序（未关注）
            goodsPriceSort() {
                this.goodsSortMask = false;
                goodsCurrentPage = 1;
                this.navIndex = '0102';
                this.goodsSort = this.goodsSort === 3 ? 2 : 3;
                this.getGoodsList();
            },
            
            // 奖励升降序（未关注）
            goodsIncomeSort() {
                this.goodsSortMask = false;
                goodsCurrentPage = 1;
                this.navIndex = '0103';
                this.goodsSort = this.goodsSort === 6 ? 5 : 6;
                this.getGoodsList();
            },

            selectAllGoods() {
                goodsCurrentPage = 1;
                if(this.navIndex === '0104') {
                    this.goodsSortMask = !this.goodsSortMask;
                    return;
                }
                this.navIndex = '0104';
                this.getGoodsList();
            },

            selectedGoodsSort(sortItem) {
                goodsCurrentPage = 1;
                this.goodsSort = sortItem.sort;
                this.goodsSortName = sortItem.name
                this.goodsSortMask = !this.goodsSortMask;
                this.getGoodsList();
            },

            selectedGoodsType(type) {
                console.log('type', type);
                goodsCurrentPage = 1;
                this.navIndex = '0101';
                this.goodsSort = 1;
                this.goodsTypeItem.id = type.typeId;
                this.goodsTypeItem.name = type.typeName;
                this.toggleCateMask();
                uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
                this.getGoodsList();
            },

            shareGoods(goodsId) {
                const shareData = JSON.stringify({
                    type: 1,
                    itemId: goodsId
                })
                this.navTo(`/pages/qr/qr?shareData=${shareData}`)
            },

            shareCoupon(couponId) {
                const shareData = JSON.stringify({
                    type: 2,
                    itemId: couponId
                })
                this.navTo(`/pages/qr/qr?shareData=${shareData}`)
            },

            getShopQr() {
                if(this.navIndex === '0301') return;
                this.navIndex = '0301';
                if(!!this.poster.finalPath) return;
                const propsData = {
                    type: 3,
                    itemId: this.shopId
                };
                getShare(propsData).then(res => {
                    this.shareShopQr(res.data)
                }).catch(error => {
                    console.log('error：getShareApi', error);
                    this.$api.showToast(error.resultInfo || '操作失败');
                })
                
            },

            getGoodsList() {
                this.productStatus = 0;
                this.loadingGoodsType = 'loading';
                const propsData = {
                    shopId: this.shopId,
                    other: this.goodsSort,
                    typeId: this.goodsTypeItem.id,
                    currentPage: goodsCurrentPage
                }
                getGoodsList(propsData).then(res => {
                    if(goodsCurrentPage === 1) {
                        this.goodsList = res.data.list;    
                    } else {
                        this.goodsList = this.goodsList.concat(res.data.list);
                    }

                    const noMore = this.goodsList.length >= res.data.total;
                    this.loadingGoodsType = noMore ? 'noMore' : 'more';
                }).catch(error => {
                    console.log('error：getGoodsList', error);
                    this.$api.showToast(error.resultInfo || '操作失败');
                })
            },

            onGetCouponList() {
                if(this.navIndex === '0201') return;
                this.getCouponList();
            },

            getCouponList() {
                this.loadingCouponType = 'loading';
                this.productStatus = 1;
                this.navIndex = '0201';
                const propsData = {
                    shopId: this.shopId,
                    currentPage: couponCurrentPage
                }
                getCouponList(propsData).then(res => {
                    if(couponCurrentPage === 1) {
                        this.couponList = res.data.list;
                    } else {
                        this.couponList = this.couponList.concat(res.data.list);
                    }
                    const noMore = this.couponList.length >= res.data.total;
                    this.loadingCouponType = noMore ? 'noMore' : 'more';
                }).catch(error => {
                    console.log('error：getCouponList', error);
                    this.$api.showToast(error.resultInfo || '操作失败');
                })
            },

            getShopDetail() {
                const propsData = {
                    shopId: this.shopId
                }
                getShop(propsData).then(res => {
                    this.shopDetail = res.data;
                    this.shopDetail.goodsType.unshift({typeId: '', typeName: '全部'});
                    this.navIndex = this.shopDetail.attention === 0 ? '0101' : '0104';
                    console.log('this.navIndex', this.navIndex);
                }).catch(error => {
                    console.log('error：getShop', error);
                    this.$api.showToast(error.resultInfo || '操作失败');
                })
            },

            
            // 关注店铺
            async onFollowShop() {
                if(!this.hasLogin) {
                    this.navTo('/pages/login/login');
                    return;
                }
                if(!this.incomeData.status !== 0) {
                    this.showMask = true;
                    return;
                }
                try {
                    await attentionShop({shopId: this.shopId});
                    await this.$api.showToast('关注成功');
                    this.getShopDetail();
                    this.getGoodsList();
                } catch (error) {
                    console.log('error', error);
                    this.$api.showToast(error.resultInfo || '操作失败');
                }
            },

            async shareShopQr(drawData = {}) {
                const sizeNum = 3;
				try {
					const draw = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						background: {
							width: 295 * sizeNum,
							height: 416 * sizeNum,
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
										type: 'text',
										text: this.userInfo.nickname,
										size: 18 * sizeNum,
										color: '#210900',
										textAlign: 'left',
										textBaseline: 'top',
                                        fontWeight: '500',
                                        infoCallBack(textLength) {
                                            return {
                                                dx: bgObj.width/2 - textLength/2,
                                                dy: 18 * sizeNum
                                            }
                                        },
										lineFeed: {
											maxWidth: 263 * sizeNum,
											lineNum: 1,
										},
                                    },
                                    {
										type: 'custom',
										setDraw(Context) {
											Context.setFillStyle('red');
											Context.setLineWidth(0.5);
											Context.beginPath();
											Context.moveTo(17 * sizeNum, 100 * sizeNum);//线条开始位置
											Context.lineTo(122 * sizeNum, 100 * sizeNum);//线条经过点
											Context.stroke();
											Context.closePath();
											
											Context.beginPath();
											Context.moveTo(173 * sizeNum, 100 * sizeNum);//线条开始位置
											Context.lineTo(280 * sizeNum, 100 * sizeNum);//线条经过点
											Context.stroke();
											Context.closePath();
											
											Context.beginPath();
											Context.moveTo(17 * sizeNum, 340 * sizeNum);//线条开始位置
											Context.lineTo(89 * sizeNum, 340 * sizeNum);//线条经过点
											Context.stroke();
											Context.closePath();
											
											Context.beginPath();
											Context.moveTo(209 * sizeNum, 340 * sizeNum);//线条开始位置
											Context.lineTo(280 * sizeNum, 340 * sizeNum);//线条经过点
											Context.stroke();
											Context.closePath();
										}
                                    },
                                    
                                    {
										type: 'image',
										url: this.userInfo.headImage || '/static/image/default_avatar.png',
										dWidth: 40 * sizeNum,
										dHeight: 40 * sizeNum,
										dx: 128 * sizeNum,
                                        dy: 78 * sizeNum,
                                        roundRectSet: {
                                            r: 40 * sizeNum
                                        }
									},
                                    
									{
										type: 'text',
										text: `我为${drawData.shopName}代言`,
										size: 12 * sizeNum,
										color: '#666',
										textAlign: 'left',
                                        textBaseline: 'top',
                                        infoCallBack(textLength) {
                                            return {
                                                dx: bgObj.width/2 - (textLength/2),
                                                dy: 49 * sizeNum
                                            }
                                        },
										lineFeed: {
											maxWidth: 263 * sizeNum,
											lineNum: 1,
										},
									},
									
									// {
									// 	type: 'qrcode',
									// 	size: 150 * sizeNum,
									// 	dx: 73 * sizeNum,
									// 	dy: 148 * sizeNum
                                    // },
                                    {
										type: 'image',
										url: drawData.qrUrl || '/static/image/default_avatar.png',
										dWidth: 150 * sizeNum,
										dHeight: 150 * sizeNum,
										dx: 73 * sizeNum,
										dy: 148 * sizeNum,
									},
                                    {
										type: 'text',
										text: '扫描或长按二维码',
										size: 12 * sizeNum,
										color: '#999',
										textAlign: 'left',
                                        textBaseline: 'top',
                                        dx: 100 * sizeNum,
                                        dy: 333 * sizeNum,
										lineFeed: {
											maxWidth: 96 * sizeNum,
											lineNum: 1,
										},
                                    },
                                    {
										type: 'image',
										url: drawData.shopImage || '/static/image/default_avatar.png',
										dWidth: 40 * sizeNum,
										dHeight: 40 * sizeNum,
										dx: 20 * sizeNum,
										dy: 360 * sizeNum,
									},
                                    {
										type: 'text',
										text: '扫码有惊喜，好店在这里',
                                        size: 16 * sizeNum,
                                        fontWeight: '600',
										color: '#CB8768',
										textAlign: 'left',
                                        textBaseline: 'top',
                                        infoCallBack(textLength) {
                                            return {
                                                dx: 72 * sizeNum,
                                                dy: 370 * sizeNum
                                            }
                                        },
										lineFeed: {
											maxWidth: 263 * sizeNum,
											lineNum: 1,
										},
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
                    this.poster.finalPath = draw.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
                    console.log(JSON.stringify(e));
                }
            },

            loadingGoodsMore() {
                console.log('this.loadingGoodsType', this.loadingGoodsType);
                if(this.loadingGoodsType !== 'more') return;
                goodsCurrentPage++;
                this.getGoodsList();
            },
            
            loadingCouponMore() {
                console.log('this.loadingCouponType', this.loadingCouponType);
                if(this.loadingCouponType !== 'more') return;
                couponCurrentPage++;
                this.getCouponList();
            },

            /**
             * 商品类型 mask 开关
             * @param { Number } type // null:隐藏; 1:显示;
             */
            toggleCateMask(type = null) {
                this.cateTypeMask = '';
                const timer = type === 1 ? 10 : 300;
				const state = type === 1 ? 'show' : 'none';
				setTimeout(()=>{
					this.cateTypeMask = state;
				}, timer)
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@/static/styles/promptMask.scss';
@import '@/static/styles/filterTab.scss';
@import '@/static/styles/cateMast.scss';
.container {
    background-color: #F7F8FA;
}

// .fixed-wrap {
//     z-index: 999;
//     top: 0;
//     right: 0;
//     left: 0;
// }

// .move-wrap {
//     padding-top: 416rpx;
// }

.price-sm::before {
    content: '￥';
    font-size: 20rpx;
    color: #333;
}

.bonus-wrap {
    padding: 32rpx 0 36rpx;
    background-color: #F7F8FA;
    .hr{
        height: 64rpx;
        width: 2rpx;
        // color: rgba(0, 0, 0, .1);
        background: rgba(0, 0, 0, .1);
    }
    .item {
        .name {
            margin-bottom: 16rpx;
            font-size: 24rpx;
            color: #666;
        }
        .num {
            font-size: 28rpx;
            color: #333;
        }
    }
}


.product-wrap {
    padding-top: 42rpx;
}

.goods-wrap {
    background: #fff;
    // height: 1030rpx;
    overflow: hidden;
    .goods-list {
        background-color: #fff;
        margin: 0 40rpx;
        .item {
            margin-bottom: 32rpx;
            .img-box {
                width: 160rpx;
                height: 160rpx;
                margin-right: 24rpx;
                border-radius: 24rpx;
                overflow: hidden;
                .img {
                    width: 100%;
                    height: 100%;
                    background-color: #ccc;
                }
            }
            .info {
                .name {
                    width: 460rpx;
                    margin-bottom: 16rpx;
                    font-size: 30rpx;
                    color: #333;
                }
                .type {
                    .activity {
                        font-size: 24rpx;
                        color: #FF7C40;
                    }
                    width: 460rpx;
                    margin-bottom: 32rpx;
                    font-size: 26rpx;
                    color: #666;
                }
                .bonus {
                    width: 300rpx;
                    font-size: 24rpx;
                    color: #666;
                }
            }
            .btn {
                right: 0;
                bottom: 0;
                width: 160rpx;
                height: 64rpx;
                line-height: 64rpx;
                border-radius: 40rpx;
                font-size: 26rpx;
                color: #C8A591;
                background-color: #fff;
                border: 2rpx solid #D5C7BC;
            }

            .btn-full {
                color: #fff;
                background-color: #D5C7BC;
            }

        }
    }
}

// 优惠券
.product-wrap {
    .coupon-list {
        margin: 0 32rpx;
        .item {
            border-radius: 16rpx;
            overflow: hidden;
            height: 176rpx;
            margin-bottom: 32rpx;
            box-shadow:0 2rpx 20rpx rgba(0,0,0,0.08);
            .price-box {
                width: 170rpx;
                height: 100%;
                background-color: #fff;
                border-radius: 0 16rpx 16rpx 0;
                border-right: 2rpx dashed #e2e2e2;
                .price, .discount {
                    margin-bottom: 12rpx;
                    font-size: 48rpx;
                    font-weight: bold;
                    color: #FF5353;
                }
                .price::after {
                    content: ' 元';
                    font-size: 24rpx;
                    color: #FF5353;
                }
                .discount::after {
                    content: ' 折';
                    font-size: 24rpx;
                    color: #FF5353;
                }
                .condition {
                    font-size: 20rpx;
                    color: #808080;
                }
            }
            .info {
                height: 100%;
                background-color: #fff;
                padding: 0 24rpx;
                border-radius: 16rpx 0 0 16rpx;
                .content {
                    .name {
                        font-size: 30rpx;
                        color: #333;
                        font-weight: 600;
                        margin: 0 40rpx 32rpx 0;
                    }
                    .date {
                        font-size: 20rpx;
                        color: #999;
                    }
                }
                .share-btn {
                    width: 128rpx;
                    height: 128rpx;
                    font-weight: 600;
                    background-color: #E9D5CC;
                    border-radius: 16rpx;
                    font-size: 30rpx;
                    color: #210900;
                }
            }
        }
    }
}

.share-wrap {
    margin-top: 82rpx;
    .qr-box {
        margin-bottom: 48rpx;
        .img {
            width: 590rpx;
            height: 832rpx;
            box-shadow: 0 2rpx 32rpx rgba(0,0,0,0.1);
            border-radius: 4rpx;
        }
    }
    .desc {
        font-size: 28rpx;
        color: #666;
    }
}

.footer {
    left: 0;
    right: 0;
    bottom: 0;
    height: 100rpx;
    .btn {
        width: 100%;
        height: 100%;
        background-color: #CB8768;
        font-size: 36rpx;
        color: #fff;
        font-weight: 500;
        border-radius: 0;
    }
}

</style>