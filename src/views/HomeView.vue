<template>
<HomeHeader></HomeHeader>
  <router-view/>
<HomeFooter></HomeFooter>
</template>

<script>
import HomeHeader from '../components/Home/HomeHeader.vue'
import HomeFooter from '../components/Home/HomeFooter.vue'
export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    HomeFooter
  }
}
</script>
