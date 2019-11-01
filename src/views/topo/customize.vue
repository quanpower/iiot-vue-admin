<template>
  <div class="chart-container">
    <customize />
  </div>
</template>

<script>
import Customize from '@/components/GoJs/Customize'

export default {
  name: 'customize1',
  components: { Customize }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>