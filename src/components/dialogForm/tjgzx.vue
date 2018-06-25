<template>
    <div>
        <el-dialog width="30%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="isShow" :title="dialogTitle">
        <!-- <el-dialog width="30%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="dialogVisible" :title="dialogTitle"> -->
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
                <el-button @click="closeDialog" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('gzxxForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: ["isShow", "dialogVisible", "dialogTitle", "editOrAdd", "gzmbmc"],
  data() {
    return {
      optionsOfGZX: [], // 工资项下拉列表数据
      optionsOfDWXX: [], // 发送单位下拉列表数据
      form: {
        // 添加工资项提交字段
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
      rules: {
        // 表单字段验证规则
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
      console.log(newVal);
    }
  },
  methods: {
    // 关闭对话框
    closeDialog() {
      this.$emit("changeDialogStatus", false);
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
    this.getOptionsOfGZX();
    this.getOptionsOfDWXX();
  }
};
</script>
