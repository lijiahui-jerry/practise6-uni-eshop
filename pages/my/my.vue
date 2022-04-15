<template>
    <view>
        <image style='display:block;' :src="shareIn.shareImg" mode="widthFix" bindlongtap="showBigImg">

        </image>

    </view>
</template>

<script>
    export default {
        data: {
            shareIn: { //data里定义图片路径
                shareImg: "https://ingcare-ai.oss-cn-beijing.aliyuncs.com/20201119/mmqrcode1606726192612.png"
            }
        },
        //  长按保存图片
        showBigImg() {
            var _this = this;
            var url = '';
            wx.downloadFile( {
                url: _this.data.shareIn.shareImg,
                success: function( res ) {
                    var benUrl = res.tempFilePath;
                    //图片保存到本地相册
                    wx.saveImageToPhotosAlbum( {
                        filePath: benUrl,
                        //授权成功，保存图片
                        success: function( data ) {
                            wx.showToast( {
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                            } )
                        },
                        //授权失败
                        fail: function( err ) {
                            if ( err.errMsg ) { //重新授权弹框确认
                                wx.showModal( {
                                    title: '提示',
                                    content: '您好，请先授权再保存此图片。',
                                    showCancel: false,
                                    success( res ) {
                                        if ( res.confirm ) { //重新授权弹框用户点击了确定
                                            wx.openSetting( { //进入小程序授权设置页面
                                                success( settingdata ) {
                                                    console.log( settingdata )
                                                    if ( settingdata
                                                        .authSetting[
                                                            'scope.writePhotosAlbum'
                                                            ]
                                                        ) { //用户打开了保存图片授权开关
                                                        wx.saveImageToPhotosAlbum( {
                                                            filePath: benUrl,
                                                            success: function(
                                                                data
                                                                ) {
                                                                wx.showToast( {
                                                                    title: '保存成功',
                                                                    icon: 'success',
                                                                    duration: 2000
                                                                } )
                                                            },
                                                        } )
                                                    } else { //用户未打开保存图片到相册的授权开关
                                                        wx.showModal( {
                                                            title: '温馨提示',
                                                            content: '授权失败，请稍后重新获取',
                                                            showCancel: false,
                                                        } )
                                                    }
                                                }
                                            } )
                                        }
                                    }
                                } )
                            }
                        }
                    } )
                }
            } )
        },
    }

</script>

<style lang="scss">

</style>
