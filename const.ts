const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};
const BASE_URL = `https://`;
const TIMEOUT = 60000;

const DictionaryCodes = {
  'CLIENT.SEX': 'setGenders',
  COUNTRY: 'setCountries',
  'CLIENT.DOCS': 'setTypesOfDocuments',
  'NEGATIV.TYPE': 'setTypesOfNegativeInfo',
  'TYPE.PHONE': 'setTypesOfPhone',
  'ADDRESS.TYPE.PHISICAL': 'setTypesOfAddresses',
  RELATIVE: 'setTypesOfRelative',
  'FAMILY.STATUS': 'setTypesOfFamilyStatus',
  EDUCATION: 'setTypesOfEducation',
  'ATTITUDE.MILITARY': 'setTypesOfAttitudeMilitary',
  'MILITARY.COMMENT': 'setTypesOfMilitaryComment',
  CITYZENSHIP: 'setCityzenship',
  'TYPE.EMPLOYMENT': 'setTypesOfEmployment',
  'SPHERE.WORK': 'setTypesOfSphereWork',
  'POSITION.LEVEL': 'setTypesOfPositionLevel',
  'SPHERE.WORK.ORG': 'setTypesOfSphereOrgWork',
  'CATEGORY.CLIENT': 'setTypesOfCategoryClient',
  'COUNT.COMPANY': 'setTypesOfCountCompany',
  'TYPE.CLIENT': 'setTypesOfTypeClient',
  'QUANTITY.EMPLOYEE': 'setTypesOfQuantityEmployee',
  'TYPE.DOC.INCOME': 'setTypesOfDocIncome',
  'TYPE.DOC.COMB.INCOME': 'setTypesOfDocCombIncome',
  'OBTAINING.WAGE': 'setTypesOfObtainingWage',
  'LIABILITY.TYPE': 'setTypesOfLiability',
  CURRENCY: 'setTypesOfCurrency',
  'IS.OWN': 'setTypesOfIsOwn',
  'YES.NO': 'setTypesYesNo',
  'CODE.HISTORY': 'setTypesOfCodeHistory',
};

export { HttpCode, BASE_URL, TIMEOUT, DictionaryCodes };
