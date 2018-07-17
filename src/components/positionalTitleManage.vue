<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <el-button size='mini' type="primary" @click='editTableRow("dialogVisible", "dialogTitle", "rowData", "新增职称", {})'>添加</el-button>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main>
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editTableRow('dialogVisible', 'dialogTitle', 'rowData', '编辑职称', scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteTableRow('http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/DeleteAZCB', { id: scope.row.BH })">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="BH" label="编号" align="center"></el-table-column>
            <el-table-column prop="MC" label="职称" align="center"></el-table-column>
            <el-table-column prop="BZ" label="备注" align="center"></el-table-column>
          </el-table>
          <br>
        </el-main>
        <!-- 展示内容 end -->

        <!-- 编辑表格数据对话框 -->
        <edit-positional-title 
          :dialogVisible='dialogVisible' 
          :dialogTitle='dialogTitle' 
          :rowData='rowData' 
          @changeDialogStatus='changeDialogStatus'
        ></edit-positional-title>
      </div>
    </el-container>
  </div>
</template>

<script>
import EditPositionalTitle from "./dialogForm/editPositionalTitle";

export default {
  data() {
    return {
      /* 以下为此页面所用数据 */
      // 检索表格字段
      searchField: {
      },
      tableData: [], // 表格数据

      /* 以下为传递给子组件的数据 */
      dialogVisible: false, // 编辑表格对话框状态
      dialogTitle: "", // 编辑表格对话框标题
      rowData: {} // 选中编辑行的数据
    };
  },
  components: {
    EditPositionalTitle
  },
  watch: {
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
    // 监听子组件对话框状态
    changeDialogStatus(dialogStatus) {
      this.dialogVisible = dialogStatus;
      this.getTableData();
    },
    // 获取表格信息
    getTableData() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllZCB",
        this.searchField,
        data => {
          this.tableData = data;
        }
      );
    }
  },
  created() {
    this.getTableData();
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