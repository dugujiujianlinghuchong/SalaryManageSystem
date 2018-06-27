<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <keywords :keyword='searchField.keword' @changeKeywords='changeKeywords'></keywords>
            <bm-qb :bmbh='searchField.szbm' @changeBMBH='changeBMBH'></bm-qb>
            <bzqk-qb :bzqk='searchField.bzqk' @changeBZQK='changeBZQK'></bzqk-qb>
            <gzmb-qb :gzmb='searchField.gzmb' @changeGZMB='changeGZMB'></gzmb-qb>
            <zc-qb :zc='searchField.zc' @changeZC='changeZC'></zc-qb>
            <zw-qb :zw='searchField.zw' @changeZW='changeZW'></zw-qb>
            <sfbzcy-qb :sfbzcy='searchField.sfbzcy' @changeSFBZCY='changeSFBZCY'></sfbzcy-qb>
            <el-button size='mini' type="primary" @click="handleAdd">添加</el-button>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main  v-if="!detailPage">
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">管理历史信息</el-button> -->
              </template>
            </el-table-column>
            <el-table-column prop="S_XM" label="姓名" align="center"></el-table-column>
            <el-table-column prop="S_XB" label="性别" align="center" width="50"></el-table-column>
            <el-table-column prop="S_ZW" label="职务" align="center"></el-table-column>
            <el-table-column prop="S_ZC" label="职称" align="center"></el-table-column>
            <el-table-column prop="S_CJGZSJ" label="入职时间" align="center" width="100"></el-table-column>
            <el-table-column prop="S_ccbno" label="建行卡号" align="center" width="180"></el-table-column>
            <el-table-column prop="S_icbno" label="工行卡号" align="center" width="180"></el-table-column>
            <el-table-column prop="S_mbno" label="招行卡号" align="center" width="180"></el-table-column>
            <el-table-column prop="D_BMMC" label="所在部门" align="center"></el-table-column>
            <el-table-column prop="S_BZQK" label="编制情况" align="center"></el-table-column>
            <el-table-column prop="S_GZMBMC" label="工资模板" align="center"></el-table-column>
            <el-table-column prop="S_SFBZCY" label="是否班子成员" align="center"></el-table-column>
            <el-table-column prop="S_BZ" label="备注" align="center"></el-table-column>
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
        <edit-staff-info 
          :dialogVisible='dialogVisible' 
          :dialogTitle='dialogTitle' 
          :editOrAdd='editOrAdd'
          :rowData='rowData' 
          @changeDialogStatus='changeDialogStatus'
        ></edit-staff-info >
      </div>
    </el-container>
  </div>
</template>

<script>
import Keywords from "./searchInputs/keywords";
import BmQb from "./searchInputs/bm_qb";
import BzqkQb from "./searchInputs/bzqk_qb";
import GzmbQb from "./searchInputs/gzmb_qb";
import ZcQb from "./searchInputs/zc_qb";
import ZwQb from "./searchInputs/zw_qb";
import SfbzcyQb from "./searchInputs/sfbzcy_qb";
import EditStaffInfo from "./dialogForm/editStaffInfo";

export default {
  data() {
    return {
      /* 以下为此页面所用数据 */
      detailPage: false,
      // 检索表格字段
      searchField: {
        yhbh: "",
        keword: "",
        szbm: "",
        bzqk: "",
        gzmb: "",
        zc: "",
        zw: "",
        sfbzcy: "",
        page: 1,
        rows: 10
      },
      tableData: [], // 表格数据
      totalRows: 0, //数据总条数

      /* 以下为传递给子组件的数据 */
      dialogVisible: false, // 编辑表格对话框状态
      dialogTitle: "", // 编辑表格对话框标题
      editOrAdd: "", // 新增/编辑表单
      rowData: {} // 选中编辑行的数据
    };
  },
  components: {
    Keywords,
    BmQb,
    BzqkQb,
    GzmbQb,
    ZcQb,
    ZwQb,
    SfbzcyQb,
    EditStaffInfo
  },
  watch: {
    searchField: {
      handler(newVal, oldVal) {
        if (
          newVal.szbm != "" &&
          newVal.bzqk != "" &&
          newVal.gzmb != "" &&
          newVal.zc != "" &&
          newVal.zw != "" &&
          newVal.sfbzcy != ""
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
        return 640;
      } else if (this.$store.state.screenWidth > 1200) {
        return 430;
      }
    }
  },
  methods: {
    // 以下为监听子组件检索框状态
    changeKeywords(keyword) {
      this.searchField.keword = keyword;
      this.searchField.page = 1;
    },
    changeBMBH(bmbh) {
      this.searchField.szbm = bmbh;
      this.searchField.page = 1;
    },
    changeBZQK(bzqk) {
      this.searchField.bzqk = bzqk;
      this.searchField.page = 1;
    },
    changeGZMB(gzmb) {
      this.searchField.gzmb = gzmb;
      this.searchField.page = 1;
    },
    changeZC(zc) {
      this.searchField.zc = zc;
      this.searchField.page = 1;
    },
    changeZW(zw) {
      this.searchField.zw = zw;
      this.searchField.page = 1;
    },
    changeSFBZCY(sfbzcy) {
      this.searchField.sfbzcy = sfbzcy;
      this.searchField.page = 1;
    },
    // 改变页码
    handleCurrentChange(val) {
      this.searchField.page = val;
    },
    // 改变页面显示行数
    handleSizeChange(val) {
      this.searchField.rows = val;
    },
    // 获取表格信息
    getTableData() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetMemberList_FY",
        vueThis.searchField,
        data => {
          vueThis.totalRows = data.total;
          vueThis.tableData = data.rows;
        }
      );
    },
    // 打开新增表格行对话框
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "添加员工";
      this.editOrAdd = "add";
    },
    // 打开编辑表格行对话框
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑员工";
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
</style>