<template>
    <el-button style="width: 100px;" size="small" class="btn" @click="targetExportWindow">导出</el-button>
</template>

<script>
// import { BASE_URL } from '@/config/url'
const links = [
    '/brand/brandsearchdata/storeProduct/csv', // 产品
    // '/brand/brandsearchdata/storeProject/csv', // 项目
    // '/brand/brandsearchdata/storeProjectCard/csv', // 办卡、疗程卡
    // '/brand/brandsearchdata/storeCourseCard/csv', // 换卡
    // '/brand/inventory/commodity/csv' // 库存总库表
]
export default {
    props: {
        /**
         * 导出类型，对应links索引值
         */
        type: {
            type: Number,
            default: 0
        },
        /**
         * 模块名，对应commonTable组件name属性
         */
        name: {
            type: String,
            default: ''
        }
    },
    methods: {
        /**
         * 新建窗口导出数据
         */
        targetExportWindow () {
            const state = this.$store.state.tablePro[this.name]
            console.log(state)
            if (state) {
                if (state.list.length) {
                    let a = document.createElement('a')
                    const token = localStorage.getItem('token')
                    const query = encodeURI(
                        JSON.stringify({
                            where: this.$store.state.tablePro[this.name]
                                .pageInfo.where
                        })
                    )
                    a.setAttribute(
                        'href',
                        `${BASE_URL}${links[this.type]}?tk=${token}&q=${query}`
                    )
                    a.setAttribute('target', 'view_window')
                    a.click()
                } else {
                    this.$alert('当前筛选条件下没有数据可以导出', '提示', {
                        confirmButtonText: '确定'
                    })
                }
            }
        }
    }
}
</script>

<style class="less" scoped>
.btn {
  margin-left: 10px;
}
</style>
