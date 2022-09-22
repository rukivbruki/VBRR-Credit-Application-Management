<template>
  <div>
    <customer-information-steps :active="3" />

    <!-- БЛОК ИНОФРМАЦИИ О ПОЛЬЗОВАТЕЛЕ -->
    <customer-information-header class="family-information-body" />

    <!-- СЕМЕЙНОЕ ПОЛОЖЕНИЕ -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-family-information-header">Семейное положение</h2>
          <transition name="fade">
            <el-tag
              v-if="getChangeableSection === 'isFamilyStatusChange'"
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
        </el-divider>
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="100px"
          class="family-information-body"
        >
          <el-row style="margin: 0" :gutter="20">
            <el-col style="padding: 17px 0 0 0" :span="6">
              <el-form-item label="Семейное положение">
                <el-select
                  v-model="getPersonInfo.formInfo.maritalStatus"
                  placeholder="Выбрать"
                  class="el-form-input"
                  @blur="saveChange('isFamilyStatusChange')"
                >
                  <el-option
                    v-for="item in getTypesOfFamilyStatus"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="padding: 0" :span="6">
              <div style="margin-right: 20px">
                <label class="el-form-item__label"
                  >Количество иждивенцев, на которых выплачиваются
                  алименты</label
                >
                <el-input-number
                  v-model="getPersonInfo.formInfo.countDependants"
                  :min="0"
                  style="width: 100%"
                  @change="saveChange('isFamilyStatusChange')"
                />
              </div>
            </el-col>
            <el-col style="padding: 17px 0 0 0" :span="6">
              <div style="margin-right: 20px">
                <label class="el-form-item__label">Количество иждивенцев</label>
                <el-input-number
                  v-model="getPersonInfo.formInfo.dependants"
                  :min="0"
                  style="width: 100%"
                  @change="saveChange('isFamilyStatusChange')"
                />
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <!-- ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ -->
    <el-row style="margin: 0" :gutter="20">
      <el-divider content-position="left">
        <h2 class="el-family-information-header">Дополнительная информация</h2>
        <transition name="fade">
          <el-tag
            v-if="getChangeableSection === 'isAdditionalInformationChange'"
            class="tag-margin"
            type="success"
          >
            Изменения сохранены
          </el-tag>
        </transition>
      </el-divider>
      <el-col style="padding: 0" :span="8">
        <el-form
          ref="form"
          label-position="top"
          :model="getPersonInfo"
          label-width="100px"
          class="family-information-body"
        >
          <el-form-item label="Образование">
            <el-select
              v-model="getPersonInfo.formInfo.education"
              placeholder="Выбрать"
              class="el-form-input"
              @blur="saveChange('isAdditionalInformationChange')"
            >
              <el-option
                v-for="item in getTypesOfEducation"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Отношение к воинской службе">
            <el-select
              v-model="getPersonInfo.formInfo.attitudeMilitary"
              placeholder="Выбрать"
              class="el-form-input"
              @blur="saveChange('isAdditionalInformationChange')"
            >
              <el-option
                v-for="item in getTypesOfAttitudeMilitary"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Причина освобождения">
            <el-select
              v-model="getPersonInfo.formInfo.commentary"
              placeholder="Выбрать"
              class="el-form-input"
              @blur="saveChange('isAdditionalInformationChange')"
            >
              <el-option
                v-for="item in getTypesOfMilitaryComment"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="padding: 0" :span="16">
        <person-agree-form
          :person-form-info="getPersonInfo.formInfo"
          @update-person-agree="updatePersonAgree"
        />
      </el-col>
    </el-row>

    <el-row style="margin: 0; justify-content: flex-end" :gutter="20">
      <el-col style="padding: 0" :span="16">
        <el-checkbox
          v-model="getPersonInfo.formInfo.bankrupt"
          @change="saveChange('isAdditionalInformationChange')"
          label="В течении последних 5 (пяти) лет суд признавал Вас банкротом?"
        />
      </el-col>
    </el-row>

    <!-- СВЕДЕНИЯ О БАНКРОТСТВЕ УЧАСТНИК КРЕДИТНОЙ СДЕЛКИ -->
    <el-row style="margin: 0" :gutter="20">
      <el-divider content-position="left">
        <h2 class="el-family-information-header">
          Родственники (Иждивенцы, Супруг/супруга, Родственник работает в РН).
        </h2>
        <el-tooltip
          :disabled="disabled"
          content="Не создавать, если супруг/супруга являются cозаемщиками"
          placement="top"
          effect="light"
          visible-arrow
        >
          <span>
            <svg-sprite></svg-sprite>
            <svg width="20" height="20">
              <use xlink:href="#info" />
            </svg>
          </span>
        </el-tooltip>
        <transition name="fade">
          <el-tag
            v-if="getChangeableSection === 'isRelativesInformationChange'"
            class="tag-margin"
            type="success"
          >
            Изменения сохранены
          </el-tag>
        </transition>
      </el-divider>
    </el-row>

    <add-relative-person-form
      :relative-person-list="relativePersonListForTabs"
      @add-relative-person="addRelativePerson"
      @delete-relative-person="deleteRelativePerson"
      class="family-information-body"
      style="margin-top: 20px"
      @change="saveChange('isRelativesInformationChange')"
    />

    <customer-information-buttons @back="back" @next="next" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomerInformationSteps from '@/components/CustomerInformationLayout/CustomerInformationSteps/CustomerInformationSteps';
import CustomerInformationHeader from '@/components/CustomerInformationLayout/CustomerInformationHeader/CustomerInformationHeader';
import CustomerInformationButtons from '@/components/CustomerInformationLayout/CustomerInformationButtons/CustomerInformationButtons';
import AddRelativePersonForm from '@/components/CustomerInformationLayout/FamilyInformation/AddRelativePersonForm/AddRelativePersonForm';
import { relativePersonTemplate } from '@/stabs/relativePersonTemplate';
import PersonAgreeForm from '@/components/CustomerInformationLayout/FamilyInformation/PersonAgreeForm/PersonAgreeForm';
import SvgSprite from '@/components/SvgSprite/SvgSprite';

export default {
  name: 'FamilyInformation',
  components: {
    SvgSprite,
    PersonAgreeForm,
    AddRelativePersonForm,
    CustomerInformationButtons,
    CustomerInformationSteps,
    CustomerInformationHeader,
  },
  data() {
    return {
      relativePersonListForTabs: [],
    };
  },
  beforeMount() {
    this.prepareRelativePerson();
  },
  computed: {
    ...mapGetters([
      'getPersonInfo',
      'getTypesOfFamilyStatus',
      'getTypesOfEducation',
      'getTypesOfAttitudeMilitary',
      'getTypesOfMilitaryComment',
      'getTypesOfRelative',
      'getChangeableSection',
    ]),
  },
  watch: {
    getPersonInfo(newVal) {
      if (newVal && newVal.personInfo) {
        this.prepareRelativePerson();
      }
    },
  },
  methods: {
    saveChange(sectionName) {
      this.$store.dispatch('setChangeableSection', sectionName);
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
    },
    addRelativePerson(relationType) {
      this.relativePersonListForTabs.push(
        Object.assign({}, relativePersonTemplate, {
          relativePersonId: this.getPersonInfo.personId,
          relationType: relationType,
        }),
      );
    },
    deleteRelativePerson(paper) {
      this.relativePersonListForTabs.splice(
        this.relativePersonListForTabs.indexOf(paper),
        1,
      );
    },
    prepareRelativePerson() {
      if (this.getPersonInfo.relativeList.length > 0) {
        this.relativePersonListForTabs =
          this.getPersonInfo.relativeList.length > 0
            ? this.getPersonInfo.relativeList.slice()
            : [];
      }
    },
    back() {
      this.$router.push({
        name: 'customerContacts',
      });
    },
    next() {
      this.getPersonInfo.relativeList = this.relativePersonListForTabs;

      this.$store.dispatch('sendPersonData', this.getPersonInfo);
      this.$router.push({ name: 'customerEmployment' });
    },
    updatePersonAgree(agreeForm) {
      this.saveChange('isAdditionalInformationChange');
      for (let key in agreeForm) {
        this.getPersonInfo.formInfo[key] = agreeForm[key];
      }
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

.el-family-information-header {
  font-style: normal;
  font-size: 20px;
  color: #333333;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

.el-form-input {
  width: 100%;
}

.el-form-item {
  margin-right: 20px;
}

.el-checkbox {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 720px) {
  .el-family-information-header {
    font-size: 14px;
  }

  .family-information-body {
    margin-left: 0 !important;
    width: 100%;
  }

  .el-row {
    flex-direction: column;
    width: 100%;
  }

  .el-col {
    max-width: 100%;
    width: 100%;
  }
}
</style>
