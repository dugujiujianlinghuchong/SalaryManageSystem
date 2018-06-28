import Vue from 'vue'
import Axios from 'axios'


// 提交对话框表单方法
Vue.prototype.submitDialoForm = function (requestAddress, params) {
    this.$refs["fieldForm"].validate(valid => {
        if (valid) {
            Axios.post(requestAddress, params)
                .then(() => {
                    this.$emit("changeDialogStatus", false);
                })
        } else {
            return false;
        }
    });
}