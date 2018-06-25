<script>
export default {
  props: ["isShow"],
  data() {
    return {
      dialogIsShow: false
    };
  },
  render(h) {
    return (
      <el-dialog
        width="30%"
        visible={this.dialogIsShow}
        title="render生成的对话框"
      >
        <h1>123</h1>
        <div slot="footer" class="dialog-footer">
          <el-button oncClick={(this.dialogIsShow = false)}>取 消</el-button>
          <el-button type="primary" oncClick={(this.dialogIsShow = false)}>
            确 定
          </el-button>
        </div>
      </el-dialog>
    );
  },
  created() {
    this.dialogIsShow = this.isShow;
  }
};
</script>