import ApiService from '@/api/apiService';
import { HttpCode, DictionaryCodes } from '../../../const.ts';

export default {
  state: {
    isFormValid: true,
    typesOfPhone: [],
    typesOfAddresses: [],
    typesOfDocuments: [],
    typesOfNegativeInfo: [],
    typesOfRelative: [],
    typesOfFamilyStatus: [],
    typesOfEducation: [],
    typesOfAttitudeMilitary: [],
    typesOfMilitaryComment: [],
    typesOfCityzenship: [],
    typesOfEmployment: [],
    typesOfSphereWork: [],
    typesOfPositionLevel: [],
    typesOfSphereOrgWork: [],
    typesOfCategoryClient: [],
    typesOfCountCompany: [],
    typesOfTypeClient: [],
    typesOfQuantityEmployee: [],
    typesOfDocIncome: [],
    typesOfDocCombIncome: [],
    typesOfObtainingWage: [],
    typesOfLiability: [],
    typesOfCurrency: [],
    typesOfIsOwn: [],
    typesYesNo: [],
    typesOfCodeHistory: [],
    genders: [],
    countries: [],
    personInfo: {
      personId: null,
      artBankId: '',
      artBanknftId: '',
      terrasoftId: '',
      sasId: '',
      cftId: '',
      creditList: [
        {
          agreementNumber: '',
          balanceDebt: 0,
          bkiCreditId: '',
          creditInfoId: 0,
          creditInfoVbrrId: 0,
          creditKind: '',
          creditOrganization: '',
          creditSum: 0,
          currency: '',
          currentOverdue: 0,
          discipline: 0,
          endDate: '',
          isOwn: '',
          limit: 0,
          maxOverdue: 0,
          originAmount: 0,
          outstanding: 0,
          overdue30_59: 0,
          overdue5_29: 0,
          overdue60_89: 0,
          overdue90Plus: 0,
          overdueDays: 0,
          overdueLess5: 0,
          overduePayment: 0,
          personId: 0,
          rate: 0,
          ratingCreditHistory: '',
          repayAmountMonth: 0,
          sasCreditId: '',
          startDate: '',
          status: '',
          takeDisciplineCredit: '',
          term: 0,
          typeCredit: '',
          typeSourceCredit: '',
        },
      ],
      formInfo: {
        attitudeMilitary: '',
        commentary: '',
        companyOwnerList: [],
        countPlaceActual: 0,
        countPlaceReg: 0,
        createDate: '',
        dependants: 0,
        dependantsChildren: 0,
        education: '',
        enploymentInfo: '',
        formInfoId: 0,
        formInfoIp: 0,
        incomeType: '',
        lastWorkDate: '',
        maritalStatus: '',
        maritalStatusOther: '',
        monthlyExpenses: 0,
        personId: 0,
        sourceInformation: '',
        totalExperience: '',
        weeklyBusy: '',
        workExpLastJob: '',
      },
      personInfo: {
        inn: '',
        sex: null,
        personInfoId: null,
        personId: null,
        lastName: '',
        firstName: '',
        middleName: '',
        birthDay: '',
        email: '',
        personInfoIp: null,
        createDate: null,
        birthdayPlace: '',
        fullNameGenitive: '',
        fullNameDative: '',
        fullNameAblative: '',
        negativeType: null,
        paperInfo: null,
        phoneInfo: null,
        addressInfo: null,
        prevLastName: '',
        prevFirstName: '',
        prevMiddleName: '',
        yearChangeFIO: null,
        citezenship: '',
        firstNameEn: '',
        lastNameEn: '',
        snils: '',
        personInfoExtId: null,
        position: '',
        relatedness: false,
        paperList: [
          {
            paperInfoId: null,
            personId: null,
            paperType: null,
            paperSeries: '',
            paperNumber: '',
            issueDate: '',
            issueDepartment: null,
            expireDate: '',
            paperInfoIp: null,
            createDate: null,
            divisionCode: null,
            paperInfoVbrrId: null,
            branchCode: '',
            active: true,
            main: true,
          },
        ],
        phoneList: [
          {
            phoneInfoId: null,
            personId: null,
            phoneType: null,
            phoneNumber: '',
            description: '',
            countryCode: null,
            zoneCode: null,
            phoneInfoIp: null,
            createDate: null,
            phoneInfoVbrrId: null,
            phoneNumberOrg: null,
            extPhone: null,
          },
        ],
        addressList: [
          {
            addressInfoId: null,
            personId: null,
            addressType: null,
            postIndex: '',
            country: null,
            countryCode: null,
            kingdom: null,
            area: '',
            region: '',
            city: '',
            cityType: null,
            street: '',
            streetType: null,
            house: '',
            building: '',
            apartment: '',
            addressInfoIp: null,
            createDate: null,
            seniorityComp: null,
            period: null,
            addressInfoVbrrId: null,
            uniaddressCoincWith: null,
            statusHousing: null,
            kladrCode: null,
            birthPlace: null,
            okato: '',
            locality: null,
            structure: null,
            ownership: null,
            consistMarried: null,
            registrDate: null,
            expiryRegistration: null,
            checkSameTemp: false,
            checkSame: false,
          },
        ],
        resident: true,
        haveIncome: false,
        negative: false,
        emailMessage: false,
        agreeToInform: false,
        voiceMessage: false,
        smsMessage: false,
      },
      relativeList: [],
    },
    isCoBorrower: false,
  },
  getters: {
    getTypesOfPhone: (state) => state.typesOfPhone,
    getTypesOfAddresses: (state) => state.typesOfAddresses,
    getTypesOfDocuments: (state) => state.typesOfDocuments,
    getTypesOfNegativeInfo: (state) => state.typesOfNegativeInfo,
    getTypesOfRelative: (state) => state.typesOfRelative,
    getTypesOfFamilyStatus: (state) => state.typesOfFamilyStatus,
    getTypesOfEducation: (state) => state.typesOfEducation,
    getTypesOfAttitudeMilitary: (state) => state.typesOfAttitudeMilitary,
    getTypesOfMilitaryComment: (state) => state.typesOfMilitaryComment,
    getTypesOfCityzenship: (state) => state.typesOfCityzenship,
    getTypesOfEmployment: (state) => state.typesOfEmployment,
    getTypesOfSphereWork: (state) => state.typesOfSphereWork,
    getTypesOfPositionLevel: (state) => state.typesOfPositionLevel,
    getTypesOfSphereOrgWork: (state) => state.typesOfSphereOrgWork,
    getTypesOfCategoryClient: (state) => state.typesOfCategoryClient,
    getTypesOfCountCompany: (state) => state.typesOfCountCompany,
    getTypesOfTypeClient: (state) => state.typesOfTypeClient,
    getTypesOfQuantityEmployee: (state) => state.typesOfQuantityEmployee,
    getTypesOfDocIncome: (state) => state.typesOfDocIncome,
    getTypesOfDocCombIncome: (state) => state.typesOfDocCombIncome,
    getTypesOfObtainingWage: (state) => state.typesOfObtainingWage,
    getTypesOfLiability: (state) => state.typesOfLiability,
    getTypesOfCurrency: (state) => state.typesOfCurrency,
    getTypesOfIsOwn: (state) => state.typesOfIsOwn,
    getTypesYesNo: (state) => state.typesYesNo,
    getTypesOfCodeHistory: (state) => state.typesOfCodeHistory,
    getGenders: (state) => state.genders,
    getCountries: (state) => state.countries,
    getPersonInfo: (state) => state.personInfo,
    getIsCoBorrower: (state) => state.isCoBorrower,
    getIsFormValid: (state) => state.isFormValid,
  },
  mutations: {
    setGenders(state, genders) {
      state.genders = genders;
    },
    setCountries(state, countries) {
      state.countries = countries;
    },
    setTypesOfDocuments(state, typesOfDocuments) {
      state.typesOfDocuments = typesOfDocuments;
    },
    setTypesOfNegativeInfo(state, typesOfNegativeInfo) {
      state.typesOfNegativeInfo = typesOfNegativeInfo;
    },
    setTypesOfPhone(state, typesOfPhone) {
      state.typesOfPhone = typesOfPhone;
    },
    setTypesOfAddresses(state, typesOfAddresses) {
      state.typesOfAddresses = typesOfAddresses;
    },
    setTypesOfRelative(state, typesOfRelative) {
      state.typesOfRelative = typesOfRelative;
    },
    setTypesOfFamilyStatus(state, typesOfFamilyStatus) {
      state.typesOfFamilyStatus = typesOfFamilyStatus;
    },
    setTypesOfEducation(state, typesOfEducation) {
      state.typesOfEducation = typesOfEducation;
    },
    setTypesOfAttitudeMilitary(state, typesOfAttitudeMilitary) {
      state.typesOfAttitudeMilitary = typesOfAttitudeMilitary;
    },
    setTypesOfMilitaryComment(state, typesOfMilitaryComment) {
      state.typesOfMilitaryComment = typesOfMilitaryComment;
    },
    setCityzenship(state, typesOfCityzenship) {
      state.typesOfCityzenship = typesOfCityzenship;
    },
    setTypesOfEmployment(state, typesOfEmployment) {
      state.typesOfEmployment = typesOfEmployment;
    },
    setTypesOfSphereWork(state, typesOfSphereWork) {
      state.typesOfSphereWork = typesOfSphereWork;
    },
    setTypesOfPositionLevel(state, typesOfPositionLevel) {
      state.typesOfPositionLevel = typesOfPositionLevel;
    },
    setTypesOfSphereOrgWork(state, typesOfSphereOrgWork) {
      state.typesOfSphereOrgWork = typesOfSphereOrgWork;
    },
    setTypesOfCategoryClient(state, typesOfCategoryClient) {
      state.typesOfCategoryClient = typesOfCategoryClient;
    },
    setTypesOfCountCompany(state, typesOfCountCompany) {
      state.typesOfCountCompany = typesOfCountCompany;
    },
    setTypesOfTypeClient(state, typesOfTypeClient) {
      state.typesOfTypeClient = typesOfTypeClient;
    },
    setTypesOfQuantityEmployee(state, typesOfQuantityEmployee) {
      state.typesOfQuantityEmployee = typesOfQuantityEmployee;
    },
    setTypesOfDocIncome(state, typesOfDocIncome) {
      state.typesOfDocIncome = typesOfDocIncome;
    },
    setTypesOfDocCombIncome(state, typesOfDocCombIncome) {
      state.typesOfDocCombIncome = typesOfDocCombIncome;
    },
    setTypesOfObtainingWage(state, typesOfObtainingWage) {
      state.typesOfObtainingWage = typesOfObtainingWage;
    },
    setTypesOfLiability(state, typesOfLiability) {
      state.typesOfLiability = typesOfLiability;
    },
    setTypesOfCurrency(state, typesOfCurrency) {
      state.typesOfCurrency = typesOfCurrency;
    },
    setTypesOfIsOwn(state, typesOfIsOwn) {
      state.typesOfIsOwn = typesOfIsOwn;
    },
    setTypesYesNo(state, typesYesNo) {
      state.typesYesNo = typesYesNo;
    },
    setTypesOfCodeHistory(state, typesOfCodeHistory) {
      state.typesOfCodeHistory = typesOfCodeHistory;
    },
    setPersonInfo(state, personInfo) {
      state.personInfo = personInfo;
    },
    setIsCoBorrower(state, isCoBorrower) {
      state.isCoBorrower = isCoBorrower;
    },
    setMainPaperSeries(state, paperSeries) {
      const mainPaperIndex = state.personInfo.personInfo.paperList.findIndex(
        (item) => item.main === true,
      );
      if (mainPaperIndex === -1) {
        state.personInfo.personInfo.paperList[0] = {
          paperInfoId: null,
          personId: null,
          paperType: null,
          paperSeries: paperSeries,
          paperNumber: '',
          issueDate: '',
          issueDepartment: null,
          expireDate: '',
          paperInfoIp: null,
          createDate: null,
          divisionCode: null,
          paperInfoVbrrId: null,
          branchCode: '',
          active: true,
          main: true,
        };
      } else {
        state.personInfo.personInfo.paperList[mainPaperIndex].paperSeries =
          paperSeries;
      }
    },
    setMainPaperNumber(state, paperNumber) {
      const mainPaperIndex = state.personInfo.personInfo.paperList.findIndex(
        (item) => item.main === true,
      );
      if (mainPaperIndex === -1) {
        state.personInfo.personInfo.paperList[0] = {
          paperInfoId: null,
          personId: null,
          paperType: null,
          paperSeries: '',
          paperNumber: paperNumber,
          issueDate: '',
          issueDepartment: null,
          expireDate: '',
          paperInfoIp: null,
          createDate: null,
          divisionCode: null,
          paperInfoVbrrId: null,
          branchCode: '',
          active: true,
          main: true,
        };
      } else {
        state.personInfo.personInfo.paperList[mainPaperIndex].paperNumber =
          paperNumber;
      }
    },
    setIsFormValid(state, newValue) {
      console.log('update valid flag', newValue);
      state.isFormValid = newValue;
    },
  },
  actions: {
    async setPersonDataInfo(ctx, personId) {
      await ApiService.getFullPersonInfo(personId).then((resp) => {
        if (resp.status === HttpCode.OK) {
          ctx.commit('setPersonInfo', resp.data);
        }
      });
    },
    async setAllDictionaries(ctx) {
      await ApiService.getAllDictionaries().then((resp) => {
        if (resp.status === HttpCode.OK) {
          resp.data.forEach((item) => {
            if (DictionaryCodes[item.code]) {
              ctx.commit(DictionaryCodes[item.code], item.entries);
            }
          });
        }
      });
    },
    async sendPersonData(ctx, personData) {
      await ApiService.sendPersonData(personData.personId, personData);
    },
    setIsFormValid(ctx, newValue) {
      ctx.commit('setIsFormValid', newValue);
    },
  },
};
