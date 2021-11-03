import * as echarts from 'echarts'


// 双柱图
function monitor_analysis_bar(param) {
  var options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    title: {
      text: '单位/辆', //主标题
      textStyle: {
        color: '#323232', //颜色
        fontSize: 12, //大小
        left: 'left',
      }
    },
    legend: {
      textStyle: {
        fontSize: '12',
        fontWeight: '400',
        fontFamily: 'Source Han Sans CN',
        color: '#959FA8'
      },
      icon: "circle", //圆形
      x: 'right',
      itemWidth: 10, // 设置宽度
      itemHeight: 10, // 设置高度
      data: ['在线', '离线']
    },
    grid: {
      left: '9%',
      top: '16%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['和平区', '河西区', '南开区', '河东区', '河北区', '红桥区'],
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: '12',
          fontWeight: '400',
          fontFamily: 'Source Han Sans CN',
          color: '#959FA8'
        }
      }
    },
    yAxis: {
      type: 'value',
      // name: '单位/辆', // 标题
      nameGap: 20, // 坐标轴名称与轴线之间的距离
      boundaryGap: [0, 0.01],
      nameTextStyle: {
        fontSize: '12',
        fontWeight: '400',
        fontFamily: 'Microsoft YaHei',
        color: '#959FA8'
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
    },
    series: [{
        name: '在线',
        type: 'bar',
        barWidth: 6,
        data: [45, 48, 53, 40, 33, 38],
        itemStyle: {
          normal: {
            color: '#3BA0FF',
            barBorderRadius: [10, 10, 0, 0],
          },
          emphasis: {
            barBorderRadius: 30
          }
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(243, 245, 251, .7)'
        },
      },
      {
        name: '离线',
        type: 'bar',
        barWidth: 6,
        barGap: 2,
        data: [14, 18, 20, 16, 12, 10],
        itemStyle: {
          normal: {
            color: '#B3B8BA',
            barBorderRadius: [10, 10, 0, 0],
          },
          emphasis: {
            barBorderRadius: 30
          }
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(243, 245, 251, .7)'
        },
      }
    ]
  };
  return options;
}

// 嵌套饼图 
function monitor_analysis_pie() {
  // param.data.forEach(element => {
  //     if(element.name === districtName) {
  //         element.selected = true
  //     } else {
  //         element.selected = false
  //     }
  // })
  var options = {
    color: ['#3BA0FF', '#FF776C', '#FEC571', '#68CD97', '#2154F4', '#B3B8BA'],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      show: true //显示提示框
    },
    legend: {
      orient: 'vertical',
      x: '20%',
      y: 'center',
      icon: "circle", //圆形
      padding: [0, 0, 0, 240],
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
      left: '37%',
      top: '35%',
      style: {
        fill: '#686868',
        text: '总数'
      }
    }, {
      type: 'text',
      left: '31%',
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
      center: ['40%', '48%'],
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
          // fontWeight: 'bold'
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
      data: [{
          value: 2048,
          name: '班线客车'
        },
        {
          value: 1035,
          name: '旅游包车'
        },
        {
          value: 2231,
          name: '危险品车'
        },
        {
          value: 580,
          name: '其他车辆'
        },
      ]
    }]
  };
  return options;
}




export {
  monitor_analysis_bar,
  monitor_analysis_pie
}
