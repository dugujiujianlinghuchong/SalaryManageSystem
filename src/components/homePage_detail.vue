<template>
  <div class="container">
    <div id="left">
      <el-card>
        <div slot="header" class="clearfix">
          <span>本月员工信息</span>
        </div>
        <div class="text">
          <table border="1">
            <tr>
              <td>工号&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_YGBH }}</td>
            </tr>
            <tr>
              <td>姓名&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_XM }}</td>
            </tr>
            <tr>
              <td>性别&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_XB }}</td>
            </tr>
            <tr>
              <td>入职时间&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_CJGZSJ }}</td>
            </tr>
            <tr>
              <td>职称&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_ZC }}</td>
            </tr>
            <tr>
              <td>职务&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_ZW }}</td>
            </tr>
            <tr>
              <td>建行卡号&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_ccbno }}</td>
            </tr>
            <tr>
              <td>工行卡号&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_mbno }}</td>
            </tr>
            <tr>
              <td>招行卡号&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_icbcno }}</td>
            </tr>
            <tr>
              <td>所在部门&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_SZBMMC }}</td>
            </tr>
            <tr>
              <td>是否班子成员&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_SFBZCY }}</td>
            </tr>
            <tr>
              <td>编制情况&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_BZQK }}</td>
            </tr>
            <tr>
              <td>工资模板&nbsp;&nbsp;</td>
              <td>{{ staffInfo.S_GZMBMC }}</td>
            </tr>
            <tr>
              <td>备注&nbsp;&nbsp;</td>
              <td>{{ staffInfo.BZ }}</td>
            </tr>
          </table>
        </div>
      </el-card>
    </div>
    <div id="right">
      <!-- 工资条 -->
      <el-card>
        <div>
          <table border="1">
            <tr>
              <td>工资总计</td>
              <td v-for="(item, index) in tableData" :key="index">{{ item.W_GZXMC }}</td>
            </tr>
            <tr>
              <td>
                <span>{{ gzzj }}</span>
              </td>
              <td v-for="(item, index) in tableData" :key="index">
                <span :class="{ increase: item.W_SFKCX == '否', reduce: item.W_SFKCX == '是' }"> {{ item.W_GZXJE}} </span>
              </td>
            </tr>
          </table>
        </div>
      </el-card>
      <!-- 工资项 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span>本月工资项</span>
          <el-button size='mini' type="primary" @click="handleAdd">添加</el-button>
        </div>
        <div class="text">
          <el-table :data="tableData" max-height="446" size='small' stripe border>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="W_GZXMC" label="工资项" align="center"></el-table-column>
            <el-table-column prop="W_GZXJE" label="金额" align="center">
              <template slot-scope="scope">
                <span :class="{ increase: scope.row.W_SFKCX == '否', reduce: scope.row.W_SFKCX == '是' }">{{ scope.row.W_GZXJE }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="W_GZXFSFDWBH" label="发放单位" align="center"></el-table-column>
            <el-table-column prop="W_GZXSSXMBH" label="所属项目编号" align="center"></el-table-column>
            <el-table-column prop="W_BZ" label="备注" align="center"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <!-- 编辑表格数据对话框 -->
    <edit-salary-option 
      :dialogVisible='dialogVisible' 
      :dialogTitle='dialogTitle' 
      :staffCode='staffCode'
      :searchFiled='searchFiled' 
      :editOrAdd='editOrAdd'
      :rowData='rowData' 
      :gzmbmc='gzmbmc' 
      @changeDialogStatus='changeDialogStatus'
    ></edit-salary-option>
  </div>
</template>

<script>
import EditSalaryOption from "./dialogForm/editSalaryOption";

export default {
  props: ["staffCode", "searchFiledDetailPage"],
  data() {
    return {
      /* 以下为此页面所用数据 */
      // 检索表格字段
      searchFiled: {
        strYGBH: "",
        m_ID: "",
        strND: "",
        yf: ""
      },
      tableData: [], // 表格数据
      staffInfo: {}, // 员工信息
      gzmbmc: "", // 所属工资模板
      gzzj: 0, // 工资总和

      /* 以下为传递给子组件的数据 */
      dialogVisible: false, // 编辑表格对话框状态
      dialogTitle: "", // 编辑表格对话框标题
      editOrAdd: "", // 新增/编辑表单
      rowData: {} // 选中编辑行的数据
    };
  },
  components: {
    EditSalaryOption
  },
  watch: {
    // 监听父组件检索框变化
    searchFiledDetailPage: {
      handler(newVal, oldVal) {
        this.searchFiled.strND = parseInt(newVal.strND);
        this.searchFiled.yf = parseInt(newVal.intMonth);
      },
      deep: true
    },
    searchFiled: {
      handler(newVal, oldVal) {
        this.getStaffInfo();
        this.getTableData();
      },
      deep: true
    }
  },
  methods: {
    // 获取员工当月信息
    getStaffInfo() {
      // get方法内部无法直接获取searchFiled?????
      let params = this.searchFiled;
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAMemberInfoByLSXX",
        params,
        data => {
          this.staffInfo = data;
        }
      );
    },
    // 获取表格信息
    getTableData() {
      // get方法内部无法直接获取searchFiled?????
      let params = this.searchFiled;
      // 工资总计清0
      this.gzzj = 0;
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAMemberGZB_View",
        params,
        data => {
          this.tableData = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].W_GZXMC == "应发小计") continue;
            if (data[i].W_SFKCX == "否") {
              this.gzzj += data[i].W_GZXJE;
            } else {
              this.gzzj -= data[i].W_GZXJE;
            }
          }
          this.gzzj = this.gzzj.toFixed(2);
        }
      );
    },
    // 删除表格行
    handleDelete(index, row) {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/DeleteAGZB",
        { id: row.W_ID },
        data => {
          if (data != "true:") {
            this.$alert("删除失败！", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            this.getTableData();
          }
        }
      );
    },
    // 打开新增表格行对话框
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "添加工资项";
      this.editOrAdd = "add";
    },
    // 打开编辑表格行对话框
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑工资项";
      this.editOrAdd = "edit";
      // 给表单赋默认值
      for (var key in row) {
        this.rowData[key] = row[key];
      }
    },
    // 监听子组件对话框状态
    changeDialogStatus(dialogStatus) {
      this.dialogVisible = dialogStatus;
      this.editOrAdd = "";
      this.getTableData();
    }
  },
  created() {
    // 将父组件传入的信息赋给子组件
    this.searchFiled.strYGBH = this.staffCode;
    this.searchFiled.m_ID = this.staffCode;
    this.searchFiled.strND = parseInt(this.searchFiledDetailPage.strND);
    this.searchFiled.yf = parseInt(this.searchFiledDetailPage.intMonth);
    this.gzmbmc = this.searchFiledDetailPage.gzmbmc;
  }
};
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  #left {
    width: 20%;
    height: 100%;
    float: left;
    .el-card {
      width: 100%;
    }
  }
  #right {
    width: 79%;
    height: 100%;
    float: left;
    .el-card:nth-child(1) {
      width: 100%;
      height: 15%;
      margin-left: 5px;
      overflow-x: auto;
      table {
        height: 70px;
        table-layout: fixed;
        width: 100%;
        margin-top: -15px;
        border: 1px solid #ebeef5;
        border-collapse: collapse;
        text-align: center;
        font-size: 12px;
        tr:nth-child(1) {
          td {
            width: 80px;
            background: #f9f9fa;
            color: #909399;
          }
        }
        tr:nth-child(2) {
          td {
            color: #606266;
          }
        }
      }
    }
    .el-card:nth-child(2) {
      width: 100%;
      height: 85%;
      margin-left: 5px;
    }
  }
  .el-card {
    .clearfix {
      height: 20px;
      .el-button {
        float: right;
      }
    }
    .text {
      font-size: 12px;
      height: 600px;
      table {
        border: 1px solid #ebeef5;
        border-collapse: collapse;
        height: 550px;
        td:nth-child(1) {
          width: 150px;
          text-align: right;
          background: #f9f9fa;
          color: #909399;
        }
        td:nth-child(2) {
          width: 180px;
          text-align: left;
          color: #606266;
          padding-left: 10px;
        }
      }
    }
  }
}
.increase {
  color: #40a9ff;
}
.reduce {
  color: #f56c6c;
}
// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both;
// }
</style>