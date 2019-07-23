const state = {
  data: Array<any>([])
}
const getters = {}
const actions = {}
const mutations = {
  setData (state, value) {
    state.data = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}