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
                <el-form-item label="职务名称" label-width='150px' prop='ZW_MC'>
                  <el-input v-model="form.ZW_MC" auto-complete="off"></el-input>
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
        ZW_MC: "",
        BZ: "",
        // 以下为隐藏字段
        ZW_ID: ""
      },
      // 表单字段验证规则
      rules: {
        ZW_MC: [
          { required: true, message: "请填写职务名称", trigger: "blur" }
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
        this.form.ZW_ID = 0;
        // 调用的后台方法
        this.requestAddress = "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/AddANewZWB"
      } else {
        // 你踏马很特殊啊
        this.form.ZW_MC = this.rowData.MC;
        this.form.ZW_ID = this.rowData.BH;
        this.form.BZ = this.rowData.BZ;
        // 调用的后台方法
        this.requestAddress = "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/UpdateAZWB"
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
