export default {
  state: {
    methodsOfCreditCalculation: [
      {
        name: 'По размеру кредита',
        value: 'byCreditSize',
      },
    ],
    creditPrograms: [
      {
        name: '[Кредитная карта MC World 115 дней] Компания',
        value: 'OVER.VCMF.COMPANY',
      },
      {
        name: '[Кредитная карта Visa Classic/MC Standard/MC World] Компания',
        value: 'OVER.VCMS.COMPANY',
      },
      {
        name: '[Кредитная карта Visa Infinite/MC World Black Edition] Компания',
        value: 'OVER.VI.COMPANY',
      },
    ],
    availableCurrencies: [
      {
        name: 'Рубли',
        value: 'CURRENCY.RUR',
      },
      {
        name: 'Евро',
        value: 'CURRENCY.EUR',
      },
      {
        name: 'Доллар США',
        value: 'CURRENCY.USD',
      },
    ],
    sellersOfCredit: [
      {
        name: 'АКСЁНОВА МАРИНА ВЛАДИМИРОВНА',
        value: 'АКСЁНОВА МАРИНА ВЛАДИМИРОВНА',
      },
      {
        name: 'Албина Людмила Сергеевна',
        value: 'Албина Людмила Сергеевна',
      },
      {
        name: 'Апостолаки Алёна Викторовна',
        value: 'Апостолаки Алёна Викторовна',
      },
    ],
    sourcesOfRequest: [
      {
        name: 'Сайтб ДБО',
        value: 'SOURCE.DBO',
      },
      {
        name: 'Цифровая Ипотека',
        value: 'SOURCE.CI',
      },
      {
        name: 'Предрассч.кредит',
        value: 'PREDICTED.CREDIT',
      },
    ],
  },
  getters: {
    // TODO Получать options для селекторов с бэка (сейчас они замоканы)
    getMethodsOfCreditCalculation: (state) => state.methodsOfCreditCalculation,
    getAvailableCurrencies: (state) => state.availableCurrencies,
    getCreditPrograms: (state) => state.creditPrograms,
    getSellersOfCredit: (state) => state.sellersOfCredit,
    getSourcesOfRequest: (state) => state.sourcesOfRequest,
  },
  mutations: {},
  actions: {},
};
