<template>
  <div id="app">
    <router-view />
    <tab-bar v-show="showTabBar" />
    
    <transition name="fade">
      <div v-show="$store.state.loading" class="loader26 loader">
        <div class="loader-26">
          <div>
          </div>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
import TabBar from 'comp/TabBar'

export default {
  name: 'App',
  components:{ TabBar },
  computed: {
    showTabBar(){
      return !this.$route.path.includes('login')
    }
  }
}
</script>