<template>
  <div class="chart-container">
    <handsome-template />
  </div>
</template>

<script>
import HandsomeTemplate from '@/components/Konva/Template'

export default {
  name: 'HandsomeTemplate',
  components: { HandsomeTemplate }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>