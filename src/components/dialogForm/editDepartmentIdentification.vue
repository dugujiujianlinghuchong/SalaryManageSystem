<template>
    <div>
        <el-dialog 
          :visible.sync="dialogVisible" 
          :title="dialogTitle"
          :show-close="false" 
          :close-on-click-modal="false" 
          :close-on-press-escape="false"
          width="30%">
            <el-form :model="form" :rules="rules" ref="fieldForm">
                <el-form-item label="标识名称" label-width='150px' prop='D_BMBSMC'>
                  <el-input v-model="form.D_BMBSMC" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" label-width='150px' prop='BZ'>
                  <el-input v-model="form.BZ" auto-complete="off"></el-input>
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
  props: ["dialogVisible", "dialogTitle", "rowData"],
  data() {
    return {
      // 表单提交字段
      form: {
        D_BMBSMC: "",
        BZ: "",
        // 以下为隐藏字段
        D_BMBSBH: ""
      },
      // 表单字段验证规则
      rules: {
        ZWD_BMBSMC_MC: [
          { required: true, message: "请填写部门标识名称", trigger: "blur" }
        ]
      },
      requestAddress: '' // 调用的后台方法
    };
  },
  watch: {
    // 判断新增/编辑
    rowData(newVal) {
      if (Object.keys(newVal).length == 0) {
        // 重置表单
        for (var key in this.form) {
          this.form[key] = "";
        }
        // 给隐藏字段赋值
        this.form.D_BMBSBH = 0;
        // 调用的后台方法
        this.requestAddress = "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/AddANewBMBS"
      } else {
        // 你踏马很特殊啊
        this.form.D_BMBSMC = this.rowData.MC;
        this.form.D_BMBSBH = this.rowData.BH;
        this.form.BZ = this.rowData.BZ;
        // 调用的后台方法
        this.requestAddress = "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/UpdateABMBS"
      }
    }
  },
  methods: {
    // 提交字段
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post(
            this.requestAddress,
            this.form,
            data => {
              this.$emit("changeDialogStatus", false);
            }
          );
        } else {
          return false;
        }
      });
    },
    // 取消编辑
    closeDialog() {
      this.$emit("changeDialogStatus", false);
      this.resetForm("fieldForm");
    }
  },
  created() {
  }
};
</script>
