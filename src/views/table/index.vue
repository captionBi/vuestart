<template>
  <div class="app-container">
    <h1><span>*</span>温馨提示</h1>
    <div class="tipone">1. 此处支持有线巴枪自动识别运单号；</div>
    <div class="tiptwo">2. 收件人手机输入栏支持输入收件人手机号后 4 位联想输入；</div>
    <div class="tipthree">3. 选择货架号自动生成取件码或输入取件码后入库成功，取件消息将按取件通知配置自动或手动发送。</div>
    <div class="formclass">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" label-position="left">
        <el-form-item label="运单号" prop="wayNo">
          <el-input v-model="ruleForm.wayNo" size="small" placeholder="请输入运单号" />
        </el-form-item>
        <el-form-item label="快递公司" prop="company">
          <el-select v-model="ruleForm.company" size="small" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="收件手机" prop="phone" size="small">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="收件人" prop="addressee" size="small">
          <el-input v-model="ruleForm.addressee" placeholder="请输入收件人名称" />
        </el-form-item>
        <el-form-item label="收件地址" prop="address" size="small">
          <el-input v-model="ruleForm.address" placeholder="请输入收件人地址" />
        </el-form-item>
        <el-form-item label="货架号" prop="shelfNumber" size="small">
          <el-input v-model="ruleForm.shelfNumber" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="取件码" prop="pickcode" size="small">
          <el-select v-model="ruleForm.pickcode" size="small" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  data() {
    return {
      ruleForm: {
        wayNo: '',
        company: '',
        phone: '',
        addressee: '',
        address: '',
        shelfNumber: '',
        pickcode: ''
      },
      rules: {
        wayNo: [
          { required: true, message: '请输入运单号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请选择', trigger: 'blur' },
          { message: '长度为11个数字', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请选择快递公司', trigger: 'change' }
        ],
        shelfNumber: [
          { required: true, message: '请选择货架号', trigger: 'change' }
        ],
        pickcode: [
          { required: true, message: '请输入货件码', trigger: 'change' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss">
.formclass{
  width: 300px;
  margin-top: 30px;
}
.tipone, .tiptwo, .tipthree{
  font-size: 14px;
  line-height: 20px;
}
</style>
