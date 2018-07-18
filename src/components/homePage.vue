<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <gzcxnd :nd='searchField.strND' @changeND='changeND'></gzcxnd>
            <yf :yf='searchField.intMonth' @changeYF='changeYF'></yf>
            <bm v-show="!detailPage" :bmbh='searchField.bmbh' @changeBMBH='changeBMBH'></bm>
            <gzmb v-show="!detailPage" :gzmb='searchField.gzmbmc' @changeGZMB='changeGZMB'></gzmb>
            <el-button v-show="!detailPage" @click="dowload('http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/ExportHT_GZTExcelFile','?ND=2015&yf=12')" size='mini' type="primary">导出工资表</el-button>
            <el-button v-show="detailPage" @click="detailPage = false" size='mini' type="primary">返回</el-button>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <!-- 全员工资表 -->
        <el-main v-if="!detailPage">
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column v-for="(item,index) in tableHead" :prop="item.prop" :label="item.label" :deduction="item.deduction" :key="index" width="180" align="center">
              <template slot-scope="scope">
                <span @click="goToDetailPage(item.label,scope.row)" :class="{ increase: item.deduction == '否', reduce: item.deduction == '是', active: item.label == '姓名' && scope.row.D_BMMC != '总计'}">{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <br>
        </el-main>
        <!-- 个人工资详情页 -->
        <el-main v-else>
          <home-page-detail :staffCode='staffCode' :searchFiledDetailPage='searchField'></home-page-detail>
        </el-main>
        <!-- 展示内容 end -->
      </div>
    </el-container>
  </div>
</template>

<script>
import HomePageDetail from "./homePage_detail";
import Gzcxnd from "./searchInputs/gzcxnd";
import Yf from "./searchInputs/yf";
import Bm from "./searchInputs/bm";
import Gzmb from "./searchInputs/gzmb";

export default {
  data() {
    return {
      /* 以下为此页面所用数据 */
      // 检索表格字段
      searchField: {
        strND: "",
        intMonth: "",
        bmbh: "",
        gzmbmc: ""
      },
      tableHead: [], // 表格标题
      tableData: [], // 表格数据
      detailPage: false, // 详情页状态

      /* 以下为传递给子组件的数据 */
      staffCode: "" // 员工编号
    };
  },
  components: {
    HomePageDetail,
    Gzcxnd,
    Yf,
    Bm,
    Gzmb
  },
  watch: {
    searchField: {
      handler(newVal, oldVal) {
        if (
          newVal.strND != "" &&
          newVal.intMonth != "" &&
          newVal.bmbh != "" &&
          newVal.gzmbmc != ""
        ) {
          this.getTableData();
        }
      },
      deep: true
    }
  },
  computed: {
    tableHeigt() {
      if (this.$store.state.screenWidth > 1800) {
        return 1000;
      } else if (this.$store.state.screenWidth > 1200) {
        return 430;
      }
    }
  },
  methods: {
    // 以下为监听子组件检索框状态
    changeND(nd) {
      this.searchField.strND = nd;
    },
    changeYF(yf) {
      this.searchField.intMonth = yf;
    },
    changeBMBH(bmbh) {
      this.searchField.bmbh = bmbh;
    },
    changeGZMB(gzmb) {
      this.searchField.gzmbmc = gzmb;
    },
    // 获取表格信息
    getTableData() {
      this.tableHead = [];
      this.tableData = [];
      let tableHeadAttr = {}; // 此列数据增减属性

      // 获取表头信息
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZX_ByGZMBLX",
        { strGZMBMC: this.searchField.gzmbmc },
        data => {
          var tableHead = [];
          data.forEach(element => {
            var obj = {};
            obj["prop"] = element.W_GZXBH + "";
            obj["label"] = element.W_GZXMC;
            obj["deduction"] = element.W_SFKCX;
            obj["fixed"] = false;
            tableHead.push(obj);
          });
          this.tableHead = tableHead;
          this.tableHead.unshift({
            prop: "S_GZHJ",
            label: "工资总计",
            fixed: true
          });
          this.tableHead.unshift({
            prop: "S_YGBH",
            label: "员工编号",
            fixed: false
          });
          this.tableHead.unshift({
            prop: "S_XM",
            label: "姓名",
            fixed: true
          });
          this.tableHead.unshift({
            prop: "D_BMMC",
            label: "部门",
            fixed: false
          });
          this.tableHead.forEach(item => {
            tableHeadAttr[item.prop] = item.deduction;
          });
        }
      );
      // 获取表格数据
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllMember_GZB_ByBMBH",
        this.searchField,
        data => {
          data.forEach((item, index) => {
            let obj = {};
            obj.S_GZHJ = 0.0;
            item.forEach(innerItem => {
              if (tableHeadAttr[innerItem.Key] == "是") {
                obj.S_GZHJ -= parseFloat(innerItem.Value);
              } else if (tableHeadAttr[innerItem.Key] == "否") {
                obj.S_GZHJ += parseFloat(innerItem.Value);
              }
              obj[innerItem.Key] = innerItem.Value;
            });
            obj.S_GZHJ = obj.S_GZHJ.toFixed(2);
            this.tableData.push(obj);
          });

          // 统计各工资项总和
          let sumRow = {};
          for (const key in tableHeadAttr) {
            if (key == "D_BMMC" || key == "S_XM" || key == "S_YGBH") continue;
            sumRow[key] = 0.0;
            this.tableData.forEach(item => {
              sumRow[key] += parseFloat(item[key]);
            });
            sumRow[key] = sumRow[key].toFixed(2);
          }
          sumRow.D_BMMC = "总计";
          sumRow.S_XM = "共" + this.tableData.length + "人";
          sumRow.S_YGBH = "";
          this.tableData.push(sumRow);
        }
      );
    },
    // 跳转至详情页
    goToDetailPage(label, row) {
      if (row.D_BMMC == "总计") return;
      if (label == "姓名") this.detailPage = true;
      this.staffCode = row.S_YGBH;
    },
    // 下载工资表
    // dowload() {
    //   window.open('http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/ExportHT_GZTExcelFile?ND=2015&yf=12');
    //   // let link = document.createElement("a");
    //   // link.style.display = "none";
    //   // link.href =
    //   //   "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/ExportHT_GZTExcelFile?ND=2015&yf=12";
    //   // link.setAttribute("download", "excel.xls");

    //   // document.body.appendChild(link);
    //   // link.click();
    // }
  }
};
</script>

<style lang='less' scoped>
@media screen and (max-width: 1920px) {
  div .el-main {
    height: 740px;
  }
}
@media screen and (max-width: 1366px) {
  div .el-main {
    height: 530px;
  }
}
.increase {
  color: #40a9ff;
}
.reduce {
  color: #f56c6c;
}
.active {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
div .panel {
  width: 100%;
  .el-header {
    height: auto !important;
  }
}
.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 480px;
}
</style>