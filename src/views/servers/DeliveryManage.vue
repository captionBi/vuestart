<template>
  <div class="app-container">
    <div class="server">
      <div class="server_title">
        派费设置
      </div>
      <div class="set-rule">
        <el-popover
          placement="bottom-end"
          width="500"
          trigger="click"
        >
          <div class="rule-text">
            <p>派费设置是为丰巢服务站提供的单票派费设置和授权扣费配置功能模块，以便提升丰巢服务站自主运营管理权限，关于派费设置有如下几点说明：</p>
            <p>1. 当未绑定快递员时，每家快递公司仅可配置一个服务信息；</p>
            <p>2. 同一家快递公司在绑定不同的快递员后，可配置多条服务信息；</p>
            <p>3. 在绑定快递员时，需经快递员本人授权，授权成功后即可在接收该快递员所属公司快件后，自动从其丰巢账户扣费；</p>
            <p>4. 当某个快递公司的派费设置标注有“平台配置”时，站点无权更改派费信息；仅可绑定或解绑快递员信息；</p>
            <p>5. 如需修改派费设置中已绑定的快递员，可在操作列解绑后重新绑定其他快递员；</p>
            <p>6. 当站点经授权绑定快递员账户后，在后续的接收到站快件时，因个人失误等导致扣费错误或误扣费时，需及时主动联系快递员协商处理。</p>
          </div>
          <el-button slot="reference" :size="size"> <i class="el-icon-delete">设置规则</i></el-button>
        </el-popover>
        <!-- <el-button :size="size" @click="setRule"> <i class="el-icon-delete">设置规则</i></el-button> -->

      </div>
    </div>
    <el-card class="box-card">
      <span>快递公司</span>
      <el-button style="float: right;" :size="size" type="primary" plain>查询</el-button>
      <el-select v-model="value" :size="size" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-card>

    <el-button type="primary" plain @click="dialogFormVisible = true">新增</el-button>

    <el-dialog title="新增派费设置" :visible.sync="dialogFormVisible" :width="dialogwidth" :center="true">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item label="快递公司">
          <el-select v-model="value" :size="size" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="收费方式">
          <el-select v-model="value" :size="size" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单票派费">
          <el-input v-model="form.name" :size="size" autocomplete="off" />
        </el-form-item>
        <el-form-item label="快递员姓名">
          <el-input v-model="form.name" :size="size" autocomplete="off" />
        </el-form-item>
        <el-form-item label="快递员手机">
          <el-input v-model="form.name" :size="size" autocomplete="off" />
        </el-form-item>
        <el-form-item label="绑定快递员">
          <el-button :size="size" @click="innerVisible = true">点击绑定快递员</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="600px"
      title="绑定快递员"
      :visible.sync="innerVisible"
      append-to-body
      :center="true"
    >
      <div class="dialog-text">
        <p>1. 绑定快递员丰巢账号，实现自动扣款，提升工作效率；</p>
        <p>2. 每笔扣款实时提醒，安全便捷。</p>
      </div>
      <div class="qrcode">
        <img class="qrcode-img" src="@/assets/logo/logo@2x.png" alt="" srcset="">
        <div class="qrcode-text">打开丰巢管家APP-附近服务站界面右上角-账号授权扫一扫</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :size="size">获取授权结果</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '100px',
      dialogwidth: '460px',
      options: [{
        value: '选项1',
        label: '顺丰'
      }, {
        value: '选项2',
        label: '圆通'
      }, {
        value: '选项3',
        label: '申通'
      }],
      value: ''
    }
  },
  computed: {
    size: function() {
      return this.$store.state.app.size
    }
  },
  mounted() {

  },
  methods: {
    setRule() {
      console.log(111)
    }
  }
}
</script>
<style lang="scss">
.qrcode-text{
      font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999;
        margin: 20px 0 -30px;
}
.qrcode{
  text-align: center;
}
.qrcode-img{
  width: 40%;
}
.el-dialog__body {
      padding: 20px 20px;
    }
.dialog-text {
  margin-top:-20px;
    p {
      padding-left: 8px;
      margin-left: 10px;
      position: relative;
    }

    p:before {
      content: "*";
      color: #f56d48;
      position: absolute;
      left: 0;
    }
  }
.rule-text{
      font-size: 12px;
    color: #333;
}
.set-rule {
  right: 15px;
  font-size: 14px;
  float: right;
  margin-top: -36px;
  .el-icon-delete{

  color: #7498d7;
  }
}

  .box-card {
    width: 480px;
    margin-bottom: 20px;
  }
</style>
