<template>
  <div class="chart-container">
    <box height="100%" width="100%" />
  </div>
</template>

<script>
import Box from '@/components/Charts/SPC-Box'

export default {
  name: 'BoxChart',
  components: { Box }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

