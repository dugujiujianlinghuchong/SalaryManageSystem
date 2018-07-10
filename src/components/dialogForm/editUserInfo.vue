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
                <el-form-item label="登录名" label-width='150px' prop='XTDLM'>
                    <el-input v-model="form.XTDLM" auto-complete="off" style="width:215px"></el-input>
                </el-form-item>
                <el-form-item label="用户名" label-width='150px' prop='YHMC'>
                    <el-input v-model="form.YHMC" auto-complete="off" style="width:215px"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" label-width='150px' prop='YHJS'>
                    <el-select v-model="form.YHJS">
                        <el-option v-for="(item,index) in optionsOfSelector_2" :value="item.BH" :label="item.MC" :key="index" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在部门" label-width='150px' prop='SUDWBH'>
                    <el-select v-model="form.SUDWBH">
                        <el-option v-for="(item,index) in optionsOfSelector_1" :value="item.DWBH" :label="item.DWQC" :key="index" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="登录密码" label-width='150px' prop='DLKL'>
                    <el-input v-model="form.DLKL" auto-complete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" label-width='150px' prop='QRDLKL'>
                    <el-input v-model="form.QRDLKL" auto-complete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="联系人" label-width='150px' prop='LXR'>
                    <el-input v-model="form.LXR" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" label-width='150px' prop='LXFS'>
                    <el-input v-model="form.LXFS" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="业务编号" label-width='150px' prop='YWBH'>
                    <el-input v-model="form.YWBH" auto-complete="off"></el-input>
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
  props: [
    "dialogVisible",
    "dialogTitle",
    "rowData",
  ],
  data() {
    return {
      optionsOfSelector_1: [], // 部门下拉列表数据
      optionsOfSelector_2: [], // 角色下拉列表数据
      // 表单提交字段
      form: {
        XTDLM: "",
        YHMC: "",
        SUDWBH: "",
        DLKL: "",
        QRDLKL: "",
        LXR: "",
        LXFS:"",
        YHJS: "",
        YWBH: "",
        BZ: "",
        // 以下为隐藏字段
        YHBH: "",
        YHBHOPT: ""
      },
      // 表单字段验证规则
      rules: {
        XTDLM: [
          { required: true, message: "请填写系统登录名", trigger: "blur" }
        ],
        YHMC: [
          { required: true, message: "请填写用户名称", trigger: "blur" }
        ],
        SUDWBH: [
          { required: true, message: "请选择所在部门", trigger: "change" }
        ],
        DLKL: [
          { required: true, message: "请填写登陆密码", trigger: "blur" }
        ],
        QRDLKL: [
          { required: true, message: "请确认登陆密码", trigger: "blur" }
        ],
        YHJS: [
          { required: true, message: "请选择用户角色", trigger: "change" }
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
        this.form.YHBH = this.getGUID();
        this.form.YHBHOPT = this.$store.state.yhbh;
      } else {
        // 给表单赋默认值
        for (var key in this.rowData) {
          this.form[key] = this.rowData[key];
        }
        this.form.YHBHOPT = this.$store.state.yhbh;
        this.form.YHJS += "";
      }
    }
  },
  methods: {
    // 获取部门下拉列表数据
    getOptionsOfSelector_1() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_All_DWXX",
        { yhbh: this.$store.state.yhbh },
        data => {
          this.optionsOfSelector_1 = data;
        }
      );
    },
    // 获取角色下拉列表数据
    getOptionsOfSelector_2() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_All_JSLX",
        {},
        data => {
          this.optionsOfSelector_2 = data;
        }
      );
    },
    // 提交字段
    handleSubmit() {
      this.submitForm(
        "fieldForm",
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/SaveUser",
        this.form,
        data => {
          this.$emit("changeDialogStatus", false);
        }
      );
    },
    // 取消编辑
    closeDialog() {
      this.$emit("changeDialogStatus", false);
      this.resetForm('fieldForm');
    }
  },
  created() {
    // 获取下拉列表
    this.getOptionsOfSelector_1();
    this.getOptionsOfSelector_2();
  }
};
</script>
