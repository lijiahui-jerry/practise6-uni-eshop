export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    UPDATE_ALL_GOODS_STATE(state, newState) {
      state.cart.forEach(i => i.goods_state = newState)
      this.commit('cart/SAVE_TO_CART')
    },
    REMOVE_GOODS_BY_ID(state, goods_id) {
      state.cart = state.cart.filter(i => i.goods_id !== goods_id)
      this.commit('cart/SAVE_TO_CART')
    },
    UPDATE_GOODS_COUNT(state, goods) {
      const findResult = state.cart.find(i => i.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_count = goods.goods_count

        this.commit('cart/SAVE_TO_CART')
      }
    },
    UPDATE_GOODS_STATE(state, goods) {
      const findResult = state.cart.find(i => i.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_state = goods.goods_state

        this.commit('cart/SAVE_TO_CART')
      }
    },
    ADD_TO_CART(state, goods) {
      const findResult = state.cart.find(i => i.goods_id === goods.goods_id)

      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }

      this.commit('cart/SAVE_TO_CART')
    },
    SAVE_TO_CART(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    }
  },
  actions: {},
  getters: {
    total: state => state.cart.reduce((sum, current) => sum + current.goods_count, 0),
    checkedCount: state => state.cart.filter(i => i.goods_state).reduce((sum, i) => sum += i.goods_count, 0),
    checkedGoodsAmount: state => {
      return state.cart
        .filter(i => i.goods_state)
        .reduce((sum, i) => sum += i.goods_count * i.goods_price, 0)
        .toFixed(2)
    }
  },
}
