<template>
    <div>
        <label>编制情况</label>
        <el-select v-model="input_value" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.MC" :key="index" style="font-size:12px"></el-option>
        </el-select>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["bzqk"],
  data() {
    return {
      input_value: this.bzqk,
      optionsOfSelector: []
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeBZQK", this.input_value);
    }
  },
  methods: {
    getOptionList() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllBZLX_QB",
        { yhbh: this.$store.state.yhbh },
        data => {
          this.optionsOfSelector = data;
          this.input_value = this.optionsOfSelector[0].MC;
        }
      );
    },
    changeValue() {
      this.$emit("changeBZQK", this.input_value);
    }
  },
  created() {
    this.getOptionList();
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>