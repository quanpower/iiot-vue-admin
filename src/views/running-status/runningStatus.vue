<template>
  <div>
    <p style="background-color:#d5d5d5;margin:0;padding:5px;">
      您当前处于 <span class="tip">用户提交资料</span> 步骤
      下一步等待<span class="tip">供应商接单</span>
      <el-button v-if="show===false" type="text" @click="show=true">展开</el-button>
      <el-button v-else type="text" @click="show=false">收起</el-button>
    </p>
    <div v-show="show" id="myDiagramDiv" />
    <div v-show="show" id="myDiagramText" />
  </div>

</template>

<script>
import go from 'gojs'
var GO = go.GraphObject.make

import datam from './data'
import { fetchDeviceRunningStatus } from '@/api/equipment'

export default{
  mixins: [datam],
  data() {
    return {
      id: 4,
      myDiagram: null,
      myDiagramText: null,
      show: true,
      listLoading: true,
      nodeDataArray: [],
      textNodeDataArray: [],
      message: []
    }
  },

  mounted() {
    this.initRunningStatus()
    console.log('---this.nodeDataArray-----')
    console.log(this.nodeDataArray)
    // this.load();

    const timer = setInterval(this.getRunningStatus, 5000);            
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {            
        clearInterval(timer);                                    
    })

    // setInterval(this.getRunningStatus, 5000)
  },

  // beforeUpdate: function(){
  //   // console.group('beforeUpdate 更新前状态===============》');
  //   // console.log("%c%s", "color:red","el     : " + this.$el);
  //   console.log(this.$el);
  //   console.log("%c%s", "color:red","data   : " + this.$data);

  //   this.myDiagram.model.nodeDataArray = this.nodeDataArray;
  // },

  methods: {
    load() {
      this.init()
      // this.addNodeTemplate(this.User)
      // this.addNodeTemplate(this.Supplier)
      // this.layout()
    },

    getRunningStatus() {
      fetchDeviceRunningStatus(this.id).then(response => {
        console.log(response.data.StatusPic)
        console.log(response.data.StatusText)
        // this.$set(this.nodeDataArray, response.data.StatusPic);
        this.nodeDataArray = response.data.StatusPic
        this.textNodeDataArray = response.data.StatusText
        console.log('------this.nodeDataArray------')
        console.log(this.nodeDataArray)
        // ????don't refresh auto
        this.myDiagram.model.nodeDataArray = this.nodeDataArray
        this.myDiagramText.model.nodeDataArray = this.textNodeDataArray
      })
    },

    initRunningStatus() {
      fetchDeviceRunningStatus(this.id).then(response => {
        console.log(response.data.StatusPic)
        this.nodeDataArray = response.data.StatusPic
        this.textNodeDataArray = response.data.StatusText
        console.log('=====this.nodeDataArray====')
        console.log(this.nodeDataArray)
        this.init()
      })
    },

    layout() {
      this.myDiagram.model = go.Model.fromJson(this.myjson)
      this.myDiagram.layoutDiagram(true)
    },

    getOption() {
      // for conciseness in defining templates

      const options = {
        yellowgrad: GO(go.Brush, 'Linear', { 0: 'rgb(254, 201, 0)', 1: 'rgb(254, 162, 0)' }),
        greengrad: GO(go.Brush, 'Linear', { 0: '#98FB98', 1: '#9ACD32' }),
        bluegrad: GO(go.Brush, 'Linear', { 0: '#B0E0E6', 1: '#87CEEB' }),
        redgrad: GO(go.Brush, 'Linear', { 0: '#C45245', 1: '#871E1B' }),
        whitegrad: GO(go.Brush, 'Linear', { 0: '#F0F8FF', 1: '#E6E6FA' }),
        bigfont: 'bold 8pt Helvetica, Arial, sans-serif',
        smallfont: 'bold 6pt Helvetica, Arial, sans-serif'

      }

      return options
    },

    textStyle() {
      return {
        margin: 6,
        wrap: go.TextBlock.WrapFit,
        textAlign: 'center',
        editable: true,
        font: this.getOption()['bigfont']
      }
    },

    init() {
      this.myDiagram =
            GO(go.Diagram, 'myDiagramDiv',
              {
                isReadOnly: true,
                // have mouse wheel events zoom in and out instead of scroll up and down
                'toolManager.mouseWheelBehavior': go.ToolManager.WheelNone,
                initialAutoScale: go.Diagram.Uniform,
                'linkingTool.direction': go.LinkingTool.ForwardsOnly,
                initialContentAlignment: go.Spot.Center,
                layout: GO(go.GridLayout,
                  { comparer: go.GridLayout.smartComparer }),
                'undoManager.isEnabled': true
              })
      // 默认节点模板
      this.myDiagram.nodeTemplate =
          GO(go.Part, 'Vertical',
          // GO(go.Node, "Auto",
            // the entire node will have a light-blue background
            { background: '#44CCFF' },

            GO(go.TextBlock,
              'Default Text', // the initial value for TextBlock.text
              { margin: 2, stroke: 'white', font: 'bold 16px sans-serif' },
              new go.Binding('text', 'name')),

            // injector current
            GO(go.Panel, go.Panel.Table,
              { alignment: go.Spot.Left },

              GO(go.TextBlock, 'Default Text',
                { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                new go.Binding('text', 'injector_current')),

              GO(go.Panel, 'Auto',
                { row: 0, column: 1, margin: 2 },
                GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                GO(go.TextBlock, 'injector_current_value', { stroke: 'black', background: 'lightgreen' },
                  new go.Binding('text', 'injector_current_value')),
              ),
              // GO(go.TextBlock, "A",
              //   { row: 0, column: 2, margin: 2, stroke: "black", font: "bold 12px sans-serif", })
            ),

            // motor current
            GO(go.Panel, go.Panel.Table,
              { alignment: go.Spot.Left },
              GO(go.TextBlock, 'Default Text',
                { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                new go.Binding('text', 'motor_current')),

              GO(go.Panel, 'Auto',
                { row: 0, column: 1, margin: 2, background: 'lightgray' },
                GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                GO(go.TextBlock, 'motor_current_value', { stroke: 'black', background: 'lightgreen' },
                  new go.Binding('text', 'motor_current_value')),
              ),
              // GO(go.TextBlock, "A",
              //   { row: 0, column: 2, margin: 2, stroke: "black", font: "bold 12px sans-serif", })
            ),

            // injector error
            GO(go.Panel, go.Panel.Table,
              { alignment: go.Spot.Left },

              GO(go.TextBlock, 'Default Text',
                { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                new go.Binding('text', 'injector_error')),

              GO(go.Shape, 'RoundedRectangle', { row: 0, column: 1, margin: 2, width: 20, height: 20, fill: 'green' },
                new go.Binding('fill', 'injector_error_fill')),
            ),

            // master error
            GO(go.Panel, go.Panel.Table,
              { alignment: go.Spot.Left },

              GO(go.TextBlock, 'Default Text',
                { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                new go.Binding('text', 'master_error')),

              GO(go.Shape, 'RoundedRectangle', { row: 0, column: 1, margin: 2, width: 20, height: 20, fill: 'green' },
                new go.Binding('fill', 'master_error_fill')),
            ),

            // motor error
            GO(go.Panel, go.Panel.Table,
              { alignment: go.Spot.Left },

              GO(go.TextBlock, 'Default Text',
                { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                new go.Binding('text', 'motor_error')),

              GO(go.Shape, 'RoundedRectangle', { row: 0, column: 1, margin: 2, width: 20, height: 20, fill: 'green' },
                new go.Binding('fill', 'motor_error_fill')),
            ),

          )
      // replace the default Link template in the linkTemplateMap

      const myModel = new GO(go.Model)
      myModel.nodeDataArray = this.nodeDataArray
      console.log('------this.nodeDataArray---------')
      console.log(this.nodeDataArray)
      // this.myDiagram.model = myModel;
      this.$set(this.myDiagram, 'model', myModel)

      this.myDiagramText = GO(go.Diagram, 'myDiagramText',
        {
          'undoManager.isEnabled': true // enable Ctrl-Z to undo and Ctrl-Y to redo
        })

      this.myDiagramText.nodeTemplate =
            GO(go.Part, 'Vertical',

              { background: '#44CCFF' },

              // sensers
              GO(go.Panel, 'Auto',
                GO(go.Shape, { fill: 'white', stroke: 'gray', strokeWidth: 3 }),

                // sensers
                GO(go.Panel, 'Table',
                  { defaultRowSeparatorStroke: 'gray', defaultColumnSeparatorStroke: 'gray' },
                  GO(go.RowColumnDefinition, { column: 0, width: 250 }),
                  GO(go.RowColumnDefinition, { column: 1, width: 250 }),
                  GO(go.RowColumnDefinition, { column: 2, width: 250 }),
                  GO(go.RowColumnDefinition, { column: 3, width: 250 }),

                  // temperature
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 0 },

                    GO(go.RowColumnDefinition, { column: 0, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 2, width: 40 }),

                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'temperature')),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 1, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'temperature_value', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'temperature_value')),
                    ),
                    GO(go.TextBlock, '℃',
                      { row: 0, column: 2, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' })
                  ),

                  // pressure
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 1 },
                    { defaultAlignment: go.Spot.Center },
                    GO(go.RowColumnDefinition, { column: 0, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 2, width: 40 }),
                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'pressure')),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 1, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'pressure_value', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'pressure_value')),
                    ),
                    GO(go.TextBlock, 'Bar',
                      { row: 0, column: 2, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' })
                  ),

                  // velocity
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 2 },
                    { defaultAlignment: go.Spot.Center },
                    GO(go.RowColumnDefinition, { column: 0, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 2, width: 40 }),
                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'velocity')),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 1, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'velocity_value', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'velocity_value')),
                    ),
                    GO(go.TextBlock, 'm/s',
                      { row: 0, column: 2, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' })
                  ),

                  // voltage
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 3 },
                    { defaultAlignment: go.Spot.Center },
                    GO(go.RowColumnDefinition, { column: 0, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 2, width: 40 }),

                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'voltage')),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 1, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'injector_current_value', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'voltage_value')),
                    ),
                    GO(go.TextBlock, 'V',
                      { row: 0, column: 2, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' })
                  ),
                ),
              ),

              // errors
              GO(go.Panel, 'Auto',
                GO(go.Shape, { fill: 'white', stroke: 'gray', strokeWidth: 3 }),

                // errors
                GO(go.Panel, 'Table',
                  { defaultRowSeparatorStroke: 'gray', defaultColumnSeparatorStroke: 'gray' },
                  GO(go.RowColumnDefinition, { column: 0, width: 200 }),
                  GO(go.RowColumnDefinition, { column: 1, width: 200 }),
                  GO(go.RowColumnDefinition, { column: 2, width: 200 }),
                  GO(go.RowColumnDefinition, { column: 3, width: 200 }),
                  GO(go.RowColumnDefinition, { column: 4, width: 200 }),

                  // temperature error
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 0 },

                    GO(go.RowColumnDefinition, { column: 0, width: 100 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 50 }),

                    { alignment: go.Spot.Left },

                    GO(go.TextBlock, 'temperature_error',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'temperature_error')),

                    GO(go.Shape, 'RoundedRectangle', { row: 0, column: 1, margin: 2, width: 20, height: 20, fill: 'green' },
                      new go.Binding('fill', 'temperature_error_fill')),
                  ),

                  // pressure error
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 1 },

                    GO(go.RowColumnDefinition, { column: 0, width: 100 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 50 }),

                    { alignment: go.Spot.Left },

                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'pressure_error')),

                    GO(go.Shape, 'RoundedRectangle', { row: 0, column: 1, margin: 2, width: 20, height: 20, fill: 'green' },
                      new go.Binding('fill', 'pressure_error_fill')),
                  ),

                  // gate error
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 2 },

                    GO(go.RowColumnDefinition, { column: 0, width: 100 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 50 }),

                    { alignment: go.Spot.Left },

                    GO(go.TextBlock, 'gate_error',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'gate_error')),

                    GO(go.Shape, 'RoundedRectangle', { row: 0, column: 1, margin: 2, width: 20, height: 20, fill: 'green' },
                      new go.Binding('fill', 'gate_error_fill')),
                  ),

                  // velocity error
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 3 },

                    GO(go.RowColumnDefinition, { column: 0, width: 100 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 50 }),

                    { alignment: go.Spot.Left },

                    GO(go.TextBlock, 'velocity error',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'velocity_error')),

                    GO(go.Shape, 'RoundedRectangle', { row: 0, column: 1, margin: 2, width: 20, height: 20, fill: 'green' },
                      new go.Binding('fill', 'velocity_error_fill')),
                  ),

                  // emergency  error
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 4 },

                    GO(go.RowColumnDefinition, { column: 0, width: 100 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 50 }),

                    { alignment: go.Spot.Left },

                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'emergency_error')),

                    GO(go.Shape, 'RoundedRectangle', { row: 0, column: 1, margin: 2, width: 20, height: 20, fill: 'green' },
                      new go.Binding('fill', 'emergency_error_fill')),
                  ),
                ),

              ),

              // time
              GO(go.Panel, 'Auto',
                GO(go.Shape, { fill: 'white', stroke: 'gray', strokeWidth: 3 }),

                GO(go.Panel, 'Table',
                  // current_running_time
                  { defaultRowSeparatorStroke: 'gray', defaultColumnSeparatorStroke: 'gray' },
                  GO(go.RowColumnDefinition, { column: 0, width: 500 }),
                  GO(go.RowColumnDefinition, { column: 1, width: 500 }),
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 0, margin: 2, defaultAlignment: go.Spot.Center },
                    GO(go.RowColumnDefinition, { column: 0, width: 100 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 50 }),
                    GO(go.RowColumnDefinition, { column: 2, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 3, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 4, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 5, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 6, width: 30 }),

                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'current_running_time')),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 1, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'current_running_time_h', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'current_running_time_h')),
                    ),
                    GO(go.TextBlock, '小时',
                      { row: 0, column: 2, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 3, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'current_running_time_m', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'current_running_time_m')),
                    ),
                    GO(go.TextBlock, '分钟',
                      { row: 0, column: 4, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 5, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'current_running_time_s', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'current_running_time_s')),
                    ),
                    GO(go.TextBlock, '秒',
                      { row: 0, column: 6, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),
                  ),

                  // total_running_time
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 1, margin: 2, defaultAlignment: go.Spot.Center },
                    GO(go.RowColumnDefinition, { column: 0, width: 100 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 2, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 3, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 4, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 5, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 6, width: 30 }),

                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'total_running_time')),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 1, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'total_running_time_h', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'total_running_time_h')),
                    ),
                    GO(go.TextBlock, '小时',
                      { row: 0, column: 2, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 3, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'total_running_time_m', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'total_running_time_m')),
                    ),
                    GO(go.TextBlock, '分钟',
                      { row: 0, column: 4, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 5, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'total_running_time_s', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'total_running_time_s')),
                    ),
                    GO(go.TextBlock, '秒',
                      { row: 0, column: 6, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),
                  ),

                ),
              ),

              // maintenance
              GO(go.Panel, 'Auto',
                GO(go.Shape, { fill: 'white', stroke: 'gray', strokeWidth: 3 }),

                GO(go.Panel, 'Table',
                  // current_running_time
                  { defaultRowSeparatorStroke: 'gray', defaultColumnSeparatorStroke: 'gray' },
                  GO(go.RowColumnDefinition, { column: 0, width: 500 }),
                  GO(go.RowColumnDefinition, { column: 1, width: 500 }),
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 0, margin: 2, defaultAlignment: go.Spot.Center },
                    GO(go.RowColumnDefinition, { column: 0, width: 100 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 50 }),
                    GO(go.RowColumnDefinition, { column: 2, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 3, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 4, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 5, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 6, width: 30 }),

                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'current_running_time')),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 1, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'current_running_time_h', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'current_running_time_h')),
                    ),
                    GO(go.TextBlock, '小时',
                      { row: 0, column: 2, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 3, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'current_running_time_m', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'current_running_time_m')),
                    ),
                    GO(go.TextBlock, '分钟',
                      { row: 0, column: 4, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 5, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'current_running_time_s', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'current_running_time_s')),
                    ),
                    GO(go.TextBlock, '秒',
                      { row: 0, column: 6, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),
                  ),

                  // total_running_time
                  GO(go.Panel, go.Panel.Table,
                    { row: 0, column: 1, margin: 2, defaultAlignment: go.Spot.Center },
                    GO(go.RowColumnDefinition, { column: 0, width: 100 }),
                    GO(go.RowColumnDefinition, { column: 1, width: 40 }),
                    GO(go.RowColumnDefinition, { column: 2, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 3, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 4, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 5, width: 30 }),
                    GO(go.RowColumnDefinition, { column: 6, width: 30 }),

                    GO(go.TextBlock, 'Default Text',
                      { row: 0, column: 0, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' },
                      new go.Binding('text', 'total_running_time')),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 1, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'total_running_time_h', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'total_running_time_h')),
                    ),
                    GO(go.TextBlock, '小时',
                      { row: 0, column: 2, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 3, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'total_running_time_m', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'total_running_time_m')),
                    ),
                    GO(go.TextBlock, '分钟',
                      { row: 0, column: 4, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),

                    GO(go.Panel, 'Auto',
                      { row: 0, column: 5, margin: 2, background: 'lightgray' },
                      GO(go.Shape, 'RoundedRectangle', { fill: 'lightgreen' }),
                      GO(go.TextBlock, 'total_running_time_s', { stroke: 'black', background: 'lightgreen' },
                        new go.Binding('text', 'total_running_time_s')),
                    ),
                    GO(go.TextBlock, '秒',
                      { row: 0, column: 6, margin: 2, stroke: 'black', font: 'bold 12px sans-serif' }),
                  ),

                ),
              ),
            // close template
            )

      const myTextModel = new GO(go.Model)
      myTextModel.nodeDataArray = this.textNodeDataArray
      console.log('------this.textNodeDataArray---------')
      console.log(this.textNodeDataArray)
      // this.myDiagram.model = myModel;
      this.$set(this.myDiagramText, 'model', myTextModel)
    }

    /**
       * options:{
       *  category
       *  shape:RoundedRectangle/Rectangle
       *  shapeOptions:{
       *   fill:bluegrad/greengrad/yellowgrad/null/redgrad/whitegrad  自定义的
       *   stroke: "black",
       *   portId:""
       *   fromLinkable:true
       *   toLinkable:
       *   cursor:"pointer"
       *   fromEndSegmentLength:40
       *    toEndSegmentLength
       *    strokeWidth
       *
       *   }
       *    textStyle:
       *        { margin: 9,
            maxSize: new go.Size(200, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true,
            textAlign: "center",
            font: smallfont },
       *
       * }
       */

    // addNodeTemplate(options) {
    //   const fill = this.getOption()[options.shapeOptions.fill]
    //   options.shapeOptions.fill = fill
    //   this.myDiagram.nodeTemplateMap.add(options.category,
    //     GO(go.Node, 'Auto',
    //       new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    //       GO(go.Shape, options.shape, options.shapeOptions),
    //       GO(go.TextBlock, this.textStyle(),
    //         new go.Binding('text', 'text').makeTwoWay())
    //     ))
    // }
  }

  // watch: {
  //   // 监听父组件的message数据，因为子组件是和父组件一起加载模版，所以oldValue第一次为空，需要把newValue监听到的新数据返回给页面绘图
  //   message(newValue, oldValue){
  //     this.nodeDataArray = newValue;
  //     // 赋完数据之后调用
  //     this.init();
  //   }
  // }

}

</script>

<style scoped>
.tip{
  color:red;
  font-size:0.8em;
  font-weight:bold;
  padding:5px;
}
#myDiagramDiv{
  height: 300px;
  border: solid 1px #d3d3d3;
}

#myDiagramText{
  height: 300px;
  border: solid 1px #d3d3d3;
}

</style>
