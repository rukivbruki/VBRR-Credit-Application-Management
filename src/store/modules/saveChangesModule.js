export default {
  state: {
    changeableSection: undefined,
  },
  getters: {
    getChangeableSection: (state) => state.changeableSection,
  },
  mutations: {
    setChangeableSection(state, sectionName) {
      state.changeableSection = sectionName;
    },
  },
  actions: {
    setChangeableSection(ctx, sectionName) {
      ctx.commit('setChangeableSection', sectionName);
      setTimeout(() => ctx.commit('setChangeableSection', undefined), 1500);
    },
  },
};
