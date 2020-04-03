var tree = null;
var treeData = "";


function init_tree(tree_data) {
  treeData = tree_data;
  // tree = d3.layout.phylotree();
  // tree.branch_length (null);
  // tree.branch_name (null);
  // tree.node_span ('equal');
  // tree.options ({'draw-size-bubbles' : false}, false);
  // //tree.radial (true);
  // tree.style_nodes (node_colorizer);
  // tree.style_edges (edge_colorizer);
  // tree.selection_label (current_selection_name);
  // tree.node_circle_size (undefined);

  // var svg = d3.select("#tree_svg")
  // svg.attr("width", 1200)
  //   .attr("height", 1200);chart_svg
  var config = {
    legend: {
      x: 10,
      y: 30,
      space: 12,
      font: {
        size: 12,
        color: "rgb(51, 51, 51)",
        family: '"Helvetica Neue", Helvetica, sans-serif',
        x: 0,
        y: 0
      },
      shape: {
        type: 'rect',
        width: 15,
        height: 15,
        stroke: "#666",
        style: "stroke-width: 0.5;"
      },

    },
    node: {
      size: 5,
      font: {
        size: 12,
        color: "#666",
        family: '"Helvetica Neue", Helvetica, sans-serif',
        x: -35,
        y: 15
      }
    }

  }



  var dom_svg = document.querySelector('#chart_svg');
  // 添加图例
  var chart_l = d3.select('#chart_l');
  var cl = labelConfig.identity_genus.length;
  var scale = (cl[1] - cl[0]) / 5;

  var legendArr = [
    { index: 'leg1', name: '(' + scale * 4 + '~' + scale * 5 + ']', color: "#AE271C", start: scale * 4, end: scale * 5 },
    { index: 'leg2', name: '(' + (scale * 3).toFixed(1) + '~' + scale * 4 + ']', color: "#F93529", start: (scale * 3).toFixed(1), end: scale * 4 },
    { index: 'leg3', name: '(' + scale * 2 + '~' + (scale * 3).toFixed(1) + ']', color: "#F96D29", start: scale * 2, end: (scale * 3).toFixed(1) },
    { index: 'leg4', name: '(' + scale * 1 + '~' + scale * 2 + ']', color: "#FFA503", start: scale * 1, end: scale * 2 },
    { index: 'leg5', name: '[0~' + scale * 1 + ']', color: "#FFE700", start: 0, end: scale * 1 },
  ];
  //   var text = element.selectAll(".legend").data(tree_attributes[node_data.name]);
  //   text.enter().append("text").attr("class", "legend").text(function (params) {
  //     return '原材料zdfvfdfdf';
  //   }).attr("transform", function (d, i) {
  //     return "translate(" + (x_shift + font_size * i + i * 12 + 10) + ",-10) rotate(-90)";
  //   });
  var isClickArr = [],each = null;
  chart_l.attr("transform", 'translate(' + config.legend.x + ',' + config.legend.y + ')')
  var legend = chart_l.selectAll(".legend").data(legendArr).enter().append("g").attr("class", "legend")
    .attr("index", function (item, i) {
      return item.index;
    }).attr("cursor", "pointer")
    .attr("transform", function (item, i) {
      return 'translate(0,' + (config.legend.space + config.legend.shape.height) * i + ')'
    })
    .on("mouseover", function (d, i) {
      d3.select(this).select('rect').transition().duration(200).attr("transform", "translate(-1,-1)scale(1.2)")
      d3.selectAll('.' + d3.select(this).attr("index")).transition().duration(200).attr("r", 7);
    })
    .on("mouseout", function (d, i) {
      var _this = this;
      each = d3.select(this).attr("index");
      d3.select(this).select('rect').transition().duration(200).attr("transform", "")
      d3.selectAll('.' + each).transition().duration(200).attr("r", config.node.size);
      isClickArr.forEach(function (item, i) {
        if (each === item) {
          d3.select(_this).select('rect').transition().duration(200).attr("transform", "translate(-1,-1)scale(1.2)")
          d3.selectAll('.' + item).transition().duration(200).attr("r", 7);
        }
      });

      // if (isClickArr !== d3.select(this).attr("index")) {
      //   d3.selectAll('.' + d3.select(this).attr("index")).transition().duration(200).attr("r", config.node.size);
      // }
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
      d3.select(this).select('rect').transition().duration(200).attr("transform", "translate(-1,-1)scale(1.2)")
      d3.selectAll('.' + d3.select(this).attr("index")).transition().duration(200).attr("r", 7);
    });

  legend.append(config.legend.shape.type).attr("width", config.legend.shape.width).attr("height", config.legend.shape.height)
    .attr("fill", function (item) {
      return item.color
    }).attr("stroke", config.legend.shape.stroke).attr("style", config.legend.shape.style)

  legend.append("text").attr("x", config.legend.font.x + 23).attr("y", config.legend.font.y + 10)
    .attr("style", 'font-size: ' + config.legend.font.size + 'px; fill: ' + config.legend.font.color + '; font-family: ' + config.legend.font.color + ';').text(function (obj) {
      return obj.name
    })

  // chart_l.append("g").attr("width", 2);

  // 初始化树图
  var svg_width = dom_svg.getBoundingClientRect().width
  var svg_height = dom_svg.getBoundingClientRect().height
  var chart_g = d3.select("#chart_g");
  tree = d3.layout.phylotree()
    .options({
      'show-scale': false,
      'left-right-spacing': 'fit-to-size',
      'top-bottom-spacing': 'fit-to-size',
      // zoom: true,
      // transitions: true,
      language: 'chinese', //chinese english
      legend: legendArr,
      itemStyle: config,
    })
    .radial(false)
    .svg(chart_g)
    .align_tips(true)
    .size([svg_width - 20, svg_height - 160])
    .node_circle_size(config.node.size) // 节点圆圈大小
  // var attribute_to_color = d3.scale.category10();
  var standard_label = tree.branch_name();

  tree.branch_name(function (node) { // 最右侧 label 名字
    return standard_label(node) + "                    ";
    // return standard_label(node);
  });

  tree(d3.layout.newick_parser(tree_data));
  // tree.spacing_x(10).spacing_y(20);

  var maximum_length = 0;
  // var tree_attributes = {};
  tree.traverse_and_compute(function (node) {
    if (d3.layout.phylotree.is_leafnode(node)) {
      // tree_attributes[node.name] = [0, 0, 0, 0, 0].map(function () {
      //   return Math.floor(Math.random() * 5);
      // });
      maximum_length = maximum_length < node.name.length ? node.name.length : maximum_length;
    }
  });

  // tree.style_edges(function (node) {
  //   // console.log(node);
  // })
  
  tree.style_nodes(function (element, node_data, i) {
    // console.log(tree_attributes);

    // 右边的小方块和label

    // console.log(element.attr("is"));

    // if (node_data.name in tree_attributes) {
    // console.log(element.attr("is", 'ok'));
    if (node_data.name in configData) {

      var font_size = parseFloat(element.select("text").style("font-size"));
      var move_past_label = maximum_length * 0.57 * font_size;
      var x_shift = tree.shift_tip(node_data)[0] + move_past_label;
      var node_item = configData[node_data.name], i = 0;
      // element.select('.qweqw')
      var identity_genus = node_item.identity_genus ? node_item.identity_genus : {};
      var flag = node_item.flag ? node_item.flag : {};
      var random = node_item.random ? node_item.random : {};

      element.selectAll('.genus').remove();
      element.selectAll('.flag').remove();
      element.selectAll('.random').remove();
      element.selectAll('rect').remove();
      element.selectAll('circle').remove();
      element.selectAll('polygon').remove();

      if (labelConfig.identity_genus.position === 1) {
        shape_select(element, identity_genus, x_shift, font_size, i, 'genus')
        i = i + 1;
      } else if (labelConfig.flag.position === 1) {
        shape_select(element, flag, x_shift, font_size, i, 'flag')
        i = i + 1;
      } else if (labelConfig.random.position === 1) {
        shape_select(element, random, x_shift, font_size, i, 'random')
        i = i + 1;
      }


      if (labelConfig.identity_genus.position === 2) {
        shape_select(element, identity_genus, x_shift, font_size, i, 'genus')
        i = i + 1;
      } else if (labelConfig.flag.position === 2) {
        shape_select(element, flag, x_shift, font_size, i, 'flag')
        i = i + 1;
      } else if (labelConfig.random.position === 2) {
        shape_select(element, random, x_shift, font_size, i, 'random')
        i = i + 1;
      }

      if (labelConfig.identity_genus.position === 3) {
        shape_select(element, identity_genus, x_shift, font_size, i, 'genus')
      } else if (labelConfig.flag.position === 3) {
        shape_select(element, flag, x_shift, font_size, i, 'flag')
      } else if (labelConfig.random.position === 3) {
        shape_select(element, random, x_shift, font_size, i, 'random')
      }

      // var ele = element.selectAll("rect").data(tree_attributes[node_data.name]);
      // ele.enter().append("rect");
      // ele.attr("width", font_size + 2)
      //   .attr("height", font_size)
      //   .attr("y", -font_size / 2).style("fill", function (d, i) {
      //     return attribute_to_color(d);
      //   });
      // var move_past_label = maximum_length * 0.57 * font_size;
      // var x_shift = tree.shift_tip(node_data)[0] + move_past_label;
      // ele.attr("transform", function (d, i) { return null; }).attr("x", function (d, i) {
      //   return x_shift + font_size * i + i * 12;
      // });

    }
    // }
  });
  function shape_select(element, item, x_shift, font_size, i, classs) {
    var fill = item.color ? item.color : '#ccc';
    var distance = 30; //label间距
    var range = labelConfig.identity_genus ? labelConfig.identity_genus.length : [0, 1];

    var length = item.length ? (item.length * distance / (range[1] - range[0]) - 5) : 0;
    switch (item.shape) {
      case 'square'://长方形
        element.append("rect").attr("width", font_size).attr("height", font_size).attr("y", -font_size / 2).style("fill", fill).attr("x", x_shift + font_size * i + i * distance)
          // .attr("cursor", "pointer")
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
      case 'circle'://圆形
        element.append("circle").attr("cx", x_shift + font_size * i + i * distance + 7).attr("cy", 0).attr("r", 8).attr("style", 'fill:' + fill + '; stroke:black;stroke-width:0.5px;')
          // .attr("cursor", "pointer")
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
      case 'rhombus'://菱形
        element.append("polygon").attr("points", "10,10 17.5,5 25,10 17.5,15").attr("style", 'fill:' + fill + '; stroke:black;stroke-width:0.5px;').attr("transform", "translate(" + (x_shift + font_size * i + i * distance - 15) + ",-13) scale(1.3)")
          // .attr("cursor", "pointer")
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
      default: //正方形
        element.append("rect").attr("width", font_size + length).attr("height", font_size).attr("y", -font_size / 2).style("fill", fill).attr("x", x_shift + font_size * i + i * distance)
          // .attr("cursor", "pointer")
          .append("title").text(item.label)
        // .on("mouseover", function (d, i) {
        //   element.select('.' + classs).attr("style", "display: block;");
        // })
        // .on("mouseout", function (d, i) {
        //   // d3.select(this)
        //   //  .transition()
        //   // .duration(500)
        //   // .attr("transform", "scale(1)")
        //   element.select('.' + classs).attr("style", "display: none;");
        // });
        break;
    }
    // element.append("title").text(item.label)
    // .attr("dx", x_shift + font_size * i + i * distance).attr("dy", -10).attr("style", "display: none;").attr("class", classs);
  }

  tree.layout();

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

  var dom_g = document.querySelector('#chart_g');
  var g_width = dom_g.getBoundingClientRect().width
  var g_height = dom_g.getBoundingClientRect().height
  chart_g.attr("transform", "translate(" + ((svg_width - g_width) / 2 + 50) + "," + ((svg_height - g_height) / 2) + ") scale(1)")

}


// 初始化
// init_tree(text);
init_tree(example_tree_16s);
// init_tree(iTOL_salmonella_new);
// init_tree(example_tree1);
// init_tree(fasttree);

/************************* 交互部分 *****************************/

// 重置
$("#reset").on("click", function (e) {
  init_tree(example_tree_16s);
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
  tree.options({ 'transitions': !current_mode });
});




$("#tip_left").on("click", function (e) {
  tree.align_tips(true).update()
});
$("#tip_right").on("click", function (e) {
  tree.align_tips(false).update()
});


$("#save-file").on("click", function (e) {
  exportRaw('data.tree', treeData);
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

// function saveFile() {

// }



// 图片下载
$("#save-img").on("click", function (e) {
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
  saveSvgAsPng(d3.select('#chart_svg').node(), "diagram.jpg", { backgroundColor: "#ffffff" });
});