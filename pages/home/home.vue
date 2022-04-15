<template>
  <block>
    <navigator class="search-box" url="/subpkg/search/search" >
      <mySearch></mySearch>
    </navigator>

    <swiper
      class="home-swiper"
      duration="1000"
      interval="2000"
      indicator-dots
      autoplay
      circular
    >
      <swiper-item
        class="home-swiper-item"
        v-for="item in swiperList"
        :key="item.goods_id"
      >
        <navigator
          class="swiper-item"
          :url="'/subpkg/goodsDetail/goodsDetail?goods_id=' + item.goods_id"
        >
          <image class="swiper-img" :src="item.image_src" mode="aspectFill" />
        </navigator>
      </swiper-item>
    </swiper>

    <view class="navs">
      <view
        class="nav"
        v-for="(item, i) in navList"
        :key="i"
        @click="navClickHandler(item)"
      >
        <image :src="item.image_src" mode="aspectFill" />
      </view>
    </view>

    <view class="floor-list">
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <image
          class="floor-title"
          :src="item.floor_title.image_src"
          mode="aspectFill"
        />

        <view class="floor-img-container">
          <navigator class="left-img-container" :url="item.product_list[0].url">
            <image
              class=""
              :src="item.product_list[0].image_src"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"
            />
          </navigator>

          <view class="right-container">
            <navigator
              class="right-img-container"
              v-for="(i, index2) in item.product_list"
              :key="index2"
              :url="i.url"
            >
              <image
                :src="i.image_src"
                :style="{ width: i.image_width + 'rpx' }"
                mode="widthFix"
                class=""
                v-if="index2 !== 0"
              />
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </block>
</template>

<script>
import mySearch from "../../components/mySearch/mySearch.vue";
export default {
  components: { mySearch },
  methods: {
    navClickHandler(item) {
      if (item.name === "分类") {
        uni.switchTab({
          url: "/pages/cate/cate",
        });
      }
    },
    async getSwiperList() {
      let result = await uni.$http.get(
        "https://api-ugo-web.itheima.net/api/public/v1/home/swiperdata"
      );
      if (result.statusCode === 200) {
        this.swiperList = result.data.message;
      } else {
        return uni.$showMsg();
      }
    },
    async getNavList() {
      let result = await uni.$http.get(
        "https://api-ugo-web.itheima.net/api/public/v1/home/catitems"
      );
      if (result.statusCode === 200) {
        this.navList = result.data.message;
      } else {
        return uni.$showMsg();
      }
    },
    async getFloorList() {
      let result = await uni.$http.get(
        "https://api-ugo-web.itheima.net/api/public/v1/home/floordata"
      );
      if (result.statusCode === 200) {
        result.data.message.forEach((floor) => {
          floor.product_list.forEach((product) => {
            product.url =
              "/subpkg/goodsList/goodsList?" +
              product.navigator_url.split("?")[1];
          });
        });
        this.floorList = result.data.message;
      } else {
        return uni.$showMsg();
      }
    },
  },
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: [],
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },
};
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}

.home-swiper {
  height: 330rpx;

  .swiper-item,
  image {
    height: 100%;
    width: 100%;
  }
}

.navs {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin: 15px 0;

  .nav image {
    height: 140rpx;
    width: 128rpx;
  }
}

.floor-list {
  .floor-item {
    .floor-title {
      height: 60rpx;
      width: 100%;
      display: flex;
    }

    .floor-img-container {
      display: flex;
      padding: 0 15rpx;
    }

    .right-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
}
</style>
