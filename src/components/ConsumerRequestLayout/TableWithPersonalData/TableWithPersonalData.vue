<template>
  <el-skeleton :loading="getIsLoadingPersonalData" animated>
    <template #template>
      <el-table :data="[{}]" border style="width: 100%">
        <el-table-column
          v-for="{ label } of headerList"
          :key="label"
          :label="label"
        >
          <template #default>
            <el-skeleton-item variant="text" />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #default>
      <el-table
        ref="singleTable"
        :data="croppedPersonList"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%; margin-top: 80px"
        stripe
        border
        empty-text="Данные отсутствуют, измените параметра поиска"
        @row-dblclick="dblClickOnTableRow"
      >
        <el-table-column
          v-for="{ label, prop } of headerList"
          :key="label"
          :property="prop"
          :label="label"
        >
          <template #header v-if="label === headerList[0].label">
            <section class="search">
              <span>{{ headerList[0].label }}</span>
              <el-input
                class="search__input"
                v-model="search"
                size="large"
                placeholder="Поиск по имени"
              />
            </section>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-skeleton>
  <Pagination :numberOfPages="this.getPersonListLength"></Pagination>
</template>

<script>
import Pagination from '../Pagination/Pagination';
import { mapGetters } from 'vuex';

export default {
  name: 'TableWithPersonalData',
  components: { Pagination },
  props: ['isSelectBtnClicked'],
  data() {
    return {
      currentRow: null,
      headerList: [
        {
          label: 'ФИО',
          prop: 'personInfo.fullName',
        },
        {
          label: 'Дата рождения',
          prop: 'personInfo.birthDay',
        },
        {
          label: 'Тип документа',
          prop: 'personInfo.paperInfo.paperTypeString',
        },
        {
          label: 'Серия документа',
          prop: 'personInfo.paperInfo.paperSeries',
        },
        {
          label: 'Номер документа',
          prop: 'personInfo.paperInfo.paperNumber',
        },
        {
          label: 'Адрес прописки',
          prop: 'personInfo.addressInfo.fullAddress',
        },
      ],
      search: '',
    };
  },
  computed: {
    ...mapGetters([
      'getCroppedPersonList',
      'getPersonListLength',
      'getIsLoadingPersonalData',
    ]),
    croppedPersonList() {
      return this.getCroppedPersonList.filter(
        (data) =>
          !this.search ||
          data.personInfo.fullName
            .toLowerCase()
            .includes(this.search.toLowerCase()),
      );
    },
  },
  methods: {
    handleCurrentChange(row) {
      this.$emit('select-person-id', row.personId);
    },
    dblClickOnTableRow(row) {
      this.$router.push({
        path: `/consumer-request/${row.personId}/info`,
      });
    },
  },
};
</script>

<style>
.search {
  display: flex;
  align-items: center;
}
.search__input {
  padding-left: 10px;
}
</style>
