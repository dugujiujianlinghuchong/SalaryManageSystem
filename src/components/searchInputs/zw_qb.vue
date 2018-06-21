<template>
    <div>
        <label>职务</label>
        <el-select v-model="input_value" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.MC" :key="index" style="font-size:12px"></el-option>
        </el-select>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["zw"],
  data() {
    return {
      input_value: this.zw,
      optionsOfSelector: []
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeZW", this.input_value);
    }
  },
  methods: {
    getOptionList() {
      let vueThis = this;
      vueThis.$get(
        "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllZWB_QB",
        {},
        data => {
          vueThis.optionsOfSelector = data;
          vueThis.input_value = vueThis.optionsOfSelector[0].MC;
        }
      );
    },
    changeValue() {
      this.$emit("changeZW", this.input_value);
    }
  },
  created() {
    this.getOptionList();
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>