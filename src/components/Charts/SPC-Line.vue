<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      var scores2 = [22.5,26,27,24,25,30,25.6,23.7,23.5,25.6]
      // 均值
      var scores1 = [22.5,26,27,24,25,30,25.6,23.7,23.5,25.6]

      var su=0;
      for(var i=0;i<scores1.length;i++){
        su+=scores1[i];
      }

      var miu=su/scores1.length;
      var sigma=0;
      var sigma2=0;
      for(var i=0;i<scores1.length;i++){
        sigma2+=(scores1[i]-miu)*(scores1[i]-miu);
      }
      sigma=(Math.sqrt(sigma2/(scores1.length-1))).toFixed(2);

      var barOption={
        title: [
              {
                  text: '整体标准差sigma='+sigma,
                  borderColor: '#999',
                  borderWidth: 1,
                  textStyle: {
                      fontSize: 12
                  },
                  left: '10%',
                  top: '5%'
              }
          ],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['方差']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {show: true}
            }
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : [1,2,3,4,5,6,7,8,9,10],
                axisLabel: {
                      show: true,//是否显示刻度标签
                      // interval:0,//横轴信息全部显示
                      textStyle: {
                          fontSize: 8,
                      }
                  }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitArea: {
                  show: true
              }
              }

        ],
        series : [
            {
                name:'方差',
                type:'line',
                barWidth: '40%',
                stack: '测量值',
                data:scores2
            },
        ]
      };
      this.chart.setOption(barOption)
    }
  }
}
</script>

