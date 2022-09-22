<template>
  <div>
    <customer-information-steps :active="5" />

    <!-- БЛОК ИНОФРМАЦИИ О ПОЛЬЗОВАТЕЛЕ -->
    <customer-information-header class="budget-information-body" />

    <!-- ДАННЫЕ ДЛЯ РАСЧЕТА ОСНОВНОГО ДОХОДА И ДОХОДА ПО СОВМЕСТИТЕЛЬСТВУ -->
    <el-row style="margin: 0" :gutter="20">
      <el-divider content-position="left">
        <h2 class="el-budget-information-header">Данные для расчета</h2>
        <transition name="fade">
          <el-tag
            v-if="
              getChangeableSection === 'isDataForCalculatingBasicIncomeSaved'
            "
            class="tag-margin"
            type="success"
          >
            Изменения сохранены
          </el-tag>
        </transition>
        <el-tooltip
          :disabled="disabled"
          content="Данные для расчета основного дохода и дохода по совместительству"
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
      <el-col style="padding: 0" :span="24">
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="100px"
          class="budget-information-body"
        >
          <el-row style="margin: 0; align-items: flex-end" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Тип документа для расчета основной доход">
                <el-select
                  v-model="getPersonInfo.formInfo.typeDocIncome"
                  placeholder="Выбрать"
                  class="el-form-input"
                >
                  <el-option
                    v-for="item in getTypesOfDocIncome"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col style="padding: 0" :span="6">
              <el-form-item
                label="Тип документа для расчета дохода по совместительству"
              >
                <el-select
                  v-model="getPersonInfo.formInfo.typeDocCombIncome"
                  placeholder="Выбрать"
                  class="el-form-input"
                >
                  <el-option
                    v-for="item in getTypesOfDocCombIncome"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <income-tax-tables
            v-if="showIncomeTaxTables"
            :type="getPersonInfo.formInfo.typeDocIncome"
            @changeInTable="saveChange('isDataForCalculatingBasicIncomeSaved')"
          />

          <income-tax-tables
            v-if="showCombIncomeTaxTables"
            :type="getPersonInfo.formInfo.typeDocCombIncome"
            @changeInTable="saveChange('isDataForCalculatingBasicIncomeSaved')"
          />
        </el-form>
      </el-col>
    </el-row>

    <!-- ЕЖЕМЕСЯЧНЫЕ ДОХОДЫ -->
    <el-row style="margin: 0" :gutter="20">
      <el-divider content-position="left">
        <h2 class="el-budget-information-header">Ежемесячные доходы, руб</h2>
        <transition name="fade">
          <el-tag
            v-if="getChangeableSection === 'isMonthlyIncomeSaved'"
            class="tag-margin"
            type="success"
          >
            Изменения сохранены
          </el-tag>
        </transition>
      </el-divider>
    </el-row>
    <el-form
      ref="form"
      label-position="top"
      :model="getPersonInfo"
      label-width="100px"
      class="budget-information-body"
    >
      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item
            label="Среднемесячный доход по основному месту работы, руб"
          >
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.incomeMain"
              :disabled="showIncomeTaxTables"
              @blur="saveChange('isMonthlyIncomeSaved')"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 17px 0 0 0" :span="6">
          <el-form-item label="Доход от работы по совместительству">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.incomePrtTime"
              :disabled="showCombIncomeTaxTables"
              @blur="saveChange('isMonthlyIncomeSaved')"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 17px 0 0 0" :span="6">
          <el-form-item label="Пенсия">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.incomePension"
              @change="changeTotalMonthIncome"
              @blur="saveChange('isMonthlyIncomeSaved')"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 17px 0 0 0" :span="6">
          <el-form-item label="Иное">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.incomeOther"
              @change="changeTotalMonthIncome"
              @blur="saveChange('isMonthlyIncomeSaved')"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item label="ИТОГО по всем доходам">
            <el-input
              class="el-form-input finalCalculations"
              v-model="getPersonInfo.formInfo.totalMonthIncome"
              :disabled="true"
              @blur="saveChange('isMonthlyIncomeSaved')"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- ЕЖЕМЕСЯЧНЫЕ РАСХОДЫ -->
    <el-row style="margin: 0" :gutter="20">
      <el-divider content-position="left">
        <h2 class="el-budget-information-header">Ежемесячные расходы, руб</h2>
        <transition name="fade">
          <el-tag
            v-if="getChangeableSection === 'isMonthlyExpensesSaved'"
            class="tag-margin"
            type="success"
          >
            Изменения сохранены
          </el-tag>
        </transition>
      </el-divider>
      <el-col style="padding: 0" :span="24">
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="100px"
          class="budget-information-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Выплата алиментов">
                <el-input
                  class="el-form-input"
                  v-model="getPersonInfo.formInfo.payAlimony"
                  @change="changeTotalMondatoryPay"
                  @blur="saveChange('isMonthlyExpensesSaved')"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="ИТОГО по всем расходам">
                <el-input
                  class="el-form-input finalCalculations"
                  v-model="getPersonInfo.formInfo.totalMondatoryPay"
                  :disabled="true"
                  @blur="saveChange('isMonthlyExpensesSaved')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-divider style="margin: 8px 0 24px 0" />
      <el-col style="padding: 0" :span="24">
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="100px"
          class="budget-information-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Среднемесячный доход">
                <el-input
                  class="el-form-input"
                  v-model="getPersonInfo.formInfo.avarageIncome"
                  :disabled="true"
                  @blur="saveChange('isMonthlyExpensesSaved')"
                />
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <el-form-item label="Порядок получения заработной платы">
                <el-select
                  v-model="getPersonInfo.formInfo.obtainingWage"
                  placeholder="Выбрать"
                  class="el-form-input"
                  @blur="saveChange('isMonthlyExpensesSaved')"
                >
                  <el-option
                    v-for="item in getTypesOfObtainingWage"
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

    <customer-information-buttons
      class="budget-information-buttons"
      @back="back"
      @next="next"
    />
  </div>
</template>

<script>
import CustomerInformationSteps from '@/components/CustomerInformationLayout/CustomerInformationSteps/CustomerInformationSteps';
import CustomerInformationHeader from '@/components/CustomerInformationLayout/CustomerInformationHeader/CustomerInformationHeader';
import CustomerInformationButtons from '@/components/CustomerInformationLayout/CustomerInformationButtons/CustomerInformationButtons';
import { mapGetters } from 'vuex';
import SvgSprite from '../../SvgSprite/SvgSprite';
import IncomeTaxTables from '@/components/CustomerInformationLayout/BudgetInformation/IncomeTaxTables/IncomeTaxTables';

export default {
  name: 'BudgetInformation',
  components: {
    SvgSprite,
    IncomeTaxTables,
    CustomerInformationSteps,
    CustomerInformationHeader,
    CustomerInformationButtons,
  },
  computed: {
    ...mapGetters([
      'getPersonInfo',
      'getTypesOfDocIncome',
      'getTypesOfDocCombIncome',
      'getTypesOfObtainingWage',
      'getChangeableSection',
    ]),
    showIncomeTaxTables() {
      return [
        'TYPE.DOC.INCOME.TAX',
        'TYPE.DOC.INCOME.TAX2',
        'TYPE.DOC.DVB',
      ].includes(this.getPersonInfo.formInfo.typeDocIncome);
    },
    showCombIncomeTaxTables() {
      return [
        'TYPE.DOC.COMB.INCOME.TAX',
        'TYPE.DOC.COMB.INCOME.TAX2',
        'TYPE.DOC.COMB.DBO',
      ].includes(this.getPersonInfo.formInfo.typeDocCombIncome);
    },
  },
  watch: {
    'getPersonInfo.formInfo.incomeMain'() {
      this.changeTotalMonthIncome();
    },
    'getPersonInfo.formInfo.incomePrtTime'() {
      this.changeTotalMonthIncome();
    },
  },
  methods: {
    saveChange(sectionName) {
      this.$store.dispatch('setChangeableSection', sectionName);
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
    },
    changeTotalMonthIncome() {
      this.getPersonInfo.formInfo.totalMonthIncome =
        Number(this.getPersonInfo.formInfo.incomeMain) +
        Number(this.getPersonInfo.formInfo.incomePension) +
        Number(this.getPersonInfo.formInfo.incomePrtTime) +
        Number(this.getPersonInfo.formInfo.incomeOther);

      this.changeAvarageIncome();
    },
    changeTotalMondatoryPay() {
      this.getPersonInfo.formInfo.totalMondatoryPay = Number(
        this.getPersonInfo.formInfo.payAlimony,
      );

      this.changeAvarageIncome();
    },
    changeAvarageIncome() {
      this.getPersonInfo.formInfo.avarageIncome =
        this.getPersonInfo.formInfo.totalMonthIncome +
        this.getPersonInfo.formInfo.totalMondatoryPay;
    },
    back() {
      this.$router.push({ name: 'customerEmployment' });
    },
    next() {
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
      this.$router.push({ name: 'customerCredits' });
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

.budget-information-buttons {
  padding-top: 20px;
}

.el-budget-information-header {
  font-style: normal;
  font-size: 20px;
  color: #333333;
}

.el-form-input {
  max-width: 500px;
  width: 100%;
}

.el-form-item {
  margin-right: 20px;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

@media screen and (max-width: 720px) {
  .el-budget-information-header {
    font-size: 14px;
  }

  .budget-information-body {
    margin-left: 0 !important;
  }

  .el-form-input {
    max-width: 100%;
    width: 100%;
  }

  .el-row {
    flex-direction: column;
    width: 100%;
  }

  .el-col {
    max-width: 100%;
    width: 100%;
    padding: 0 !important;
  }
}
</style>
