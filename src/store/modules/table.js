
import { getList } from '../../api/table'

export default {
  namespaced: true,

  state: {
    StaffRanKings: []
  },

  mutations: {
    /**
         * 门店排名列表
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
    StaffRankingsListFn(state, data) {
      state.StaffRanKings = data
    }
  },

  actions: {
    getStaffRankingsLIstFn({ state, commit }, { data, field }) {
      return getList(data, field).then(res => {
        commit('StaffRankingsListFn', res.list)
      })
    }
  }
}

