<template>
  <div id="app">
    <router-view />
    <tab-bar v-show="showTabBar" />
  </div>
</template>

<script>
import TabBar from 'comp/TabBar'

export default {
  name: 'App',
  components:{ TabBar },
  data() {
    return {
    }
  },
  computed: {
    showTabBar(){
      return !this.$route.path.includes('login')
    }
  }
}
</script>