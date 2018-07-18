import Vue from 'vue'
import Axios from 'axios'


// 打开编辑表格行对话框
Vue.prototype.editTableRow = function (dialogVisable, dialogTitle, rowData, dialogName, row) {
    this[dialogVisable] = true;
    this[dialogTitle] = dialogName;
    this[rowData] = row;
}

// 获取下拉框数据
Vue.prototype.getSelectorData = function (requestAddress, params, selector) {
    Axios.get(requestAddress, { params: params })
        .then(res => {
            this[selector] = res.data;
        })
}

// 提交表单
Vue.prototype.submitForm = function (formName, requestAddress, params, func) {
    this.$refs[formName].validate(valid => {
        if (valid) {
            Axios.post(requestAddress, params)
                .then(res => {
                    func(res.data);
                })
        } else {
            return false;
        }
    });
}

// 重置表单
Vue.prototype.resetForm = function (formName) {
    if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
    }
}

// 删除表格行
Vue.prototype.deleteTableRow = function (requestAddress, params) {
    this.$confirm('是否删除此条数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        Axios.get(requestAddress, { params: params })
            .then(() => {
                this.getTableData();
            })
    })
}

// 生成GUID
Vue.prototype.getGUID = function () {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let guid = s.join("");
    return guid;
}

// 下载文件
Vue.prototype.dowload = function (url, params) {
    window.open(url + params)
}