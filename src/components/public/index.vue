<template>
  <div class="importantdiv">
    <div class="funcdivim">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
            <el-form-item label="运单号" prop="wayNo">
                <el-input v-model="ruleForm.wayNo" size="small" placeholder="请输入运单号"></el-input>
            </el-form-item>
            <el-form-item label="收件人手机" prop="region">
                <el-input v-model="ruleForm.region" size="small" placeholder="请输入收件人手机"></el-input>
            </el-form-item>
            <el-form-item label="取件码" prop="pickcode">
                <el-input v-model="ruleForm.pickcode" size="small" placeholder="请输入取件码"></el-input>
            </el-form-item>
            <el-form-item label="快递公司" prop="company" size="small">
                <el-select v-model="ruleForm.company" placeholder="请选择快递公司">
                <el-option label="区域一" :value="1"></el-option>
                <el-option label="区域二" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款状态" prop="status" size="small">
                <el-select v-model="ruleForm.status" placeholder="请选择付款状态">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="取件消息" prop="information" size="small">
                <el-select v-model="ruleForm.information" placeholder="请选择活取件消息">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接收时间" prop="accetime" size="small">
                <el-date-picker
                v-model="ruleForm.accetime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 80px;" type="primary" @click="submitForm('ruleForm')" size="small">筛选</el-button>
                <el-button style="width: 80px;" @click="resetForm('ruleForm')" size="small">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="funsel">
        <div class="funcone">
            <el-button style="width: 100px;" size="small">签收</el-button>
            <el-button style="width: 100px;" size="small">滞留</el-button>
            <el-button style="width: 100px;" size="small">退件</el-button>
        </div>
        <div class="funtwo">
            <wexport></wexport>
        </div>
    </div>
    <div class="tablediv">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="date"
            label="收件人信息">
                <template slot-scope="scope">
                    <div>
                        <div>{{ scope.row.date }}</div>
                        <div>{{ scope.row.phone}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="快件信息">
                <template slot-scope="scope">
                    <div>
                        <div>{{ scope.row.mailorder }}</div>
                        <div>运单号:{{ scope.row.goodsinfor === 2 ? '未发送' : '已发送'}}</div>
                        <div>应付金额:{{ scope.row.moneystatus === 1 ? '---' : '---'}}</div>
                        <div>取件码:{{ scope.row.sendstatus === 2 ? '---' : '---'}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            prop="goods"
            label="货架"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="address"
            label="状态"
            show-overflow-tooltip>
                <template slot-scope="scope">
                    <div>
                        <div>{{ scope.row.status === 1 ? '待完善' : '已完善' }}</div>
                        <div>取件消息:{{ scope.row.goodsinfor === 2 ? '未发送' : '已发送'}}</div>
                        <div>付款状态:{{ scope.row.moneystatus === 1 ? '已付款' : '未付款'}}</div>
                        <div>蜂鸟推送状态:{{ scope.row.sendstatus === 2 ? '不推送' : '推送'}}</div>
                    </div>
                </template>
            </el-table-column>                
            <el-table-column
            prop="address"
            label="操作"
            show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">完善信息</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="seejour(scope.$index, scope.row)">日志</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagediv">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="total, prev, pager, next, jumper"
        :total="1000">
        </el-pagination>
    </div>
    <perfectdata ref="boxperfect"></perfectdata>
    <journal ref="boxjour"></journal>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import perfectdata from '@/components/public/componment/perfectdata.vue'
import journal from '@/components/public/componment/journal.vue'
import wexport from '@/components/public/componment/export.vue'
export default {
    components: { perfectdata, journal, wexport },
    props: {
        /**
         * 模块名，对应组件url属性
         */
        url: {
            type: String,
            default: '1'
        }
    },
    data() {
        return {
            ruleForm: {
                name: '',
                region: '',
                pickcode:'',
                information:'',
                status:'',
                company:2,
                accetime:''
            },
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'广东邮政',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-02',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'百世快递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-04',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'圆通速递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }
            ],
            multipleSelection: [],
            currentPage:0
        }
    },
    created() {
        console.log('urlurlurlurl', this.url)
    },
    methods: {
        //筛选功能
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log('submit!!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        //清除筛选功能数据
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //点击信息完善
        handleEdit(index, row) {
            this.$refs['boxperfect'].dialogFormVisible = true
            console.log(index, row);
        },
        //点击日志
        seejour(index, row) {
            this.$refs['boxjour'].dialogTableVisible = true
            console.log(index, row);
        },
        //点击选择触发的方法
        handleSelectionChange(val) {
            console.log('rows', val)
            this.multipleSelection = val;
        },
        //分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}222222`);
            this.tableData = [{
                date: '2016-05-03',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'广东邮政',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-02',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'百世快递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-04',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'圆通速递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-01',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'广东邮政',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-08',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'百世快递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-06',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'圆通速递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-07',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'圆通速递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-07',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'圆通速递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-07',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'圆通速递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }, {
                date: '2016-05-07',
                name: '王小虎',
                goods: '中山大学附属第一医院医休哥物流分拣中心',
                mailorder:'圆通速递',
                phone:13013013011,
                wayNo:'821666892282',
                shoundmoney:'应付金额',
                pickcode:'54654654654',
                status:1,
                goodsinfor:2,
                moneystatus:1,
                sendstatus:1
                }
            ]
        }
    }
}
</script>
<style lang="scss">
.funsel{
    display: flex;
    .funcone{
        flex: 1;
    }
}
.tablediv{
    margin-top: 20px;
}
.funcdivim{
    background: white;
    padding-top: 20px;
    padding-left: 20px;    
}
.funsel{
    margin: 20px 0;
}
.pagediv{
    background: white;
    height: 80px;
    padding-top: 20px;
}
</style>
