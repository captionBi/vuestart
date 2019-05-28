<template>
  <div class="app-container">
    <div class="server">
      <div class="server_title">
        货架管理
      </div>
    </div>
    <el-button type="primary" plain @click="dialogFormVisible = true">新增</el-button>
    <el-button type="primary" plain @click="open">删除</el-button>

    <el-dialog title="新增货架" :visible.sync="dialogFormVisible" :width="dialogwidth" :center="true">
      <el-form :model="form" :label-width="formLabelWidth">
        <div class="dialog-text">
          <p>1. 货架名称两个字符；</p>
          <p>2. 编写规则: “大写字母+数字”(如A8) 或“数字+数字”(如01)</p>
        </div>
        <el-form-item label="货架名称">
          <el-input v-model="form.name" :size="size" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '80px',
      dialogwidth: '460px'
    }
  },
  computed: {
    size: function() {
      return this.$store.state.app.size
    }
  },
  mounted() {
    // this.getChannelList()
  },
  methods: {
    open() {
      this.$confirm('是否删除所选货架？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

