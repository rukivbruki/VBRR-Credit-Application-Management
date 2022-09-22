import { cardsData } from '@/stabs/cardsDataStabs';

export default {
  state: {
    cardsToShow: cardsData.filter((card) => card.tabNumber === 0),
  },
  getters: {
    getCardsToShow: (state) => state.cardsToShow,
  },
  mutations: {
    changeCardsToShow(state, targetTab) {
      state.cardsToShow = cardsData.filter(
        (card) => card.tabNumber === Number(targetTab),
      );
    },
  },
  actions: {
    changeCardsToShow(ctx, targetTab) {
      ctx.commit('changeCardsToShow', targetTab);
    },
  },
};
