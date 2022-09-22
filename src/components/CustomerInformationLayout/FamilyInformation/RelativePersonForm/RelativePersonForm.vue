<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      :model="relativePerson"
      label-width="170px"
      style="padding-top: 20px"
    >
      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Фамилия">
            <el-input
              class="el-form-input"
              v-model="relativePerson.person.personInfo.lastName"
              :disabled="disabledValue.lastName"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Имя">
            <el-input
              class="el-form-input"
              v-model="relativePerson.person.personInfo.firstName"
              :disabled="disabledValue.firstName"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Отчество">
            <el-input
              class="el-form-input"
              v-model="relativePerson.person.personInfo.middleName"
              :disabled="disabledValue.middleName"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Дата рождения">
            <el-date-picker
              type="date"
              v-model="relativePerson.person.personInfo.birthDay"
              :disabled="disabledValue.birthDay"
              value-format="DD.MM.YYYY"
              format="DD.MM.YYYY"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 0" :gutter="20">
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Наименование работодателя">
            <el-input
              class="el-form-input"
              v-model="relativePerson.person.formInfo.nameComp"
              :disabled="disabledValue.nameComp"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item label="Наименование должности">
            <el-input
              class="el-form-input"
              v-model="relativePerson.person.formInfo.position"
              :disabled="disabledValue.position"
            />
          </el-form-item>
        </el-col>
        <el-col style="padding: 0" :span="6">
          <el-form-item v-if="isSpouse" label="Предыдущие ФИО">
            <el-input
              class="el-form-input"
              v-model="prevFullName"
              @change="changePrevFullName"
              :disabled="disabledValue.prevFullName"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin: 0" :gutter="20">
        <el-col v-if="isSpouse" style="padding: 0" :span="6">
          <el-form-item label="Место рождения">
            <el-input
              class="el-form-input"
              v-model="relativePerson.person.personInfo.birthdayPlace"
              :disabled="disabledValue.birthdayPlace"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="isSpouse" style="padding: 0" :span="6">
          <el-form-item label="Гражданство">
            <el-select
              v-model="relativePerson.person.personInfo.citezenship"
              placeholder="Выберете гражданство"
              class="el-form-input"
              :disabled="disabledValue.citezenship"
            >
              <el-option
                v-for="item in getTypesOfCityzenship"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="isSpouse" style="padding: 0" :span="6">
          <el-form-item label="Мобильный телефон">
            <el-input
              class="el-form-input"
              v-model="relativePerson.person.formInfo.mobilePhone"
              :disabled="disabledValue.mobilePhone"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="isSpouse" style="padding: 0" :span="6">
          <el-form-item label="Адрес регистрации">
            <el-input
              class="el-form-input"
              v-model="relativePerson.person.formInfo.registrationAddress"
              :disabled="disabledValue.registrationAddress"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-divider />

    <person-agree-form
      :person-form-info="relativePerson.person.formInfo"
      @update-person-agree="updatePersonAgree"
    />
  </div>
</template>

<script>
import PersonAgreeForm from '@/components/CustomerInformationLayout/FamilyInformation/PersonAgreeForm/PersonAgreeForm';
import { mapGetters } from 'vuex';

export default {
  name: 'RelativePersonForm',
  components: { PersonAgreeForm },
  props: {
    item: Object,
  },
  data() {
    return {
      relativePerson: this.item,
      prevFullName: '',
      disabledValue: {
        firstName: false,
        lastName: false,
        middleName: false,
        birthDay: false,
        prevFullName: false,
        nameComp: false,
        position: false,
        birthdayPlace: false,
        citezenship: false,
        mobilePhone: false,
        registrationAddress: false,
      },
    };
  },
  beforeMount() {
    this.prepareFullName();
    this.setDisabledValues();
  },
  computed: {
    ...mapGetters(['getTypesOfRelative', 'getTypesOfCityzenship']),
    typesOfRelative() {
      const types = {};
      this.getTypesOfRelative.forEach((type) => {
        types[type.code] = type.name;
      });
      return types;
    },
    isSpouse() {
      return (
        'Супруг/Супруга' ===
        this.typesOfRelative[this.relativePerson.relationType]
      );
    },
  },
  methods: {
    prepareFullName() {
      this.prevFullName =
        `${this.relativePerson.person.personInfo.prevLastName} ${this.relativePerson.person.personInfo.prevFirstName} ${this.relativePerson.person.personInfo.prevMiddleName}`.trim();
    },
    changePrevFullName() {
      [
        this.relativePerson.person.personInfo.prevLastName = '',
        this.relativePerson.person.personInfo.prevFirstName = '',
        this.relativePerson.person.personInfo.prevMiddleName = '',
      ] = this.prevFullName ? this.prevFullName.split(' ') : [];
    },
    updatePersonAgree(agreeForm) {
      for (let key in agreeForm) {
        this.relativePerson.person.formInfo[key] = agreeForm[key];
      }
    },
    setDisabledValues() {
      for (let key in this.disabledValue) {
        this.disabledValue[key] = !!this.relativePerson.person.personInfo[key];
      }
      this.disabledValue.prevFullName = !!this.prevFullName;
      this.disabledValue.mobilePhone =
        !!this.relativePerson.person.formInfo.mobilePhone;
      this.disabledValue.registrationAddress =
        !!this.relativePerson.person.formInfo.registrationAddress;
      this.disabledValue.nameComp =
        !!this.relativePerson.person.formInfo.nameComp;
      this.disabledValue.position =
        !!this.relativePerson.person.formInfo.position;
    },
  },
};
</script>

<style scoped>
.el-form-input {
  width: 100%;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

.el-form-item {
  margin-right: 20px;
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
}
</style>
