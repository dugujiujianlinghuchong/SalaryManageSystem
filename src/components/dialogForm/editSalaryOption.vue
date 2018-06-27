<template>
    <div>
        <el-dialog 
          :visible.sync="dialogVisible" 
          :title="dialogTitle"
          :show-close="false" 
          :close-on-click-modal="false" 
          :close-on-press-escape="false"
          width="30%"  
        >
            <el-form :model="form" :rules="rules" ref="fieldForm">
                <el-form-item label="工资项名称" label-width='150px' prop='W_GZXBH'>
                  <el-select v-model="form.W_GZXBH">
                      <el-option v-for="(item,index) in optionsOfSelector_1" :value="item.W_GZXBH" :label="item.W_GZXMC" :key="index" style="font-size:12px"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工资发送方单位" label-width='150px' prop='W_GZXFSFDWBH'>
                  <el-select v-model="form.W_GZXFSFDWBH">
                      <el-option v-for="(item,index) in optionsOfSelector_2" :value="item.DWBH" :label="item.DWQC" :key="index" style="font-size:12px"></el-option>
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
                <el-button @click="closeDialog" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('fieldForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: [
    "dialogVisible",
    "dialogTitle",
    "staffCode",
    "searchFiled",
    "editOrAdd",
    "rowData",
    "gzmbmc"
  ],
  data() {
    return {
      optionsOfSelector_1: [], // 工资项下拉列表数据
      optionsOfSelector_2: [], // 发送单位下拉列表数据
      // 表单提交字段
      form: {
        W_GZXBH: "",
        W_GZXFSFDWBH: "",
        W_GZXJE: "",
        W_GZXSSXMBH: "",
        W_BZ: "",
        // 以下为隐藏字段
        S_ID: "",
        W_ID: "",
        W_ND: "",
        W_YF: ""
      },
      // 表单字段验证规则
      rules: {
        W_GZXBH: [
          { required: true, message: "请选择工资项", trigger: "change" }
        ],
        W_GZXFSFDWBH: [
          { required: true, message: "请选择发送方单位", trigger: "change" }
        ],
        W_GZXJE: [
          { required: true, message: "请填写工资金额", trigger: "blur" }
        ],
        W_GZXSSXMBH: [
          { required: true, message: "请填写工资所属项目编号", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    editOrAdd(newVal) {
      if (newVal == "add") {
        // 重置表单
        for (var key in this.form) {
          this.form[key] = "";
        }
        // 给隐藏字段赋值
        this.form.S_ID = this.searchFiled.strYGBH;
        this.form.W_ND = this.searchFiled.strND;
        this.form.W_YF = this.searchFiled.yf;
        this.form.W_ID = 0;
      } else {
        // 给表单赋默认值
        for (var key in this.rowData) {
          this.form[key] = this.rowData[key];
        }
      }
    }
  },
  methods: {
    // 获取工资项下拉列表数据
    getOptionsOfSelector_1() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZX_ByGZMBLX",
        { strGZMBMC: vueThis.gzmbmc },
        data => {
          vueThis.optionsOfSelector_1 = data;
        }
      );
    },
    // 获取单位下拉列表数据
    getOptionsOfSelector_2() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_All_DWXX",
        { yhbh: vueThis.$store.state.yhbh },
        data => {
          vueThis.optionsOfSelector_2 = data;
        }
      );
    },
    // 提交字段
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let vueThis = this;
          vueThis.$post(
            "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/AddANewGZB",
            vueThis.form,
            data => {
              vueThis.$emit("changeDialogStatus", false);
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
    },
    // 取消编辑
    closeDialog() {
      this.$emit("changeDialogStatus", false);
      this.resetForm("fieldForm");
    }
  },
  created() {
    // 获取下拉列表
    // this.getOptions.getOptionsOfSelector_1()
    this.getOptionsOfSelector_1();
    this.getOptionsOfSelector_2();
  }
};
</script>
