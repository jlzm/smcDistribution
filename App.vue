<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		onLaunch: function() {
            console.log('App Launch')
            const userInfo = uni.getStorageSync('userInfo') || '';
			if (userInfo.distributorId) {
				//更新登陆状态
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.saveLoginInfo(res.data);
					}
				});
            }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
        },
        methods: {
            ...mapMutations(['saveLoginInfo']),
        },
	}
</script>

<style lang="scss">
// 字体图标
@import '@/common/styles/fyfont.scss';


	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
    }
    
    button {
        // line-height: 1.1;
        // background-color: #fff;
        margin: 0;
        font-weight: normal;
        &::after {
            border: 0;
        }
        &::before {
            border: 0;
        }
        &.no-border:before,
        &.no-border:after {
            border: 0;
        }
	}

    page, .container {
        height: 100%;
        background-color: $fy-bg-color;
    }


    .pop {
        position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 998;
		background-color: rgba(0, 0, 0, .5);
    }

    .hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999rpx;
		left: -99999rpx;
		z-index: -99999;
	}


	/*每个页面公共css */
    	/* flex区域 start */
	.df {
		display: flex;
		align-items: center;
	}

	.df-c {
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.df-r {
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.df-w {
		flex-wrap: wrap;
	}

	.fw-w {
		flex-wrap: wrap;
	}

	.jc-fs {
		justify-content: flex-start;
	}

	.jc-c {
		justify-content: center;
	}

	.jc-sb {
		justify-content: space-between;
	}

	.jc-sa {
		justify-content: space-around;
	}
	.jc-fe {
		justify-content: flex-end;
	}

	.df1 {
		flex: 1;
	}

	.ai-sf {
		align-items: flex-start;
	}

    .ai-c {
        align-items: center;
    }

	.df-sa {
		justify-content: space-around;
	}

	/* flex区域 end */

	/* 首行缩进 */
	.ti2 {
		text-indent: 2em;
	}

	// 中划线
	.tdl {
		text-decoration: line-through;
	}

	/*单行超出省略*/
    .clamp {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
	}

	.clamp2 {
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
        display: block;
	}

	.hv-cp {
		cursor: pointer;
	}

	/* 强制换行 */
	.txt-wrap {
		word-wrap: break-word;
	}

	.tac {
		text-align: center;
	}

	.tar {
		text-align: right;
	}

	/* 容器 start */
	.db {
		display: block;
	}

	.di {
		display: inline;
	}

	.dib {
		display: inline-block;
	}

	/* 容器 end */

	/* 对齐方式 start */
	.vam {
		vertical-align: middle;
	}

	.vat {
		vertical-align: top;
	}

	.vab {
		vertical-align: bottom;
	}

	/* 对齐方式 end */


	/* 边框 start */
	.bd {
		border: 2rpx solid #EBEBEB;
	}
	
	.bd-b {
		border-bottom: 2rpx solid #EBEBEB;
	}

	.bd-r {
		border-right: 2rpx solid #EBEBEB;
	}

	.bd-l {
		border-left: 2rpx solid #EBEBEB;
	}

	.bd-t {
		border-top: 2rpx solid #EBEBEB;
	}

	/* 边框 end */


	/* 清除空格 */
	.c-sp {
		font-size: 0;
	}

	.round {
		border-radius: 50%;
	}

	/* 定位 start */
	.poa {
		position: absolute;
	}

	.por {
		position: relative;
	}

	.pos {
		position: static;
	}

	.pof {
		position: fixed;
	}

	/* 定位 end */
</style>
