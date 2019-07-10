<template>
  <div class="chart-container">
      <xbar height="100%" width="100%" />
  </div>
</template>

<script>
import Xbar from '@/components/Charts/Xbar'

export default {
  name: 'XbarR',
  components: { Xbar }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

