<template>
  <view class="my-search" :style="{ 'background-color': bgColor }">
    <view class="my-search-input" :style="{ 'border-radius': radius + 'rpx' }">
      <uni-icons class="icon" type="search" size="17"></uni-icons>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "mySearch",
  props: {
    bgColor: {
      type: String,
      default: "#c00000",
    },
    radius: {
      type: Number,
      default: 36, // rpx
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.my-search {
  height: 100rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;

  .my-search-input {
    height: 72rpx;
    background-color: #fff;
    width: 100%;
    text-align: center;
    line-height: 72rpx;
    font-size: 30rpx;

    .icon {
      margin-right: 10rpx;
    }
  }
}
</style>
