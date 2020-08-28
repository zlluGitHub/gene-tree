var tree = null;
var isTransitions = true;
var treeData = "";
var stepArrData = [];
var stepIndex = 0;

function init_tree(tree_data, isUpdate) {
  $(".loading-box").attr("style", "display:flex");
  treeData = trim(tree_data);
  if (!isUpdate) {
    stepArrData.push(treeData);
    stepIndex = stepArrData.length - 1;
  };

  // 配置项
  var config = {
    leftOffset: 50,
    moveRightLabel: 0,
    legend: {
      range: [0, 1],
      color: ["#000", "#333", "#666", "#999", "#ccc"],
      x: 10,
      y: 40,
      space: 12,
      font: {
        size: 11,
        color: "rgb(51, 51, 51)",
        family: '"Helvetica Neue", Helvetica, sans-serif',
        x: -6,
        y: 0
      },
      shape: {
        type: 'circle', // rect circle
        r: 6,
        width: 15,
        height: 15,
        stroke: "#666",
        style: "stroke-width: 0.5;"
      },
    },

    lable_legend: {
      show: false,
      distance: 50, //label间距
      x: 0,
      y: 26,
      space: 5,
      padding: 10,
      color: "#aaa"
    },
    node: {
      size: 4,
      font: {
        // size: "",
        // color: "",
        family: '"Helvetica Neue", Helvetica, sans-serif',
        x: -30,
        y: 12
      }
    }
  };

  // 添加 node 节点图例
  var chart_l = d3.select('#chart_l');
  var cl = config.legend.range ? config.legend.range : [0, 1];
  var scale = (cl[1] - cl[0]) / 5;
  var colorArr = config.legend.color ? config.legend.color : ["#AE271C", "#F93529", "#F96D29", "#FFA503", "#FFE700"];
  var legendArr = [
    { index: 'leg1', name: '(' + (cl[0] + scale * 4).toFixed(2) + '~' + (cl[0] + scale * 5).toFixed(2) + ']', color: colorArr[0], start: (cl[0] + scale * 4).toFixed(2), end: (cl[0] + scale * 5).toFixed(2) },
    { index: 'leg2', name: '(' + (cl[0] + scale * 3).toFixed(2) + '~' + (cl[0] + scale * 4).toFixed(2) + ']', color: colorArr[1], start: (cl[0] + scale * 3).toFixed(2), end: cl[0] + scale * 4 },
    { index: 'leg3', name: '(' + (cl[0] + scale * 2).toFixed(2) + '~' + (cl[0] + scale * 3).toFixed(2) + ']', color: colorArr[2], start: (cl[0] + scale * 2).toFixed(2), end: (cl[0] + scale * 3).toFixed(1) },
    { index: 'leg4', name: '(' + (cl[0] + scale * 1).toFixed(2) + '~' + (cl[0] + scale * 2).toFixed(2) + ']', color: colorArr[3], start: (cl[0] + scale * 1).toFixed(2), end: cl[0] + scale * 2 },
    { index: 'leg5', name: '[' + (cl[0]).toFixed(2) + '~' + (cl[0] + scale * 1).toFixed(2) + ']', color: colorArr[4], start: (cl[0] + scale * 1).toFixed(2), end: (scale * 1).toFixed(2) },
  ];

  var isClickArr = [], each = null;
  chart_l.attr("transform", 'translate(' + config.legend.x + ',' + config.legend.y + ')')
  var legend = chart_l.selectAll(".legend").data(legendArr).enter().append("g").attr("class", "legend")
    .attr("index", function (item, i) {
      return item.index;
    }).attr("cursor", "pointer")
    .attr("transform", function (item, i) {
      return 'translate(0,' + (config.legend.space + config.legend.shape.height) * i + ')'
    })
    .on("mouseover", function (d, i) {
      d3.select(this).select(config.legend.shape.type).transition().duration(200).attr("transform", "translate(-1,-1)scale(1.2)")
      d3.selectAll('.' + d3.select(this).attr("index")).transition().duration(200).attr("r", 7);
    })
    .on("mouseout", function (d, i) {
      var _this = this;
      each = d3.select(this).attr("index");
      d3.select(this).select(config.legend.shape.type).transition().duration(200).attr("transform", "")
      d3.selectAll('.' + each).transition().duration(200).attr("r", config.node.size);
      isClickArr.forEach(function (item, i) {
        if (each === item) {
          d3.select(_this).select(config.legend.shape.type).transition().duration(200).attr("transform", "translate(-1,-1)scale(1.2)")
          d3.selectAll('.' + item).transition().duration(200).attr("r", 7);
        }
      });
    })
    .on("click", function (d, i) {
      var is = false;
      each = d3.select(this).attr("index");
      isClickArr.forEach(function (item, i) {
        if (each === item) {
          isClickArr.splice(i, 1);
          is = true;
        }
      });
      if (!is) {
        isClickArr.push(each)
      };
      d3.select(this).select(config.legend.shape.type).transition().duration(200).attr("transform", "translate(-1,-1)scale(1.2)")
      d3.selectAll('.' + d3.select(this).attr("index")).transition().duration(200).attr("r", 7);
    });

  legend.append(config.legend.shape.type).attr("r", config.legend.shape.r).attr("width", config.legend.shape.width).attr("height", config.legend.shape.height)
    .attr("fill", function (item) {
      return item.color
    }).attr("stroke", config.legend.shape.stroke).attr("style", config.legend.shape.style)

  legend.append("text").attr("x", config.legend.font.x + 23).attr("y", config.legend.font.y + 10)
    .attr("style", 'font-size: ' + config.legend.font.size + 'px; fill: ' + config.legend.font.color + '; font-family: ' + config.legend.font.family + ';').text(function (obj) {
      return obj.name
    }).attr("transform", function (d) {
      return "translate(-5,-" + (config.legend.shape.r - 1) + ")"
    })

  // 初始化树图
  var chart_g = d3.select("#chart_g");
  tree = d3.layout.phylotree()
    .options({
      'left-offset': config.leftOffset,
      'show-scale': true,
      // 'left-right-spacing': 'fit-to-size',
      // 'top-bottom-spacing': 'fit-to-size',
      // zoom: true,
      transitions: isTransitions,
      language: 'ch', //chinese english
      legend: legendArr,
      itemStyle: config,
      'scaleBar-position': 'bottom', //比例尺 bottom
      "bar-ispot": false
    })
    .radial(false)
    .svg(chart_g)
    .align_tips(true)
    // .size([svg_width - 20, svg_height - 160])
    .node_circle_size(config.node.size) // 节点圆圈大小
  // var attribute_to_color = d3.scale.category10();

  var labelNameArr = [];
  for (var key in labelConfig) {
    labelNameArr.push(key)
  }
  // svg 的宽度 （用于添加label）
  var standard_label = tree.branch_name();
  var labelRight = "";
  for (var index = 0; index < labelNameArr.length; index++) {
    labelRight = labelRight + "     ";
  }
  tree.branch_name(function (node) { // 最右侧 label 名字
    var label = standard_label(node) + labelRight;
    // console.log(label);
    label = label.replace(/\#/g, "	")
    label = label.replace(/\</g, "(")
    label = label.replace(/\>/g, ")")
    return label;
  });

  tree(d3.layout.newick_parser(treeData));
  tree.spacing_x(18).spacing_y(35);

  var maximum_length = 0;
  tree.traverse_and_compute(function (node) {
    if (d3.layout.phylotree.is_leafnode(node)) {
      maximum_length = maximum_length < node.name.length ? node.name.length : maximum_length;
    }
  });

  // label 形状
  var move_past_label = maximum_length * 6.8 + config.moveRightLabel;
  tree.style_nodes(function (element, node_data, i) {
    // 右边的小方块和label
    if (node_data.name in configData) {
      var font_size = d3.layout.fontSize;
      var x_shift = tree.shift_tip(node_data)[0] + move_past_label;
      var node_item = configData[node_data.name], i = 0;

      element.selectAll('rect').remove();
      element.selectAll('circle').remove();
      element.selectAll('polygon').remove();

      labelNameArr.forEach((each, i) => {
        if (node_item[each]) {

          shape_select(element, node_item[each], x_shift, font_size, i, each)
        }
      });
    }
  });

  var distance = config.lable_legend.distance; //label间距
  function shape_select(element, item, x_shift, font_size, i, labelName) {
    if (item.label) {
      var fill = item.color ? item.color : '#ccc';
      var range = labelConfig[labelName].length ? labelConfig[labelName].length : [0, 1];

      var length = item.length ? ((item.length * 1 - range[0]) / (range[1] - range[0]) * (distance - 12)) : 0;
      var Xoffset = x_shift + distance * i;
      var yoffset = -font_size * 0.5;
      switch (item.shape) {
        case 'square'://正方形
          element.append("rect").attr("width", font_size * 0.9).attr("height", font_size * 0.9).style("fill", fill)
            .attr("transform", "translate(" + (Xoffset + font_size * 1.15) + "," + (yoffset + font_size * 0.15) + ") scale(1)")
            .attr("cursor", "pointer")
            .append("title").text(item.label)
          // .on("mouseover", function (d, i) {
          //   element.select('.' + classs)
          //     .attr("style", "display: block;");
          // })
          // .on("mouseout", function (d, i) {
          //   // d3.select(this)
          //   element.select('.' + classs)
          //     .attr("style", "display: none;");
          // });

          break;
        case 'triangle'://三角形
          element.append("polygon").attr("points", "7.5,0 15,12 0,12").attr("style", 'fill:' + fill + '; stroke:black;stroke-width:0.5px;')
            .attr("transform", "translate(" + (Xoffset + font_size) + "," + yoffset + ") scale(" + font_size * 0.08 + ")")
            .attr("cursor", "pointer")
            .append("title").text(item.label)
          break;
        case 'circle'://圆形
          element.append("circle").attr("r", font_size * 0.5).attr("style", 'fill:' + fill + '; stroke:black;stroke-width:0.5px;')
            .attr("transform", "translate(" + (Xoffset + font_size * 1.5 + 1) + "," + (yoffset + font_size * 0.5) + ") scale(1)")
            .attr("cursor", "pointer")
            .append("title").text(item.label)
          break;
        case 'rhombus'://菱形
          element.append("polygon").attr("points", "10,10 17.5,5 25,10 17.5,15").attr("style", 'fill:' + fill + '; stroke:black;stroke-width:0.5px;')
            .attr("transform", "translate(" + (Xoffset) + "," + (yoffset - font_size * 0.4) + ") scale(" + font_size * 0.09 + ")")
            .attr("cursor", "pointer")
            .append("title").text(item.label)
          break;
        case 'star'://六角星
          element.append("polygon").attr("points", "10,0 16,18 1,6 19,6 4,18").attr("style", 'fill:' + fill + '; stroke:black;stroke-width:0.5px;')
            .attr("transform", "translate(" + (Xoffset + font_size) + "," + yoffset + ") scale(" + font_size * 0.06 + ")")
            .attr("cursor", "pointer")
            .append("title").text(item.label)
          break;
        default: //有长度
          // var offset = length ? 0 : font_size * 0.8;
          // var width = font_size + 30;
          var width = length === 0 ? font_size : length;
          element.append("rect").attr("width", width).attr("height", font_size).style("fill", fill)
            .attr("transform", "translate(" + (Xoffset + font_size) + "," + yoffset + ") scale(1)")
            .attr("cursor", "pointer")
            .append("title").text(item.label)
          break;
      };
    }
  }

  tree.layout();

  var fontSize = d3.layout.fontSize;

  // 添加样式

  d3.selectAll(".tree-selection-brush .extent").attr("fill-opacity", 0.05).attr("stroke", "#fff").attr("shape-rendering", "crispEdges")
  d3.selectAll("tree-scale-bar text").attr("font", "sans-serif")
  d3.selectAll(".tree-scale-bar line, .tree-scale-bar path").attr("fill", "none").attr("stroke", "#000").attr("shape-rendering", "crispEdges")
  // d3.selectAll("circle").attr("fill", "#999")
  d3.selectAll(".node").attr("fill", "10px sans-serif")
  d3.selectAll(".node-selected").attr("fill", "#f00")
  d3.selectAll(".node-collapsed circle, .node-collapsed ellipse, .node-collapsed rect").attr("fill", "black")
  d3.selectAll(".node-tagged").attr("fill", "#00f")
  d3.selectAll(".branch").attr("fill", "none").attr("stroke", "#999").attr("stroke-width", "2px")
  d3.selectAll(".clade").attr("fill", "#1f77b4").attr("stroke", "#444").attr("stroke-width", "2px").attr("opacity", "0.5")
  d3.selectAll(".branch-selected").attr("stroke", "#f00").attr("stroke-width", "3px")
  d3.selectAll(".branch-tagged").attr("stroke", "#00f").attr("stroke-width", "2px").attr("stroke-dasharray", "10,5")
  d3.selectAll(".branch-tracer").attr("stroke", "#bbb").attr("stroke-width", "1px").attr("stroke-dasharray", "3,4")
  d3.selectAll(".branch-multiple").attr("stroke-dasharray", "5, 5, 1, 5").attr("stroke-width", "3px")


  // 树和比例尺的偏移量
  var dom_g = document.querySelector('#chart_g');
  var g_width = dom_g.getBoundingClientRect().width;
  var g_height = dom_g.getBoundingClientRect().height;
  d3.select("#chart_svg").attr('width', g_width + fontSize * 10).attr('height', g_height + fontSize * 7);
  chart_g.attr("transform", "translate(" + config.leftOffset + ",0) scale(1)")
  // console.log(g_height);
  d3.select(".tree-scale-bar").attr("transform", "translate(" + config.leftOffset + "," + (g_height + fontSize) + ")")

  //添加 label 图例  
  var tree_scale_bar_width = document.querySelector('.tree-scale-bar').getBBox().width;
  labelNameArr.forEach((each, index) => {
    if (labelConfig[each]) {
      let title = labelConfig[each].legend.name ? labelConfig[each].legend.name : each
      label_legend(labelConfig[each], title, index)
    }
  });

  function label_legend(dataObj, title, i) {
    // 展开按钮
    let label_legend_offset = tree_scale_bar_width + config.leftOffset + move_past_label + distance * i + fontSize * 1.5;
    // let label_legend_offset =0 + distance * i;
    let legend_button = d3.select('#chart_g').append("g").attr("id", "legend-button-" + i).attr("transform", 'translate(' + label_legend_offset + ',' + config.lable_legend.y + ')').attr("cursor", "pointer")
      .on("click", function () {

        let dom_legend_box = d3.select("#legend-box-" + i);
        if (dom_legend_box.attr("display") !== 'block') {
          d3.selectAll('.legend-box').attr("display", "none");
          d3.selectAll('.arrow').attr("style", 'transform: rotate(-180deg); transform-origin: 50% 50% 0px; transition: all 350ms ease-in-out 0s;');

          dom_legend_box.attr("display", "block");
          d3.select("#arrow-" + i).attr("style", 'transform: rotate(0deg); transform-origin: 50% 50% 0px; transition: all 350ms ease-in-out 0s;');
        } else {
          d3.selectAll('.legend-box').attr("display", "none");
          d3.selectAll('.arrow').attr("style", 'transform: rotate(-180deg); transform-origin: 50% 50% 0px; transition: all 350ms ease-in-out 0s;');
        }
      });
    // let awg = isTow ? fontSize * 1.8 : fontSize * 2.5;
    legend_button.append("text").text(title).attr("style", 'font-size: ' + fontSize * 0.9 + 'px;').attr("fill", "#666")
    legend_button.append("g").attr("transform", "translate(" + fontSize * 2.5 + ",-6)").append("svg").attr("width", "8").attr("height", "8").attr("viewBox", "0 0 1792 1792").append("path").attr("d", "M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z").attr("style", 'transform: rotate(-180deg); transform-origin: 50% 50% 0px; transition: all 350ms ease-in-out 0s;').attr("fill", "#666").attr("id", "arrow-" + i).attr("class", "arrow")

    let lable_box = d3.select('#chart_g').append("g").attr("id", "legend-box-" + i).attr("class", "legend-box").attr("transform", 'translate(' + (label_legend_offset - 0) + ',' + (config.lable_legend.y + 7) + ')').attr("display", config.lable_legend.show ? "block" : "none")

    let igObject = dataObj.legend.color;
    if (igObject) {// 图例内容（长方形）
      let legend_data = [], bgcHigth = 0, bgcWidth = 0;
      for (let key in igObject) {
        bgcWidth = igObject[key].length > bgcWidth ? igObject[key].length : bgcWidth
        bgcHigth = bgcHigth + config.lable_legend.space + fontSize
        legend_data.push({ name: igObject[key], color: key })
      };
      bgcWidth = bgcWidth * 6 + fontSize * 3.5;
      bgcHigth = bgcHigth + config.lable_legend.padding * 2;

      // let width_bgc = isTow ? 110 : 170; //背景
      lable_box.append("rect").attr("width", bgcWidth).attr("height", bgcHigth).attr("style", "fill:rgba(255,255,255,0.95);stroke:rgba(0,0,0,.4);stroke-width: 0.3;")
      let lable_legend = lable_box.selectAll(".item-" + i).data(legend_data).enter().append("g").attr("class", "item-" + i)
        .attr("transform", function (item, i) {
          return 'translate(' + config.lable_legend.padding + ',' + ((config.lable_legend.space + fontSize) * i + config.lable_legend.padding) + ')'
        });

      // 内容
      lable_legend.append("rect").attr("width", fontSize * 1.5).attr("height", fontSize * 0.8).attr("fill", function (d) {
        return d.color
      }).attr("style", "stroke:#aaa;stroke-width:0.5;")
      lable_legend.append("text").attr("x", fontSize * 2).attr("y", fontSize / 2 + 4).text(function (obj) { return obj.name })
        .attr("style", 'font-size: ' + fontSize * 0.9 + 'px;')
        .attr("fill", "#999")
    } else {
      // 其它图形
      let shapeData = dataObj.legend.shape, bgcHigth = 0, bgcWidth = 0;
      if (shapeData) {
        let flag_bgc = lable_box.insert("rect").attr("fill", "rgba(255,255,255,0.95)").attr("style", "stroke:rgba(0,0,0,.4);stroke-width: 0.3;") //背景
        for (let key in shapeData) {
          bgcWidth = shapeData[key].length > bgcWidth ? shapeData[key].length : bgcWidth
          bgcHigth = bgcHigth + config.lable_legend.space + fontSize;
          let flag_g = lable_box.append("g").attr("class", "flag-item").attr("transform", 'translate(' + config.lable_legend.padding + ',' + bgcHigth + ')');
          let text_x = fontSize * 2, text_y = fontSize / 2 + 4;
          switch (key) {
            case 'square'://正方形
              flag_g.append("rect").attr("width", fontSize * 0.9).attr("height", fontSize * 0.9).attr("style", 'fill:' + config.lable_legend.color + '; stroke:black;stroke-width:0.5px;')
                .append("title").text(shapeData[key])
              break;
            case 'circle'://圆形
              text_y = text_y - 5
              flag_g.append("circle").attr("r", fontSize * 0.5).attr("style", 'fill:' + config.lable_legend.color + '; stroke:black;stroke-width:0.5px;')
                .attr("cx", fontSize * 0.4).attr("cy", 0)
                .append("title").text(shapeData[key])
              break;
            case 'rhombus'://菱形
              text_y = text_y - 1
              flag_g.append("polygon").attr("points", "10,10 17.5,5 25,10 17.5,15").attr("style", 'fill:' + config.lable_legend.color + '; stroke:black;stroke-width:0.5px;').attr("transform", "translate(-" + fontSize * 0.9 + ",-" + fontSize / 2 + ") scale(" + fontSize * 0.08 + ")")
                .append("title").text(shapeData[key])
              break;
            case 'star'://六角星
              text_y = text_y - fontSize * 0.7
              flag_g.append("polygon").attr("points", "10,0 16,18 1,6 19,6 4,18").attr("style", 'fill:' + config.lable_legend.color + '; stroke:black;stroke-width:0.5px;')
                .attr("transform", "translate(-" + fontSize * 0.2 + ",-" + fontSize * 0.8 + ") scale(" + fontSize * 0.06 + ")")
                .append("title").text(shapeData[key])
              break;
            case 'triangle'://三角形
              flag_g.append("polygon").attr("points", "7.5,0 15,12 0,12").attr("style", 'fill:' + config.lable_legend.color + '; stroke:black;stroke-width:0.5px;')
                .attr("transform", "translate(0,0) scale(" + fontSize * 0.07 + ")")
                .append("title").text(shapeData[key])
              break;
            // default: //长方形
            //   flag_g.append("rect").attr("width", fontSize + length).attr("height", fontSize).style("fill", config.flag_legend.color)
            //     // .attr("x", 0).attr("y", -fontSize / 2)
            //     .append("title").text(shapeData[key])
            //   break;
          }
          flag_g.append("text").attr("x", text_x).attr("y", text_y).text(shapeData[key])
            .attr("style", 'font-size: ' + fontSize * 0.9 + 'px;')
            .attr("fill", "#999")
        };
        bgcHigth = bgcHigth + config.lable_legend.padding * 2;
        bgcWidth = bgcWidth * 5 + fontSize * 3.5;
        // let width_bgc = isTow ? 80 : 70;
        flag_bgc.attr("width", bgcWidth).attr("height", bgcHigth);
      }
    }
  }
  // d3.select('#chart_svg').on("click", function () {

  //   let isBlock = false
  //   d3.selectAll('.legend-box').each(function () {
  //     console.log(d3.select(this).attr("display"));
  //     if (d3.select(this).attr("display") === 'block') {
  //       isBlock = true
  //     }
  //   });
  //   if (isBlock) {
  //     d3.selectAll('.legend-box').attr("display", "none");
  //     d3.selectAll('.arrow').attr("style", 'transform: rotate(-180deg); transform-origin: 50% 50% 0px; transition: all 350ms ease-in-out 0s;');
  //   }


  // });


  //去除空格
  function trim(testStr) {
    testStr = testStr.replace(/\ +/g, ""); //去掉空格
    // testStr = testStr.replace(/\[/g, ""); //去掉空格
    // testStr = testStr.replace(/\]/g, ""); //去掉空格
    testStr = testStr.replace(/[ ]/g, "");    //去掉空格
    testStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换
    // var result = str.replace(/\[[^]*\]/, "");
    return testStr;
  }
  $(".loading-box").attr("style", "display:none");
}

// 数据部分
// tree_data = "(((Duganella#zoogloeoides#<AB681807.1>:0.01508,(Rugamonas#rubra#<GCA_900114705.1>:0.00305,((Aquaspirillum#arcticum#<AB074523.1>:0.00878,((Undibacterium#pigrum#<GCA_003201815.1>:0.02051,Undibacterium#terreum#<GCM10011396>:0.02263)0.980:0.01177,(Herminiimonas#fonticola#<GCA_004361795.1>:0.00727,(((Herminiimonas#saxobsidens#<GCM10007237>:0.00016,Herminiimonas#contaminans#<GCM10007319>:0.00142)0.940:0.00338,(((Herbaspirillum#autotrophicum#<GCA_001189915.1>:0.00499,(Herbaspirillum#rhizosphaerae#<GCA_001189965.1>:0.01104,(Herbaspirillum#hiltneri#<GCA_001267925.1>:0.00070,Herbaspirillum#lusitanum#<GCA_000256565.1>:0.00072)1.000:0.01021)0.360:0.00444)1.000:0.00814,(Oxalicibacterium#solurbis#<GCM10011430>:0.01237,((Noviherbaspirillum#aurantiacum#<HQ830497.1>:0.00188,(Herbaspirillum#canariense#<HQ830496.1>:0.00756,Noviherbaspirillum#soli#<HQ830498.1>:0.00149)0.540:0.00406)0.990:0.01371,(Herbaspirillum#seropedicae#<GCA_001040945.1>:0.00015,(((Herbaspirillum#aquaticum#<GCA_002213425.1>:0.00071,Herbaspirillum#huttiense#subsp.#putei#<GCA_000478365.1>:0.00214)0.740:0.00057,(Herbaspirillum#frisingense#<GCA_000300975.2>:0.00612,Herbaspirillum#chlorophenolicum#<GCA_001189955.1>:0.00429)0.840:0.00287)0.950:0.00434,Herbaspirillum#rubrisubalbicans#<GCA_003719195.1>:0.00293)0.970:0.00598)0.970:0.01105)1.000:0.01247)0.210:0.00657)0.610:0.00168,(Glaciimonas#singularis#<JX218021.1>:0.01650,Collimonas#arenae#<GCA_001584165.1>:0.02038)0.910:0.00697)1.000:0.01360)0.890:0.00555,Herminiimonas#arsenicoxydans#<GCA_000026125.1>:0.00322)0.960:0.00556)1.000:0.01542)0.960:0.00841)0.930:0.00844,(((Janthinobacterium#aquaticum#<MN548378.1>:0.00014,(Janthinobacterium#violaceinigrum#<MK968136.1>:0.00143,Janthinobacterium#agaricidamnosum#<GCA_000723165.1>:0.00657)0.580:0.00142)1.000:0.00434,Janthinobacterium#rivuli#<MN548379.1>:0.00289)0.880:0.00140,Janthinobacterium#lividum#<GCA_900451145.1>:0.00016)0.950:0.00826)0.980:0.01124)0.590:0.00631)0.970:0.00996,(((Massilia#eurypsychrophila#<GCM10011259>:0.00063,Massilia#psychrophila#<GCA_002760665.1>:0.01950)1.000:0.00891,((query1_b:0.0,query1_c:0.0,query1_d:0.0,query1_e:0.0,query1_f:0.0):0.00015,(query1_a:0.00142,(query1_g:0.00014,Massilia#violaceinigra#<KF267246.2>:0.00073)0.810:0.00071)0.770:0.00071)0.950:0.00014)0.480:0.00338,Massilia#atriviolacea#<GCA_003953935.1>:0.00267)0.950:0.00729)1.000:0.01178,(Massilia#consociata#<GCM10011257>:0.01638,(Massilia#neuiana#<KX066866.1>:0.00014,GCMA0001118:0.82423)0.140:0.00455)0.990:0.00995,(((Massilia#albidiflava#<GCM10007387>:0.01817,Massilia#putida#<GCA_001941825.1>:0.01871)0.760:0.00556,(Massilia#armeniaca#<GCA_003028855.1>:0.01050,(Massilia#timonae#<GCA_000315425.1>:0.00490,(Massilia#oculi#<GCA_003143515.1>:0.01656,Massilia#arenae#<KT369857.3>:0.00895)0.610:0.00868)0.930:0.01000)0.990:0.01061)0.830:0.00665,Massilia#namucuonensis#<JF799985.1>:0.00871)0.990:0.00919);"

// tree_data = "(((Natronorubrum_tibetense_91.284%:0.021736330,0.980:0.012378428)0.996:0.016690731)0.474:0.006371801,Haloterrigena_turkmenica_90.934%:0.017875381,(((((Natronococcus_occultus_90.903%:0.024715036,Natronococcus_amylolyticus_90.669%:0.017448501)0.988:0.015135714)0.642:0.010963602)0.989:0.01333134)0.969:0.011975021,(0.345:0.004923783)0.950:0.009983374)0.582:0.004262338)"

// tree_data = "(Haloterrigena_turkmenica_90.934%:0.017875381,((Hahghtthrt:0.017875381,((zlllawdqwij-asdaw:0.015135714)0.642:0.010963602)0.989:0.01333134)0.969:0.011975021)0.582:0.004262338)"


// tree_data = "(((((((((((((((Agrobacterium#arsenijevicii#<GCA_000949895.1>:0.075393627,(Pseudorhizobium#pelagicum#<GCA_000722615.1>:0.059486974,(Neorhizobium#galegae#<GCA_000731315.1>:0.032288173,(Neorhizobium#alkalisoli#<GCA_002968635.1>:0.010648845,Neorhizobium#huautlense#<GCA_002968575.1>:0.013331359)1.000:0.021865689)1.000:0.021392216)1.000:0.023568006):0.015834089,Ciceribacter#lividus#<GCA_003337715.1>:0.06675637)0.980:0.01466691,(Rhizobium#rhizogenes#<GCA_000696095.1>:0.046008829,((query1:0.001839046,query3:0.00202898)0.964:0.000941638,(Rhizobium#laguerreae#<GCA_002008165.1>:0.005321714,(query4:0.001483495,query2:0.016603086:0.000804004)1.000:0.002885845)0.978:0.002546043)1.000:0.047629228)1.000:0.030012099)1.000:0.016426666,((Mycoplana#dimorpha#<GCA_003046475.1>:0.050327096,(Shinella#granuli#<GCA_004341885.1>:0.016845439,(Shinella#curvata#<GCA_010994455.1>:0.026548599,Shinella#kummerowiae#<GCA_009827055.1>:0.02028956)1.000:0.010269245)1.000:0.03347571)1.000:0.024137164,((Pararhizobium#polonicum#<GCA_001687365.1>:0.032885317,Pararhizobium#antarcticum#<GCA_001885585.1>:0.065498976)1.000:0.037382387,(Ensifer#adhaerens#<GCA_013283195.1>:0.032886537,((Ensifer#medicae#<GCA_007827695.1>:0.016362939,(Sinorhizobium#meliloti#<GCA_006539625.1>:0.00792573,Ensifer#arboris#<GCA_000427465.1>:0.011922315)1.000:0.00439496)1.000:0.015281581,(Ensifer#terangae#<GCM10007433>:0.020830405,(Ensifer#saheli#<GCA_001651875.1>:0.020816432,Ensifer#glycinis#<GCA_001651865.1>:0.020144325)1.000:0.00600123)0.488:0.007251557)1.000:0.020200922)1.000:0.021424929)1.000:0.016272074)1.000:0.015580312)1.000:0.030802107,(Martelella#limonii#<GCA_013344475.1>:0.040346405,Martelella#endophytica#<GCA_000960975.1>:0.04248996)1.000:0.10418917)1.000:0.034096636,Georhizobium#profundi#<GCA_003952725.1>:0.119550552)1.000:0.014773863,(Hoeflea#suaedae#<GCA_004354915.1>:0.114292277,Hoeflea#olei#<GCA_001703635.1>:0.101465749)1.000:0.043188819)0.610:0.045146914,(((Mesorhizobium#soli#<GCA_003012705.1>:0.026642285,Pseudaminobacter#salicylatoxidans#<GCA_003148475.1>:0.028768606)1.000:0.04063043,(Aminobacter#aminovorans#<GCA_900445235.1>:0.056249222,(Pseudaminobacter#manganicus#<GCA_002075885.1>:0.078749799,(Mesorhizobium#hawassense#<GCA_003289945.1>:0.032017047,(Mesorhizobium#opportunistum#<GCA_000176035.2>:0.010519202,(Mesorhizobium#erdmanii#<GCA_000472705.1>:0.013562725,Mesorhizobium#australicum#<GCA_000230995.3>:0.015424138)0.994:0.005283253)1.000:0.018892408)1.000:0.032833966)1.000:0.018508462)1.000:0.017001078)1.000:0.063172486,(Phyllobacterium#salinisoli#<GCA_003335045.1>:0.072336759,Phyllobacterium#myrsinacearum#<GCA_004217385.1>:0.079842734)1.000:0.044195899)1.000:0.032752382)1.000:0.037736823,Aurantimonas#coralicida#<GCA_000421645.1>:0.190778123)1.000:0.075489313,((Phreatobacter#oligotrophus#<GCA_003046185.1>:0.20266938,(Bradyrhizobium#symbiodeficiens#<GCA_002266465.2>:0.026468454,Bradyrhizobium#neotropicale#<GCA_001641695.1>:0.023412727)1.000:0.190458222)1.000:0.078548353,((Prosthecomicrobium#hirschii#<GCA_001305515.1>:0.189991612,Rhodobium#orientis#<GCA_003258835.1>:0.180244792)1.000:0.028127582,(Bauldia#litoralis#<GCA_900104485.1>:0.275824185,(Pleomorphomonas#diazotrophica#<GCA_002844595.1>:0.146585667,Methylobrevis#pamukkalensis#<GCA_001720135.1>:0.152992742)1.000:0.065155477)1.000:0.03243195)0.956:0.01889549)0.908:0.030747005)1.000:0.105504999,Paracoccus#tibetensis#<GCA_900102505.1>:0.363443724)1.000:0.046838963,CECT_8513.contigs:0.344775459)0.998:0.046604546,(CECT_8531.contigs:0.163481036,CECT_8016.contigs:0.163103869)1.000:0.224677058)0.998:0.276778528,(Pseudoxanthomonas#dokdonensis#<GCA_001431405.1>:0.35078195,(CCM_8639.contigs:0.354853218,Haemophilus#massiliensis#<Haemophilus_massiliensis>:0.337863548)1.000:0.094175187)1.000:0.213685873)1.000:0,Bacillus#saganii#<Bacillus_saganii>:0.68349402)Root;"








// 初始化
// init_tree(example_tree);
// init_tree(example_tree_text);
init_tree(tree_data);
// init_tree(example_tree2);
// init_tree(iTOL_salmonella_new);
// init_tree(fasttree);


/************************* 交互部分 *****************************/

// 重置
$("#reset").on("click", function (e) {
  init_tree(tree_data);
});
// 上下左右放大缩小事件
$("[data-direction]").on("click", function (e) {
  var which_function = $(this).data("direction") == 'vertical' ? tree.spacing_x : tree.spacing_y;
  which_function(which_function() + (+ $(this).data("amount"))).update();
});


// 正序、倒序、复原排列
function sort_nodes(asc) {
  tree.traverse_and_compute(function (n) {
    var d = 1;
    if (n.children && n.children.length) {
      d += d3.max(n.children, function (d) { return d["count_depth"]; });
    }
    n["count_depth"] = d;
  });
  tree.resort_children(function (a, b) {
    return (a["count_depth"] - b["count_depth"]) * (asc ? 1 : -1);
  });
}
$("#sort_original").on("click", function (e) {
  tree.resort_children(function (a, b) {
    return a["original_child_order"] - b["original_child_order"];
  });
});

$("#sort_ascending").on("click", function (e) {
  sort_nodes(true);
});

$("#sort_descending").on("click", function (e) {
  sort_nodes(false);
});

// $("[data-mode='" + (tree.radial() ? 'radial' : 'linear') + "']").on("click", function (e) {
$("#radial").on("click", function (e) {
  tree.radial(true).placenodes().update()
});
$("#linear").on("click", function (e) {
  tree.radial(false).placenodes().update()
});

$("#toggle_animation").on("click", function (e) {
  var current_mode = $(this).hasClass('active');
  $(this).toggleClass('active');
  isTransitions = !current_mode
  tree.options({ 'transitions': isTransitions });
});

// 左右对齐
$("#tip_right").on("click", function (e) {
  tree.align_tips(true).update()
});
$("#tip_left").on("click", function (e) {
  tree.align_tips(false).update()
});

// 上下步
$("#prev-step").on("click", function (e) {
  if (stepIndex >= 1) {
    stepIndex = stepIndex - 1;
    init_tree(stepArrData[stepIndex], true);
  } else {
    stepIndex = 0
    alert('已经到第一步，无法进行上一步！')
  }

});
$("#next-stept").on("click", function (e) {
  if (stepIndex < stepArrData.length - 1) {
    stepIndex = stepIndex + 1;
    init_tree(stepArrData[stepIndex], true);
  } else {
    stepIndex = stepArrData.length - 1
    alert('已经到最后一步，无法进行下一步！')
  }
});

// 保存.tree文件
$("#save-file").on("click", function (e) {
  $(".loading-box").attr("style", "display:flex");
  exportRaw('data.tree', treeData);
  $(".loading-box").attr("style", "display:none");
});

function fakeClick(obj) {
  var ev = document.createEvent("MouseEvents");
  ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
  var urlObject = window.URL || window.webkitURL || window;
  var export_blob = new Blob([data]);
  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  fakeClick(save_link);
}

// 保存.svg文件
$("#save-file-svg").on("click", function (e) {
  $(".loading-box").attr("style", "display:flex");
  saveSvg(d3.select('#chart_svg').node(), "tree.svg", { backgroundColor: "#ffffff" }).then(function () {
    $(".loading-box").attr("style", "display:none");
  });
});

// 导出.jpg
$("#save-img-jpg").on("click", function (e) {
  $(".loading-box").attr("style", "display:flex");
  // covertSVG2Image(dom_svg, 'sdsc', svg_width, svg_height, 'png')
  //   backgroundColor - 使用给定的background 颜色创建 PNG。 默认为透明。
  // left - 指定viewbox位置的左边。 默认为 0.
  // height - 指定图像的高度。 如果给定的是，或者元素高度的边界或者元素高度的CSS，或者 0的计算高度，则默认为，。
  // scale - 更改输出PNG的分辨率。 默认为 1，与源SVG相同的维度。
  // selectorRemap - 一个接受CSS选择器并在CSS中生成内联到SVG中的更换的函数。 如果SVG样式选择器是由HTML文档中的祖先元素限定的，则有用。
  // modifyStyle - 使用CSS样式并返回替换样式的函数。
  // top - 指定viewbox位置的顶部。 默认为 0.
  // width - 指定图像的宽度。 如果给定的是，或者元素宽度的边界或者元素宽度的CSS，或者 0的计算宽度，默认为，。
  // encoderType - 指示图像格式的DOMString。 默认类型为图像/png。
  // encoderOptions - 0和 1之间的数字表示图像质量。 默认值为 0.8
  // canvg - 如果传入了 canvg，它将用于将svg写入画布。 这将允许对 IE的支持
  saveSvgAsPng(d3.select('#chart_svg').node(), "tree.jpg", { backgroundColor: "#ffffff" }).then(function () {
    $(".loading-box").attr("style", "display:none");
  });
});

// 导出.pdf
$("#save-img-pdf").on("click", function (e) {
  $(".loading-box").attr("style", "display:flex");
  saveSvgAsPdf(d3.select('#chart_svg').node(), "tree.pdf", {
    backgroundColor: "#ffffff",
    pdfSpecs: ['', 'pt', 'a4'],
    pdfSize: [10, 10, 595.28, 841.89]
  }).then(function () {
    $(".loading-box").attr("style", "display:none");
  });
})


// // 鼠标拖动事件
// function DivMove(obj, ele) {

//   $(obj).mousedown(function (e) {
//     $(obj).css("cursor", "move");//改变鼠标指针样式
//     var x = e.offsetX; //获取div的当前X坐标
//     var y = e.offsetY;  //获取div的当前X坐标
//     var str = $(obj).attr("transform");
//     var arr = str.slice(str.indexOf("(") + 1, str.indexOf(")")).split(',');
//     $(document).bind("mousemove", function (ev) {//鼠标移动事件
//       var ox = ev.offsetX - x;
//       var oy = ev.offsetY - y;
//       $(obj).attr("transform", "translate(" + (arr[0] * 1 + ox - 10) + "," + (oy + arr[1] * 1 + 7) + ")")
//     });
//   })
//   $(document).mouseup(function () {
//     $(obj).css("cursor", "default");//还原鼠标指针样式
//     $(this).unbind("mousemove");
//   });
// }


// 菜单项
var menu = $("#right_click_menu");
document.querySelector("#chart_svg").oncontextmenu = function (ev) {
  var ev = ev || event;
  var scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  menu.attr("style", "display:block;left:" + ev.clientX + "px;top:" + (ev.clientY + scrollTop) + "px");
  //阻止默认事件
  return false;
};
var app = document.querySelector('body');
app.onclick = function () {
  menu.attr("style", "display:none;");
};



// $("body").on("click", function (e) {
//   d3.select('#flag-legend').attr("display", "none");
//   d3.select('#random-legend').attr("display", "none");
//   d3.select('#genus-legend').attr("display", "none");
//   d3.select('#genus_path').attr("class", "");
//   d3.select('#flag_path').attr("class", "");
//   d3.select('#random_path').attr("class", "");
// })
