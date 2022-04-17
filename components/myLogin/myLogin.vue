<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF" />
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>

    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "myLogin",
    methods: {
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.UPDATE_REDIRECTINFO(undefined)
            }
          })
        }
      },
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)

        // 判断是否 wx.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')

        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }

        // 换取 token
        // const loginResult = await uni.$http.post('/api/public/v1/users/wxlogin', query)

        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        // 2. 更新 vuex 中的 token
        this.updateToken('123')
        this.navigateBack()
      },
      // 获取微信用户的基本信息
      async getUserProfile() {
        const res = await uni.getUserProfile({
          desc: "登录",
        })
        if (res[0] && res[0].errMsg === 'getUserProfile:fail auth deny') {
          return uni.$showMsg('您取消了登录授权！', 1000, 'none')
        } else if (res[1]) {
          this.updateUserInfo(res[1].userInfo)
          this.getToken(res[1])
        }
      },
      ...mapMutations('user', ['updateUserInfo', 'updateToken', 'UPDATE_REDIRECTINFO']),
    },
    computed: {
      ...mapState('user', ['redirectInfo'])
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
