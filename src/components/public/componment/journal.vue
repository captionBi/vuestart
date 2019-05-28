<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" width="1000px">
        <el-table :data="gridData">
            <el-table-column type="index" width="80" label="序号"></el-table-column>
            <el-table-column property="operation" l投递入柜</el-table-column>
            <el-table-column property="status" label="	状态" width="80px"></el-table-column>
            <el-table-column property="phone" label="收件人手机"></el-table-column>
            <el-table-column property="time" label="操作时间"></el-table-column>
            <el-table-column property="operator" label="操作人" width="100px"></el-table-column>
            <el-table-column property="manipulator" label="操作人手机"></el-table-column>
            <el-table-column property="remarks" label="备注"></el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            gridData: [
                {
                    operation: '投递入柜',
                    status: '待完善',
                    phone: '15920109745',
                    time:'2019-05-21 09:18:54',
                    operator:'陈木保',
                    manipulator:'18028512302',
                    remarks:'sas'
                }, {
                    operation: '投递入柜',
                    status: '待完善',
                    phone: '15920109745',
                    time:'2019-05-21 09:18:54',
                    operator:'陈木保',
                    manipulator:'18028512302',
                    remarks:'sagf'
                }, {
                    operation: '投递入柜',
                    status: '待完善',
                    phone: '15920109745',
                    time:'2019-05-21 09:18:54',
                    operator:'陈木保',
                    manipulator:'18028512302',
                    remarks:'sagf'
                }, {
                    operation: '投递入柜',
                    status: '待完善',
                    phone: '15920109745',
                    time:'2019-05-21 09:18:54',
                    operator:'陈木保',
                    manipulator:'18028512302',
                    remarks:'sagf'
                }
            ],
            dialogTableVisible:false
        }
    },
    created() {
    },
    methods: {
    }
}
</script>
<style lang="scss">

</style>
