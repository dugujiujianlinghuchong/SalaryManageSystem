<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <el-button size='mini' type="primary" @click='editTableRow("dialogVisible", "dialogTitle", "rowData", "新增工资项", {})'>添加</el-button>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main>
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editTableRow('dialogVisible', 'dialogTitle', 'rowData', '编辑工资项', scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteTableRow('http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/DeleteAGZX', { id: scope.row.W_GZXBH })">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="W_GZXBH" label="工资项编号" align="center"></el-table-column>
            <el-table-column prop="W_GZXMC" label="工资项名称" align="center"></el-table-column>
            <el-table-column prop="W_SFKCX" label="是否扣除项" align="center"></el-table-column>
            <el-table-column prop="W_SFJSX" label="是否计税项" align="center"></el-table-column>
            <el-table-column prop="BZ" label="备注" align="center"></el-table-column>
          </el-table>
          <br>
          <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="searchField.page"
            :page-size="searchField.rows"
            :page-sizes="[5, 10, 20, 30, 40]"
            :total="totalRows"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination> -->
        </el-main>
        <!-- 展示内容 end -->

        <!-- 编辑表格数据对话框 -->
        <edit-salary-project 
          :dialogVisible='dialogVisible' 
          :dialogTitle='dialogTitle' 
          :rowData='rowData' 
          @changeDialogStatus='changeDialogStatus'
        ></edit-salary-project>
      </div>
    </el-container>
  </div>
</template>

<script>
import EditSalaryProject from "./dialogForm/editSalaryProject";

export default {
  data() {
    return {
      /* 以下为此页面所用数据 */
      // 检索表格字段
      searchField: {
      },
      tableData: [], // 表格数据
      // totalRows: 0, // 数据总条数

      /* 以下为传递给子组件的数据 */
      dialogVisible: false, // 编辑表格对话框状态
      dialogTitle: "", // 编辑表格对话框标题
      rowData: {} // 选中编辑行的数据
    };
  },
  components: {
    EditSalaryProject
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
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZX",
        this.searchField,
        data => {
          this.tableData = data;
        }
      );
    },
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