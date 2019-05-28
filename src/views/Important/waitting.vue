<template>
  <div class="app-container">
    <CommonTable name="brand/project" :filters="filters" @handleEdit="handleEdit" />
  </div>
</template>

<script>
// import CommonTable from '@/components/public/index'
import CommonTable from '@/components/commonTable.vue'

export default {
  components: { CommonTable },
  data() {
    return {
      filters: {
        date: {
          label: 'date',
          list: []
        },
        name: {
          label: 'name',
          list: []
        },
        state: {
          label: 'state',
          tacitlyNumber: 1,
          list: [
            {
              name: '停用',
              prop: 0
            },
            {
              name: '启用',
              prop: 1
            }
          ]
        }
      }
    }
  },
  methods: {
    handleEdit(e) {
      console.log('aa', e)
    }
  }
}
</script>
<style lang="scss">

</style>
