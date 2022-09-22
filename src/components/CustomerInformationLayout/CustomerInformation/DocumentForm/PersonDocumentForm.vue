<template>
  <el-form
    ref="form"
    label-position="top"
    :model="passportData"
    label-width="170px"
    style="padding-top: 20px"
    @change="changeFormData"
  >
    <el-row
      v-if="showActiveCheckbox || showMainCheckbox"
      style="margin: 0 0 20px 0"
      :gutter="20"
    >
      <el-checkbox
        v-if="showActiveCheckbox"
        v-model="passportData.active"
        label="Не действует"
      />
      <el-checkbox
        v-if="showMainCheckbox"
        v-model="passportData.main"
        label="Основной документ"
      />
    </el-row>
    <el-row style="margin: 15px 0" :gutter="20">
      <el-col style="padding: 0" :span="6">
        <el-form-item class="is-required" label="Серия">
          <el-input
            :placeholder="placeHolderLabel"
            class="el-form-input"
            v-model="passportData.paperSeries"
            :disabled="disabledValue.paperSeries"
            required
            @input="
              requiredInputChange(4, passportData.paperSeries, 'paperSeries')
            "
          />
          <div v-if="!validValue.paperSeries" class="el-form-item__error">
            Серия не может быть короче 4 символов и содержать английские буквы
          </div>
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item class="is-required" label="Номер">
          <el-input
            class="el-form-input"
            v-model="passportData.paperNumber"
            :disabled="disabledValue.paperNumber"
            @input="
              requiredInputChange(4, passportData.paperNumber, 'paperNumber')
            "
          />
          <div v-if="!validValue.paperNumber" class="el-form-item__error">
            Номер не может быть короче 4 символов и содержать английские буквы
          </div>
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6" class="el-date-picker-form">
        <el-form-item class="is-required" label="Дата выдачи">
          <el-col style="padding: 0" class="el-form-input">
            <el-date-picker
              type="date"
              v-model="passportData.issueDate"
              :disabled="disabledValue.issueDate"
              style="width: 100%"
              value-format="DD.MM.YYYY"
              format="DD.MM.YYYY"
              @change="changeFormData"
            />
            <div v-if="!validValue.issueDate" class="el-form-item__error">
              Дата выдачи должна быть введена
            </div>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row style="margin: 15px 0" :gutter="20">
      <el-col style="padding: 0" :span="6">
        <el-form-item class="is-required" label="Кем выдан">
          <el-input
            class="el-form-input"
            v-model="passportData.issueDepartment"
            :disabled="disabledValue.issueDepartment"
            @input="
              requiredInputChange(
                4,
                passportData.issueDepartment,
                'issueDepartment',
              )
            "
          />
          <div v-if="!validValue.issueDepartment" class="el-form-item__error">
            Поле "Кем выдан" не может быть короче 4 символов и содержать
            английские буквы
          </div>
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item class="is-required" label="Код подразделения">
          <el-input
            class="el-form-input"
            v-model="passportData.branchCode"
            :disabled="disabledValue.branchCode"
            @input="
              requiredInputChange(4, passportData.branchCode, 'branchCode')
            "
          />
          <div v-if="!validValue.branchCode" class="el-form-item__error">
            Код подразделения не может быть короче 4 символов и содержать
            английские буквы
          </div>
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6" class="el-date-picker-form">
        <el-form-item
          class="is-required"
          v-if="showExpireDate"
          label="Действителен до"
        >
          <el-col style="padding: 0" class="el-form-input">
            <el-date-picker
              type="date"
              v-model="passportData.expireDate"
              style="width: 100%"
              value-format="DD.MM.YYYY"
              format="DD.MM.YYYY"
              @change="changeFormData"
            />
            <div v-if="!validValue.expireDate" class="el-form-item__error">
              Поле "действителен до" должно быть заполнено
            </div>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'PersonDocumentForm',
  props: {
    item: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
    },
  },
  data() {
    return {
      passportData: {
        personId: this.item.personId,
        paperType: this.item.paperType,
        paperSeries: this.item.paperSeries,
        paperNumber: this.item.paperNumber,
        issueDate: this.item.issueDate,
        issueDepartment: this.item.issueDepartment,
        expireDate: this.item.expireDate,
        branchCode: this.item.branchCode,
        active: this.item.active,
        main: this.item.main,
      },
      disabledValue: {
        paperSeries: false,
        paperNumber: false,
        issueDate: false,
        issueDepartment: false,
        branchCode: false,
      },
      validValue: {
        paperNumber: true,
        paperSeries: true,
        issueDate: true,
        issueDepartment: true,
        branchCode: true,
        expireDate: true,
      },
    };
  },
  beforeMount() {
    this.setDisabledValues();
  },
  computed: {
    isDocPassport() {
      return this.item.paperType === 'DOC.PASSPORT';
    },
    isDocOfficer() {
      return this.item.paperType === 'DOC.OFFICER';
    },
    isDocOms() {
      return this.item.paperType === 'CLIENT.DOCS.6';
    },
    isDocDriver() {
      return this.item.paperType === 'DOC.DRIVER';
    },
    isDocInsurance() {
      return this.item.paperType === 'DOC.INSURANCE';
    },
    isDocSeamanPassport() {
      return this.item.paperType === 'CLIENT.DOCS.5';
    },
    isDocInn() {
      return this.item.paperType === 'DOC.INN';
    },
    placeHolderLabel() {
      if (this.isDocOfficer || this.isDocSeamanPassport) {
        return 'русские заглавные буквы';
      } else if (this.isDocDriver) {
        return 'цифры и русские заглавные буквы: 11АА';
      }

      return '';
    },
    showActiveCheckbox() {
      return !this.isDocPassport;
    },
    showMainCheckbox() {
      return this.isDocOfficer || this.isDocSeamanPassport;
    },
    showExpireDate() {
      return !this.isDocPassport;
    },
  },
  watch: {
    passportData: {
      handler(newVal) {
        this.$emit('update-paper', newVal);
      },
      deep: true,
    },
  },
  methods: {
    // eslint-disable-next-line complexity
    allRequiredInputFilled() {
      let result;
      this.isDocPassport
        ? (result = !(
            !this.passportData.paperSeries ||
            !this.passportData.paperNumber ||
            !this.passportData.issueDate ||
            !this.passportData.issueDepartment ||
            !this.passportData.branchCode
          ))
        : (result = !(
            !this.passportData.paperSeries ||
            !this.passportData.paperNumber ||
            !this.passportData.issueDate ||
            !this.passportData.issueDepartment ||
            !this.passportData.branchCode ||
            !this.passportData.expireDate
          ));
      return result;
    },
    submitAllForms() {
      let result = true;
      for (let key in this.validValue) {
        result = result && this.validValue[key];
      }
      return result;
    },
    changeFormData() {
      if (!this.submitAllForms() || !this.allRequiredInputFilled()) {
        this.$emit('isPersonDocValid', {
          isValid: false,
          id: this.id,
        });
        return;
      }
      this.$emit('isPersonDocValid', {
        isValid: true,
        id: this.id,
      });
    },
    isEngSymbols(text) {
      return /[a-z]/i.test(text);
    },
    requiredInputChange(minLength, value, inputType) {
      this.validValue[inputType] = !(
        value === '' ||
        value.length < minLength ||
        this.isEngSymbols(value)
      );
    },
    setDisabledValues() {
      for (let key in this.disabledValue) {
        this.disabledValue[key] =
          this.isDocPassport && !!this.passportData[key];
      }
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-right: 20px;
}

.is-required > .el-form-item__label:before {
  content: '*';
  color: var(--el-color-danger);
  margin-right: 4px;
}

.el-form-input {
  width: 100%;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

@media screen and (max-width: 720px) {
  .el-row {
    flex-direction: column;
  }

  .el-col {
    max-width: 100%;
    width: 100%;
  }

  .el-form-item {
    width: 100%;
  }

  .el-date-picker-form {
    margin-bottom: 22px;
  }
}
</style>
