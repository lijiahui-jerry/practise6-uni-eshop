<template>
    <view class="goods-detail-box" v-if="goods_info.goods_name">
        <swiper indicator-dots circular>
            <swiper-item v-for="(item, index) in goods_info.pics" :key="item.pics_id">
                <image :src="item.pics_big" @click="preview(index)" />
            </swiper-item>
        </swiper>

        <view class="goods-info-box">
            <view class="price">￥{{ goods_info.goods_price }}</view>
            <view class="price-info-body">
                <view class="goods-name"> {{ goods_info.goods_name }}</view>
                <view class="favi">
                    <uni-icons type="star" color="gray" size="18" />
                    <text>收藏</text>
                </view>
            </view>
            <view class="yf"> 快递：免运费 </view>
        </view>

        <rich-text :nodes="goods_info.goods_introduce" />

        <view class="goods-nav">
            <uni-goods-nav fill="false" :options="options" :button-group="buttonGroup" @click="onClick"
                @buttonClick="buttonClick" />
        </view>
    </view>
</template>

<script>
    export default {
        methods: {
            onClick( e ) {
                if ( e.content.text === '购物车' ) {
                    uni.switchTab( {
                        url: '/pages/cart/cart'
                    } )
                }
            },
            preview( index ) {
                uni.previewImage( {
                    current: index,
                    urls: this.goods_info.pics.map( ( i ) => i.pics_big ),
                } );
            },
            async getGoodsList( goods_id ) {
                let {
                    data: res
                } = await uni.$http.get(
                    "https://api-ugo-web.itheima.net/api/public/v1/goods/detail", {
                        goods_id,
                    }
                );
                console.log( res );
                if ( res.meta.status !== 200 ) {
                    return uni.$showMsg( res.meta.msg );
                } else {
                    res.message.goods_introduce = res.message.goods_introduce
                        .replace( /<img /g, "<img style='display:block;' " )
                        .replace( /webp/g, "jpg" );
                    this.goods_info = res.message;
                }
            },
        },
        data() {
            return {
                goods_info: {},
                options: [ {
                        icon: "shop",
                        text: "店铺",
                        infoBackgroundColor: "#ff0000",
                        infoColor: "#fff",
                    },
                    {
                        icon: "cart",
                        text: "购物车",
                        info: 2,
                    },
                ],
                buttonGroup: [ {
                        text: "加入购物车",
                        backgroundColor: "#ff0000",
                        color: "#fff",
                    },
                    {
                        text: "立即购买",
                        backgroundColor: "#ffa200",
                        color: "#fff",
                    },
                ],
            };
        },
        onLoad( options ) {
            this.getGoodsList( options.goods_id );
        },
    };

</script>

<style lang="scss" scoped>
    swiper {
        height: 750rpx;

        image {
            height: 100%;
            width: 100%;
        }
    }

    .goods-info-box {
        padding: 20rpx;
        padding-right: 0;

        .price {
            color: #c00000;
            font-size: 36rpx;
            margin: 20rpx 0;
        }

        .price-info-body {
            display: flex;
            justify-content: space-between;

            .goods-name {
                font-size: 26rpx;
                margin-right: 20rpx;
            }

            .favi {
                width: 240rpx;
                font-size: 24rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-left: 1px solid #efefef;
                color: gray;
            }
        }

        .yf {
            font-size: 24rpx;
            color: gray;
            margin: 20rpx 0;
        }
    }

    .goods-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .goods-detail-box {
        padding-bottom: 50px;
    }

</style>
