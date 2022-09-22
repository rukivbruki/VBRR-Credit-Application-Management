<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      :model="getPersonInfo"
      label-width="100px"
    >
      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Тип занятости">
            <el-select
              v-model="getPersonInfo.formInfo.employmentType"
              placeholder="Выбрать"
              class="el-form-input"
              @change="saveChange"
            >
              <el-option
                v-for="item in getTypesOfEmployment"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Наименование работодателя">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.nameComp"
            >
              <template #suffix>
                <i class="el-icon-search" @click="openSearchDialog" />
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Адрес работодателя">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.companyAddress"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Телефон работодателя">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.innNameCompOsn"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Количество сотрудников в организации">
            <el-select
              v-model="getPersonInfo.formInfo.countCompany"
              placeholder="Выбрать"
              class="el-form-input"
              @change="saveChange"
            >
              <el-option
                v-for="item in getTypesOfCountCompany"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="ИНН работодателя основное место работы">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.innNameCompOsn"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider />

      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Наименование должности">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.position"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Должность">
            <el-select
              v-model="getPersonInfo.formInfo.positionLevel"
              placeholder="Выбрать"
              class="el-form-input"
              @change="saveChange"
            >
              <el-option
                v-for="item in getTypesOfPositionLevel"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Отраслевая принадлежность">
            <el-select
              v-model="getPersonInfo.formInfo.sphereWork"
              placeholder="Выбрать"
              class="el-form-input"
              @change="saveChange"
            >
              <el-option
                v-for="item in getTypesOfSphereWork"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item
            label="Общий стаж"
            class="el-form-input composite-field"
          >
            <el-form-item
              label="лет"
              class="right-label"
              style="margin-right: 10px"
            >
              <el-input
                v-model="totalPeriod.year"
                @change="changeTotalPeriod"
              />
            </el-form-item>
            <el-form-item label="месяцев" class="right-label">
              <el-input
                v-model="totalPeriod.month"
                @change="changeTotalPeriod"
              />
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item
            label="Стаж на текущем месте работы"
            class="el-form-input composite-field"
          >
            <el-form-item
              label="лет"
              class="right-label"
              style="margin-right: 10px"
            >
              <el-input
                v-model="seniorityCurrent.year"
                @change="changeSeniorityCurrent"
              />
            </el-form-item>
            <el-form-item label="месяцев" class="right-label">
              <el-input
                v-model="seniorityCurrent.month"
                @change="changeSeniorityCurrent"
              />
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider />

      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Вид договора с работодателем">
            <el-select
              v-model="getPersonInfo.formInfo.sphereWorkOrg"
              placeholder="Выбрать"
              class="el-form-input"
              @change="saveChange"
            >
              <el-option
                v-for="item in getTypesOfSphereOrgWork"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item
            label="Срочный трудовой договор"
            class="el-form-input composite-field el-form-padding"
          >
            <el-form-item
              label="c"
              class="left-label"
              style="margin-right: 10px"
            >
              <el-date-picker
                type="date"
                v-model="getPersonInfo.formInfo.urgentContractStDate"
                value-format="DD.MM.YYYY"
                format="DD.MM.YYYY"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="по" class="left-label">
              <el-date-picker
                type="date"
                v-model="getPersonInfo.formInfo.endFixedTermContrDate"
                value-format="DD.MM.YYYY"
                format="DD.MM.YYYY"
                style="width: 100%"
              />
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Сегмент">
            <el-select
              v-model="getPersonInfo.formInfo.employerCategory"
              placeholder="Выбрать"
              class="el-form-input"
              @change="saveChange"
            >
              <el-option
                v-for="item in getTypesOfCategoryClient"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item
            label="Занимает руководящую должность из списка ТОС/Иная должность для ТОП"
          >
            <el-select
              v-model="getPersonInfo.formInfo.headCount"
              placeholder="Выбрать"
              class="el-form-input"
              @change="saveChange"
            >
              <el-option
                v-for="item in getTypesOfQuantityEmployee"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col style="padding: 17px 0 0 0" :span="6">
          <el-form-item label="Тип клиента">
            <el-select
              v-model="getPersonInfo.formInfo.typeClient"
              placeholder="Выбрать"
              class="el-form-input"
              @change="saveChange"
            >
              <el-option
                v-for="item in getTypesOfTypeClient"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog
      v-model="isOpenSearchDialog"
      title="Поиск по работодателю"
      destroy-on-close
      center
      class="search-dialog"
    >
      <div>
        <div class="sub-title">Введите название или его часть:</div>
        <el-input v-model="searchInputValue" />

        <el-table
          ref="singleTable"
          :data="resultList"
          highlight-current-row
          stripe
          border
          empty-text="Данные отсутствуют"
          style="margin-top: 20px"
          @row-click="setSelectedCompany"
        >
          <el-table-column
            v-for="{ label, prop } of headerList"
            :key="label"
            :label="label"
            :prop="prop"
            sortable
          />
        </el-table>
      </div>
      <template #footer>
        <el-button @click="selectCompany"> Выбрать </el-button>
        <el-button @click="closeSearchDialog"> Отмена </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { HttpCode } from '../../../../../const.ts';

export default {
  name: 'MainJobForm',
  data() {
    return {
      totalPeriod: {
        year: '',
        month: '',
      },
      seniorityCurrent: {
        year: '',
        month: '',
      },
      isOpenSearchDialog: false,
      searchInputValue: '',
      resultList: [],
      headerList: [
        {
          label: 'Сокращенное название организации',
          prop: 'shortName',
        },
        {
          label: 'ИНН',
          prop: 'inn',
        },
        {
          label: 'Полное название организации',
          prop: 'fullName',
        },
        {
          label: 'Адрес',
          prop: 'address',
        },
      ],
      selectedCompany: null,
      colSpan: 8,
    };
  },
  beforeMount() {
    this.prepareTotalPeriod();
    this.prepareSeniorityCurrent();
    window.addEventListener('resize', this.resizeOfWindow);
    this.resizeOfWindow();
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeOfWindow);
  },
  computed: {
    ...mapGetters([
      'getPersonInfo',
      'getTypesOfEmployment',
      'getTypesOfSphereWork',
      'getTypesOfPositionLevel',
      'getTypesOfSphereOrgWork',
      'getTypesOfCategoryClient',
      'getTypesOfQuantityEmployee',
      'getTypesOfCountCompany',
      'getTypesOfTypeClient',
    ]),
  },
  watch: {
    getPersonInfo() {
      this.prepareTotalPeriod();
      this.prepareSeniorityCurrent();
    },
    searchInputValue(newVal) {
      this.$store.dispatch('getCompanyList', newVal).then((resp) => {
        if (resp.status === HttpCode.OK) {
          this.resultList = resp.data;
        }
      });
    },
  },
  methods: {
    saveChange() {
      this.$emit('selectChange');
    },
    prepareTotalPeriod() {
      this.totalPeriod.year = this.getPersonInfo.formInfo.totalPeriod
        ? Math.floor(this.getPersonInfo.formInfo.totalPeriod / 12)
        : 0;
      this.totalPeriod.month = this.getPersonInfo.formInfo.totalPeriod
        ? this.getPersonInfo.formInfo.totalPeriod % 12
        : 0;
    },
    prepareSeniorityCurrent() {
      this.seniorityCurrent.year = this.getPersonInfo.formInfo.seniorityCurrent
        ? Math.floor(this.getPersonInfo.formInfo.seniorityCurrent / 12)
        : 0;
      this.seniorityCurrent.month = this.getPersonInfo.formInfo.seniorityCurrent
        ? this.getPersonInfo.formInfo.seniorityCurrent % 12
        : 0;
    },
    changeTotalPeriod() {
      this.getPersonInfo.formInfo.totalPeriod =
        this.totalPeriod.year * 12 + this.totalPeriod.month;
    },
    changeSeniorityCurrent() {
      this.getPersonInfo.formInfo.seniorityCurrent =
        this.seniorityCurrent.year * 12 + this.seniorityCurrent.month;
    },
    openSearchDialog() {
      this.isOpenSearchDialog = true;
      this.searchInputValue = this.getPersonInfo.formInfo.nameComp;
    },
    setSelectedCompany(row) {
      this.selectedCompany = row;
    },
    selectCompany() {
      this.getPersonInfo.formInfo.nameComp = this.selectedCompany.fullName;
      this.getPersonInfo.formInfo.companyAddress = this.selectedCompany.address;
      this.closeSearchDialog();
    },
    closeSearchDialog() {
      this.isOpenSearchDialog = false;
      this.selectedCompany = null;
      this.resultList = [];
    },
    resizeOfWindow() {
      this.colSpan = window.innerWidth < 1100 ? 16 : 8;
    },
  },
};
</script>

<style scoped>
.el-row {
  align-items: end;
}

.el-form-input {
  width: 100%;
}

.el-form-item {
  margin-right: 20px;
}

.composite-field ::v-deep > .el-form-item__content {
  display: flex;
}

.right-label,
.left-label {
  display: flex;
  align-items: center;
  width: 50%;
}

.right-label {
  flex-direction: row-reverse;
}

.right-label ::v-deep .el-form-item__label {
  margin-left: 5px;
}

.left-label {
  flex-direction: row;
}

.left-label ::v-deep .el-form-item__label {
  margin-right: 5px;
}

::v-deep .el-input__suffix {
  cursor: pointer;
  right: 10px;
}

.el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

::v-deep .el-dialog__footer {
  display: flex;
  justify-content: left;
}

@media screen and (max-width: 720px) {
  .el-row {
    flex-direction: column;
    width: 100%;
  }

  .el-form-padding {
    padding-top: 0;
  }

  .el-col {
    max-width: 100%;
    width: 100%;
    padding: 0 !important;
  }

  ::v-deep .el-dialog {
    width: 90% !important;
  }
}
</style>
