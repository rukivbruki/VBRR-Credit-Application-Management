<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      :model="getPersonInfo"
      label-width="100px"
      class="employment-information-body"
    >
      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="8">
          <el-form-item label="Занятость">
            <el-select
              v-model="getPersonInfo.formInfo.combEmploymentType"
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
          <el-form-item label="Наименование работодателя по совместительству">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.nameCompPart"
            />
          </el-form-item>
          <el-form-item label="Адрес компании">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.companyCombiningAddress"
            />
          </el-form-item>
          <el-form-item label="Отраслевая принадлежность">
            <el-select
              v-model="getPersonInfo.formInfo.combSphereWork"
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
          <el-form-item label="Должность по совместительству">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.positionPart"
            />
          </el-form-item>
        </el-col>

        <el-col style="padding: 0 0 0 40px" :span="colSpan">
          <el-form-item label="ИНН работодателя по совместительству">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.innName"
            />
          </el-form-item>
          <el-form-item label="Телефон работодателя по совместительству">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.formInfo.innName"
            />
          </el-form-item>
          <el-form-item
            label="Стаж на работе по совместительству"
            class="el-form-input composite-field"
          >
            <el-form-item
              label="лет"
              class="right-label"
              style="margin-right: 10px"
            >
              <el-input
                v-model="smplSeniorityComp.year"
                @change="changeSmplSeniorityComp"
              />
            </el-form-item>
            <el-form-item label="месяцев" class="right-label">
              <el-input
                v-model="smplSeniorityComp.month"
                @change="changeSmplSeniorityComp"
              />
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PartTimeJobForm',
  data() {
    return {
      smplSeniorityComp: {
        year: '',
        month: '',
      },
      colSpan: 8,
    };
  },
  beforeMount() {
    this.prepareSmplSeniorityComp();
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
    ]),
  },
  watch: {
    getPersonInfo() {
      this.prepareSmplSeniorityComp();
    },
  },
  methods: {
    saveChange() {
      this.$emit('selectChange');
    },
    prepareSmplSeniorityComp() {
      this.smplSeniorityComp.year = this.getPersonInfo.formInfo
        .smplSeniorityComp
        ? Math.floor(this.getPersonInfo.formInfo.smplSeniorityComp / 12)
        : 0;
      this.smplSeniorityComp.month = this.getPersonInfo.formInfo
        .smplSeniorityComp
        ? this.getPersonInfo.formInfo.smplSeniorityComp % 12
        : 0;
    },
    changeSmplSeniorityComp() {
      this.getPersonInfo.formInfo.smplSeniorityComp =
        this.smplSeniorityComp.year * 12 + this.smplSeniorityComp.month;
    },
    resizeOfWindow() {
      this.colSpan = window.innerWidth < 1100 ? 16 : 8;
    },
  },
};
</script>

<style scoped>
.el-form-input {
  width: 100%;
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
