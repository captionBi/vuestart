<template>
  <div class="app-container">
    <h1><span>*</span>温馨提示</h1>
    <div class="tipone">1. 此处支持有线巴枪自动识别运单号；</div>
    <div class="tiptwo">2. 收件人手机输入栏支持输入收件人手机号后 4 位联想输入；</div>
    <div class="tipthree">3. 选择货架号自动生成取件码或输入取件码后入库成功，取件消息将按取件通知配置自动或手动发送。</div>
    <div class="formclass">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
        <el-form-item label="运单号" prop="wayNo">
          <el-input size="small" v-model="wayNo" placeholder="请输入运单号"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" size="small">确定出库</el-button>
      </div>      
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      wayNo:''
    }
  },
  created() {
  },
  methods: {
    
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
