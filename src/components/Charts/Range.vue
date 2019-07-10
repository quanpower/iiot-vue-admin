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

      var scores1 = [22.5,26,27,24,25,30,25.6,23.7,23.5,25.6];
      var sum=0;
      for(var i=0;i<scores1.length;i++){
        sum+=scores1[i];
      }
      var miu=(sum/scores1.length).toFixed(2);
      var colors=['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

      var high=28;
      var low=22;
      var middle=25;
      var datahigh=[];
      var datalow=[];
      var cl=[];

      var warning1=[];
      var warning2=[];

      for(var i=0;i<scores1.length;i++){
        datahigh[i]=high;
        datalow[i]=low;
        cl[i]=middle;
        if(scores1[i]>datahigh[i]){
          console.log(scores1[i],datahigh[i]);
          warning1.push({coord:[i,scores1[i]]});
        }
        else if(scores1[i]<datalow[i]){
          warning2.push({coord:[i,scores1[i]]});
        }
      }

      var lineOption = {
        title: [
              {
                  text: '样本数='+scores1.length+'\n总体均值miu='+miu+'\n子组大小=5\n规格上限='+high+'\n目标值='+middle+'\n规格下限='+low+'\n',
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
            trigger: 'axis'
        },
        legend: {
            data:['均值']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
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
              },
                scale: true,
            }
        ],
        series : [
            {
                name:'均值',
                type:'line',
                data:scores1,
                lineStyle:{
                  normal:{
                    color:colors[2]
                  }
                }
            },
            {
              name:'UCL',
              type:'line',
              lineStyle:{
                  normal:{
                      color:'red',
                      type:'dashed'
                  }
              },
              symbol: 'none',
              connectNulls: true,
              data:datahigh,
              markPoint: {
                  itemStyle: {
                      normal: {
                          color: colors[0]
                      }
                  },
                  data: warning1
              }
          },
          {
              name:'LCL',
              type:'line',
              lineStyle:{
                  normal:{
                      color:'red',
                      type:'dashed'
                  }
              },
              symbol: 'none',
              connectNulls: false,
              data:datalow,
              markPoint: {
                  itemStyle: {
                      normal: {
                          color: colors[0]
                      }
                  },
                  data: warning2
              }
          },
          {
              name:'CL',
              type:'line',
              lineStyle:{
                  normal:{
                      color:colors[1],
                      type:'solid'
                  }
              },
              symbol: 'none',
              connectNulls: true,
              data:cl,
          }
        ]
      };
      this.chart.setOption(lineOption)
    }
  }
}
</script>

