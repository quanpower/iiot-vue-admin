<template>
  <div class="chart-container">
    <go-tree />
  </div>
</template>

<script>
import GoTree from '@/components/GoJs/GoTree'

export default {
  name: 'tree',
  components: { GoTree }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>