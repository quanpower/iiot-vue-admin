<template>
  <div class="chart-container">
    <konva />
  </div>
</template>

<script>
import Konva from '@/components/Konvajs/Konva'

export default {
  name: 'konva',
  components: { Konva }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>