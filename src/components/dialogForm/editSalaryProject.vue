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
                <el-form-item label="工资项名称" label-width='150px' prop='W_GZXMC'>
                    <el-input v-model="form.W_GZXMC" auto-complete="off" style="width:215px"></el-input>
                </el-form-item>
                <el-form-item label="是否扣除项" label-width='150px' prop='W_SFKCX'>
                    <el-select v-model="form.W_SFKCX">
                        <el-option value="是" label="是"></el-option>
                        <el-option value="否" label="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否计税项" label-width='150px' prop='W_SFJSX'>
                    <el-select v-model="form.W_SFJSX">
                        <el-option value="是" label="是"></el-option>
                        <el-option value="否" label="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" label-width='150px' prop='BZ'>
                    <el-input v-model="form.BZ" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="handleSubmit()">确 定</el-button>
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
        W_GZXMC: "",
        W_SFKCX: "",
        W_SFJSX: "",
        BZ: "",
        // 以下为隐藏字段
        W_GZXBH: ""
      },
      // 表单字段验证规则
      rules: {
        W_GZXMC: [
          { required: true, message: "请填写工资项名称", trigger: "blur" }
        ],
        W_SFKCX: [
          { required: true, message: "请选择是否扣除项", trigger: "change" }
        ],
        W_SFJSX: [
          { required: true, message: "请选择是否计税项", trigger: "change" }
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
        this.form.W_GZXBH = 0;
        // 调用的后台方法
        this.requestAddress = "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/AddANewGZX"
      } else {
        // 给表单赋默认值
        for (var key in this.rowData) {
          this.form[key] = this.rowData[key];
        }
        // 调用的后台方法
        this.requestAddress = "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/UpdateAGZX"
      }
    }
  },
  methods: {
    // 提交字段
    handleSubmit() {
      this.submitForm(
        "fieldForm",
        this.requestAddress,
        this.form,
        data => {
          this.$emit("changeDialogStatus", false);
        }
      );
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
