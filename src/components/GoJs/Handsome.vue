<template>
  <div class="goDemo">
    <el-row style="margin-top:10px;text-align:left;">
      Handsome项目使用Vue + ElementUI + Webpack 集成了GoJs的流程图插件，基本实现了组态的各种操作
    </el-row>
    
    <el-row style="margin-top:10px;text-align:left;">
      <el-col :span="4">
        <div id="myPaletteDiv" style="width:200px; height:800px; background-color: #F5F5F5;"></div>
      </el-col>
      <el-col :span="8">
        <div id="myDiagramDiv" style="width:800px; height:800px; background-color: #F5F5F5;"></div>
      </el-col>

    </el-row>
    
  </div>
</template>

<script>
// import { Inspector } from '@/api/DataInspector'


export default {
  data() {
    return {
      tree_group_name: "tree_model",
      dialogTreeNameVisible: false,
      div_show: false,
      nodeIdCounter: 50,
      dialogUpdateFormVisible: false,
      sel_nodeInfo: null,
      lables_col: [
        { en_name: "key", cn_name: "编码" },
        { en_name: "text", cn_name: "内容" },
        { en_name: "group", cn_name: "树标" }
      ],
      node_form: { key: "", text: "", group: "" },

    // "nodeDataArray": [
    //   {"key":1, "text":"Main 1", "isGroup":true, "category":"OfGroups"},
    //   {"key":2, "text":"Main 2", "isGroup":true, "category":"OfGroups"},
    //   {"key":3, "text":"Group A", "isGroup":true, "category":"OfNodes", "group":1},
    //   {"key":4, "text":"Group B", "isGroup":true, "category":"OfNodes", "group":1},
    //   {"key":5, "text":"Group C", "isGroup":true, "category":"OfNodes", "group":2},
    //   {"key":6, "text":"Group D", "isGroup":true, "category":"OfNodes", "group":2},
    //   {"key":7, "text":"Group E", "isGroup":true, "category":"OfNodes", "group":6},
    //   {"text":"first A", "group":3, "key":-7},
    //   {"text":"second A", "group":3, "key":-8},
    //   {"text":"first B", "group":4, "key":-9},
    //   {"text":"second B", "group":4, "key":-10},
    //   {"text":"third B", "group":4, "key":-11},
    //   {"text":"first C", "group":5, "key":-12},
    //   {"text":"second C", "group":5, "key":-13},
    //   {"text":"first D", "group":6, "key":-14},
    //   {"text":"first E", "group":7, "key":-15}
    //   ],
    //   "linkDataArray": [  ]


      modelData: {
       "nodeDataArray": [
        {"key":1, "text":"Main 1", "isGroup":true, "category":"OfGroups"},
        {"key":2, "text":"Main 2", "isGroup":true, "category":"OfGroups"},
        {"key":3, "text":"Group A", "isGroup":true, "category":"OfNodes", "group":1},
        {"key":4, "text":"Group B", "isGroup":true, "category":"OfNodes", "group":1},
        {"key":5, "text":"Group C", "isGroup":true, "category":"OfNodes", "group":2},
        {"key":6, "text":"Group D", "isGroup":true, "category":"OfNodes", "group":2},
        {"key":7, "text":"Group E", "isGroup":true, "category":"OfNodes", "group":6},
        {"text":"first A", "group":3, "key":-7},
        {"text":"second A", "group":3, "key":-8},
        {"text":"first B", "group":4, "key":-9},
        {"text":"second B", "group":4, "key":-10},
        {"text":"third B", "group":4, "key":-11},
        {"text":"first C", "group":5, "key":-12},
        {"text":"second C", "group":5, "key":-13},
        {"text":"first D", "group":6, "key":-14},
        {"text":"first E", "group":7, "key":-15}
        ],
        "linkDataArray": [  ]
      },
      rm_list_node: [],
      rm_list_link: []
    };
  },

  mounted() {
    const mySelf = this;
    const MAKE = go.GraphObject.make;

    mySelf.myDiagram =
      MAKE(go.Diagram, "myDiagramDiv",
        {
          // what to do when a drag-drop occurs in the Diagram's background
          mouseDrop: function(e) { finishDrop(e, null); },
          layout:  // Diagram has simple horizontal layout
            MAKE(go.GridLayout,
              { wrappingWidth: Infinity, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1) }),
          "commandHandler.archetypeGroupData": { isGroup: true, category: "OfNodes" },
          "undoManager.isEnabled": true
        });

          // There are two templates for Groups, "OfGroups" and "OfNodes".

      // this function is used to highlight a Group that the selection may be dropped into
      function highlightGroup(e, grp, show) {
        if (!grp) return;
        e.handled = true;
        if (show) {
          // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
          // instead depend on the DraggingTool.draggedParts or .copiedParts
          var tool = grp.diagram.toolManager.draggingTool;
          var map = tool.draggedParts || tool.copiedParts;  // this is a Map
          // now we can check to see if the Group will accept membership of the dragged Parts
          if (grp.canAddMembers(map.toKeySet())) {
            grp.isHighlighted = true;
            return;
          }
        }
        grp.isHighlighted = false;
      }

      // Upon a drop onto a Group, we try to add the selection as members of the Group.
      // Upon a drop onto the background, or onto a top-level Node, make selection top-level.
      // If this is OK, we're done; otherwise we cancel the operation to rollback everything.
      function finishDrop(e, grp) {
        var ok = (grp !== null
          ? grp.addMembers(grp.diagram.selection, true)
          : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
        if (!ok) e.diagram.currentTool.doCancel();
      }  

      // There are two templates for Groups, "OfGroups" and "OfNodes".

    mySelf.myDiagram.groupTemplateMap.add("OfGroups",
      MAKE(go.Group, "Auto",
        {
          background: "transparent",
          // highlight when dragging into the Group
          mouseDragEnter: function(e, grp, prev) { highlightGroup(e, grp, true); },
          mouseDragLeave: function(e, grp, next) { highlightGroup(e, grp, false); },
          computesBoundsAfterDrag: true,
          // when the selection is dropped into a Group, add the selected Parts into that Group;
          // if it fails, cancel the tool, rolling back any changes
          mouseDrop: finishDrop,
          handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
          // Groups containing Groups lay out their members horizontally
          layout:
            MAKE(go.GridLayout,
              {
                wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
              })
        },
        new go.Binding("background", "isHighlighted", function(h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
        MAKE(go.Shape, "Rectangle",
          { fill: null, stroke: "#FFDD33", strokeWidth: 2 }),
        MAKE(go.Panel, "Vertical",  // title above Placeholder
          MAKE(go.Panel, "Horizontal",  // button next to TextBlock
            { stretch: go.GraphObject.Horizontal, background: "#FFDD33" },
            MAKE("SubGraphExpanderButton",
              { alignment: go.Spot.Right, margin: 5 }),
            MAKE(go.TextBlock,
              {
                alignment: go.Spot.Left,
                editable: true,
                margin: 5,
                font: "bold 18px sans-serif",
                opacity: 0.75,
                stroke: "#404040"
              },
              new go.Binding("text", "text").makeTwoWay())
          ),  // end Horizontal Panel
          MAKE(go.Placeholder,
            { padding: 5, alignment: go.Spot.TopLeft })
        )  // end Vertical Panel
      ));  // end Group and call to add to template Map

    mySelf.myDiagram.groupTemplateMap.add("OfNodes",
      MAKE(go.Group, "Auto",
        {
          background: "transparent",
          ungroupable: true,
          // highlight when dragging into the Group
          mouseDragEnter: function(e, grp, prev) { highlightGroup(e, grp, true); },
          mouseDragLeave: function(e, grp, next) { highlightGroup(e, grp, false); },
          computesBoundsAfterDrag: true,
          // when the selection is dropped into a Group, add the selected Parts into that Group;
          // if it fails, cancel the tool, rolling back any changes
          mouseDrop: finishDrop,
          handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
          // Groups containing Nodes lay out their members vertically
          layout:
            MAKE(go.GridLayout,
              {
                wrappingColumn: 1, alignment: go.GridLayout.Position,
                cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
              })
        },
        new go.Binding("background", "isHighlighted", function(h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
        MAKE(go.Shape, "Rectangle",
          { fill: null, stroke: "#33D3E5", strokeWidth: 2 }),
        MAKE(go.Panel, "Vertical",  // title above Placeholder
          MAKE(go.Panel, "Horizontal",  // button next to TextBlock
            { stretch: go.GraphObject.Horizontal, background: "#33D3E5" },
            MAKE("SubGraphExpanderButton",
              { alignment: go.Spot.Right, margin: 5 }),
            MAKE(go.TextBlock,
              {
                alignment: go.Spot.Left,
                editable: true,
                margin: 5,
                font: "bold 16px sans-serif",
                opacity: 0.75,
                stroke: "#404040"
              },
              new go.Binding("text", "text").makeTwoWay())
          ),  // end Horizontal Panel
          MAKE(go.Placeholder,
            { padding: 5, alignment: go.Spot.TopLeft })
        )  // end Vertical Panel
      ));  // end Group and call to add to template Map

    mySelf.myDiagram.nodeTemplate =
      MAKE(go.Node, "Auto",
        { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
          mouseDrop: function(e, nod) { finishDrop(e, nod.containingGroup); }
        },
        MAKE(go.Shape, "Rectangle",
          { fill: "#ACE600", stroke: null },
          new go.Binding("fill", "color")),
        MAKE(go.TextBlock,
          {
            margin: 5,
            editable: true,
            font: "bold 13px sans-serif",
            opacity: 0.75,
            stroke: "#404040"
          },
          new go.Binding("text", "text").makeTwoWay())
      );

    // initialize the Palette and its contents
    mySelf.myPalette =
      MAKE(go.Palette, "myPaletteDiv",
        {
          nodeTemplateMap: mySelf.myDiagram.nodeTemplateMap,
          groupTemplateMap: mySelf.myDiagram.groupTemplateMap,
          layout: MAKE(go.GridLayout, { wrappingColumn: 1, alignment: go.GridLayout.Position })
        });

    mySelf.myPalette.model = new go.GraphLinksModel([
      { text: "lightgreen", color: "#ACE600" },
      { text: "yellow", color: "#FFDD33" },
      { text: "lightblue", color: "#33D3E5" }
    ]);

    // const slider = document.getElementById("levelSlider");
    // slider.addEventListener('change', reexpand);
    // slider.addEventListener('input', reexpand);

    load();

    function load() {
      mySelf.myDiagram.model = go.Model.fromJson(mySelf.modelData);
    };

    function expandGroups(g, i, level) {
      if (!(g instanceof go.Group)) return;
      g.isSubGraphExpanded = i < level;
      g.memberParts.each(function(m) {
        expandGroups(m, i + 1, level);
      })
    };
  },

  methods: {
    // 加载一颗树
    load() {
      this.myDiagram.model = go.Model.fromJson(this.modelData);
    },

    expandGroups(g, i, level) {
      if (!(g instanceof go.Group)) return;
      g.isSubGraphExpanded = i < level;
      g.memberParts.each(function(m) {
        expandGroups(m, i + 1, level);
      })
    },

    reexpand(e) {
      this.myDiagram.startTransaction("reexpand");
      var level = parseInt(document.getElementById("levelSlider").value);
      this.myDiagram.findTopLevelGroups().each(function(g) { expandGroups(g, 0, level); })
      this.myDiagram.commitTransaction("reexpand");
    },

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