<template>
  <div>
    <el-divider content-position="left">
      <h2 class="el-select-credit-option-main-header" style="margin-top: 20px">
        Выбор варианта кредитования из Заявления-Анкеты
      </h2>
    </el-divider>

    <!-- БЛОК ИНОФРМАЦИИ О ПОЛЬЗОВАТЕЛЕ -->
    <customer-information-header class="select-credit-option-body" />

    <!-- ДАННЫЕ КЛИЕНТА -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h3 class="el-select-credit-option-header">Данные клиента</h3>
        </el-divider>
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="180px"
          class="select-credit-option-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 17px 0 0 0" :span="6">
              <el-form-item label="Сумма прожиточного минимума клиента">
                <el-input
                  v-model="formData.povertyLevel"
                  placeholder="RUR"
                  class="el-form-input"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 17px 0 0 0" :span="6">
              <div style="margin-right: 20px">
                <label class="el-form-item__label">Количество иждивенцев</label>
                <el-input-number
                  v-model="formData.countOfDependents"
                  :min="0"
                  :disabled="true"
                  style="width: 100%"
                />
              </div>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item
                label="Сумма ежемесячных платежей по действующим кредитам (ДН)"
              >
                <el-input
                  v-model="formData.monthlyCreditPayments"
                  :disabled="disabledValue.monthlyCreditPayments"
                  placeholder="RUB"
                  class="el-form-input"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 17px 0 0 0" :span="6">
              <el-form-item label="Общая сумма прожиточного минимума">
                <el-input
                  v-model="formData.totalPovertyLevel"
                  :disabled="disabledValue.totalPovertyLevel"
                  placeholder="RUB"
                  class="el-form-input"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 17px 0 0 0" :span="6">
              <p
                style="padding-left: 0"
                class="client-data-person-info person-info-item person-info"
              >
                Сегмент:
                <!--{{ getPersonInfo.personInfo. }}-->
              </p>
            </el-col>
            <el-col style="padding: 17px 0 0 0" :span="6">
              <p
                style="padding: 0"
                class="client-data-person-info person-info-item person-info"
              >
                Занимает руководящую должность из списка ТОС / иная должность
                для ТОП:
                <!--{{ getPersonInfo.personInfo. }}-->
              </p>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Дата приема заявки">
                <el-date-picker
                  type="date"
                  v-model="formData.dateOfAcceptRequest"
                  format="DD.MM.YYYY"
                  :disabled="disabledValue.dateOfAcceptRequest"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Дата расчета">
                <el-date-picker
                  type="date"
                  v-model="formData.dateOfCalculation"
                  format="DD.MM.YYYY"
                  :disabled="disabledValue.dateOfCalculation"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <!-- ТИП РАСЧЕТА -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h3 class="el-select-credit-option-header">Тип расчета</h3>
        </el-divider>
        <el-form
          ref="form"
          label-position="top"
          :model="formData"
          class="select-credit-option-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Способ расчёта кредита">
                <el-select
                  v-model="formData.creditCalculationMethod"
                  placeholder="Выберете способ расчета"
                  class="el-form-input"
                  :disabled="disabledValue.creditCalculationMethod"
                >
                  <el-option
                    v-for="item in getMethodsOfCreditCalculation"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <!-- ДАННЫЕ КРЕДИТА -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h3 class="el-select-credit-option-header">Данные кредита</h3>
        </el-divider>
        <el-form
          ref="form"
          label-position="top"
          :model="formData"
          class="select-credit-option-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Программа кредитования">
                <el-select
                  v-model="formData.creditProgram"
                  placeholder="Выберете программу"
                  class="el-form-input"
                  :disabled="disabledValue.creditProgram"
                >
                  <el-option
                    v-for="item in getCreditPrograms"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Валюта">
                <el-select
                  v-model="formData.currency"
                  placeholder="Выберете валюту"
                  class="el-form-input"
                  :disabled="disabledValue.currency"
                >
                  <el-option
                    v-for="item in getAvailableCurrencies"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Срок кредита">
                <el-input
                  v-model="formData.creditTerm"
                  :disabled="disabledValue.creditTerm"
                  placeholder="Количество месяцев"
                  class="el-form-input"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Сумма кредита">
                <el-input
                  v-model="formData.totalCreditSum"
                  :disabled="disabledValue.totalCreditSum"
                  class="el-form-input"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="День платежа по кредиту">
                <el-input
                  placeholder="День месяца"
                  v-model="formData.dayOfPay"
                  :disabled="disabledValue.dayOfPay"
                  class="el-form-input"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Цель кредита">
                <el-input
                  v-model="formData.purposeOfCredit"
                  :disabled="disabledValue.purposeOfCredit"
                  class="el-form-input"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Максимальная сумма кредита">
                <el-input
                  placeholder="RUB"
                  v-model="formData.maxCreditAmount"
                  :disabled="disabledValue.maxCreditAmount"
                  class="el-form-input"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Продавец кредита">
                <el-select
                  v-model="formData.sellerOfCredit"
                  placeholder="Выберете продавца"
                  class="el-form-input"
                  :disabled="disabledValue.sellerOfCredit"
                >
                  <el-option
                    v-for="item in getSellersOfCredit"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Источник получения заявки">
                <el-select
                  v-model="formData.sourceOfRequest"
                  placeholder="Выберете источник заявки"
                  class="el-form-input"
                  :disabled="disabledValue.sourceOfRequest"
                >
                  <el-option
                    v-for="item in getSourcesOfRequest"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <customer-information-buttons :is-credit-option="true" @back="back" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomerInformationHeader from '@/components/CustomerInformationLayout/CustomerInformationHeader/CustomerInformationHeader';
import CustomerInformationButtons from '@/components/CustomerInformationLayout/CustomerInformationButtons/CustomerInformationButtons';

export default {
  name: 'SelectCreditOption',
  components: { CustomerInformationButtons, CustomerInformationHeader },
  data() {
    return {
      formData: {
        countOfDependents: 0,
        povertyLevel: undefined,
        monthlyCreditPayments: undefined,
        totalPovertyLevel: undefined,
        dateOfCalculation: undefined,
        dateOfAcceptRequest: undefined,
        creditCalculationMethod: undefined,
        creditProgram: undefined,
        currency: undefined,
        creditTerm: undefined,
        totalCreditSum: undefined,
        dayOfPay: undefined,
        purposeOfCredit: undefined,
        maxCreditAmount: undefined,
        sellerOfCredit: undefined,
        sourceOfRequest: undefined,
      },
    };
  },
  computed: {
    ...mapGetters([
      'getPersonInfo',
      'getMethodsOfCreditCalculation',
      'getAvailableCurrencies',
      'getCreditPrograms',
      'getSellersOfCredit',
      'getSourcesOfRequest',
    ]),
    mainDocument() {
      let passport = null;

      if (this.getPersonInfo.personInfo.paperList.length > 0) {
        passport = this.getPersonInfo.personInfo.paperList.find(
          (item) => item.main,
        );
      }

      return passport ? passport : { paperSeries: '', paperNumber: '' };
    },
    disabledValue() {
      return {};
    },
  },
  methods: {
    back() {
      this.$router.push({ name: 'customerCredits' });
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-right: 20px;
}

.el-form-input {
  width: 100%;
}

.el-select-credit-option {
  margin: 0 30px;
}

.select-credit-option-buttons {
  margin: 15px 0;
  width: 100%;
  justify-content: space-between;
}

.el-select-credit-option-header,
.el-select-credit-option-main-header {
  font-style: normal;
  font-size: 20px;
  color: #333333;
}

.el-select-credit-option-main-header {
  font-size: 22px;
}

.person-info {
  margin: 0;
  font-size: 14px;
  color: #606266;
}

.client-data-person-info {
  margin-bottom: 20px;
}

.el-input-number {
  margin-bottom: 20px;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

.person-info {
  margin-right: 40px;
}

@media screen and (max-width: 950px) {
  .select-credit-option-buttons > .el-button-bottom {
    margin-top: 10px;
  }
}

@media screen and (max-width: 720px) {
  .el-col {
    max-width: 100%;
    width: 100%;
    padding: 0 !important;
  }

  .el-select-credit-option-header {
    font-size: 15px;
  }

  .person-info {
    margin-top: 20px;
  }

  .person-info > div {
    max-width: 100%;
  }

  .person-info-item {
    margin: 0 0 10px 0;
  }

  .select-credit-option-body {
    margin-left: 0 !important;
  }

  .el-form-input {
    width: 100%;
  }

  .el-row {
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
