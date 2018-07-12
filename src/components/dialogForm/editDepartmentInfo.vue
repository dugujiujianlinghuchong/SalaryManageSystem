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
                <el-form-item label="单位简称" label-width='150px' prop='DWJC'>
                    <el-input v-model="form.DWJC" auto-complete="off" style="width:215px"></el-input>
                </el-form-item>
                <el-form-item label="单位全称" label-width='150px' prop='DWQC'>
                    <el-input v-model="form.DWQC" auto-complete="off" style="width:215px"></el-input>
                </el-form-item>
                <el-form-item label="单位性质" label-width='150px' prop='DWXZ'>
                    <el-select v-model="form.DWXZ">
                        <el-option v-for="(item,index) in optionsOfSelector_1" :value="item.MC" :label="item.MC" :key="index" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上级单位" label-width='150px' prop='SJDW'>
                    <el-select v-model="form.SJDW">
                        <el-option v-for="(item,index) in optionsOfSelector_2" :value="item.DWQC" :label="item.DWQC" :key="index" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" label-width='150px' prop='PX'>
                    <el-input v-model="form.PX" auto-complete="off" style="width:215px"></el-input>
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
      optionsOfSelector_1: [], // 单位性质下拉列表数据
      optionsOfSelector_2: [], // 上级单位下拉列表数据
      // 表单提交字段
      form: {
        DWJC: "",
        DWQC: "",
        DWXZ: "",
        SJDW: "",
        PX: "",
        BZ: "",
        // 以下为隐藏字段
        YHBH: "",
        DWBH: ""
      },
      // 表单字段验证规则
      rules: {
        DWJC: [
          { required: true, message: "请填写单位简称", trigger: "blur" }
        ],
        DWQC: [
          { required: true, message: "请填写单位全称", trigger: "blur" }
        ],
        DWXZ: [
          { required: true, message: "请选择单位性质", trigger: "change" }
        ],
        SJDW: [
          { required: true, message: "请选择上级单位", trigger: "change" }
        ],
        PX: [
          { required: true, message: "请填写单位序号", trigger: "blur" }
        ]
      }
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
        this.form.YHBH = this.$store.state.yhbh;
        this.form.DWBH = 0;
      } else {
        // 给表单赋默认值
        for (var key in this.rowData) {
          this.form[key] = this.rowData[key];
        }
        this.form.YHBH = this.$store.state.yhbh;
      }
    }
  },
  methods: {
    // 提交字段
    handleSubmit() {
      this.submitForm(
        "fieldForm",
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/SaveDWXX",
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
    // 获取下拉列表
    this.getSelectorData(
      "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_DWXZ",
      {},
      "optionsOfSelector_1"
    );
    this.getSelectorData(
      "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_All_DWXX",
      { yhbh: this.$store.state.yhbh },
      "optionsOfSelector_2"
    );
  }
};
</script>
