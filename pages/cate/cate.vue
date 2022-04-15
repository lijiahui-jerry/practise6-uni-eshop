<template>
  <block>
    <navigator url='/subpkg/search/search'>
      <mySearch></mySearch>
    </navigator>
    <view class="scroll-view-container">
      <scroll-view
        class="left-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
      >
        <block v-for="(item, index) in categoryList" :key="item.cat_id">
          <view
            class="left-scroll-view-item"
            :class="index === active ? 'active' : ''"
            @click="changeCurrentIndex(index)"
            >{{ item.cat_name }}</view
          >
        </block>
      </scroll-view>
      <scroll-view
        class="right-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
      >
        <view
          class="right-lv2"
          v-for="item in categoryList2"
          :key="item.cat_id"
        >
          <view class="right-lv2-title">/~ {{ item.cat_name }} ~/</view>

          <view class="right-lv3">
            <navigator
              :url="'../../subpkg/goodsList/goodsList?cid=' + item2.cat_id"
              class="right-lv3-item"
              v-for="item2 in item.children"
              :key="item2.cat_id"
            >
              <image :src="item2.cat_icon" mode="aspectFill" />
              <text>{{ item2.cat_name }}</text>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </block>
</template>

<script>
export default {
  methods: {
    changeCurrentIndex(index) {
      this.active = index;
      this.categoryList2 = this.categoryList[index].children;
    },
    async getCategoryList() {
      let result = await uni.$http.get(
        "https://api-ugo-web.itheima.net/api/public/v1/categories"
      );
      if (result.statusCode === 200) {
        this.categoryList = result.data.message;
        this.categoryList2 = result.data.message[0].children;
      } else {
        return uni.$showMsg();
      }
    },
  },
  data() {
    return {
      wh: 0,
      active: 0,
      categoryList: [],
      categoryList2: [],
    };
  },
  onLoad() {
    this.wh = uni.getSystemInfoSync().windowHeight - 50;
    this.getCategoryList();
  },
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 240rpx;

    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 120rpx;
      text-align: center;
      font-size: 24rpx;
      position: relative;

      &.active {
        background-color: #ffffff;

        &::before {
          content: "";
          display: block;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          width: 6rpx;
          height: 60rpx;
          transform: translateY(-50%);
        }
      }
    }
  }

  .right-scroll-view {
    .right-lv2 {
      .right-lv2-title {
        font-size: 24rpx;
        font-weight: bold;
        text-align: center;
        padding: 20rpx 0;
      }
    }

    .right-lv3 {
      display: flex;
      flex-wrap: wrap;

      .right-lv3-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20rpx;

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          font-size: 24rpx;
          text-align: center;
        }
      }
    }
  }
}
</style>
