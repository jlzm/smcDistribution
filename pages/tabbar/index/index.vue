<template>
    <view class="container">
        <view class="header">
            <fy-userInfo :incomeData="incomeData"></fy-userInfo>
        </view>
        <view class="content">
            <view v-if="!!followList.length" class="follow-wrap">
                <view class="wrap-title">我的关注（{{followList.length}}）</view>
                <scroll-view @scrolltolower="loadingFollowMore()" scroll-x>
                    <view class="df df-r jc-fs follow-list">
                        <view @click="navTo(`/pages/shop/detail?shopId=${item.shopId}`)" v-for="(item, index) in followList" :key="index" class="item">
                            <image :src="item.image" class="img"></image>
                            <view class="clamp tac name">{{item.shopName}}</view>
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view v-if="!!shopList.length" class="shop-wrap">
            <!-- 商店筛选 begin -->
                <view id="filter-wrap" :class="{'filter-wrap-fixed': filterWrap.fixed}" class="df jc-sa por bd-b filter-wrap">
                    <view @click="toggleCateMask(1)" :class="{current: navIndex === '0101'}" class="item">
                        <text>全部商店</text>
                        <text class="fyfont icon-down-hollow"></text>
                    </view>
                    <view @click="goodsPriceSort()" :class="{current: navIndex === '0102'}" class="df df-r item">
                        <text>配送范围内</text>
                    </view>
                    <view @click="goodsIncomeSort()" :class="{current: navIndex === '0103'}" class="df df-r item">
                        <text>配送距离</text>
                        <view class="df df-c icon-box">
                            <text :class="{active: goodsSort === 5}" class="fyfont icon-up"></text>
                            <text :class="{active: goodsSort === 6}" class="fyfont icon-down"></text>
                        </view>
                    </view>
                </view>
            <!-- 商店筛选 end -->
                <view class="shop-list">
                    <view @click="navTo(`/pages/shop/detail?shopId=${item.shopId}`)" v-for="(item, index) in shopList" :key="index" class="df por item">
                        <view class="por img-box">
                            <image :src="item.image" class="img"></image>
                            <view class="poa tac follow">{{item.attentionNumber}}人关注</view>
                        </view>
                        <view class="df1 df-c info">
                            <view class="clamp name">{{item.shopName}}</view>
                            <view class="clamp type">分类：{{item.sort}}</view>
                            <view class="clamp bonus">奖励：{{item.proportionMin}}% ~ {{item.proportionMax}}%</view>
                        </view>
                        <template>
                            <button @click.stop="onFollowShop(item.shopId)" v-if="item.attention === 0" class="poa df df-r btn btn-full">关注</button>
                            <button v-else class="poa df df-r btn">已关注</button>
                        </template>
                    </view>
                </view>
            </view>
        </view>
        <!-- 弹出层 begin -->
        <view v-if="showMask" class="df df-c pop prompt-mask">
            <template v-if="!hasLogin || incomeData.status !== 0">
                <view class="df df-c prompt">
                    <text class="name">提示</text>
                    <text class="desc">你还不是会员，申请成为会员，关注商家分享推广拿奖励</text>
                    <button @click.stop="navTo('/pages/application/step')" class="btn">立即申请</button>
                </view>
            </template>
            <template v-else>
                <view class="df df-c prompt">
                    <text class="name">关注成功</text>
                    <text class="desc">马上去分享推广吧</text>
                    <button @click.stop="toShare()" class="btn">分享推广</button>
                </view>
            </template>
            <text @click="showMask = false" class="fyfont icon-close"></text>
        </view>
        <!-- 弹出层 end -->
        <!-- 分类弹出层列表 begin -->
		<view class="cate-mask" :class="cateTypeMask || ''" @click="toggleCateMask()">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<view scroll-y class="cate-list">
						<view 
							@click.stop="selectedGoodsType(item)"
							v-for="(item, index) in shopTypeList" :key="index" 
							class="cate-item b-b" 
							:class="{active: item.typeId === goodsTypeItem.id}">
							{{item.typeName}}
						</view>
				</view>
			</view>
		</view>
        <!-- 分类弹出层列表 end -->
    </view>
</template>

<script>
import { getShopList, attentionShop, getMyAttentionList, getShop } from '@/hub/api/shop';
import { getDistributor } from '@/hub/api/user';
import fyUserInfo from '@/components/userInfo';
import fyLoadMore from '@/components/loadMore';
import { mapMutations } from "vuex";
let shopCurrentPage = 1, 
        followCurrentPage = 1;
    export default {
        components: {
            fyUserInfo,
            fyLoadMore
        },
        data() {
            return {
                shopTypeList: [
                    {
                        typeName: '家用电器',
                        typeId: 1
                    },
                    {
                        typeName: '化妆品',
                        typeId: 2
                    },
                    {
                        typeName: '便利店',
                        typeId: 3
                    },
                    {
                        typeName: '化肥种子',
                        typeId: 4
                    },
                    {
                        typeName: '农具机械',
                        typeId: 5
                    },
                ], // 商品类别列表
                cateTypeMask: 'none',
                navIndex: '0101',   // '0101': 全部; '0102': 价格 '0103': 奖励; '0104': '全部'; '0201': '优惠券'; '0301': 店铺
                loadingType: 'more',
                shopId: '',
                showMask: false,
                followList: [],
                shopList: [],
            }
        },
        async onLoad() {
            this.initLoading();
        },

        onShow() {
            this.getDistributor();
        },

        async onPullDownRefresh() {
            Object.assign(this.$data, this.$options.data()); 
            this.initLoading();
            this.getDistributor();
        },

        //加载更多
		async onReachBottom(){
            console.log('this.loadingType', this.loadingType);
            if(this.loadingType !== 'more') return;
            shopCurrentPage++;
            this.getShopList();
		},

        onShareAppMessage(res) {
            return {
                title: '微米享',
                path: '/pages/tabbar/index/index'
            }
        },
        
        methods: {
            ...mapMutations(['saveIncomeData']),
            /**
             * 店铺类别 mask 开关
             * @param { Number } type // null:隐藏; 1:显示;
             */
            toggleCateMask(type = null) {
                this.cateTypeMask = '';
                const timer = type === 1 ? 10 : 300;
				const state = type === 1 ? 'show' : 'none';
				setTimeout(()=>{
					this.cateTypeMask = state;
				}, timer)
            },

            toShare() {
                this.navTo(`/pages/shop/detail?shopId=${shopId}`);
                this.showMask = false;
            },

            async initLoading() {
                await this.getFollowList();
                await this.getShopList();
                uni.stopPullDownRefresh();
            },

            getDistributor() {
                return getDistributor().then(res => {
                    this.saveIncomeData(res.data);
                }).catch(error => {
                    console.log('error', error);
                })
            },

            loadingFollowMore() {
                console.log('this.loadingType', this.loadingType);
                if(this.loadingType !== 'more') return;
                followCurrentPage++;
                this.getFollowList();
            },

            // 获取商铺列表
            getShopList() {
                this.loadingType = 'loading';
                const propsData = {
                    currentPage: shopCurrentPage
                };
                return getShopList(propsData).then(res => {
                    if(shopCurrentPage === 1) {
                        this.shopList = res.data.list;
                    } else {
                        this.shopList = this.shopList.concat(res.data.list);
                    }
                    const noMore = this.shopList.length >= res.data.total;
                    this.loadingType = noMore ? 'noMore' : 'more';
                }).catch(error => {
                    console.log('error', error);
                })
            },

            // 获取关注列表
            getFollowList() {
                this.loadingType = 'loading';
                const propsData = {
                    currentPage: followCurrentPage
                };
                return getMyAttentionList(propsData).then(res => {
                    if(shopCurrentPage === 1) {
                        this.followList = res.data.list;
                    } else {
                        this.followList = this.followList.concat(res.data.list);
                    }
                    const noMore = this.shopList.length >= res.data.total;
                    this.loadingType = noMore ? 'noMore' : 'more';
                }).catch(error => {
                    console.log('error', error);
                })
            },

            async onFollowShop(shopId) {
                if(!this.hasLogin) {
                    this.navTo('/pages/login/login');
                    return;
                }
                if(this.incomeData.status !== 0) {
                    this.showMask = true;
                    return;
                }
                try {
                    this.shopId = shopId;
                    await attentionShop({shopId});
                    await this.initLoading();
                    this.showMask = true;
                } catch (error) {
                    console.log('error', error);
                    this.$api.showToast(error.resultInfo || '操作失败');
                }
            },
        },

    }
</script>

<style lang="scss" scoped>
@import '@/static/styles/goodsList.scss';
@import '@/static/styles/promptMask.scss';
@import '@/static/styles/filterTab.scss';
@import '@/static/styles/cateMast.scss';



.container {
    background-color: #fff;
}

.header {
    margin-bottom: 48rpx;
}

.content {
    .wrap-title {
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 32rpx;
        color: #333;
    }
    .follow-wrap {
        margin: 0 0 48rpx 40rpx;
        .follow-list {
            .item {
                margin-right: 20rpx;
                width: 96rpx;
                .img {
                    width: 100%;
                    height: 96rpx;
                    margin-bottom: 12rpx;
                    border-radius: 16rpx;
                }
                .name {
                    font-size: 20rpx;
                    color: #666;
                }
            }
        }
    }
}
</style>