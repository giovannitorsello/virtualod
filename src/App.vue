<template>
<div id="app">
    <div v-if="$isMobile()">
      <MainMobile></MainMobile>
    </div>
    <div v-else>
      <MainDesktop></MainDesktop>
    </div>
</div>
</template>

<script>
import MainDesktop from './components/Desktop/MainDesktop'
import MainMobile from './components/Mobile/MainMobile'
export default {
  name: 'App',
  components: {
    MainDesktop,
    MainMobile,
  },
  data: () => ({}),
  mounted: function () {
    if(this.$isMobile())
      console.log("Loading Mobile App.");
    else
      console.log("Loading desktop App.");
  }
}
</script>