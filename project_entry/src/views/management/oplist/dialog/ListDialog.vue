<template>
  <div class="ListDialog">
    <el-dialog title="编辑活动信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="80%">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="名    称:" :label-width="formLabelWidth" prop="projectName">
          <el-input v-model="form.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="测试地址:" :label-width="formLabelWidth">
          <el-input v-model="form.devurl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产地址:" :label-width="formLabelWidth">
          <el-input v-model="form.masterurl" auto-complete="off"></el-input>
        </el-form-item>
        <el-row  style="margin-bottom: 20px;">
          <el-button class="fr" size="mini" type="primary" icon="el-icon-plus" @click="addRow" circle></el-button>
        </el-row>
        <el-row v-for="(item,index) in form.flexurlgroup" :key="index" style="margin-bottom: 20px;">
          <el-col :span="7" style="height: 40px;">
            <el-form-item>
              <el-input v-model="item.urlname" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"  style="height: 40px; line-height: 40px;">:</el-col>
          <el-col :span="13" style="height: 40px;">
            <el-form-item>
              <el-input v-model="item.url" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button class="fr" style="margin-top: 6px;" size="mini" type="danger" icon="el-icon-minus" @click="delRow(index)" circle></el-button>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="back()">返 回</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  props: ['listDialogStatus', 'formstatus', 'propData'],
  name: 'ListDialog',
  watch: {
    listDialogStatus (val) {
      this.dialogFormVisible = val
    }
  },
  data () {
    return {
      dialogFormVisible: true,
      form: {
        projectName: '',
        devurl: '',
        masterurl: '',
        flexurlgroup: [
          {
            urlname: '',
            url: ''
          }
        ]
      },
      formLabelWidth: '80px',
      rules: {
        projectName: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    delRow (index) {
      this.form.flexurlgroup.splice(index, 1)
    },
    addRow () {
      let pushData = {
        urlname: '',
        url: ''
      }
      this.form.flexurlgroup.push(pushData)
      console.log(this.form)
    },
    postFn (postData) {
      console.log(postData, postData)
      this.postRequest('/postOpUrlMsg', postData)
        .then(res => {
          if (res && res.status === 200 && res.data.code === 200) {
            console.log(res.data, 'success')
            this.$emit('callbackFn', false)
            Message.success({message: '创建成功'})
          } else {
            console.log(res.data, 'err')
            this.$emit('callbackFn', false)
            Message.error({message: '创建失败，请联系管理员'})
          }
        })
        .catch(err => {
          console.log(err, 'catchErr')
          Message.error({message: '创建失败，请联系管理员'})
        })
    },
    putFn (postData) {
      this.putRequest('/putOpUrlMsg', postData)
        .then(res => {
          if (res && res.status === 200 && res.data.code === 200) {
            console.log(res.data, 'success')
            this.$emit('callbackFn', false)
            Message.success({message: '修改成功'})
          } else {
            console.log(res.data, 'err')
            this.$emit('callbackFn', false)
            Message.error({message: '修改失败，请联系管理员'})
          }
        })
        .catch(err => {
          console.log(err, 'catchErr')
          Message.error({message: '修改失败，请联系管理员'})
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData = JSON.parse(JSON.stringify(this.form))
          for (let i = 0; i < postData.flexurlgroup.length; i++) {
            let arr = postData.flexurlgroup[i]
            if (!arr.urlname) {
              Message.error({message: '项目名称必填'})
              return
            }
            if (!arr.urlname && !arr.url) {
              console.log(1)
              postData.flexurlgroup.splice(i, 1)
              i--
              break
            }
          }
          console.log(postData, 'postData')
          if (this.formstatus === 'add') {
            this.postFn(postData)
          } else if (this.formstatus === 'edit') {
            this.putFn(postData)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    back () {
      this.$emit('callbackFn', false)
    }
  },
  async created () {
    if (this.formstatus === 'add') {
      this.form = {
        projectName: '',
        devurl: '',
        masterurl: '',
        flexurlgroup: [
          {
            urlname: '',
            url: ''
          }
        ]
      }
    } else {
      this.form = this.propData
    }
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

.ListDialog {
}
</style>
