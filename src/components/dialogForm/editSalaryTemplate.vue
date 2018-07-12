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
                <el-form-item label="工资模板" label-width='150px' prop='X_GZMBBH'>
                  <el-select v-model="form.X_GZMBBH">
                      <el-option v-for="(item,index) in optionsOfSelector_1" :value="item.BH" :label="item.MC" :key="index" style="font-size:12px"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工资项" label-width='150px' prop='W_GZXBH'>
                  <el-select v-model="form.W_GZXBH">
                      <el-option v-for="(item,index) in optionsOfSelector_2" :value="item.W_GZXBH" :label="item.W_GZXMC" :key="index" style="font-size:12px"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工资表类型" label-width='150px' prop='GZBLXBH'>
                  <el-select v-model="form.GZBLXBH">
                      <el-option v-for="(item,index) in optionsOfSelector_3" :value="item.BH" :label="item.MC" :key="index" style="font-size:12px"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工资项出账银行卡号" label-width='150px' prop='GZXCZKH'>
                  <el-input v-model="form.GZXCZKH" auto-complete="off"></el-input>
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
      optionsOfSelector_1: [], // 工资模板下拉列表数据
      optionsOfSelector_2: [], // 工资项下拉列表数据
      optionsOfSelector_3: [], // 工资表类型下拉列表数据
      // 表单提交字段
      form: {
        X_GZMBBH: "",
        W_GZXBH: "",
        GZBLXBH: "",
        GZXCZKH: "",
        BZ: "",
        // 以下为隐藏字段
        MB_ID: ""
      },
      // 表单字段验证规则
      rules: {
        X_GZMBBH: [
          { required: true, message: "请选择工资模板", trigger: "change" }
        ],
        W_GZXBH: [
          { required: true, message: "请选择工资项", trigger: "change" }
        ],
        GZBLXBH: [
          { required: true, message: "请选择工资表类型", trigger: "change" }
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
        this.form.MB_ID = 0;
        // 调用的后台方法
        this.requestAddress = "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/AddANewGZMBX"
      } else {
        // 给表单赋默认值
        for (var key in this.rowData) {
          this.form[key] = this.rowData[key];
        }
        this.form.X_GZMBBH += "";
        this.form.GZBLXBH += "";
        // 调用的后台方法
        this.requestAddress = "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/UpdateAGZMBX"
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
    this.getSelectorData(
      "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZMB",
      {},
      "optionsOfSelector_1"
    );
    this.getSelectorData(
      "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZX",
      {},
      "optionsOfSelector_2"
    );
    this.getSelectorData(
      "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZBLX",
      {},
      "optionsOfSelector_3"
    );
  }
};
</script>
