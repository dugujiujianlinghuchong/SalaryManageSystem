<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <keywords :keyword='searchField.keword' @changeKeywords='changeKeywords'></keywords>
            <el-button size='mini' type="primary" @click='editTableRow("dialogVisible", "dialogTitle", "rowData", "新增用户", {})'>添加</el-button>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main>
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editTableRow('dialogVisible', 'dialogTitle', 'rowData', '编辑用户', scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteTableRow('http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Delete_User', { bh: scope.row.YHBH, yhbh: $store.state.yhbh })">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="YHJS" label="用户角色" align="center" :formatter="getJSMC"></el-table-column>
            <el-table-column prop="XTDLM" label="系统登录名" align="center"></el-table-column>
            <el-table-column prop="YHMC" label="用户名称" align="center"></el-table-column>
            <el-table-column prop="SUDWBH" label="所属单位全称" align="center" :formatter="getDWQC"></el-table-column>
            <el-table-column prop="LXR" label="联系人" align="center"></el-table-column>
            <el-table-column prop="LXFS" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="YWBH" label="业务编号" align="center"></el-table-column>
            <el-table-column prop="BZ" label="备注" align="center"></el-table-column>
          </el-table>
          <br>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="searchField.page"
            :page-size="searchField.rows"
            :page-sizes="[5, 10, 20, 30, 40]"
            :total="totalRows"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-main>
        <!-- 展示内容 end -->

        <!-- 编辑表格数据对话框 -->
        <edit-user-info 
          :dialogVisible='dialogVisible' 
          :dialogTitle='dialogTitle' 
          :rowData='rowData' 
          @changeDialogStatus='changeDialogStatus'
        ></edit-user-info >
      </div>
    </el-container>
  </div>
</template>

<script>
import Keywords from "./searchInputs/keywords";
import EditUserInfo from "./dialogForm/editUserInfo";

export default {
  data() {
    return {
      /* 以下为此页面所用数据 */
      // 检索表格字段
      searchField: {
        yhbh: "",
        keywords: "",
        page: 1,
        rows: 10
      },
      tableData: [], // 表格数据
      totalRows: 0, // 数据总条数
      dwxx: [], // 单位信息列表
      jsxx: [], // 角色信息列表

      /* 以下为传递给子组件的数据 */
      dialogVisible: false, // 编辑表格对话框状态
      dialogTitle: "", // 编辑表格对话框标题
      rowData: {} // 选中编辑行的数据
    };
  },
  components: {
    Keywords,
    EditUserInfo
  },
  watch: {
    searchField: {
      handler(newVal, oldVal) {
        this.getTableData();
      },
      deep: true
    }
  },
  computed: {
    tableHeigt() {
      if (this.$store.state.screenWidth > 1800) {
        return 640;
      } else if (this.$store.state.screenWidth > 1200) {
        return 430;
      }
    }
  },
  methods: {
    // 以下为监听子组件检索框状态
    changeKeywords(keyword) {
      this.searchField.keywords = keyword;
      this.searchField.page = 1;
    },
    // 监听子组件对话框状态
    changeDialogStatus(dialogStatus) {
      this.dialogVisible = dialogStatus;
      this.getTableData();
    },
    // 获取表格信息
    getTableData() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/GetUserList_OBJ",
        this.searchField,
        data => {
          this.totalRows = data.total;
          this.tableData = data.rows;
        }
      );
    },
    // 获取单位全称
    getDWQC(row, column, cellValue) {
      for (let i = 0; i < this.dwxx.length; i++) {
        if (cellValue == this.dwxx[i].DWBH) {
          return this.dwxx[i].DWQC;
          break;
        }
      }
    },
    // 获取角色名称
    getJSMC(row, column, cellValue) {
      for (let i = 0; i < this.jsxx.length; i++) {
        if (cellValue == this.jsxx[i].BH) {
          return this.jsxx[i].MC;
          break;
        }
      }
    },
    // 改变表格显示行数
    handleSizeChange(val) {
      this.searchField.rows = val;
    },
    // 跳转到指定页
    handleCurrentChange(val) {
      this.searchField.page = val;
    }
  },
  created() {
    this.searchField.yhbh = this.$store.state.yhbh;
    // 获取单位列表
    this.$get(
      "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_All_DWXX",
      { yhbh: this.$store.state.yhbh },
      data => {
        this.dwxx = data;
      }
    );
    // 获取角色列表
    this.$get(
      "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_All_JSLX",
      {},
      data => {
        this.jsxx = data;
      }
    );
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
div .panel {
  width: 100%;
  .el-header {
    height: auto !important;
  }
}
.active {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
</style>