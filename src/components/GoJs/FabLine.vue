<template>
  <div class="goDemo">
    <el-row style="margin-top:10px;text-align:left;">
      制造产线设备集群监控模拟
    </el-row>
    
    <el-row style="margin-top:10px;text-align:left;">
      <el-col :span="8">
        <div id="myDiagramDiv" style="width:1200px; height:800px; background-color: #F5F5F5;"></div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
// import { Inspector } from '@/api/DataInspector'


export default {
  data() {
    return {

      modelData: {
       "nodeDataArray": [
        {"key":"1", "text":"Switch 23", "type":"S2", "loc":"195 225"},
        {"key":"2", "text":"Machine 17", "type":"M4", "loc":"183.5 94"},
        {"key":"3", "text":"Panel 7", "type":"P2", "loc":"75 211.5"},
        {"key":"4", "text":"Switch 24", "type":"S3", "loc":"306 225"},
        {"key":"5", "text":"Machine 18", "type":"M5", "loc":"288.5 95"},
        {"key":"6", "text":"Panel 9", "type":"P1", "loc":"426 211"},
        {"key":"7", "text":"Instr 3", "type":"I1", "loc":"-50 218"} ],
        "linkDataArray": [
        {"from":"1", "to":"2"},
        {"from":"1", "to":"3"},
        {"from":"1", "to":"4"},
        {"from":"4", "to":"5"},
        {"from":"4", "to":"6"},
        {"from":"7", "to":"2"},
        {"from":"7", "to":"3"}
        ]
      },

    };
  },

  mounted() {
    const mySelf = this;
    const MAKE = go.GraphObject.make;


    mySelf.myDiagram =
        MAKE(go.Diagram, "myDiagramDiv",
          {
            "animationManager.isEnabled": false,
          });

      // conversion functions for Bindings in the Node template:

    function nodeTypeImage(type) {
      switch (type) {
        case "S2": return "5.png";
        case "S3": return "@/assets/zutai_images/2.png";
        case "P1": return "@/assets/zutai_images/3.png";
        case "P2": return "@/assets/zutai_images/4.png";
        case "M4": return "@/assets/zutai_images/5.png";
        case "M5": return "@/assets/zutai_images/6.png";
        case "I1": return "@/assets/zutai_images/7.png";
        default: return "5.png";
      }
      if (type.charAt(0) === "S") return
      if (type.charAt(0) === "P") return "@/assets/zutai_images/1.png";
      if (type.charAt(0) === "M")
        return "@/assets/zutai_images/9.png";
    }

    function nodeProblemConverter(msg) {
      if (msg) return "red";
      return null;
    }

    function nodeOperationConverter(s) {
      if (s >= 2) return "TriangleDown";
      if (s >= 1) return "Rectangle";
      return "Circle";
    }

    function nodeStatusConverter(s) {
      if (s >= 2) return "red";
      if (s >= 1) return "yellow";
      return "green";
    }

    mySelf.myDiagram.nodeTemplate =
      MAKE(go.Node, "Vertical",
        { locationObjectName: "ICON" },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        MAKE(go.Panel, "Spot",
          MAKE(go.Panel, "Auto",
            { name: "ICON" },
            MAKE(go.Shape,
              { fill: null, stroke: null },
              new go.Binding("background", "problem", nodeProblemConverter)),
            MAKE(go.Picture,
              { margin: 5 },
              // new go.Binding("source", "type", nodeTypeImage))
              new go.Binding("source", "type", "./5.png"))
          ),  // end Auto Panel
          MAKE(go.Shape, "Circle",
            {
              alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft,
              width: 12, height: 12, fill: "orange"
            },
            new go.Binding("figure", "operation", nodeOperationConverter)),
          MAKE(go.Shape, "Triangle",
            {
              alignment: go.Spot.TopRight, alignmentFocus: go.Spot.TopRight,
              width: 12, height: 12, fill: "blue"
            },
            new go.Binding("fill", "status", nodeStatusConverter))
        ),  // end Spot Panel
        MAKE(go.TextBlock,
          new go.Binding("text"))
      );  // end Node


    // conversion function for Bindings in the Link template:

    function linkProblemConverter(msg) {
      if (msg) return "red";
      return "gray";
    }

    mySelf.myDiagram.linkTemplate =
      MAKE(go.Link, go.Link.AvoidsNodes,
        { corner: 3 },
        MAKE(go.Shape,
          { strokeWidth: 2, stroke: "gray" },
          new go.Binding("stroke", "problem", linkProblemConverter))
      );

    load();

    // simulate some real-time problem monitoring, once every two seconds:
    function randomProblems() {
      var model = mySelf.myDiagram.model;
      // update all nodes
      var arr = model.nodeDataArray;
      for (var i = 0; i < arr.length; i++) {
        var data = arr[i];
        data.problem = (Math.random() < 0.8) ? "" : "Power loss due to ...";
        data.status = Math.random() * 3;
        data.operation = Math.random() * 3;
        model.updateTargetBindings(data);
      }
      // and update all links
      arr = model.linkDataArray;
      for (i = 0; i < arr.length; i++) {
        var data = arr[i];
        data.problem = (Math.random() < 0.7) ? "" : "No Power";
        model.updateTargetBindings(data);
      }
    }

    function loop() {
      setTimeout(function() { randomProblems(); loop(); }, 2000);
    }

    loop();  // start the simulation
  

    function load() {
      mySelf.myDiagram.model = go.Model.fromJson(mySelf.modelData);
    }

  },

  methods: {
  }
};
</script>

<style scoped>
.editor_table {
  background-color: burlywood !important;
  /* width: 400px;
  position: absolute;
  top: 50px; */
}
</style>