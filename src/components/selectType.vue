<template>
  <span>
    <span v-popover:modal :class="{selected: currentSelectProp !== -1}"><slot /><i class="el-icon-arrow-down" /></span>
    <el-popover ref="modal" placement="bottom" trigger="click" visible-arrow>
      <ul>
        <el-scrollbar class="select-type-list">
          <li>123456</li>
          <li>123456</li>
          <li>123456</li>
          </li>
        </el-scrollbar>
      </ul>
    </el-popover>
  </span>
</template>
<script>
export default {

  name: 'SelectType',

  props: {
    name: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: []
    },
    prop: {
      type: String,
      default: ''
    },
    tacitlyNumber: {
      type: String | Number,
      default: 0
    }
  },

  data() {
    return {
      currentSelectProp: -1,
      currentSelectSymbol: ''
    }
  },

  computed: {
    options() {
      return [...this.list, { name: '所有', prop: -1 }]
    },
    pageInfo() {
      return this.$store.state.tablePro[this.name].pageInfo
    }
  },
  created() {
    this.currentSelectProp = this.pageInfo.where[Object.keys(this.pageInfo.where).find(v => v.indexOf(this.pageInfo.where) > -1)] || -1
    this.$nextTick(() => {
      if (this.tacitlyNumber) {
        this.currentSelectProp = this.tacitlyNumber
      }
    })
  },

  methods: {
    select(prop, symbol) {
      this.currentSelectProp = prop
      this.$refs.modal.showPopper = false
      this.currentSelectSymbol = symbol

      /**
             * 计算出新的query对象
             * @param  {[type]} v [description]
             * @return {[type]}   [description]
             */
      const symbols = this.list.filter(v => v.symbol)
      const query = {
        [this.prop]: undefined
      }

      if (symbols.length > 0) {
        symbols.map(v => query[this.prop + v.symbol] = undefined)
      }
      this.$store.commit('tableProSetPage', {
        name: this.name,
        page: 1
      })

      this.$store.dispatch('getList', {
        name: this.name,
        query: {
          ...query,
          [symbol ? this.prop + symbol : this.prop]: prop === -1 ? undefined : prop
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

span {
	outline:none;
    cursor: pointer;
}

.selected {
	color: red;
}

.select-type-list {
    background: #fff;
    color: #666;
    text-align: center;
    max-height: 400px;
    overflow: scroll;
    overflow-x: hidden;
    li {
        height: 30px;
        line-height: 30px;
        cursor: pointer;

        &.active {
            color: #fff;
            background-color: #ccc;
        }
    }
}

</style>
