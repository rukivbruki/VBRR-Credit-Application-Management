<template>
  <div>
    <el-table
      ref="singleTable"
      :data="creditList"
      highlight-current-row
      stripe
      border
      empty-text="Данные отсутствуют"
    >
      <el-table-column
        v-for="{ label, prop } of headers"
        :key="label"
        :label="label"
      >
        <template #default="{ row }">
          <div v-if="!row.editMode">{{ getColumnValue(row, prop) }}</div>
          <div v-else>
            <el-select
              v-if="prop === 'typeCredit'"
              v-model="row[prop]"
              :placeholder="label"
              style="width: 100%"
            >
              <el-option
                v-for="item in getTypesOfLiability"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
            <el-select
              v-else-if="prop === 'currency'"
              v-model="row[prop]"
              :placeholder="label"
              style="width: 100%"
            >
              <el-option
                v-for="item in getTypesOfCurrency"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
            <el-select
              v-else-if="prop === 'isOwn'"
              v-model="row[prop]"
              :placeholder="label"
              style="width: 100%"
            >
              <el-option
                v-for="item in getTypesOfIsOwn"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
            <el-date-picker
              v-else-if="prop === 'startDate'"
              type="date"
              v-model="row[prop]"
              value-format="DD.MM.YYYY"
              format="DD.MM.YYYY"
              style="width: 100%"
            />
            <el-input
              v-else
              class="el-form-input"
              v-model="row[prop]"
              :placeholder="label"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Действия" width="100">
        <template #default="{ row, $index }">
          <div
            v-if="!row.editMode"
            style="display: flex; justify-content: space-evenly"
          >
            <el-icon :size="18" @click.prevent="editRow(row)">
              <edit />
            </el-icon>
            <el-icon :size="18" @click.prevent="deleteRow($index)">
              <delete />
            </el-icon>
          </div>
          <div v-else style="display: flex; justify-content: space-evenly">
            <el-icon :size="18" @click.prevent="saveRow($index, row)">
              <check />
            </el-icon>
            <el-icon :size="18" @click.prevent="cancelEditRow($index, row)">
              <close />
            </el-icon>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="button">
      <el-button class="el-button-bottom-small" @click="addRow">
        Добавить
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Edit } from '@element-plus/icons';
import { Check } from '@element-plus/icons';
import { Close } from '@element-plus/icons';
import { Delete } from '@element-plus/icons';

export default {
  name: 'CreditTable',
  components: { Edit, Check, Close, Delete },
  props: {
    isRefinancing: {
      type: Boolean,
      default: false,
    },
    list: Array,
    isEditRow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headerList: [
        {
          label: 'Виды обязательств (Действующие кредиты)',
          prop: 'typeCredit',
          show: true,
        },
        {
          label: 'Лимит',
          prop: 'limit',
          show: true,
        },
        {
          label: 'Оставшаяся для погашения сумма',
          prop: 'balanceDebt',
          show: true,
        },
        {
          label: 'Ежемесячная сумма',
          prop: 'repayAmountMonth',
          show: !this.isRefinancing,
        },
        {
          label: 'Валюта',
          prop: 'currency',
          show: !this.isRefinancing,
        },
        {
          label: 'Номер договора',
          prop: 'agreementNumber',
          show: this.isRefinancing,
        },
        {
          label: this.isRefinancing ? 'Дата договора' : 'Дата получения',
          prop: 'startDate',
          show: true,
        },
        {
          label: 'Свой(ВБРР)/чужой(не ВБРР)',
          prop: 'isOwn',
          show: this.isRefinancing,
        },
        {
          label: 'Компания/Банк предоставившая кредит',
          prop: 'creditOrganization',
          show: true,
        },
        {
          label: 'Кредитные каникулы по закону ( 1 = Да, 0 = Нет )',
          prop: 'term',
          show: this.isRefinancing,
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'getPersonInfo',
      'getTypesOfLiability',
      'getTypesOfCurrency',
      'getTypesOfIsOwn',
    ]),
    headers() {
      return this.headerList.filter((header) => header.show);
    },
    creditList() {
      let result = this.list.map((item) => {
        return { ...item, editMode: false };
      });

      if (this.isEditRow) {
        result[result.length - 1].editMode = true;
      }

      return result;
    },
  },
  methods: {
    getColumnValue(row, prop) {
      if (['typeCredit', 'currency', 'isOwn'].includes(prop)) {
        const type = this.getDictionaryByCode(prop).find(
          (item) => item.code === row[prop],
        );
        return type ? type.name : '';
      }

      return row[prop];
    },
    getDictionaryByCode(code) {
      return code === 'typeCredit'
        ? this.getTypesOfLiability
        : code === 'currency'
        ? this.getTypesOfCurrency
        : this.getTypesOfIsOwn;
    },
    editRow(row) {
      row.editMode = true;
    },
    cancelEditRow(index, row) {
      const creditItem = this.list[index];

      for (let key in creditItem) {
        row[key] = creditItem[key];
      }
      row.editMode = false;
      this.$emit('check-edit', this.isRefinancing, false);
    },
    saveRow(index, row) {
      row.editMode = false;
      const creditItem = this.list[index];
      for (let key in creditItem) {
        creditItem[key] = row[key];
      }
      this.$emit('check-edit', this.isRefinancing, false);
    },
    deleteRow(index) {
      this.$emit('delete-row', index, this.isRefinancing);
    },
    addRow() {
      this.$emit('add-row', this.isRefinancing);
    },
  },
};
</script>

<style scoped>
.button {
  margin: 10px 0 20px;
}

.el-table {
  width: calc(100% - 40px);
}

.el-icon {
  cursor: pointer;
}

@media screen and (max-width: 720px) {
  .el-table {
    width: 100%;
    margin-left: 0;
  }

  .button {
    margin: 10px 0;
  }
}
</style>
