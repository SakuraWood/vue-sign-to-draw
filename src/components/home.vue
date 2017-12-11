<template lang="html">
  <div class="home-container">
    <div class="header-banner">
      <img src="../assets/images/qdBanner.jpg" alt="签到宣传图">
    </div>
    <canlendar :sign='sign'></canlendar>
  </div>
</template>

<script>
import canlendar from './canlendar.vue'
export default {
  data () {
    return {
      signed: []
    }
  },
  components: {
    canlendar
  }
}
</script>

<style lang="scss">
  .home-container{
    min-height: 100%;

    .header-banner{

      img{
        display: block;
        width: 100%;
      }
    }
  }
</style>
