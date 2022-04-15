<template>
    <block>
        <view class="search-box">
            <uni-search-bar focus="true" @input="input" :radius="100" cancelButton="none" clearButton="auto"
                placeholder="搜索">
            </uni-search-bar>
        </view>

        <!-- 搜索建议列表 -->
        <block v-if="searchResult.length !== 0">
            <view class="result-item" v-for="item in searchResult" :key="item.goods_id"
                @click="goToDetail(item.goods_id)">
                <view class="goods-name">
                    {{ item.goods_name }}
                </view>
                <uni-icons type="arrowright" size="16" />
            </view>
        </block>

        <!-- 搜索历史 -->
        <block v-else>
            <view class="history-box">
                <text> 搜索历史 </text>
                <uni-icons type="trash" size="17" @click="cleanHistory" />
            </view>

            <view class="tag-box">
                <uni-tag class="tag-item" :text="item" v-for="(item, index) in histories" :key="index"
                    @click="goToGoodsList(item)"></uni-tag>
            </view>
        </block>
    </block>
</template>

<script>
    export default {
        methods: {
            goToGoodsList( keyword ) {
                uni.navigateTo( {
                    url: "/subpkg/goodsList/goodsList?query=" + keyword
                } );
            },
            cleanHistory() {
                this.searchHistory = [];
                uni.clearStorage( "searchHistory" );
            },
            saveToHistory() {
                if ( this.searchContent.trim().length > 0 ) {
                    let newHistory = new Set( this.searchHistory );
                    newHistory.delete( this.searchContent.trim() );
                    newHistory.add( this.searchContent.trim() );
                    this.searchHistory = Array.from( newHistory );
                    uni.setStorageSync( "searchHistory", JSON.stringify( this.searchHistory ) );
                }
            },
            goToDetail( id ) {
                uni.navigateTo( {
                    url: " /subpkg/goodsDetail/goodsDetail?good_id=" + id,
                } );
            },
            input( e ) {
                if ( this.timer ) {
                    clearTimeout( this.timer );
                }
                this.timer = setTimeout( () => {
                    this.searchContent = e;
                    this.saveToHistory();
                    this.getSearchResult();
                }, 500 );
            },
            async getSearchResult() {
                if ( this.searchContent.trim().length === 0 ) {
                    this.searchResult = [];
                } else {
                    let result = await uni.$http.get(
                        " https://api-ugo-web.itheima.net/api/public/v1/goods/search"
                    );
                    if ( result.statusCode === 200 ) {
                        this.searchResult = result.data.message.goods;
                        this.saveToHistory();
                    } else {
                        this.saveToHistory();
                        return uni.$showMsg();
                    }
                }
            },
        },
        computed: {
            histories() {
                return [ ...this.searchHistory.reverse() ];
            },
        },
        data() {
            return {
                timer: null,
                searchContent: "",
                searchResult: [],
                searchHistory: [],
            };
        },
        mounted() {
            this.searchHistory = JSON.parse( uni.getStorageSync( "searchHistory" ) || [] );
        },
    };

</script>

<style lang="scss">
    .search-box {
        background-color: #c00000;
        position: sticky;
        top: 0;
        z-index: 999;
    }

    .result-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        font-size: 24rpx;
        border-bottom: 1px solid #efefef;
        box-sizing: border-box;

        .goods-name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .history-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        font-size: 30rpx;
        border-bottom: 1px solid #efefef;
    }

    .tag-box {
        display: flex;
        flex-wrap: wrap;
        padding: 30rpx;

        .tag-item {
            margin: 0 10rpx 10rpx 0;
            font-size: 24rpx;
            line-height: 48rpx;
            height: 48rpx;
        }
    }

</style>
