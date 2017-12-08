<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.$nextTick(() => {
      this.$util.remFontSize()
    })
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
