<template>
  <div id="app">
    <!-- 主页 -->
    <el-row id="container" v-if="yhbh">
      <el-header id="top">
        <h1>工资管理系统</h1>
        <div class="toolbar">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px;margin-left: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出系统</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ dlm }}</span>
        </div>
      </el-header>
      <!-- 左栏 -->
      <el-col id="left" :xs="7" :sm="6" :md="5" :lg="3" :xl="3">
        <div class="grid-content bg-purple" >
            <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group> -->
            <el-menu :default-openeds="['1']">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-info"></i>工资管理</template>
                  <el-menu-item index="1-1" @click="addTab(editableTabsValue, '主页', 'HomePage', false)">主页</el-menu-item>
                  <el-menu-item index="1-2" @click="addTab(editableTabsValue, '个人工资统计', 'PersonalSalary', true)">个人工资统计</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
                  <el-menu-item index="2-1" @click="addTab(editableTabsValue, '员工管理', 'StaffManage', true)">员工管理</el-menu-item>
                  <el-menu-item index="2-2">用户管理</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title"><i class="el-icon-date"></i>系统日志</template>
                  <el-menu-item index="3-1">操作记录</el-menu-item>
              </el-submenu>
            </el-menu>
        </div>
      </el-col>
      <!-- 右栏 -->
      <el-col id="right" :xs="17" :sm="18" :md="19" :lg="21" :xl="21">
        <div class="grid-content bg-purple-light">
          <el-tabs type="border-card" v-model="editableTabsValue" @tab-remove="removeTab">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name" :closable="item.closable">
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <!-- 主页 end -->

    <!-- 登录页 -->
    <div v-else>
      <el-button>Start</el-button>
    </div>
    <!-- 登录页 end -->

  </div>
</template>

<script>
import HomePage from "./components/homePage";
import HomePage_dialog from "./components/homePage_dialog";
import PersonalSalary from "./components/personalSalary";
import StaffManage from "./components/staffManage";

export default {
  data() {
    return {
      yhbh: "", //用户编号
      dlm: "",
      editableTabsValue: "0",
      editableTabs: [
        {
          title: "主页",
          name: "0",
          content: "HomePage",
          closable: false
        }
      ],
      tabIndex: 0
    };
  },
  components: {
    HomePage,
    PersonalSalary,
    HomePage_dialog,
    StaffManage
  },
  methods: {
    validateUserInfo() {
      var vueThis = this;
      vueThis.$http
        .get(
          "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/ValidateUserInfo",
          { params: { strUserName: "wx", strPSD: "1" } }
        )
        .then(function(response) {
          vueThis.yhbh = response.data.YHBH;
          vueThis.dlm = response.data.XTDLM;

          // 将系统信息写入Vuex
          var systemInfo = {};
          systemInfo.yhbh = vueThis.yhbh;
          systemInfo.screenWidth = document.body.offsetWidth;
          vueThis.$store.commit("getSystemInfo", systemInfo);
        });
    },
    addTab(targetName, title, content, closable) {
      for (var i = 0; i < this.editableTabs.length; i++) {
        console.log(this.editableTabs[i]);
        if (this.editableTabs[i].title == title) {
          this.editableTabsValue = this.editableTabs[i].name;
          return;
        }
      }

      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: title,
        name: newTabName,
        content: content,
        closable: closable
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  created() {
    // 拒绝ie用户
    var userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("NET") != -1 && userAgent.indexOf("rv") != -1) {
      alert("这里不欢迎ie用户，guna！");
      // return;
    }

    this.validateUserInfo();
  }
};
</script>

<style lang='less'>
#container {
  padding: 0;
  margin: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  #top {
    height: 8% !important;
    overflow: hidden;
    // padding: 0;
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      height: 60px;
      line-height: 60px;
      width: 20%;
      color: #ffffff;
    }
    .toolbar {
      width: 120px;
      color: #ffffff;
    }
  }
  #left {
    height: 92%;
    border: 1px solid #e6e6e6;
    overflow: hidden;
    ul {
      border: none;
    }
  }
  #right {
    height: 92%;
    .el-header {
      background-color: #f2f2f2;
    }
    .grid-content .el-table__body-wrapper {
      height: 600px;
      // overflow-y: auto;
    }
  }
}
.el-header {
  background-color: #409eff;
  color: #333;
  height: 50px !important;
  line-height: 50px;
}
.el-aside {
  color: #333;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>