import ApiService from '../../api/apiService';
import { HttpCode } from '../../../const.ts';

export default {
  state: {
    personDataList: [],
    pageNumber: 1,
    isLoadingPersonalData: false,
  },
  getters: {
    getPersonDataList: (state) => state.personDataList,
    getPersonListLength: (state) => {
      if (state.personDataList) {
        return state.personDataList.length;
      }
      return 0;
    },
    getCroppedPersonList: (state, getters, rootState) => {
      return state.personDataList
        .slice(10 * (state.pageNumber - 1), 10 * state.pageNumber)
        .map((item) => {
          item.personInfo.fullName = `${item.personInfo.lastName} ${item.personInfo.firstName} ${item.personInfo.middleName}`;
          item.personInfo.paperInfo.paperTypeString = item.personInfo.paperInfo
            .paperType
            ? rootState.consumerInformationModule.typesOfDocuments.find(
                (type) => type.code === item.personInfo.paperInfo.paperType,
              ).name
            : '';
          if (item.personInfo.addressInfo) {
            item.personInfo.addressInfo.fullAddress = `${item.personInfo.addressInfo.addressInfoId}, ${item.personInfo.addressInfo.area}, ${item.personInfo.addressInfo.city}, ${item.personInfo.addressInfo.street}, ${item.personInfo.addressInfo.house}, ${item.personInfo.addressInfo.building}, ${item.personInfo.addressInfo.apartment}`;
          }
          return item;
        });
    },
    getIsLoadingPersonalData: (state) => state.isLoadingPersonalData,
  },
  mutations: {
    setPersonDataList(state, data) {
      state.personDataList = data;
    },
    setPageNumber(state, pageNumber) {
      state.pageNumber = pageNumber;
    },
    setIsLoadingPersonalData(state, value) {
      state.isLoadingPersonalData = value;
    },
  },
  actions: {
    async findPersonDataListByParams(ctx, params) {
      ctx.commit('setIsLoadingPersonalData', true);
      await ApiService.findPersonList(params).then((resp) => {
        if (resp.status === HttpCode.OK) {
          ctx.commit('setPersonDataList', resp.data);
          ctx.commit('setPageNumber', 1);
        }
        ctx.commit('setIsLoadingPersonalData', false);
      });
    },
    setPageNumber(ctx, pageNumber) {
      ctx.commit('setPageNumber', pageNumber);
    },
  },
};
