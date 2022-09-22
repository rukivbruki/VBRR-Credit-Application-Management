<template>
  <el-row style="margin: 0" :gutter="20">
    <h4 class="el-budget-information-header">
      {{ title }}
    </h4>
    <el-table :data="dataList" :show-header="false" border>
      <el-table-column v-if="!this.isMonth" prop="code" />
      <el-table-column v-for="prop of cellProps" :key="prop" :label="prop">
        <template #default="{ row, $index }">
          <el-input
            class="el-form-input"
            v-model="row[prop]"
            :disabled="
              row.code === 'Итого' || ([0, 1].includes($index) && prop !== '1')
            "
            @change="changeItem(row, prop, rows[$index])"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'IncomeTaxTable',
  props: {
    title: String,
    type: String,
    percent: Number,
    isMonth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      codes: [
        '1400',
        '2000',
        '2002',
        '2003',
        '2010',
        '2012',
        '2013',
        '2300',
        'Итого',
      ],
      cellProps: ['1', '2', '3', '4', '5', '6'],
      startYear:
        new Date().getMonth() > 5
          ? new Date().getFullYear()
          : new Date().getFullYear() - 1,
      startMonth:
        new Date().getMonth() > 5
          ? new Date().getMonth() - 6
          : new Date().getMonth() + 6,
    };
  },
  computed: {
    ...mapGetters(['getPersonInfo']),
    dataList() {
      let result = [];
      let codesIndex = 0;

      this.rows.forEach((row) => {
        let obj = {};

        if (!this.isMonth) {
          obj.code = !['Year', 'Month'].includes(row)
            ? this.codes[codesIndex++]
            : '';
        }

        for (let i = 1; i < 7; i++) {
          const key = this.generateKey(row, i);
          obj[i] = this.getValueForObj(key, row, i);
        }

        result.push(obj);
      });

      return result;
    },
    rows() {
      return this.isMonth
        ? ['Year', 'Month', 'total']
        : ['Year', 'Month', '8', '1', '2', '7', '6', '3', '4', '5', 'total'];
    },
  },
  methods: {
    generateKey(typeRow, index) {
      return typeRow === 'total'
        ? typeRow + this.type[0].toUpperCase() + this.type.slice(1) + index
        : this.type + typeRow + index;
    },
    getValueForObj(key, typeRow, index) {
      return ['Year', 'Month'].includes(typeRow) &&
        !this.getPersonInfo.formInfo[key]
        ? this.generateDate(typeRow, Number(index))
        : this.getPersonInfo.formInfo[key];
    },
    generateDate(
      type,
      index,
      startYear = this.startYear,
      startMonth = this.startMonth,
    ) {
      return type === 'Year'
        ? this.getYear(startYear, startMonth, index)
        : this.getMonth(startMonth, index);
    },
    getYear(year, month, index) {
      const numYear = Number(year);
      const numMonth = Number(month);
      const increment = Number(numYear !== this.startYear && numMonth + 6 > 12);
      const decrement = Number(numYear === this.startYear);

      return numMonth + index <= 12 && numMonth + 6 > 12
        ? numYear - decrement
        : numYear + increment;
    },
    getMonth(month, index) {
      const numMonth = Number(month);
      return numMonth + index <= 12 ? numMonth + index : numMonth + index - 12;
    },
    changeItem(row, prop, index) {
      this.$emit('changeInTable');
      ['Year', 'Month'].includes(index)
        ? this.changeDate(row, prop, index)
        : this.changeValue(row, prop, index);
    },
    changeDate(row, prop, index) {
      const year = index === 'Year' ? row[prop] : this.dataList[0][prop];
      const month = index === 'Month' ? row[prop] : this.dataList[1][prop];

      if (this.checkDate(year, month)) {
        this.getPersonInfo.formInfo[this.generateKey(index, prop)] = row[prop];
        this.fillDate(year, month - 1);
      } else {
        row[prop] = this.getValueForObj(
          this.generateKey(index, prop),
          index,
          prop,
        );
        alert(
          'Рассчитываемый временной диапазон получается больше текущего месяца.',
        );
      }
    },
    checkDate(year, month) {
      const numYear = Number(year);
      const numMonth = Number(month);

      if (numYear > this.startYear) {
        return false;
      } else if (numYear === this.startYear && numMonth > this.startMonth) {
        return false;
      }

      return true;
    },
    fillDate(year, month) {
      for (let i = 2; i < 7; i++) {
        for (let type of ['Year', 'Month']) {
          const key = this.generateKey(type, i);
          this.getPersonInfo.formInfo[key] = this.generateDate(
            type,
            i,
            year,
            month,
          );
        }
      }
    },
    changeValue(row, prop, index) {
      const key = this.generateKey(index, prop);
      this.getPersonInfo.formInfo[key] = row[prop];

      if (!this.isMonth) {
        const totalKey = this.generateKey('total', prop);
        let sum = 0;
        for (let i = 1; i < 9; i++) {
          sum += Number(this.getPersonInfo.formInfo[this.generateKey(i, prop)]);
        }
        this.getPersonInfo.formInfo[totalKey] = sum;
      }

      this.changeIncome();
    },
    changeIncome() {
      let sum = 0;
      let averageIndex = 0;
      const totalRow = this.dataList[this.dataList.length - 1];

      for (let i = 1; i < 7; i++) {
        sum += Number(totalRow[i]);
        averageIndex += Number(totalRow[i] !== 0);
      }

      const result = (sum * (1 - this.percent / 100)) / averageIndex;
      this.$emit('set-average', result);
    },
  },
};
</script>

<style scoped></style>
