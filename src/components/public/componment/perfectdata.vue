<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="400px" center>
        <div class="boxper">
            <div><div class="tipdiv">运单号:</div><div class="funcdiv">4600276525479</div></div>
            <div><div class="tipdiv"><span>*</span>快递公司:</div><div class="funcdiv">韵达快递</div></div>
            <div><div class="tipdiv"><span>*</span>收件人手机:</div><div class="funcdiv">15920109745</div></div>
            <div><div class="tipdiv">收件人:</div><div class="funcdiv"><el-input size="small" v-model="addressee" placeholder="请输入收件人"></el-input></div></div>
            <div><div class="tipdiv">收件地址:</div><div class="funcdiv"><el-input size="small" v-model="address" placeholder="请输入收件地址"></el-input></div></div>
            <div><div class="tipdiv">货架号:</div><div class="funcdiv">---</div></div>
            <div><div class="tipdiv">取件码:</div><div class="funcdiv">---</div></div>
            <div>
                <div class="tipdiv">快件类型:</div>
                <div class="funcdiv">
                    <el-select style="width:100%" v-model="goodtype" size="small" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </div>
            </div>
            <div><div class="tipdiv">金额:</div><div class="funcdiv"><el-input size="small" v-model="goodmeney" placeholder="请输入金额"></el-input></div></div>
            <div><div class="tipdiv">领取人:</div><div class="funcdiv"><el-input size="small" v-model="receiver" placeholder="请输入领取人"></el-input></div></div>
        </div>
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
            addressee:'',
            address:'',
            goodtype:'',
            goodmeney:'',
            receiver:'',
            dialogFormVisible: false
        }
    },
    created() {
    },
    methods: {
    }
}
</script>
<style lang="scss">
.boxper{
    
    &>div{
        display: flex;
        line-height: 32px;
        margin-bottom: 5px;
        .tipdiv{
            width: 80px;
            position: relative;
            span{
                position: absolute;
                left: -7px;
                top: 2px;
                color: red;
            }
        }
        .funcdiv{
            flex: 1;
        }
        
    }
}
</style>
