import {
  mapGetters
} from 'vuex'

export default {
  methods: {
    setBadge() {
      if (this.total !== 0) {
        uni.setTabBarBadge({
          index: 2,
          text: '' + this.total
        })
      } else {
        uni.removeTabBarBadge({
          index: 2
        })
      }
    }
  },
  computed: {
    ...mapGetters('cart', [
      'total',
    ])
  },
  watch: {
    total() {
      this.setBadge()
    },
    onShow() {
      this.setBadge()
    }
  }
}
