<template>
  <view class="goods-item">
    <view class="item-left">
      <radio :checked="goods.goods_state" color="c00000" v-if="showRadio" @click="radioClickHandler" />
      <image class="goods-pic" :src="goods.goods_small_logo || defaultPic" />
    </view>

    <view class="item-right">
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{ goods.goods_price }}</view>
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChangeHandler" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "myGoods",
    methods: {
      numberChangeHandler(val) {
        this.$emit('numChange', {
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      },
      radioClickHandler() {
        this.$emit('radioChange', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      }
    },
    data() {
      return {
        defaultPic: "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
      };
    },
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
      }
    },
  }
</script>

<style lang="scss" scoped>
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #efefef;
    padding: 10rpx;

    .item-left {
      margin-right: 10rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 200rpx;
        height: 200rpx;
        display: block;
      }
    }

    .item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 26rpx;
      }

      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .goods-price {
          font-size: 32rpx;
          color: #c00000;
        }
      }
    }
  }
</style>
