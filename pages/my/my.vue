<template>
  <view>
    <!-- 用户未登录时，显示登录组件 -->
    <myLogin v-if="!token" />
    <!-- 用户登录后，显示用户信息组件 -->
    <myUserInfo v-else />
  </view>
</template>
<script>
  import mixBadge from '../../mixins/tabbarBadge.js'
  import {
    mapState
  } from 'vuex'
  export default {
    mixins: [mixBadge],
    computed: {
      ...mapState('user', ['token']),
    },
    data() {
      return {}
    },
  }
</script>
<style lang="scss">
  page,
  .my-container {
    height: 100%;
  }
</style>
