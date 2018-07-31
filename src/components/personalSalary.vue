<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <gzcxnd :nd='searchField.strND' @changeND='changeND'></gzcxnd>
            <yf :yf='searchField.yf' @changeYF='changeYF'></yf>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main>
          <div id="myChart"></div>
        </el-main>
        <!-- 展示内容 end -->
      </div>
    </el-container>
  </div>
</template>

<script>
import Gzcxnd from "./searchInputs/gzcxnd";
import Yf from "./searchInputs/yf";

export default {
  data() {
    return {
      // 检索图表字段
      searchField: {
        strND: "",
        yf: "",
        m_ID: "130456751125487660"
      }
    };
  },
  components: {
    Gzcxnd,
    Yf
  },
  watch: {
    searchField: {
      handler(newVal, oldVal) {
        if (newVal.strND != "" && newVal.yf != "") {
          this.drawBar();
        }
      },
      deep: true
    }
  },
  methods: {
    // 以下为监听子组件检索框状态
    changeND(nd) {
      this.searchField.strND = nd;
    },
    changeYF(yf) {
      this.searchField.yf = yf;
    },
    // 生成echarts统计图
    drawBar() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var labelRight = {
        normal: {
          position: "right"
        }
      };
      var labelLeft = {
        normal: {
          position: "left"
        }
      };

      //配置柱状图
      myChart.setOption({
        title: {
          text: "本月工资统计",
          // color: '#303133'
          textStyle: {
            color: "#606266"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 80,
          bottom: 30
        },
        xAxis: {
          type: "value",
          position: "top",
          splitLine: { lineStyle: { type: "dashed" } }
        },
        yAxis: {
          type: "category",
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: true },
          axisLabel: {
            show: true,
            // formatter: "{value}",
            textStyle: {
              color: "#606266"
            }
          }
        },
        series: [
          {
            name: "金额",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                formatter: "{c}"
              }
            }
          }
        ]
      });

      //填充数据到柱状图
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAMemberGZB_View",
        this.searchField,
        data => {
          var echartData = data;
          var gzzj = 0,
            yAxisData = [],
            seriesData = [],
            colorLi = [];

          for (var i = 0; i < echartData.length; i++) {
            if (echartData[i].W_GZXJE == 0) continue; //剔除金额为0的工资项
            if (
              echartData[i].W_GZXMC == "应发小计" ||
              echartData[i].W_GZXMC == "实发小计"
            )
              continue; //剔除应发和实发

            yAxisData.push(echartData[i].W_GZXMC);
            if (echartData[i].W_SFKCX == "是") {
              gzzj -= parseFloat(echartData[i].W_GZXJE);
              seriesData.push({ value: -echartData[i].W_GZXJE });
              // colorLi.push("#D45A56");
              colorLi.push("#f56c6c");
            } else {
              gzzj += parseFloat(echartData[i].W_GZXJE);
              seriesData.push({ value: echartData[i].W_GZXJE });
              // colorLi.push("#537A95");
              colorLi.push("#40a9ff");
            }
          }

          myChart.setOption({
            title: {
              text: "本月工资统计",
              subtext: "总计" + gzzj.toFixed(2) + "元"
            },
            yAxis: {
              data: yAxisData
            },
            series: [
              {
                data: seriesData,
                itemStyle: {
                  normal: {
                    color: function(params) {
                      var colorList = colorLi;
                      return colorList[params.dataIndex];
                    }
                  }
                }
              }
            ]
          });
        }
      );
    }
  }
};
</script>

<style lang='less' scoped>
@media screen and (max-width: 1920px) {
  div .el-main {
    height: 550px;
    div {
      height: 500px;
    }
  }
}
// @media screen and (max-width: 1400px) {
//   div .el-main {
//     height: 400px;
//     div {
//       height: 300px;
//       background-color: red;
//     }
//   }
// }
div .panel {
  width: 100%;
  .el-header {
    height: auto !important;
  }
}
</style>