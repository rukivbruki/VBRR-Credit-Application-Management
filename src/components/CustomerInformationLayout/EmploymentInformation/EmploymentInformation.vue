<template>
  <div>
    <customer-information-steps :active="4" />

    <!-- БЛОК ИНОФРМАЦИИ О ПОЛЬЗОВАТЕЛЕ -->
    <customer-information-header class="employment-information-body" />

    <!-- ОСНОВНОЕ МЕСТО РАБОТЫ -->
    <el-row style="margin: 0" :gutter="20">
      <el-divider content-position="left">
        <h2 class="el-employment-information-header">Основное место работы</h2>
        <transition name="fade">
          <el-tag
            v-if="getChangeableSection === 'isMainJobPlaceChange'"
            class="tag-margin"
            type="success"
          >
            Изменения сохранены
          </el-tag>
        </transition>
      </el-divider>
    </el-row>
    <main-job-form
      @change="saveChange('isMainJobPlaceChange')"
      @selectChange="saveChange('isMainJobPlaceChange')"
      class="employment-information-body"
    />

    <!-- ДОПОЛНИТЕЛЬНЫЕ СВЕДЕНИЯ -->
    <el-row style="margin: 0" :gutter="20">
      <el-divider content-position="left">
        <h2 class="el-employment-information-header">
          Дополнительные сведения
        </h2>
        <transition name="fade">
          <el-tag
            v-if="
              getChangeableSection === 'isAdditionalInformationAboutJobChange'
            "
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
          class="employment-information-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="12">
              <el-form-item label="">
                <el-checkbox
                  v-model="getPersonInfo.formInfo.companyOwner"
                  label="Являюсь владельцем/совладельцем компании(ий)"
                  @change="saveChange('isAdditionalInformationAboutJobChange')"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <company-owner-form
            @changeRow="saveChange('isAdditionalInformationAboutJobChange')"
            v-if="getPersonInfo.formInfo.companyOwner"
          />
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 0" :span="12">
              <el-form-item label="">
                <el-checkbox
                  v-model="getPersonInfo.formInfo.selfEmployed"
                  label="Зарегистрирован в качестве Индивидуального предпринимателя"
                  @change="saveChange('isAdditionalInformationAboutJobChange')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row style="margin: 0" :gutter="20">
          <el-col style="padding: 0 0 20px 0" :span="12">
            <el-checkbox
              v-model="getPersonInfo.formInfo.compPart"
              label="Работа по совместительству"
              @change="saveChange('isAdditionalInformationAboutJobChange')"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <part-time-job-form
      v-if="getPersonInfo.formInfo.compPart"
      class="employment-information-body"
      @change="saveChange('isAdditionalInformationAboutJobChange')"
      @selectChange="saveChange('isAdditionalInformationAboutJobChange')"
    />

    <customer-information-buttons @back="back" @next="next" />
  </div>
</template>

<script>
import CustomerInformationSteps from '@/components/CustomerInformationLayout/CustomerInformationSteps/CustomerInformationSteps';
import CustomerInformationHeader from '@/components/CustomerInformationLayout/CustomerInformationHeader/CustomerInformationHeader';
import CustomerInformationButtons from '@/components/CustomerInformationLayout/CustomerInformationButtons/CustomerInformationButtons';
import { mapGetters } from 'vuex';
import MainJobForm from '@/components/CustomerInformationLayout/EmploymentInformation/MainJobForm/MainJobForm';
import PartTimeJobForm from '@/components/CustomerInformationLayout/EmploymentInformation/PartTimeJobForm/PartTimeJobForm';
import CompanyOwnerForm from '@/components/CustomerInformationLayout/EmploymentInformation/CompanyOwnerForm/CompanyOwnerForm';

export default {
  name: 'EmploymentInformation',
  components: {
    CompanyOwnerForm,
    PartTimeJobForm,
    MainJobForm,
    CustomerInformationButtons,
    CustomerInformationSteps,
    CustomerInformationHeader,
  },
  computed: {
    ...mapGetters(['getPersonInfo', 'getChangeableSection']),
  },
  methods: {
    saveChange(sectionName) {
      this.$store.dispatch('setChangeableSection', sectionName);
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
    },
    back() {
      this.$router.push({ name: 'customerFamily' });
    },
    next() {
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
      this.$router.push({ name: 'customerBudget' });
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.tag-margin {
  margin: 10px;
}

.el-employment-information-header {
  font-style: normal;
  font-size: 20px;
  color: #333333;
}

.el-form-input {
  width: 300px;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

@media screen and (max-width: 720px) {
  .el-employment-information-header {
    font-size: 14px;
  }

  .employment-information-body {
    margin-left: 0 !important;
  }

  .el-form-input {
    width: 100%;
  }
}
</style>
