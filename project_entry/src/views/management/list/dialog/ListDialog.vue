<template>
  <div class="ListDialog">
    <el-dialog title="编辑活动信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="80%">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="名称:" :label-width="formLabelWidth" prop="projectName">
          <el-input v-model="form.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="URL:" :label-width="formLabelWidth" prop="url">
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
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
        url: '',
        name: ''
      },
      formLabelWidth: '60px',
      rules: {
        projectName: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入URL', trigger: 'change' },
          { required: true, message: '请输入URL', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' },
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    postFn () {
      this.postRequest('/postUrlMsg', this.form)
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
    putFn () {
      this.putRequest('/putUrlMsg', this.form)
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
          if (this.formstatus === 'add') {
            this.postFn()
          } else if (this.formstatus === 'edit') {
            this.putFn()
          }
          // this.$emit('callbackFn', false)
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
    this.form = this.propData
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

.ListDialog {
}
</style>
