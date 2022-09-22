import { createStore } from 'vuex';
import cards from './modules/cardsStoreModule';
import consumerRequestModule from './modules/consumerRequestModule';
import consumerInformationModule from './modules/customerInformationModule';
import selectCreditOptionModule from './modules/selectCreditOptionModule';
import saveChangesModule from './modules/saveChangesModule';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cards,
    consumerRequestModule,
    consumerInformationModule,
    selectCreditOptionModule,
    saveChangesModule,
  },
});
