<template>
  <div>
    <customer-information-steps :active="1" />

    <!-- ИДЕНТИФИКАЦИОННЫЕ ДАННЫЕ -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-customer-information-header">
            Идентификационные данные
          </h2>
          <transition name="fade">
            <el-tag
              v-if="
                getChangeableSection === 'isIdentificationDataSaved' &&
                validValue.paperSeries &&
                validValue.paperNumber
              "
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
        </el-divider>
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="180px"
          class="customer-information-body el-customer-information-form"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-checkbox
                v-model="isCoBorrower"
                label="Добавить созаемщика"
                class="customer-information-body"
                style="margin: 0 0 30px 0"
                @change="saveChange('isIdentificationDataSaved')"
              />
            </el-col>
          </el-row>
          <el-row style="margin: 15px 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item class="is-required" label="Фамилия">
                <el-input
                  class="el-form-input"
                  v-model="getPersonInfo.personInfo.lastName"
                  :disabled="disabledValue.lastName"
                  @blur="saveChange('isIdentificationDataSaved')"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item class="is-required" label="Имя">
                <el-input
                  class="el-form-input"
                  v-model="getPersonInfo.personInfo.firstName"
                  :disabled="disabledValue.firstName"
                  @blur="saveChange('isIdentificationDataSaved')"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item class="is-required" label="Отчество">
                <el-input
                  class="el-form-input"
                  v-model="getPersonInfo.personInfo.middleName"
                  :disabled="disabledValue.middleName"
                  @blur="saveChange('isIdentificationDataSaved')"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item class="is-required" label="Пол">
                <el-select
                  v-model="getPersonInfo.personInfo.sex"
                  placeholder="Выберете пол"
                  class="el-form-input"
                  :disabled="disabledValue.sex"
                  @blur="saveChange('isIdentificationDataSaved')"
                >
                  <el-option
                    v-for="item in getGenders"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin: 15px 0" :gutter="20">
            <el-col style="padding: 0" :span="6" class="el-date-picker-form">
              <el-form-item class="is-required" label="Дата рождения">
                <el-col style="padding: 0" class="el-form-input">
                  <el-date-picker
                    type="date"
                    v-model="getPersonInfo.personInfo.birthDay"
                    value-format="DD.MM.YYYY"
                    format="DD.MM.YYYY"
                    style="width: 100%"
                    :disabled="disabledValue.birthDay"
                    @blur="saveChange('isIdentificationDataSaved')"
                  />
                </el-col>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Серия документа">
                <el-input
                  class="el-form-input"
                  v-model="mainDocumentSeries"
                  :disabled="disabledValue.paperSeries"
                  @blur="saveChange('isIdentificationDataSaved')"
                  @input="
                    inputChange(4, mainDocumentSeries, 'paperSeries', 'rus')
                  "
                />
                <div v-if="!validValue.paperSeries" class="el-form-item__error">
                  Серия не может быть короче 4 символов и содержать английские
                  буквы
                </div>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Номер документа">
                <el-input
                  class="el-form-input"
                  v-model="mainDocumentNumber"
                  :disabled="disabledValue.paperNumber"
                  @blur="saveChange('isIdentificationDataSaved')"
                  @input="
                    inputChange(4, mainDocumentNumber, 'paperNumber', 'rus')
                  "
                />
                <div v-if="!validValue.paperNumber" class="el-form-item__error">
                  Номер не может быть короче 4 символов и содержать английские
                  буквы
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <!-- СКЛОНЕНИЕ ФИО И ИМЯ В ЛАТИНСКОЙ ТРАНСКРИПЦИИ -->
    <el-row style="margin: 15px 0" :gutter="20">
      <el-divider content-position="left">
        <h2 class="el-customer-information-header">Склонение ФИО</h2>
        <transition name="fade">
          <el-tag
            v-if="
              getChangeableSection === 'isDeclensionFullNameSaved' &&
              validValue.fullNameAblative &&
              validValue.fullNameGenitive &&
              validValue.fullNameDative
            "
            class="tag-margin"
            type="success"
          >
            Изменения сохранены
          </el-tag>
        </transition>
      </el-divider>
      <el-form
        ref="form"
        label-position="top"
        :model="getPersonInfo"
        label-width="180px"
        class="customer-information-body"
        style="width: 100%"
      >
        <el-row style="margin: 0" :gutter="20">
          <el-col style="padding: 0" :span="6">
            <el-form-item class="is-required" label="ФИО в РП (Кого?)">
              <el-input
                class="el-form-input"
                v-model="getPersonInfo.personInfo.fullNameAblative"
                @blur="saveChange('isDeclensionFullNameSaved')"
                @input="
                  requiredInputOfWordChange(
                    3,
                    getPersonInfo.personInfo.fullNameAblative,
                    'fullNameAblative',
                    'rus',
                  )
                "
              />
              <div
                v-if="!validValue.fullNameAblative"
                class="el-form-item__error"
              >
                ФИО не может быть короче 3 символов, содержать цифры и
                английские буквы
              </div>
            </el-form-item>
          </el-col>
          <el-col style="padding: 0" :span="6">
            <el-form-item class="is-required" label="ФИО в ДП (Кому?)">
              <el-input
                class="el-form-input"
                v-model="getPersonInfo.personInfo.fullNameDative"
                @blur="saveChange('isDeclensionFullNameSaved')"
                @input="
                  requiredInputOfWordChange(
                    3,
                    getPersonInfo.personInfo.fullNameDative,
                    'fullNameDative',
                    'rus',
                  )
                "
              />
              <div
                v-if="!validValue.fullNameDative"
                class="el-form-item__error"
              >
                ФИО не может быть короче 3 символов, содержать цифры и
                английские буквы
              </div>
            </el-form-item>
          </el-col>
          <el-col style="padding: 0" :span="6">
            <el-form-item class="is-required" label="ФИО в ТП (Кем?)">
              <el-input
                class="el-form-input"
                v-model="getPersonInfo.personInfo.fullNameGenitive"
                @blur="saveChange('isDeclensionFullNameSaved')"
                @input="
                  requiredInputOfWordChange(
                    3,
                    getPersonInfo.personInfo.fullNameGenitive,
                    'fullNameGenitive',
                    'rus',
                  )
                "
              />
              <div
                v-if="!validValue.fullNameGenitive"
                class="el-form-item__error"
              >
                ФИО не может быть короче 3 символов, содержать цифры и
                английские буквы
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <!-- ДЛЯ КРЕДИТНОЙ КАРТЫ -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-customer-information-header">Данные кредитной карты</h2>
          <transition name="fade">
            <el-tag
              v-if="
                getChangeableSection === 'isCreditCardDetailsSaved' &&
                validValue.firstNameEn &&
                validValue.lastNameEn
              "
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
          <el-tooltip
            :disabled="disabled"
            content="Указать только в случае пожелания клиента
            отличные от паспортных данные"
            placement="top"
            effect="light"
            visible-arrow
          >
            <span>
              <svg-sprite></svg-sprite>
              <svg width="20" height="20">
                <use xlink:href="#info" />
              </svg>
            </span>
          </el-tooltip>
        </el-divider>
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="280px"
          class="customer-information-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Имя в латинской транскрипции">
                <el-input
                  class="el-form-input"
                  v-model="getPersonInfo.personInfo.firstNameEn"
                  @blur="saveChange('isCreditCardDetailsSaved')"
                  @input="
                    inputOfWordChange(
                      3,
                      getPersonInfo.personInfo.firstNameEn,
                      'firstNameEn',
                      'eng',
                    )
                  "
                />
                <div v-if="!validValue.firstNameEn" class="el-form-item__error">
                  Имя не может быть короче 3 символов, содержать цифры и русские
                  буквы
                </div>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Фамилия в латинской транскрипции">
                <el-input
                  class="el-form-input"
                  v-model="getPersonInfo.personInfo.lastNameEn"
                  @blur="saveChange('isCreditCardDetailsSaved')"
                  @input="
                    inputOfWordChange(
                      3,
                      getPersonInfo.personInfo.lastNameEn,
                      'lastNameEn',
                      'eng',
                    )
                  "
                />
                <div v-if="!validValue.lastNameEn" class="el-form-item__error">
                  Фамилия не может быть короче 3 символов, содержать цифры и
                  русские буквы
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <!-- ДОПОЛНИТЕЛЬНО И НЕГАТИВНАЯ ИНФОРМАЦИЯ -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-customer-information-header">Дополнительно</h2>
          <transition name="fade">
            <el-tag
              v-if="
                getChangeableSection === 'isAdditionallyDataSaved' &&
                validValue.citezenship &&
                validValue.birthdayPlace &&
                validValue.prevFullName
              "
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
        </el-divider>
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="180px"
          class="customer-information-body"
        >
          <el-row style="margin: 15px 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item class="is-required" label="Гражданство">
                <el-select
                  v-model="getPersonInfo.personInfo.citizenship"
                  :disabled="disabledValue.citezenship"
                  placeholder="Выберете гражданство"
                  class="el-form-input"
                  @blur="saveChange('isAdditionallyDataSaved')"
                  @change="
                    requiredSelectChange(
                      getPersonInfo.personInfo.citizenship,
                      'citezenship',
                    )
                  "
                >
                  <el-option
                    v-for="item in getCountries"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
                <div v-if="!validValue.citezenship" class="el-form-item__error">
                  Гражданство не выбрано
                </div>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item
                class="is-required is-disabled"
                label="Место рождения"
              >
                <el-input
                  :disabled="disabledValue.birthdayPlace"
                  class="el-form-input"
                  v-model="getPersonInfo.personInfo.birthdayPlace"
                  @blur="saveChange('isAdditionallyDataSaved')"
                  @input="
                    requiredInputOfWordChange(
                      3,
                      getPersonInfo.personInfo.birthdayPlace,
                      'birthdayPlace',
                      'rus',
                    )
                  "
                />
                <div
                  v-if="!validValue.birthdayPlace"
                  class="el-form-item__error"
                >
                  Место рождения не может быть короче 3 символов, содержать
                  английские буквы
                </div>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Предыдущие ФИО">
                <el-input
                  class="el-form-input"
                  v-model="prevFullName"
                  @change="changePrevFullName"
                  @blur="saveChange('isAdditionallyDataSaved')"
                  @input="
                    inputOfWordChange(3, prevFullName, 'prevFullName', 'rus')
                  "
                />
                <div
                  v-if="!validValue.prevFullName"
                  class="el-form-item__error"
                >
                  Предыдущее ФИО не может быть короче 3 символов, содержать
                  английские буквы
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width=""
          class="customer-information-body"
        >
          <el-row style="margin: 15px 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Вид негативной информации">
                <el-select
                  v-model="getPersonInfo.personInfo.negativeType"
                  placeholder="Выбрать"
                  class="el-form-input"
                  @blur="saveChange('isAdditionallyDataSaved')"
                >
                  <el-option
                    v-for="item in getTypesOfNegativeInfo"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    @click="typesOfNegativeInfoSelectorClick"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="">
                <el-checkbox
                  v-model="getPersonInfo.personInfo.negative"
                  class="negative-info-checkbox"
                  label="Негативная информация по визуальному осмотру клиента"
                  @change="saveChange('isAdditionallyDataSaved')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <!-- ДОКУМЕНТЫ ПЕРСОНЫ -->
    <el-row>
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-customer-information-header">Документы персоны</h2>
          <transition name="fade">
            <el-tag
              v-if="
                getChangeableSection === 'isPersonsDocumentsSaved' &&
                validValue.personPapersValidation
              "
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
        </el-divider>
      </el-col>
    </el-row>

    <add-new-person-doc-form
      :paper-list="paperListForTabs"
      @add-paper="addPaper"
      @delete-paper="deletePaper"
      class="customer-information-body"
      @change="saveChange('isPersonsDocumentsSaved')"
      @submitPersonDocValue="submitPersonDocValue"
    />

    <customer-information-buttons
      :is-first-step="true"
      @reload-data="reloadData"
      @next="next"
    />
  </div>
</template>

<script>
import './stylesForСustomerInformation.css';

import { mapGetters } from 'vuex';
import AddNewPersonDocForm from './AddNewPersonDocForm/AddNewPersonDocForm';
import CustomerInformationSteps from '@/components/CustomerInformationLayout/CustomerInformationSteps/CustomerInformationSteps';
import { personDocTemplate } from '@/stabs/personDocTemplate';
import CustomerInformationButtons from '@/components/CustomerInformationLayout/CustomerInformationButtons/CustomerInformationButtons';
import SvgSprite from '@/components/SvgSprite/SvgSprite';

export default {
  name: 'CustomerInformation',
  components: {
    SvgSprite,
    CustomerInformationButtons,
    AddNewPersonDocForm,
    CustomerInformationSteps,
  },
  data() {
    return {
      selectedDocument: null,
      prevFullName: '',
      paperListForTabs: [],
      disabledValue: {
        lastName: false,
        firstName: false,
        middleName: false,
        sex: false,
        birthDay: false,
        paperSeries: false,
        paperNumber: false,
        citezenship: false,
        birthdayPlace: false,
      },
      validValue: {
        paperNumber: true,
        paperSeries: true,
        fullNameDative: true,
        fullNameGenitive: true,
        fullNameAblative: true,
        lastNameEn: true,
        firstNameEn: true,
        birthdayPlace: true,
        prevFullName: true,
        citezenship: true,
        personPapersValidation: false,
      },
    };
  },
  beforeMount() {
    this.prepareFullName();
    this.prepareDocumentList();
    this.updateFormValidationFlag();
  },
  computed: {
    ...mapGetters([
      'getGenders',
      'getCountries',
      'getTypesOfNegativeInfo',
      'getTypesOfDocuments',
      'getPersonInfo',
      'getChangeableSection',
    ]),
    mainDocumentSeries: {
      get() {
        const mainDocIndex = this.getPersonInfo.personInfo.paperList.findIndex(
          (item) => item.main === true,
        );
        if (mainDocIndex === -1) {
          return '';
        } else {
          return this.getPersonInfo.personInfo.paperList[mainDocIndex]
            .paperSeries;
        }
      },
      set(newVal) {
        this.$store.commit('setMainPaperSeries', newVal);
      },
    },
    mainDocumentNumber: {
      get() {
        const mainDocIndex = this.getPersonInfo.personInfo.paperList.findIndex(
          (item) => item.main === true,
        );
        if (mainDocIndex === -1) {
          return '';
        } else {
          return this.getPersonInfo.personInfo.paperList[mainDocIndex]
            .paperNumber;
        }
      },
      set(newVal) {
        this.$store.commit('setMainPaperNumber', newVal);
      },
    },
    isCoBorrower: {
      get() {
        return this.$store.getters.getIsCoBorrower;
      },
      set(newVal) {
        this.$store.commit('setIsCoBorrower', newVal);
      },
    },
    isFormValid() {
      let result = true;
      for (let key in this.validValue) {
        result = result && this.validValue[key];
      }
      return this.allRequiredInputFilled() && result;
    },
  },
  watch: {
    getPersonInfo(newVal) {
      if (newVal && newVal.personInfo) {
        Object.keys(this.disabledValue).forEach((key) => {
          this.disabledValue[key] = ['paperNumber'].includes(key)
            ? !!this.mainDocumentNumber
            : !!newVal.personInfo[key];
          this.disabledValue[key] = ['paperSeries'].includes(key)
            ? !!this.mainDocumentSeries
            : !!newVal.personInfo[key];
        });

        this.prepareFullName();
        this.prepareDocumentList();
      }
    },
  },
  methods: {
    // eslint-disable-next-line complexity
    allRequiredInputFilled() {
      return (
        this.getPersonInfo.personInfo.fullNameAblative !== undefined &&
        this.getPersonInfo.personInfo.fullNameDative !== undefined &&
        this.getPersonInfo.personInfo.fullNameGenitive !== undefined &&
        this.getPersonInfo.personInfo.citizenship !== undefined &&
        this.getPersonInfo.personInfo.birthdayPlace !== undefined
      );
    },
    submitPersonDocValue(personDocDataValidation) {
      this.validValue.personPapersValidation = personDocDataValidation;
      this.updateFormValidationFlag();
    },
    requiredSelectChange(value, inputType) {
      if (value !== undefined) {
        this.validValue[inputType] = true;
        this.updateFormValidationFlag();
      }
    },
    isEngSymbols(text) {
      return /[a-z]/i.test(text);
    },
    isRusSymbols(text) {
      return /[а-я]/i.test(text);
    },
    isNumbers(text) {
      return /[0-9]/i.test(text);
    },
    isValueInvalid(minLength, value, localisation) {
      return (
        value === '' ||
        value.length < minLength ||
        (localisation === 'rus'
          ? this.isEngSymbols(value)
          : this.isRusSymbols(value))
      );
    },
    updateFormValidationFlag() {
      this.$store.dispatch('setIsFormValid', this.isFormValid);
    },
    requiredInputChange(minLength, value, inputType, localisation) {
      this.validValue[inputType] = !this.isValueInvalid(
        minLength,
        value,
        localisation,
      );
      this.updateFormValidationFlag();
    },
    requiredInputOfWordChange(minLength, value, inputType, localisation) {
      this.validValue[inputType] = !(
        this.isValueInvalid(minLength, value, localisation) ||
        this.isNumbers(value)
      );
      this.updateFormValidationFlag();
    },
    inputOfWordChange(minLength, value, inputType, localisation) {
      if (value.length > 0) {
        this.validValue[inputType] = !(
          this.isValueInvalid(minLength, value, localisation) ||
          this.isNumbers(value)
        );
      } else {
        this.validValue[inputType] = true;
      }
      this.updateFormValidationFlag();
    },
    inputChange(minLength, value, inputType, localisation) {
      if (value.length > 0) {
        this.validValue[inputType] = !this.isValueInvalid(
          minLength,
          value,
          localisation,
        );
      } else {
        this.validValue[inputType] = true;
      }
      this.updateFormValidationFlag();
    },
    saveChange(sectionName) {
      this.$store.dispatch('setChangeableSection', sectionName);
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
    },
    prepareFullName() {
      this.prevFullName =
        `${this.getPersonInfo.personInfo.prevLastName} ${this.getPersonInfo.personInfo.prevFirstName} ${this.getPersonInfo.personInfo.prevMiddleName}`.trim();
    },
    prepareDocumentList() {
      if (this.getPersonInfo.personInfo.paperList.length > 0) {
        this.paperListForTabs =
          this.getPersonInfo.personInfo.paperList.length > 0
            ? this.getPersonInfo.personInfo.paperList.slice()
            : [];
      }
    },
    changePrevFullName() {
      [
        this.getPersonInfo.personInfo.prevLastName = '',
        this.getPersonInfo.personInfo.prevFirstName = '',
        this.getPersonInfo.personInfo.prevMiddleName = '',
      ] = this.prevFullName ? this.prevFullName.split(' ') : [];
    },
    addPaper(paperType) {
      this.paperListForTabs.push(
        Object.assign({}, personDocTemplate, {
          personId: this.getPersonInfo.personId,
          paperType: paperType,
        }),
      );
    },
    deletePaper(paper) {
      this.paperListForTabs.splice(this.paperListForTabs.indexOf(paper), 1);
    },
    reloadData() {
      location.reload();
    },
    next() {
      if (this.paperListForTabs.length === 0) {
        alert('Необходимо добавить документ!');
        return;
      }

      if (this.isFormValid) {
        this.getPersonInfo.personInfo.paperList = this.paperListForTabs;

        this.$router.push({
          name: 'customerContacts',
        });
      }
    },
    typesOfNegativeInfoSelectorClick(event) {
      this.$el.querySelectorAll('.el-select')[2].style.width =
        (event.target.innerText.length + 7) * 7.5 + 'px';
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.el-customer-information-header {
  font-style: normal;
  font-size: 20px;
  color: #333333;
}

.tag-margin {
  margin: 10px;
}

.el-customer-information-form .el-form-item {
  margin-right: 20px;
}

.el-form-item {
  margin-right: 20px;
}

.el-form-input {
  width: 100%;
}

.el-customer-information-form .el-form-input {
  width: 100%;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

.invalid {
  border-color: #f56c6c;
}

.is-required > .el-form-item__label:before {
  content: '*';
  color: var(--el-color-danger);
  margin-right: 4px;
}

@media screen and (max-width: 720px) {
  .el-customer-information-header {
    font-size: 14px;
  }

  .el-row {
    flex-direction: column;
    width: 100%;
  }

  .el-col {
    max-width: 100%;
    width: 100%;
  }

  .el-date-picker-form {
    margin-bottom: 22px;
  }

  .customer-information-body {
    margin-left: 0;
  }

  .el-customer-information-form .el-form-item {
    width: 100%;
  }

  .el-form-input {
    width: 100%;
  }
}
</style>
