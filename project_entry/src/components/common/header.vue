<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      router
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="ManagementList" route="ManagementList">项目测试地址</el-menu-item>
      <el-menu-item index="OpList" route="OpList">运营页面地址</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 'ManagementList'
    }
  },
  watch: {
    '$route.name': function (val) {
      this.activeIndex = val
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = key
      this.$router.push({name: key})
    }
  },
  created () {
    this.activeIndex = this.$route.name
  }
}
</script>
