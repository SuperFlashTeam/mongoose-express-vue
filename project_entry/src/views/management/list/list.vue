<template>
  <div class="ManagementList">
    <el-row style="margin-bottom: 20px;">
      <el-button class="fr" size="mini" type="primary" icon="el-icon-plus" @click="addFn" circle></el-button>
    </el-row>
    <el-row>
      <el-col v-for="(item, index) in listData" :key="index" :span="11" :offset="1" style="margin-bottom: 20px;">
        <el-card class="listcard">
          <div slot="header">
            <span>{{item.projectName}}</span>
          </div>
          <el-row style="margin-bottom: 20px;">
            姓名: {{item.name}}
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="editFn(item)" circle></el-button>
            </el-col>
            <el-col :span="8">
              <a :href="item.url" target="_blank">
                <el-button size="mini" type="success" icon="el-icon-info" circle></el-button>
              </a>
            </el-col>
            <el-col :span="8">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="delopen(item)" circle></el-button>
            </el-col>
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
      formstatus: 'add'
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
.fl {
  float: left;
}

.fr {
  float: right;
}

.ManagementList {
}

.el-message-box--center {
  padding-bottom: 30px;
  width: 50% !important;
}
</style>
