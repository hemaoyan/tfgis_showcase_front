import * as echarts from 'echarts'

// 柱图1
function template_analysis_bar(param) {
  var options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        var result = "<div style='line-height: 20px;font-weight: bold;'>" + params[0].axisValue + "</div>";
        params.forEach(function (item) {
          result +=
            '<span style="display:inline-block;width:10px;height:10px;border-radius: 50%;margin-right: 10px;background:' + item.color + ';"></span>';
          result += item.seriesName + "：<span style='color: #2154F4;'>" + item.data + " </span>" + " 条<br/>";
        });
        return result;
      },
    },

    legend: {
      show: true,
      x: '80%',
      y: '0%',
      icon: "circle", //圆形
      itemWidth: 10, // 设置宽度
      itemHeight: 10, // 设置高度
      data: param.legend,
      textStyle: {
        fontSize: '12',
        fontWeight: '400',
        fontFamily: 'Source Han Sans CN',
        color: '#959FA8'
      }
    },
    grid: {
      top: '18%',
      left: '3%',
      right: '7%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      name: '', // 这里是横轴标题
      nameGap: 5, // 坐标轴名称与轴线之间的距离
      nameLocation: 'end', // 坐标轴名称显示位置'start'|'middle'或'center'|'end'
      //设置网格线颜色
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#959FA8'],
          width: 1,
          type: 'solid'
        }
      },
      nameTextStyle: {
        fontSize: '12',
        fontWeight: '400',
        fontFamily: 'Microsoft YaHei',
        color: '#39A9FF'
      },
      data: param.xAxis,
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: '12',
          fontWeight: '400',
          fontFamily: 'Source Han Sans CN',
          color: '#959FA8'
        }
      }
    }],
    yAxis: [{
      type: 'value',
      name: '', // 这里是横轴标题
      nameGap: 10, // 坐标轴名称与轴线之间的距离
      nameLocation: 'end', // 坐标轴名称显示位置'start'|'middle'或'center'|'end'
      nameTextStyle: {
        fontSize: '12',
        fontWeight: '400',
        fontFamily: 'Microsoft YaHei',
        color: '#39A9FF'
      },
      //设置网格线颜色
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#EAEDF5'],
          width: 1,
          type: 'dashed'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: '12',
          fontWeight: '400',
          fontFamily: 'Source Han Sans CN',
          color: '#959FA8'
        }
      }
    }],
    series: [{
        name: param.legend[2],
        type: 'bar',
        stack: '叠加',
        barWidth: 6,
        data: param.data3,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(243, 245, 251, .7)'
        },
        itemStyle: {
          normal: {
            color: '#FD776C',
          },
          emphasis: {
            barBorderRadius: 30
          }
        },
      },
      {
        name: param.legend[1],
        type: 'bar',
        stack: '叠加',
        barWidth: 6,
        data: param.data2,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(243, 245, 251, .7)'
        },
        itemStyle: {
          normal: {
            color: '#67CB96',
          },
          emphasis: {
            barBorderRadius: 30
          }
        },
      },
      {
        name: param.legend[0],
        type: 'bar',
        stack: '叠加',
        barWidth: 6,
        data: param.data1,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(243, 245, 251, .7)'
        },
        itemStyle: {
          normal: {
            color: '#2154F4',
            barBorderRadius: [10, 10, 0, 0],
          },
          emphasis: {
            barBorderRadius: 30
          }
        },
      },

    ]
  }
  return options;
}

// 雷达图
function template_analysis_radio(param) {
  var options = {
    radar: {
      radius: '71%',
      center: ['50%', '46%'],
      nameGap: 7,
      splitNumber: 4,
      splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
        show: false,
      },
      indicator: [{
          name: '0-4',
          // max: 6500
        },
        {
          name: '4-8',
          // max: 16000
        },
        {
          name: '8-12',
          // max: 30000
        },
        {
          name: '12-16',
          // max: 38000
        },
        {
          name: '16-20',
          // max: 52000
        },
        {
          name: '16-24',
          // max: 25000
        }
      ]
    },
    series: [{
      name: '时段',
      type: 'radar',
      itemStyle: { //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
        color: '#2154F4',
        borderColor: '#2154F4',
      },
      areaStyle: {
        color: 'rgba(33, 84, 244, .2)',
      },
      data: [{
        value: param.value,
        // 鼠标悬浮时高亮显示，同时展示雷达图的数据样式
        emphasis: {
          label: {
            show: true,
            color: '#2154F4',
            fontSize: 12,
            formatter: '{c}', // 鼠标悬浮时展示数据加上单位
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 3,
            shadowBlur: 3
          }
        },
        symbolSize: 3,
        name: '报警时段分布'
      }]
    }]
  };
  return options;
}

// 嵌套饼图
function template_analysis_pie(param) {
  var options = {
    color: ['#2154F4', '#68CD97', '#FD776C'],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      show: true //显示提示框
    },
    legend: {
      orient: 'vertical',
      x: '8%',
      y: 'center',
      icon: "circle", //圆形
      itemWidth: 10, // 设置宽度
      itemHeight: 10, // 设置高度
      padding: [0, 0, 0, 270],
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        fontSize: '12',
        fontWeight: '400',
        fontFamily: 'Source Han Sans CN',
        color: '#323232'
      }
    },
    graphic: [{
      type: 'text',
      left: '32%',
      top: '35%',
      style: {
        fill: '#686868',
        text: '总数'
      }
    }, {
      type: 'text',
      left: '26%',
      top: '45%',
      z: 10,
      style: {
        text: '5894',
        font: '30px Microsoft YaHei'
      }
    }],
    series: [{
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'outside',
        normal: {
          formatter: '{d}%',
        },
      },
      itemStyle: {
        borderWidth: 1, //设置border的宽度有多大
        borderColor: '#fff',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
          normal: {
            formatter: '{b}\n\n{d}% {c}',
          },
        },
      },
      labelLine: {
        normal: {
          length: 10, //设置延长线的长度
        }
      },
      data: param.value
    }]
  };
  return options;
}



export {
  template_analysis_bar,
  template_analysis_radio,
  template_analysis_pie
}
