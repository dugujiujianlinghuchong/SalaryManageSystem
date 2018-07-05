<template>
    <div>
        <label>部门</label>
        <el-select v-model="input_value" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.DWQC" :label="item.DWQC" :key="index" style="font-size:12px"></el-option>
        </el-select>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["bmbh"],
  data() {
    return {
      input_value: this.bmbh,
      optionsOfSelector: []
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeBMBH", this.input_value);
    }
  },
  methods: {
    getOptionList() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_DWXX_All_QB",
        { yhbh: this.$store.state.yhbh },
        data => {
          this.optionsOfSelector = data;
          this.input_value = this.optionsOfSelector[0].DWQC;
        }
      );
    },
    changeValue() {
      this.$emit("changeBMBH", this.input_value);
    }
  },
  created() {
    this.getOptionList();
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>

