<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <keywords :keyword='searchField.keword' @changeKeywords='changeKeywords'></keywords>
            <el-button size='mini' type="primary" @click='editTableRow("dialogVisible", "dialogTitle", "rowData", "新增单位", {})'>添加</el-button>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main>
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editTableRow('dialogVisible', 'dialogTitle', 'rowData', '编辑单位', scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteTableRow('http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Delete_DWXX', { bh: scope.row.DWBH, yhbh: $store.state.yhbh })">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="DWJC" label="单位简称" align="center"></el-table-column>
            <el-table-column prop="DWQC" label="单位全称" align="center"></el-table-column>
            <el-table-column prop="DWXZ" label="单位性质" align="center"></el-table-column>
            <el-table-column prop="SJDW" label="上级单位" align="center"></el-table-column>
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
        <edit-department-info 
          :dialogVisible='dialogVisible' 
          :dialogTitle='dialogTitle' 
          :rowData='rowData' 
          @changeDialogStatus='changeDialogStatus'
        ></edit-department-info >
      </div>
    </el-container>
  </div>
</template>

<script>
import Keywords from "./searchInputs/keywords";
import EditDepartmentInfo from "./dialogForm/editDepartmentInfo";

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

      /* 以下为传递给子组件的数据 */
      dialogVisible: false, // 编辑表格对话框状态
      dialogTitle: "", // 编辑表格对话框标题
      rowData: {} // 选中编辑行的数据
    };
  },
  components: {
    Keywords,
    EditDepartmentInfo
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
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/GetDWXXList_OBJ",
        this.searchField,
        data => {
          this.totalRows = data.total;
          this.tableData = data.rows;
        }
      );
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