<template>
  <div class="chart-container">
    <fab-line />
  </div>
</template>

<script>
import FabLine from '@/components/GoJs/FabLine'

export default {
  name: 'fab_line',
  components: { FabLine }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>