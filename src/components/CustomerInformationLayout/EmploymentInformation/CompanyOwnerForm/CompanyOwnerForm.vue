<template>
  <div>
    <el-table
      ref="singleTable"
      :data="companyList"
      highlight-current-row
      stripe
      border
      empty-text="Данные отсутствуют"
      class="contact-information-body"
    >
      <el-table-column
        v-for="{ label, prop } of headerList"
        :key="label"
        :label="label"
      >
        <template #default="{ row }">
          <div v-if="!row.editMode">{{ getColumnValue(row, prop) }}</div>
          <div v-else>
            <el-input
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
  name: 'CompanyOwnerForm',
  components: { Edit, Check, Close, Delete },
  data() {
    return {
      headerList: [
        {
          label: 'Наименование компании',
          prop: 'companyName',
        },
        {
          label: 'Доля в %',
          prop: 'companyShare',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['getPersonInfo']),
    companyList() {
      return this.getPersonInfo.formInfo.companyOwnerList.map((item) => {
        return { ...item, editMode: false };
      });
    },
  },
  methods: {
    getColumnValue(row, prop) {
      if (prop === 'phoneType') {
        const type = this.getTypesOfPhone.find(
          (item) => item.code === row[prop],
        );
        return type ? type.name : '';
      }

      return row[prop];
    },
    editRow(row) {
      row.editMode = true;
    },
    cancelEditRow(index, row) {
      const companyItem = this.getPersonInfo.formInfo.companyOwnerList[index];
      for (let key in companyItem) {
        row[key] = companyItem[key];
      }
      this.checkRow(index, row);
      row.editMode = false;
    },
    saveRow(index, row) {
      this.$emit('changeRow');
      row.editMode = false;
      const companyItem = this.getPersonInfo.formInfo.companyOwnerList[index];
      for (let key in companyItem) {
        companyItem[key] = row[key];
      }
      this.checkRow(index, row);
    },
    checkRow(index, row) {
      if (!row.companyName) {
        this.getPersonInfo.formInfo.companyOwnerList.splice(index, 1);
      }
    },
    deleteRow(index) {
      this.$emit('changeRow');
      this.getPersonInfo.formInfo.companyOwnerList.splice(index, 1);
    },
    addRow() {
      this.getPersonInfo.formInfo.companyOwnerList.push({
        personId: this.getPersonInfo.personInfo.personId,
        companyName: '',
        companyShare: '',
      });
      this.companyList[this.companyList.length - 1].editMode = true;
    },
  },
};
</script>

<style scoped>
.el-table {
  width: calc(100% - 40px);
}

.button {
  margin: 10px 0 20px;
}

@media screen and (max-width: 720px) {
  .el-table {
    width: 100%;
  }

  .button {
    margin: 10px 0;
  }
}
</style>
