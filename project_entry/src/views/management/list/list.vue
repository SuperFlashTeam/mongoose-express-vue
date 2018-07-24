<template>
  <div class="ManagementList">
    <el-row style="margin-bottom: 20px;">
      <el-col :span="15" :offset="5">
        <el-input placeholder="请输入项目名称或姓名" clearable v-model="queryMsg" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="queryList(queryMsg)"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" :offset="2" style="margin-top: 6px;">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addFn" circle></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="(item, index) in listData" :key="index" :span="11" :offset="1" style="margin-bottom: 20px;">
        <el-card class="listcard" :body-style="{padding: '0px 0px 20px 0px'}">
          <a :href="item.url" target="_blank">
            <div>
              <span class="projectName">{{item.projectName}}</span>
              <div class="nameBox">
                姓名: {{item.name}}
              </div>
            </div>
          </a>
          <el-row type="flex" justify="space-around">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editFn(item)" circle></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delopen(item)" circle></el-button>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <list-dialog v-if="listDialogStatus" :listDialogStatus="listDialogStatus" :formstatus="formstatus" :propData="propData" @callbackFn="callbackFn">
    </list-dialog>
  </div>
</template>

<script>
import ListDialog from './dialog/ListDialog.vue'
import {Message} from 'element-ui'
export default {
  components: {
    ListDialog
  },
  name: 'ManagementList',
  data () {
    return {
      listData: [],
      propData: {
        projectName: '',
        url: '',
        name: ''
      },
      listDialogStatus: false,
      formstatus: 'add',
      queryMsg: ''
    }
  },
  methods: {
    delopen (item) {
      this.$confirm('此操作将删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.delFn(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    queryList (queryMsg) {
      this.getRequest('/queryUrlMsg?queryMsg=' + queryMsg).then(res => {
        if (res && res.status === 200) {
          console.log(res.data)
          this.listData = res.data
        }
      })
    },
    getList () {
      this.getRequest('/getUrlMsg').then(res => {
        if (res && res.status === 200) {
          console.log(res.data)
          this.listData = res.data
        }
      })
    },
    delFn (item) {
      var _this = this
      this.deleteRequest('/delUrlMsg', item)
        .then(res => {
          if (res && res.status === 200 && res.data.code === 200) {
            _this.getList()
            Message.success({message: '删除成功'})
          } else {
            Message.error({message: '删除失败，请联系管理员'})
          }
        })
        .catch(err => {
          console.log(err, 'catchErr')
          Message.error({message: '删除失败，请联系管理员'})
        })
    },
    callbackFn (dialogStatus) {
      this.listDialogStatus = dialogStatus
      this.propData = {
        projectName: '',
        url: '',
        name: ''
      }
      this.getList()
    },
    editFn (item) {
      this.listDialogStatus = true
      this.formstatus = 'edit'
      this.propData = item
    },
    addFn () {
      this.listDialogStatus = true
      this.formstatus = 'add'
      this.propData = {
        projectName: '',
        url: '',
        name: ''
      }
    }
  },
  async created () {
    await this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.projectName {
  display: inline-block;
  width: 100%;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #ccc;
}

.nameBox {
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 10px 0px;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.ManagementList {
  .el-message-box--center {
    padding-bottom: 30px;
    width: 50% !important;
  }
}

a:link {
  color:#000;
  text-decoration:none;
}
a:visited {
  color:#000;
  text-decoration:none;
}
a:hover {
  color:#000;
  text-decoration:none;
}
a:active {
  color:#000;
  text-decoration:none;
}
</style>
