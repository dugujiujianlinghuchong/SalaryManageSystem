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
                <!-- <el-button size="mini" type="danger" @click="handleTest()">测试</el-button> -->
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
    <!-- <el-dialog width="30%" :visible.sync="dialogVisible" :title="dialogTitle">
      <el-form :model="form" :rules="rules" ref="gzxxForm">
        <el-form-item label="工资项名称" label-width='150px' prop='W_GZXBH'>
          <el-select v-model="form.W_GZXBH">
            <el-option v-for="(item,index) in optionsOfGZX" :value="item.W_GZXBH" :label="item.W_GZXMC" :key="index" style="font-size:12px"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工资发送方单位" label-width='150px' prop='W_GZXFSFDWBH'>
          <el-select v-model="form.W_GZXFSFDWBH">
            <el-option v-for="(item,index) in optionsOfDWXX" :value="item.DWBH" :label="item.DWQC" :key="index" style="font-size:12px"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工资项金额" label-width='150px' prop='W_GZXJE'>
          <el-input v-model="form.W_GZXJE" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工资所属项目编号" label-width='150px' prop='W_GZXSSXMBH'>
          <el-input v-model="form.W_GZXSSXMBH" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width='150px' prop='W_BZ'>
          <el-input v-model="form.W_BZ" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('gzxxForm')">确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- <dialog-form :isShow='renDialogShow'></dialog-form> -->
    <tjgzx :isShow='dialogVisible' :dialogTitle='dialogTitle' :editOrAdd='editOrAdd' :gzmbmc='gzmbmc' @changeDialogStatus='changeDialogStatus'></tjgzx>
    <!-- <tjgzx v-model='dialogVisible' :dialogTitle='dialogTitle' :editOrAdd='editOrAdd' :gzmbmc='gzmbmc' @changeDialogStatus='changeDialogStatus'></tjgzx> -->
  </div>
</template>

<script>
import Tjgzx from "./dialogForm/tjgzx";

export default {
  props: ["staffCode", "searchFiledDetailPage"],
  data() {
    return {
      // renDialogShow: false,   // 测试用对话框默认状态
      isShow: false,
      editOrAdd: "",
      searchFiled: {
        // 检索工资表字段
        strYGBH: 0,
        m_ID: 0,
        strND: "",
        yf: 0
      },
      gzmbmc: "", // 所属工资模板
      staffInfo: {}, // 员工信息
      tableData: [], // 工资项表格
      gzzj: 0, // 工资总和
      dialogVisible: false, // 添加工资项对话框状态
      dialogTitle: "", // 编辑工资项对话框标题
      // optionsOfGZX: [], // 工资项下拉列表数据
      // optionsOfDWXX: [], // 发送单位下拉列表数据
      // 添加工资项提交字段
      // form: {
      //   W_GZXBH: "",
      //   W_GZXFSFDWBH: "",
      //   W_GZXJE: "",
      //   W_GZXSSXMBH: "",
      //   W_BZ: "",
      //   // 以下为隐藏字段
      //   S_ID: "",
      //   W_ID: "",
      //   W_ND: "",
      //   W_YF: ""
      // },
      // rules: {
      //   // 表单字段验证规则
      //   W_GZXBH: [
      //     { required: true, message: "请选择工资项", trigger: "change" }
      //   ],
      //   W_GZXFSFDWBH: [
      //     { required: true, message: "请选择发送方单位", trigger: "change" }
      //   ],
      //   W_GZXJE: [
      //     { required: true, message: "请填写工资金额", trigger: "blur" }
      //   ],
      //   W_GZXSSXMBH: [
      //     { required: true, message: "请填写工资所属项目编号", trigger: "blur" }
      //   ]
      // }
    };
  },
  components: {
    // DialogForm,
    Tjgzx
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
        this.getSalaryInfo();
      },
      deep: true
    }
  },
  methods: {
    // 子组件改变对话框状态
    changeDialogStatus(dialogStatus) {
      this.dialogVisible = dialogStatus;
    },
    // 获取员工当月信息
    getStaffInfo() {
      let vueThis = this;
      // get方法内部无法直接获取searchFiled?????
      let params = vueThis.searchFiled;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAMemberInfoByLSXX",
        params,
        data => {
          vueThis.staffInfo = data;
        }
      );
    },
    // 获取员工当月工资信息
    getSalaryInfo() {
      let vueThis = this;
      // get方法内部无法直接获取searchFiled?????
      let params = vueThis.searchFiled;
      // 工资总计清0
      vueThis.gzzj = 0;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAMemberGZB_View",
        params,
        data => {
          vueThis.tableData = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].W_GZXMC == "应发小计") continue;
            if (data[i].W_SFKCX == "否") {
              vueThis.gzzj += data[i].W_GZXJE;
            } else {
              vueThis.gzzj -= data[i].W_GZXJE;
            }
          }
          vueThis.gzzj = vueThis.gzzj.toFixed(2);
        }
      );
    },
    // 删除工资项
    handleDelete(index, row) {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/DeleteAGZB",
        { id: row.W_ID },
        data => {
          if (data != "true:") {
            vueThis.$alert("删除失败！", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            vueThis.getSalaryInfo();
          }
        }
      );
    },
    // 编辑工资项
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑工资项";
      this.editOrAdd = "edit";
      // 获取下拉列表
      // if (this.optionsOfGZX.length == 0) {
      //   this.getOptionsOfGZX();
      //   this.getOptionsOfDWXX();
      // }
      // // 给表单赋默认值
      // for (var key in row) {
      //   this.form[key] = row[key];
      // }
    },
    // 添加工资项
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "添加工资项";
      this.editOrAdd = "add";
      // 重置表单
      // this.resetForm('gzxxForm');
      // for (var key in this,form) {
      //   this.form[key] = ''
      // }
      // 获取下拉列表
      // if (this.optionsOfGZX.length == 0) {
      //   this.getOptionsOfGZX();
      //   this.getOptionsOfDWXX();
      // }
      // 给隐藏字段赋值
      // this.form.S_ID = this.searchFiled.strYGBH;
      // this.form.W_ID = 0;
      // this.form.W_ND = this.searchFiled.strND;
      // this.form.W_YF = this.searchFiled.yf;
    },
    // 获取工资项下拉列表数据
    getOptionsOfGZX() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZX_ByGZMBLX",
        { strGZMBMC: vueThis.gzmbmc },
        data => {
          vueThis.optionsOfGZX = data;
        }
      );
    },
    // 获取单位下拉列表数据
    getOptionsOfDWXX() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_All_DWXX",
        { yhbh: vueThis.$store.state.yhbh },
        data => {
          vueThis.optionsOfDWXX = data;
        }
      );
    },
    // 提交工资项字段
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let vueThis = this;
          vueThis.$post(
            "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/AddANewGZB",
            vueThis.form,
            data => {
              vueThis.dialogVisible = false;
              vueThis.getSalaryInfo();
            }
          );
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
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