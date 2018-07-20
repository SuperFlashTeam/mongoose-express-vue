<template>
  <div class="ManagementIndex">
    <el-header class="el-header">
      <manage-header></manage-header>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </div>
</template>

<script>
import ManageHeader from '@/components/common/header.vue'
export default {
  components: {
    ManageHeader
  },
  name: 'ManagementIndex',
  data () {
    return {
    }
  },
  methods: {
  },
  async created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ManagementIndex {
  .el-header {
    padding: 0;
  }
}
</style>
