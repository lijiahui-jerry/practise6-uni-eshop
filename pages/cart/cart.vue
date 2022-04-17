<template>
  <block>

    <view class="cart-container" v-if="cart.length !== 0">
      <myAddress />

      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-title-text">购物车</text>
      </view>

      <uni-swipe-action>
        <block v-for="(item,index) in cart" :key="index">
          <uni-swipe-action-item :right-options="options" @click="swipeClickHandler(item)">
            <myGoods :goods="item" :showRadio="true" :showNum="true" @radioChange="radioChangeHandler"
              @numChange="numberChangeHandler" />
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>

      <mySettle />
    </view>

    <view class="empty-cart" v-else>
      <image src="../../static/cart_border@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>
  </block>
</template>
<script>
  import mixBadge from '../../mixins/tabbarBadge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    methods: {
      swipeClickHandler(goods) {
        this.REMOVE_GOODS_BY_ID(goods.goods_id)
      },
      numberChangeHandler(e) {
        this.UPDATE_GOODS_COUNT(e)
      },
      radioChangeHandler(e) {
        this.UPDATE_GOODS_STATE(e)
      },
      ...mapMutations('cart', ['UPDATE_GOODS_STATE', 'UPDATE_GOODS_COUNT', 'REMOVE_GOODS_BY_ID'])
    },
    computed: {
      ...mapState('cart', ['cart']),
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }],
      }
    },
    mixins: [mixBadge],
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
