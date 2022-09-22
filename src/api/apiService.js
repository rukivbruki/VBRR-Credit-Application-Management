import { api, canceledGet } from './index';
import restApi from './restApi';
import { DictionaryCodes } from '../../const.ts';

export default class ApiService {
  static findPersonList = (params) => {
    let options = '';
    let dataKey = Object.keys(params);
    let data = dataKey
      .filter((key) => !!params[key])
      .map((key) => `${key}=${params[key]}`);

    if (data.length > 0) {
      options = `?${data.join('&')}`;
    }
    return api().get(restApi.getPersonList + options);
  };

  static getPersonInfo(personId) {
    return api().get(restApi.getPersonInfo + `/${personId}`);
  }

  static getFullPersonInfo(personId) {
    return api().get(restApi.getPersonInfo + `/${personId}/full`);
  }

  static getAllDictionaries() {
    const params = `?code=${Object.keys(DictionaryCodes).join(';')}`;
    return api().get(restApi.getDictionary + params);
  }

  static sendPersonData(personId, personData) {
    return api().post(restApi.updatePerson + `${personId}/full`, personData);
  }

  static getCompanyList(query) {
    const params = `?companyName=${encodeURIComponent(query)}`;
    return canceledGet(restApi.getCompanyList + params);
  }
}
