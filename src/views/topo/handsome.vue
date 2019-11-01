<template>
  <div class="chart-container">
    <handsome />
  </div>
</template>

<script>
import Handsome from '@/components/GoJs/Handsome'

export default {
  name: 'handsome1',
  components: { Handsome }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>