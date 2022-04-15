<template>
    <view class="goods-item">
        <view class="item-left">
            <image class="goods-pic" :src="goods.goods_small_logo || defaultPic"></image>
        </view>

        <view class="item-right">
            <view class="goods-name">{{ goods.goods_name }}</view>
            <view class="goods-info-box">
                <view class="goods-price">￥{{ goods.goods_price }}</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "myGoods",
        data() {
            return {
                defaultPic: "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
            };
        },
        props: {
            goods: {
                type: Object,
                default: {}
            }
        },
    }

</script>

<style lang="scss" scoped>
    .goods-item {
        display: flex;
        border-bottom: 1px solid #efefef;
        padding: 10rpx;

        .item-left {
            margin-right: 10rpx;

            .goods-pic {
                width: 200rpx;
                height: 200rpx;
                display: block;
            }
        }

        .item-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .goods-name {
                font-size: 26rpx;
            }

            .goods-info-box {
                .goods-price {
                    font-size: 32rpx;
                    color: red;
                }
            }
        }
    }
    

</style>
