<template>
  <div class="income-tax-tables">
    <income-tax-table
      v-if="showIncomeTaxTable"
      :type="typeIncome"
      :percent="isMonth ? 0 : 13"
      :is-month="isMonth"
      @setAverage="setAverage"
      @changeInTable="changeData"
      title="Сведения о заработанной плате по форме справки 2-НДФЛ/выписки из ДВБ (ставка подоходного налога 13%)"
    />
    <income-tax-table
      v-if="showIncome15TaxTable"
      :type="typeIncome15"
      :percent="15"
      @setAverage="setAverage15"
      @changeInTable="changeData"
      title="Сведения о заработанной плате по форме справки 2-НДФЛ/выписки из ДВБ (ставка подоходного налога 15%)"
    />
  </div>
</template>

<script>
import IncomeTaxTable from '@/components/CustomerInformationLayout/BudgetInformation/IncomeTaxTable/IncomeTaxTable';
import { mapGetters } from 'vuex';

export default {
  name: 'IncomeTaxTables',
  components: { IncomeTaxTable },
  props: {
    type: String,
  },
  data() {
    return {
      averageIncome: 0,
      averageCombIncome: 0,
      averageIncome15: 0,
      averageCombIncome15: 0,
    };
  },
  computed: {
    ...mapGetters(['getPersonInfo']),
    typeIncome() {
      if (['TYPE.DOC.INCOME.TAX', 'TYPE.DOC.DVB'].includes(this.type)) {
        return 'incomeTax';
      }

      return 'combIncomeTax';
    },
    typeIncome15() {
      return 'TYPE.DOC.INCOME.TAX2' === this.type
        ? 'income15Tax'
        : 'combIncome15Tax';
    },
    showIncomeTaxTable() {
      return (
        this.isMonth ||
        [
          'TYPE.DOC.INCOME.TAX',
          'TYPE.DOC.COMB.INCOME.TAX',
          'TYPE.DOC.INCOME.TAX2',
          'TYPE.DOC.COMB.INCOME.TAX2',
        ].includes(this.type)
      );
    },
    showIncome15TaxTable() {
      return ['TYPE.DOC.INCOME.TAX2', 'TYPE.DOC.COMB.INCOME.TAX2'].includes(
        this.type,
      );
    },
    isMonth() {
      return ['TYPE.DOC.DVB', 'TYPE.DOC.COMB.DBO'].includes(this.type);
    },
    averageForIncomeMain() {
      return this.showIncome15TaxTable
        ? this.averageIncome + this.averageIncome15
        : this.averageIncome;
    },
    averageForPrtTime() {
      return this.showIncome15TaxTable
        ? this.averageCombIncome + this.averageCombIncome15
        : this.averageCombIncome;
    },
    // totalAverage() {
    //   return this.showIncome15TaxTable
    //     ? this.averageIncome +
    //         this.averageIncome15 +
    //         this.averageCombIncome +
    //         this.averageCombIncome15
    //     : this.averageIncome + this.averageCombIncome;
    // },
  },
  watch: {
    averageForIncomeMain(newVal) {
      this.getPersonInfo.formInfo.incomeMain = newVal;
    },
    averageForPrtTime(newVal) {
      this.getPersonInfo.formInfo.incomePrtTime = newVal;
    },
    // totalAverage(newVal) {
    //   this.getPersonInfo.formInfo.totalMonthIncome = newVal;
    //   this.getPersonInfo.formInfo.avarageIncome = newVal;
    // },
  },
  methods: {
    changeData() {
      this.$emit('changeInTable');
    },
    setAverage(value) {
      this.typeIncome === 'incomeTax'
        ? (this.averageIncome = value)
        : (this.averageCombIncome = value);
    },
    setAverage15(value) {
      this.typeIncome15 === 'income15Tax'
        ? (this.averageIncome15 = value)
        : (this.averageCombIncome15 = value);
    },
  },
};
</script>

<style scoped>
.income-tax-tables {
  margin-bottom: 20px;
}
</style>
