<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        type="index"
        label="序号"
        width="56"
        class="numIndex"
      />
      <!-- <el-table-column v-if="hasCheck" fixed="left" type="selection" width="55"></el-table-column> -->
      <el-table-column
        v-for="(item, index) in headerList"
        :key="index"
        :prop="item.prop"
        :min-width="item.minWidth"
        :label="item.name"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="item.contentType === 'istrans'">
              {{ item.render(scope.row) }}
            </div>
            <div v-else>{{ scope.row[item.prop] }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="btns.length > 0"
        label="操作"
        :width="btns.length * 40"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-tooltip
            v-for="(btn, index) in btns"
            :key="index"
            class="item table-tools-icon"
            effect="dark"
            :content="btn.name"
            placement="top"
          >
            <span class="table-tools-icon">
              <i
                v-if="btn.showType === 'icon'"
                class="iconfont"
                :class="[btn.icon]"
                style="margin-right:5px;cursor: pointer;"
                @click="btn.eventType === 'emit' ? $emit(btn.event, scope.row) : agentEvent(btn.event, [scope.$index, scope.row])"
              />
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="pulicpage">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="100"
        layout="total, prev, pager, next, jumper"
        :total="1000"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { customHeaderLabels } from '../assets/config/table.js'
import SelectType from './selectType'

export default {
  components: {},
  props: {
    /**
         * 模块名，对应组件url属性
         */
    name: {
      type: String,
      default: ''
    },
    filters: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      isLoading: false,
      tableData: [],
      hasCheck: false,
      headerList: [],
      btns: [],
      currentPage: 5
    }
  },
  created() {
    const { name } = this
    this.tableData = [{
      date: '2016-05-03',
      name: '王小虎',
      goods: '中山大学附属第一医院医休哥物流分拣中心',
      mailorder: '广东邮政',
      phone: 13013013011,
      wayNo: '821666892282',
      shoundmoney: '应付金额',
      pickcode: '54654654654',
      status: 1,
      goodsinfor: 2,
      moneystatus: 1,
      sendstatus: 1
    }, {
      date: '2016-05-02',
      name: '王小虎',
      goods: '中山大学附属第一医院医休哥物流分拣中心',
      mailorder: '百世快递',
      phone: 13013013011,
      wayNo: '821666892282',
      shoundmoney: '应付金额',
      pickcode: '54654654654',
      status: 1,
      goodsinfor: 2,
      moneystatus: 1,
      sendstatus: 1
    }, {
      date: '2016-05-04',
      name: '王小虎',
      goods: '中山大学附属第一医院医休哥物流分拣中心',
      mailorder: '圆通速递',
      phone: 13013013011,
      wayNo: '821666892282',
      shoundmoney: '应付金额',
      pickcode: '54654654654',
      status: 1,
      goodsinfor: 2,
      moneystatus: 1,
      sendstatus: 1
    }
    ]
    this.hasCheck = customHeaderLabels[name].hasCheck
    this.headerList = customHeaderLabels[name].headers
    this.btns = customHeaderLabels[name].moreBtn
    console.log('bbbbbbb', this.headerList)
  },
  methods: {
    /**
     * 触发时间用的
     * 控制子传父emit和删除功能
    */
    agentEvent(e, arg) {
      this[e](...arg)
    },
    /**
     * 分页
    */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    /**
     * 删除
    */
    handleDelete(index, row) {
      console.log('删除', index, row)
    },
    /**
     * 排序
    */
    sortChange({ column, order, prop }) {
      const o = {}
      if (order === 'ascending') {
        o[prop] = 1
        // 升序
      } else if (order === 'descending') {
        o[prop] = 2
        // 降序
      }
      console.log('column', o)
    },
    /**
         * 弹出查询字段输入框
         * @param h
         * @param column
         * @param $index
         */
    alertWhereInput(h, { column, $index }) {
      const index = this.hasCheck ? $index - 2 : $index - 1
      const item = this.headerList[index]
      const key =
                item.sortFilterType === 'input'
                  ? column.property + '[~]'
                  : column.property
      console.log('item', key)
      this.$prompt('请输入查询字段', '提示', {
        confirmButtonText: '查询',
        cancelButtonText: '取消'
      }).then(value => {
        console.log('aaa', value)
      })
    },
    /**
     * 渲染表头
     * @param h
     * @param column
     * @param $index
     * @returns {*}
     */
    renderHeader(h, { column, $index }) {
      const item = this.headerList.find((v) => v.prop === column.property)
      console.log('item', column)
      if (item.sortFilterType === 'sort') {
        column.sortable = 'custom' // custom该参数是排序的参数
        return h('span', item.name)// 返回名字，这里可以自定义的
      } else if (item.sortFilterType === 'input') {
        column.sortable = ''
        return h(
          'span',
          {
            on: {
              click: () => {
                this.alertWhereInput(...arguments)
              }
            }
          },
          [
            item.name,
            h('i', {
              class: 'el-icon-caret-bottom',
              style: 'margin-right: 5px;'
            })
          ]
        )
      } else if (item.sortFilterType === 'list') {
        column.sortable = ''
        return h('span', item.name)
        // console.log('this.filters', this.filters)
        // if (this.filters[column.property]) {
        //   return h(
        //     SelectType,
        //     {
        //       props: {
        //         name: this.name,
        //         list: [],
        //         prop: 'fef',
        //         tacitlyNumber: '456'
        //       }
        //     },
        //     item.name
        //   )
        // } else {
        //   console.error('commonTable 丢失filters 字段配置')
        //   return h('span', item.name)
        // }
      } else {
        column.sortable = ''
        return h('span', item.name)
      }
    }
  }
}
</script>
<style lang="scss">
.pulicpage {
  height: 80px;
  background: white;
  padding-top: 22px;
}
</style>
