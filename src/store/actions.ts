export default {
  async actionsData ({ commit }, value) {
    await setTimeout(()=>{
      commit('setData', value)
    }, 0)
  }
}