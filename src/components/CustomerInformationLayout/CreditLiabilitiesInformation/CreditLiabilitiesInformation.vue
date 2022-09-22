<template>
  <div>
    <customer-information-steps :active="6" />

    <!-- БЛОК ИНОФРМАЦИИ О ПОЛЬЗОВАТЕЛЕ -->
    <customer-information-header class="credit-information-body" />

    <!-- ДЕЙСТВУЮЩИЕ КРЕДИТЫ (В РУБЛЯХ) -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-credit-information-header">Действующие кредиты</h2>
          <transition name="fade">
            <el-tag
              v-if="getChangeableSection === 'isCurrentCreditSaved'"
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
          <el-tooltip
            :disabled="disabled"
            content="В рублях"
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

        <credit-table
          :list="listNotRefinancing"
          :is-edit-row="isEditNotRefinancing"
          @addRow="addRow"
          @deleteRow="deleteRow"
          @checkEdit="chekEdit"
        />
      </el-col>
    </el-row>

    <!-- ИНФОРМАЦИЯ ПО КРЕДИТАМ, ПОДЛЕЖАЩИМ РЕФИНАНСИРОВАНИЮ -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-credit-information-header">
            Информация по кредитам (рефинансирование)
          </h2>
          <transition name="fade">
            <el-tag
              v-if="getChangeableSection === 'isRefinancingCreditDataSaved'"
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
          <el-tooltip
            :disabled="disabled"
            content="Информация по кредитам, подлежащим рефинансированию"
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

        <credit-table
          :is-refinancing="true"
          :list="listRefinancing"
          :is-edit-row="isEditRefinancing"
          @addRow="addRow"
          @deleteRow="deleteRow"
          @checkEdit="chekEdit"
        />

        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="180px"
          class="credit-information-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Итого Оставшаяся для погашения сумма">
                <el-input
                  class="el-form-input finalCalculations"
                  v-model="getPersonInfo.formInfo.creditBalanceSumRefinance"
                  :disabled="true"
                  @blur="saveChange('isRefinancingCreditDataSaved')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <!-- КРЕДИТНАЯ ИСТОРИЯ -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-credit-information-header">Кредитная история</h2>
          <transition name="fade">
            <el-tag
              v-if="getChangeableSection === 'isCreditHistorySaved'"
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
          class="credit-information-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Наличие кредитной истории">
                <el-select
                  v-model="getPersonInfo.formInfo.availabilityCreditHistory"
                  style="width: 100%"
                  @blur="saveChange('isCreditHistorySaved')"
                >
                  <el-option
                    v-for="item in getTypesYesNo"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Код">
                <el-select
                  v-model="getPersonInfo.formInfo.codeHistory"
                  style="width: 100%"
                  @blur="saveChange('isCreditHistorySaved')"
                >
                  <el-option
                    v-for="item in getTypesOfCodeHistory"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Код БКИ">
                <el-input
                  class="el-form-input"
                  v-model="getPersonInfo.formInfo.bkiCode"
                  @blur="saveChange('isCreditHistorySaved')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <!-- СОГЛАСИЕ КЛИЕНТА НА ПОЛУЧЕНИЕ БАНКОМ ИНФОРМАЦИИ В БЮРО КРЕДИТНЫХ ИСТОРИЙ -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-credit-information-header">
            Согласие клиента (получение информации)
          </h2>
          <transition name="fade">
            <el-tag
              v-if="getChangeableSection === 'isAgreementToGetInfoByBankSaved'"
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
          <el-tooltip
            :disabled="disabled"
            content="Согласие клиента на получение банком информации в бюро кредитных
            историй"
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
          label-width="180px"
          class="credit-information-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Результат согласия">
                <el-select
                  v-model="getPersonInfo.formInfo.agreementResult"
                  style="width: 100%"
                  @blur="saveChange('isAgreementToGetInfoByBankSaved')"
                >
                  <el-option
                    v-for="item in getTypesYesNo"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Дата начала действия согласия">
                <el-date-picker
                  type="date"
                  v-model="getPersonInfo.formInfo.agreementStartDt"
                  value-format="DD.MM.YYYY"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                  @change="saveChange('isAgreementToGetInfoByBankSaved')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <!-- СОГЛАСИЕ КЛИЕНТА НА ЗАПРОС В ПФР -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-credit-information-header">Согласие клиента (в ПФР)</h2>
          <transition name="fade">
            <el-tag
              v-if="getChangeableSection === 'isAgreementToRequestSaved'"
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
          <el-tooltip
            :disabled="disabled"
            content="Согласие клиента на запрос в ПФР"
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
          label-width="180px"
          class="credit-information-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Результат согласия">
                <el-select
                  v-model="getPersonInfo.formInfo.isConsentToRecivePfr"
                  style="width: 100%"
                  @blur="saveChange('isAgreementToRequestSaved')"
                >
                  <el-option
                    v-for="item in getTypesYesNo"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <customer-information-buttons @back="back" @next="next" />
  </div>
</template>

<script>
import CustomerInformationSteps from '@/components/CustomerInformationLayout/CustomerInformationSteps/CustomerInformationSteps';
import CustomerInformationHeader from '@/components/CustomerInformationLayout/CustomerInformationHeader/CustomerInformationHeader';
import { mapGetters } from 'vuex';
import SvgSprite from '../../SvgSprite/SvgSprite';
import CreditTable from '@/components/CustomerInformationLayout/CreditLiabilitiesInformation/CreditTable/CreditTable';
import CustomerInformationButtons from '@/components/CustomerInformationLayout/CustomerInformationButtons/CustomerInformationButtons';

export default {
  name: 'CreditLiabilitiesInformation',
  components: {
    SvgSprite,
    CreditTable,
    CustomerInformationSteps,
    CustomerInformationHeader,
    CustomerInformationButtons,
  },
  data() {
    return {
      listNotRefinancing: [],
      listRefinancing: [],
      isEditNotRefinancing: false,
      isEditRefinancing: false,
    };
  },
  beforeMount() {
    this.prepareData();
  },
  computed: {
    ...mapGetters([
      'getPersonInfo',
      'getTypesYesNo',
      'getTypesOfCodeHistory',
      'getChangeableSection',
    ]),
  },
  watch: {
    'getPersonInfo.creditList': {
      handler() {
        this.prepareData();
        this.changeCreditBalanceSumRefinance();
      },
      deep: true,
    },
    isEditRefinancing(newVal) {
      if (!newVal) {
        this.getPersonInfo.creditList = this.checkCreditList(
          this.listRefinancing,
        ).concat(this.listNotRefinancing);
      }
    },
    isEditNotRefinancing(newVal) {
      if (!newVal) {
        this.getPersonInfo.creditList = this.checkCreditList(
          this.listNotRefinancing,
        ).concat(this.listRefinancing);
      }
    },
  },
  methods: {
    saveChange(sectionName) {
      this.$store.dispatch('setChangeableSection', sectionName);
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
    },
    prepareData() {
      this.listRefinancing = this.fillList(true);
      this.listNotRefinancing = this.fillList(false);
    },
    fillList(isRefinancing) {
      return this.getPersonInfo.creditList.filter((item) =>
        isRefinancing
          ? item.creditKind === 'CREDIT.ACTIVE.REFINANCING'
          : item.creditKind === 'CREDIT.ACTIVE',
      );
    },
    changeCreditBalanceSumRefinance() {
      this.getPersonInfo.formInfo.creditBalanceSumRefinance =
        this.getPersonInfo.creditList.reduce((prevVal, item) => {
          let res = 0;
          if (item.creditKind === 'CREDIT.ACTIVE.REFINANCING') {
            res = Number(item.balanceDebt);
          }

          return prevVal + res;
        }, 0);
    },
    addRow(isRefinancing) {
      this.getPersonInfo.creditList.push({
        personId: this.getPersonInfo.personInfo.personId,
        creditKind: isRefinancing
          ? 'CREDIT.ACTIVE.REFINANCING'
          : 'CREDIT.ACTIVE',
        typeCredit: '',
        limit: '',
        balanceDebt: '',
        repayAmountMonth: '',
        currency: '',
        startDate: '',
        creditOrganization: '',
        agreementNumber: '',
        isOwn: '',
        term: '',
      });

      this.chekEdit(isRefinancing, true);
      this.chekEdit(!isRefinancing, false);
    },
    deleteRow(index, isRefinancing) {
      isRefinancing
        ? this.listRefinancing.splice(index, 1)
        : this.listNotRefinancing.splice(index, 1);

      this.getPersonInfo.creditList = this.listRefinancing.concat(
        this.listNotRefinancing,
      );
      isRefinancing
        ? this.saveChange('isRefinancingCreditDataSaved')
        : this.saveChange('isCurrentCreditSaved');
    },
    chekEdit(isRefinancing, value) {
      isRefinancing
        ? (this.isEditRefinancing = value)
        : (this.isEditNotRefinancing = value);
      isRefinancing
        ? this.saveChange('isRefinancingCreditDataSaved')
        : this.saveChange('isCurrentCreditSaved');
    },
    checkCreditList(list) {
      return list.filter((credit) => {
        let isOk = false;
        for (let key in credit) {
          if (!['personId', 'creditKind'].includes(key) && credit[key]) {
            isOk = true;
          }
        }

        return isOk;
      });
    },
    back() {
      this.$router.push({ name: 'customerBudget' });
    },
    next() {
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
      this.$router.push({ name: 'selectCreditOption' });
    },
  },
};
</script>

<style scoped>
.tag-margin {
  margin: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.el-credit-information-header {
  font-style: normal;
  font-size: 20px;
  color: #333333;
}

.el-form-item {
  width: 90%;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

@media screen and (max-width: 720px) {
  .el-credit-information-header {
    font-size: 14px;
  }

  .credit-information-body {
    margin-left: 0 !important;
  }

  .el-form-item {
    width: 100%;
  }

  .el-row {
    flex-direction: column;
    width: 100%;
  }

  .el-col {
    max-width: 100%;
  }
}
</style>
