<template>
  <div class="OpList">
    <el-row style="margin-bottom: 20px;">
      <el-button class="fr" size="mini" type="primary" icon="el-icon-plus" @click="addFn" circle></el-button>
    </el-row>
    <el-row>
      <el-col v-for="(item, index) in listData" :key="index" :span="24" style="margin-bottom: 20px;">
        <el-card class="listcard" :body-style="{padding: '0px 0px 20px 0px'}">
          <div class="projectName fl">
            {{item.projectName}}
          </div>
          <div class="devUrlBox fl">
            <div class="devUrl">
              测试地址: {{item.devurl}}
            </div>
            <el-button id="devUrlTxt" class="fr" style="" size="mini" :data-clipboard-text="item.devurl" type="success" icon="el-icon-document" @click="copy('devUrlTxt', item.devurl)" circle></el-button>
          </div>
          <div class="masterUrlBox fl">
            <div class="masterUrl">
              生产地址: {{item.masterurl}}
            </div>
            <el-button id="masterUrlTxt" class="fr" style="" size="mini" :data-clipboard-text="item.masterurl"  type="success" icon="el-icon-document" @click="copy('masterUrlTxt', item.masterurl)" circle></el-button>
          </div>
          <div class="masterUrlBox fl" v-for="(urlgroup, index) in item.flexurlgroup" :key="index">
            <div class="masterUrl">
              {{urlgroup.urlname}}: {{urlgroup.url}}
            </div>
            <el-button :id="'flexurlgroup' + index" class="fr" style="" size="mini" :data-clipboard-text="urlgroup.url"  type="success" icon="el-icon-document" @click="copy('flexurlgroup' + index, urlgroup.url)" circle></el-button>
          </div>
          <div style="width: 100%; height: 40px; float: left;">
            <el-row type="flex" justify="space-around">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="editFn(item)" circle></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="delopen(item)" circle></el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <list-dialog v-if="listDialogStatus" :listDialogStatus="listDialogStatus" :formstatus="formstatus" :propData="propData" @callbackFn="callbackFn">
    </list-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import ListDialog from './dialog/ListDialog.vue'
import {Message} from 'element-ui'
export default {
  components: {
    ListDialog
  },
  name: 'OpList',
  data () {
    return {
      listData: [],
      propData: {
        projectName: '',
        devurl: '',
        masterurl: '',
        flexurlgroup: []
      },
      listDialogStatus: false,
      formstatus: 'add'
    }
  },
  methods: {
    copy (classname, Txt) {
      let clipboard = new Clipboard('#' + classname)
      console.log(clipboard)
      clipboard.on('success', e => {
        this.$message({
          type: 'success',
          message: '链接复制成功'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({
          type: 'info',
          message: '该浏览器不支持自动复制'
        })
        // 释放内存
        clipboard.destroy()
      })
    },
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
      this.getRequest('/getOpUrlMsg').then(res => {
        if (res && res.status === 200) {
          console.log(res.data)
          this.listData = res.data
        }
      })
    },
    delFn (item) {
      var _this = this
      this.deleteRequest('/delOpUrlMsg', item)
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
        devurl: '',
        masterurl: ''
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
<style lang="scss" scoped>
.fl {
  float: left;
}

.fr {
  float: right;
}

.OpList {
  .el-message-box--center {
    width: 50% !important;
  }
  .projectName {
    box-sizing: border-box;
    padding: 20px;
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid #ccc;
    word-wrap:break-word;
    word-break:break-all;
    text-align: center;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 14px;
  }
  .devUrlBox {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 20px 20px 20px;
    .devUrl {
      width: 80%;
      display: inline-block;
      word-wrap:break-word;
      word-break:break-all;
      text-align: left;
    }
  }
  .masterUrlBox {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 20px 20px 20px;
    .masterUrl {
      width: 80%;
      display: inline-block;
      word-wrap:break-word;
      word-break:break-all;
      text-align: left;
    }
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
