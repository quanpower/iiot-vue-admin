<template>
  <div class="chart-container">
    <rty height="100%" width="100%" />
  </div>
</template>

<script>

import Rty from '@/components/Charts/RTY'

export default {
  name: 'RTYChart',
  components: { Rty },
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

