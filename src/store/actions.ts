export default {
  async actionsData({ commit }: {commit: any}, value: any){
    await setTimeout(()=>{
      commit('setData', value)
    }, 0)
  }
}