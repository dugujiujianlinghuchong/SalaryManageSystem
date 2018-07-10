<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <div v-if="!detailPage">
              <keywords :keyword='searchField.keword' @changeKeywords='changeKeywords'></keywords>
              <bm-qb :bmbh='searchField.szbm' @changeBMBH='changeBMBH'></bm-qb>
              <bzqk-qb :bzqk='searchField.bzqk' @changeBZQK='changeBZQK'></bzqk-qb>
              <gzmb-qb :gzmb='searchField.gzmb' @changeGZMB='changeGZMB'></gzmb-qb>
              <zc-qb :zc='searchField.zc' @changeZC='changeZC'></zc-qb>
              <zw-qb :zw='searchField.zw' @changeZW='changeZW'></zw-qb>
              <sfbzcy-qb :sfbzcy='searchField.sfbzcy' @changeSFBZCY='changeSFBZCY'></sfbzcy-qb>
              <el-button size='mini' type="primary" @click="editTableRow('dialogVisible', 'dialogTitle', 'rowData', '新增员工', {})">添加</el-button>
            </div>
            <el-button v-else size='mini' type="primary" @click='detailPage=false'>返回</el-button>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main v-show="!detailPage">
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column label="操作" align="center" width="80">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editTableRow('dialogVisible', 'dialogTitle', 'rowData', '编辑员工', scope.row)">编辑</el-button>
              </template>
            </el-table-column>
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <span @click="goToDetailPage(scope.row.S_YGBH)" class="active">{{ scope.row.S_XM }}</span>
              </template>
            </el-table-column>
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

        <!-- 员工详情页 -->
        <el-main v-show="detailPage">
          <el-table :data="tableData_detailPage" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column label="操作" align="center" width="80">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editTableRow('dialog2Visible', 'dialog2Title', 'rowData_detailPage', '编辑员工月信息', scope.row)">编辑</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="S_XM" label="姓名" align="center" width="80"></el-table-column>
            <el-table-column prop="S_ND" label="年度" align="center" width="60"></el-table-column>
            <el-table-column prop="S_YF" label="月份" align="center" width="50"></el-table-column>
            <el-table-column prop="S_XB" label="性别" align="center" width="50"></el-table-column>
            <el-table-column prop="S_ZW" label="职务" align="center"></el-table-column>
            <el-table-column prop="S_ZC" label="职称" align="center"></el-table-column>
            <el-table-column prop="S_CJGZSJ" label="入职时间" align="center"></el-table-column>
            <el-table-column prop="S_ccbno" label="建行卡号" align="center"></el-table-column>
            <el-table-column prop="S_icbno" label="工行卡号" align="center"></el-table-column>
            <el-table-column prop="S_mbno" label="招行卡号" align="center"></el-table-column>
            <el-table-column prop="D_BMMC" label="所在部门" align="center"></el-table-column>
            <el-table-column prop="S_BZQK" label="编制情况" align="center"></el-table-column>
            <el-table-column prop="S_GZMBMC" label="工资模板" align="center"></el-table-column>
            <el-table-column prop="S_SFBZCY" label="是否班子成员" align="center"></el-table-column>
            <el-table-column prop="S_BZ" label="备注" align="center"></el-table-column>
          </el-table>
        </el-main>

        <!-- 编辑表格数据对话框(员工信息) -->
        <edit-staff-info 
          :dialogVisible='dialogVisible' 
          :dialogTitle='dialogTitle' 
          :rowData='rowData' 
          @changeDialogStatus='changeDialogStatus'
        ></edit-staff-info >
        
        <!-- 编辑表格数据对话框(员工历史信息) -->
        <edit-staff-history-info 
          :dialog2Visible='dialog2Visible' 
          :dialog2Title='dialog2Title' 
          :rowDataDetailPage='rowData_detailPage' 
          @changeDialog2Status='changeDialog2Status'
        ></edit-staff-history-info>
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
import EditStaffHistoryInfo from "./dialogForm/editStaffHistoryInfo";

export default {
  data() {
    return {
      /* 以下为此页面所用数据 */
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
      totalRows: 0, // 数据总条数
      detailPage: false, // 详情页状态
      staffNumber: "", // 员工编号
      tableData_detailPage: [], // 详情页表格数据

      /* 以下为传递给子组件的数据(编辑员工信息对话框) */
      dialogVisible: false, // 编辑表格对话框状态
      dialogTitle: "", // 编辑表格对话框标题
      rowData: {}, // 选中编辑行的数据

      /* 以下为传递给子组件的数据(编辑员工历史信息对话框) */
      dialog2Visible: false, // 编辑表格对话框状态
      dialog2Title: "", // 编辑表格对话框标题
      rowData_detailPage: {} // 选中编辑行的数据
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
    EditStaffInfo,
    EditStaffHistoryInfo
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
    // 监听子组件对话框状态(编辑员工信息对话框)
    changeDialogStatus(dialogStatus) {
      this.dialogVisible = dialogStatus;
      this.getTableData();
    },
    // 监听子组件对话框状态(编辑员工信息对话框)
    changeDialog2Status(dialogStatus) {
      this.dialog2Visible = dialogStatus;
      this.getTableData_detailPage();
    },
    // 获取表格信息(员工信息)
    getTableData() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetMemberList_FY",
        this.searchField,
        data => {
          this.totalRows = data.total;
          this.tableData = data.rows;
        }
      );
    },
    // 获取表格信息(员工历史信息)
    getTableData_detailPage() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAMemberLSInfoList",
        { strYGBH: this.staffNumber },
        data => {
          this.tableData_detailPage = data;
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
    },
    // 打开详情页
    goToDetailPage(bh) {
      this.detailPage = true;
      this.staffNumber = bh;
      this.getTableData_detailPage();
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