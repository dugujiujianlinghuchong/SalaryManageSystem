<template>
  <div id="app">
    <!-- 主页 -->
    <el-row id="container" v-if="yhbh">
      <el-header id="top">
        <h1>工资管理系统</h1>
        <div class="toolbar">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right:15px;margin-left:15px;cursor:pointer"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="yhbh=''">退出系统</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ dlm }}</span>
        </div>
        <!-- <div class="topbar-account topbar-btn">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{nickname}}  <i
              class="iconfont icon-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
      </el-header>
      <!-- 左栏 -->
      <el-col id="left" :xs="7" :sm="6" :md="5" :lg="3" :xl="3">
        <div class="grid-content bg-purple" >
            <el-menu :default-openeds="opens" :default-active='editableTabsIndex'>
              <el-submenu index="1">
                <template slot="title">&nbsp;<i class="icon-money"></i>&nbsp;&nbsp;工资信息</template>
                  <el-menu-item index="1-1" @click="addTab(editableTabsValue, '主页', 'HomePage', false, '1-1')">主页</el-menu-item>
                  <el-menu-item index="1-2" @click="addTab(editableTabsValue, '个人工资统计', 'PersonalSalary', true, '1-2')">个人工资统计</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">&nbsp;<i class="icon-user"></i>&nbsp;&nbsp;人事管理</template>
                  <el-menu-item index="2-1" @click="addTab(editableTabsValue, '员工管理', 'StaffManage', true, '2-1')">员工管理</el-menu-item>
                  <el-menu-item index="2-2" @click="addTab(editableTabsValue, '单位管理', 'DepartmentManage', true, '2-2')">单位管理</el-menu-item>
                  <el-menu-item index="2-3" @click="addTab(editableTabsValue, '工资项管理', 'SalaryProjectManage', true, '2-3')">工资项管理</el-menu-item>
                  <el-menu-item index="2-4" @click="addTab(editableTabsValue, '工资模板管理', 'SalaryTemplatetManage', true, '2-4')">工资模板管理</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title"><i class="el-icon-document"></i>词表管理</template>
                  <el-menu-item index="3-1" @click="addTab(editableTabsValue, '编制类型管理', 'FormationTypeManage', true, '3-1')">编制类型管理</el-menu-item>
                  <el-menu-item index="3-2" @click="addTab(editableTabsValue, '职称管理', 'PositionalTitleManage', true, '3-2')">职称管理</el-menu-item>
                  <el-menu-item index="3-3" @click="addTab(editableTabsValue, '职务管理', 'PostManage', true, '3-3')">职务管理</el-menu-item>
                  <el-menu-item index="3-4" @click="addTab(editableTabsValue, '部门标识管理', 'DepartmentIdentificationManage', true, '3-4')">部门标识管理</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
                  <el-menu-item index="4-1" @click="addTab(editableTabsValue, '用户管理', 'UserManage', true, '4-1')">系统设置</el-menu-item>
                  <el-menu-item index="4-2" @click="addTab(editableTabsValue, '用户管理', 'UserManage', true, '4-2')">角色管理</el-menu-item>
                  <el-menu-item index="4-3" @click="addTab(editableTabsValue, '用户管理', 'UserManage', true, '4-3')">用户管理</el-menu-item>
              </el-submenu>
            </el-menu>
        </div>
      </el-col>
      <!-- 右栏 -->
      <el-col id="right" :xs="17" :sm="18" :md="19" :lg="21" :xl="21">
        <div class="grid-content bg-purple-light">
          <el-tabs type="border-card" v-model="editableTabsValue" @tab-remove="removeTab">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name" :closable="item.closable">
              <component :is="item.content" message='子组件'></component>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <!-- 主页 end -->

    <!-- 登录页 -->
    <div v-else>
      <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">用户登录</h3>
        <el-form-item prop="strUserName">
          <el-input type="text" v-model="account.strUserName" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="strPSD">
          <el-input type="password" v-model="account.strPSD" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 登录页 end -->

  </div>
</template>

<script>
import HomePage from "./components/homePage";
import PersonalSalary from "./components/personalSalary";
import StaffManage from "./components/staffManage";
import UserManage from "./components/userManage";
import DepartmentManage from "./components/departmentManage";
import SalaryProjectManage from "./components/salaryProjectManage";
import SalaryTemplatetManage from "./components/salaryTemplateManage";
import FormationTypeManage from "./components/formationTypeManage";
import PositionalTitleManage from "./components/positionalTitleManage";
import PostManage from "./components/postManage";
import DepartmentIdentificationManage from "./components/departmentIdentificationManage";

export default {
  data() {
    return {
      // 以下是登录页数据
      loading: false,
      account: {
        strUserName: "",
        strPSD: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true,

      // 以下是主页数据
      yhbh: "",
      dlm: "",
      editableTabsValue: "0",
      editableTabsIndex: "1-1",
      editableTabs: [
        {
          title: "主页",
          name: "0",
          content: "HomePage",
          closable: false,
          itemIndex: "1-1"
        }
      ],
      tabIndex: 0,
      opens: ["1"] // 展开的菜单栏
    };
  },
  components: {
    HomePage,
    PersonalSalary,
    StaffManage,
    UserManage,
    DepartmentManage,
    SalaryProjectManage,
    SalaryTemplatetManage,
    FormationTypeManage,
    PositionalTitleManage,
    PostManage,
    DepartmentIdentificationManage
  },
  watch: {
    editableTabs: {
      handler(newVal) {
        let openTabs = []
        newVal.forEach(item => {
          let parentIndex = item.itemIndex.split('')[0]
          openTabs.push(parentIndex);
        })
        this.opens = openTabs;
      },
      deep: true
    },
    editableTabsValue(newVal) {
      let val = newVal + '';
      for(let i = 0; i < this.editableTabs.length; i++) {
        if (this.editableTabs[i].name == val) this.editableTabsIndex = this.editableTabs[i].itemIndex
      }
    }
  },
  methods: {
    handleLogin() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/ValidateUserInfo",
        this.account,
        data => {
          if (data == "") {
            this.$alert("用户名或密码错误，请检查后重试！", "提示", {
              confirmButtonText: "确定"
            });
          }
          this.yhbh = data.YHBH;
          this.dlm = data.XTDLM;

          // 将系统信息写入Vuex
          var systemInfo = {};
          systemInfo.yhbh = this.yhbh;
          systemInfo.screenWidth = document.body.offsetWidth;
          this.$store.commit("getSystemInfo", systemInfo);
        }
      );
    },
    addTab(targetName, title, content, closable, itemIndex) {
      for (var i = 0; i < this.editableTabs.length; i++) {
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
        closable: closable,
        itemIndex: itemIndex
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
    let userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("NET") != -1 && userAgent.indexOf("rv") != -1) {
      console.log("过世浏览器————IE");
    }
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
    overflow-y: auto;
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

.test {
  color: #409EFF
}
.test2 {
  color: #303133;
}

// 以下是登录页css
// body {
//   background: #dfe9fb;
// }
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 200px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  background: -ms-linear-gradient(top, #ace, #00c1de); /* IE 10 */
  background: -moz-linear-gradient(top, #ace, #00c1de); /*火狐*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#ace),
    to(#00c1de)
  ); /*谷歌*/
  background: -webkit-linear-gradient(
    top,
    #ace,
    #00c1de
  ); /*Safari5.1 Chrome 10+*/
  background: -o-linear-gradient(top, #ace, #00c1de); /*Opera 11.10+*/

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>