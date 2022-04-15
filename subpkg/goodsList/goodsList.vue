<template>
    <view class="goods-list">
        <view v-for="(item, index) in goodsList" :key="index" @click="goToDetail(item)">
            <myGoods :goods='item'></myGoods>
        </view>
    </view>
</template>

<script>
    export default {
        methods: {
            goToDetail( goods ) {
                uni.navigateTo( {
                    url: '/subpkg/goodsDetail/goodsDetail?goods_id=' + goods.goods_id,
                } )
            },
            async getGoodsList( cb ) {
                this.isLoading = true
                let result = await uni.$http.get(
                    "https://api-ugo-web.itheima.net/api/public/v1/goods/search",
                    this.queryObj
                );
                cb && cb()
                this.isLoading = false
                if ( result.data.meta.status === 200 ) {
                    this.goodsList = [ ...result.data.message.goods, ...this.goodsList ];
                    this.total = result.data.message.total;
                } else {
                    return uni.$showMsg();
                }
            },
        },
        data() {
            return {
                queryObj: {
                    query: "",
                    cid: "",
                    pagenum: 1,
                    pagesize: 10,
                },
                goodsList: [],
                total: 0,
                isLoading: false,
            };
        },
        onLoad( options ) {
            this.queryObj.query = options.query || "";
            this.queryObj.cid = options.cid || "";
            this.getGoodsList();
        },
        onReachBottom() {
            if ( this.queryObj.pagenum * this.queryObj.pagesize >= this.total ) {
                return uni.$showMsg( '没有更多数据' )
            }
            if ( !this.isLoading ) {
                this.queryObj.pagenum++
                this.getGoodsList()
            }
        },
        onPullDownRefresh() {
            this.queryObj.pagenum = 1
            this.queryObj.total = 0
            this.isLoading = false
            this.goodsList = []
            this.getGoodsList( () => {
                uni.stopPullDownRefresh()
            } )
        },
    };

</script>

<style lang="scss" scoped>

</style>
