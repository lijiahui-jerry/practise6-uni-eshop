export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    redirectInfo: undefined
  }),
  mutations: {
    UPDATE_REDIRECTINFO(state, info) {
      state.redirectInfo = info
    },
    updateToken(state, token) {
      state.token = token
      this.commit('user/saveTokenToStorage')
    },
    // 将 token 字符串持久化存储到本地
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('user/SAVE_USER_INFO_TO_STORAGE')
    },
    // 将 userinfo 持久化存储到本地
    SAVE_USER_INFO_TO_STORAGE(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    UPDATE_ADDRESS(state, address) {
      state.address = address
      this.commit('user/SAVE_TO_STORAGE')
    },
    SAVE_TO_STORAGE(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
  },
  actions: {},
  getters: {
    // 收货详细地址的计算属性
    addstr(state) {
      if (!state.address.provinceName) {
        return ''
      } else {
        return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
      }
    }
  },
}
