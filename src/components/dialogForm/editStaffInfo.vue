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
                <el-form-item label="姓名" label-width='150px' prop='S_XM'>
                    <el-input v-model="form.S_XM" auto-complete="off" style="width:215px"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width='150px' prop='S_XB'>
                    <el-select v-model="form.S_XB">
                        <el-option value="男" label="男" style="font-size:12px"></el-option>
                        <el-option value="女" label="女" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职务" label-width='150px' prop='S_ZW'>
                    <el-select v-model="form.S_ZW">
                        <el-option v-for="(item,index) in optionsOfSelector_1" :value="item.MC" :label="item.MC" :key="index" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职称" label-width='150px' prop='S_ZC'>
                    <el-select v-model="form.S_ZC">
                        <el-option v-for="(item,index) in optionsOfSelector_2" :value="item.MC" :label="item.MC" :key="index" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在部门" label-width='150px' prop='S_SZBMBH'>
                    <el-select v-model="form.S_SZBMBH">
                        <el-option v-for="(item,index) in optionsOfSelector_3" :value="item.DWBH" :label="item.DWQC" :key="index" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="编制情况" label-width='150px' prop='S_BZQK'>
                    <el-select v-model="form.S_BZQK">
                        <el-option v-for="(item,index) in optionsOfSelector_4" :value="item.MC" :label="item.MC" :key="index" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工资模板名称" label-width='150px' prop='S_GZMBMC'>
                    <el-select v-model="form.S_GZMBMC">
                        <el-option v-for="(item,index) in optionsOfSelector_5" :value="item.MC" :label="item.MC" :key="index" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否班子成员" label-width='150px' prop='S_SFBZCY'>
                    <el-select v-model="form.S_SFBZCY">
                        <el-option value="是" label="是" style="font-size:12px"></el-option>
                        <el-option value="否" label="否" style="font-size:12px"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职时间" label-width='150px' prop='S_CJGZSJ'>
                    <el-date-picker v-model="form.S_CJGZSJ" placeholder="选择日期" :editable='false' :clearable="false" value-format="yyyy-MM-dd"></el-date-picker>
                    <!-- <el-input v-model="form.S_CJGZSJ" auto-complete="off"></el-input> -->
                </el-form-item>
                <el-form-item label="建行卡号" label-width='150px' prop='S_ccbno'>
                    <el-input v-model="form.S_ccbno" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="工行卡号" label-width='150px' prop='S_icbcno'>
                    <el-input v-model="form.S_icbcno" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="招行卡号" label-width='150px' prop='S_mbno'>
                    <el-input v-model="form.S_mbno" auto-complete="off"></el-input>
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
  props: [
    "dialogVisible",
    "dialogTitle",
    "editOrAdd",
    "rowData",
  ],
  data() {
    return {
      optionsOfSelector_1: [], // 职务下拉列表数据
      optionsOfSelector_2: [], // 职称下拉列表数据
      optionsOfSelector_3: [], // 部门下拉列表数据
      optionsOfSelector_4: [], // 编制下拉列表数据
      optionsOfSelector_5: [], // 工资模板下拉列表数据
      // 表单提交字段
      form: {
        S_XM: "",
        S_XB: "",
        S_ZW: "",
        S_ZC: "",
        S_SZBMBH: "",
        S_BZQK: "",
        S_GZMBMC:"",
        S_SFBZCY: "",
        S_CJGZSJ: "",
        S_ccbno: "",
        S_icbcno: "",
        S_mbno: "",
        BZ: "",
        TEST: "",
        // 以下为隐藏字段
        S_ID: "",
        S_YGBH: ""
      },
      // 表单字段验证规则
      rules: {
        S_XM: [
          { required: true, message: "请填写员工姓名", trigger: "blur" }
        ],
        S_XB: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        S_ZW: [
          { required: true, message: "请选择职务", trigger: "change" }
        ],
        S_ZC: [
          { required: true, message: "请选择职称", trigger: "change" }
        ],
        S_SZBMBH: [
          { required: true, message: "请选择所属部门", trigger: "change" }
        ],
        S_BZQK: [
          { required: true, message: "请选择编制", trigger: "change" }
        ],
        S_GZMBMC: [
          { required: true, message: "请选择工资模板", trigger: "change" }
        ],
        S_SFBZCY: [
          { required: true, message: "请选择是否班子成员", trigger: "change" }
        ],
        S_CJGZSJ: [
          { required: true, message: "请填写参加工作时间", trigger: "blur" }
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
        this.form.S_YGBH = this.searchFiled.strND;
      } else {
        // 给表单赋默认值
        for (var key in this.rowData) {
          this.form[key] = this.rowData[key];
        }
      }
    }
  },
  methods: {
    // 获取职务下拉列表数据
    getOptionsOfSelector_1() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllZWB",
        { yhbh: vueThis.$store.state.yhbh },
        data => {
          vueThis.optionsOfSelector_1 = data;
        }
      );
    },
    // 获取职称下拉列表数据
    getOptionsOfSelector_2() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllZCB",
        { yhbh: vueThis.$store.state.yhbh },
        data => {
          vueThis.optionsOfSelector_2 = data;
        }
      );
    },
    // 获取部门下拉列表数据
    getOptionsOfSelector_3() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_All_DWXX",
        { yhbh: vueThis.$store.state.yhbh },
        data => {
          vueThis.optionsOfSelector_3 = data;
        }
      );
    },
    // 获取编制情况下拉列表数据
    getOptionsOfSelector_4() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllBZLX",
        { yhbh: vueThis.$store.state.yhbh },
        data => {
          vueThis.optionsOfSelector_4 = data;
        }
      );
    },
    // 获取工资模板下拉列表数据
    getOptionsOfSelector_5() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZMB",
        { yhbh: vueThis.$store.state.yhbh },
        data => {
          vueThis.optionsOfSelector_5 = data;
        }
      );
    },
    // 提交字段
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let vueThis = this;
          vueThis.$post(
            "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/UpdateAMember",
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
      this.resetForm('fieldForm');
    }
  },
  created() {
    // 获取下拉列表
    this.getOptionsOfSelector_1();
    this.getOptionsOfSelector_2();
    this.getOptionsOfSelector_3();
    this.getOptionsOfSelector_4();
    this.getOptionsOfSelector_5();
  }
};
</script>
