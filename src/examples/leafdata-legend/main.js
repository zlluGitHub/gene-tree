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
      language: 'en', //ch en
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

// 初始化 数据部分
init_tree(tree_data);


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


// 导出选中子树（.txt）
$("#save-file-node").on("click", function (e) {
  if (getSelectTreeJson) {
    $(".loading-box").attr("style", "display:flex"); 
    var text = ""
    getSelectTreeJson(false).selectNode.forEach(function (node) {
      text = text + node.name + '\n'
    })
    exportRaw('select_node.txt', text);
    $(".loading-box").attr("style", "display:none");
  } else {
    alert('请先选择子树后导出！')
  }
});