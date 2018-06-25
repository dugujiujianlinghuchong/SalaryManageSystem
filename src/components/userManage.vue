<script>
export default {
  props: ["message"],
  render(h) {
    return (
      <el-button type="primary" onClick={this.dj(1)}>
        {this.message}
      </el-button>
    );
  },
  methods: {
    dj(num) {
      alert(num);
    }
  }
};
</script>