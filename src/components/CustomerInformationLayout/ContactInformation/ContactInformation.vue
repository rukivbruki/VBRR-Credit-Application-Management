<template>
  <div>
    <customer-information-steps :active="2" />

    <!-- БЛОК ИНОФРМАЦИИ О ПОЛЬЗОВАТЕЛЕ -->
    <customer-information-header class="contact-information-body" />

    <!-- ДАННЫЕ ДЛЯ СВЯЗИ -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-contact-information-header">Данные для связи</h2>
          <transition name="fade">
            <el-tag
              v-if="getChangeableSection === 'idDataForCommunicationSaved'"
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
        </el-divider>
        <el-form
          ref="form"
          label-position="left"
          :model="getPersonInfo"
          label-width="100px"
          class="contact-information-body"
        >
          <el-form-item label="E-mail">
            <el-input
              class="el-form-input"
              v-model="getPersonInfo.personInfo.email"
              @blur="saveChange('idDataForCommunicationSaved')"
            />
          </el-form-item>
        </el-form>
        <el-table
          ref="singleTable"
          :data="phoneList"
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
                <el-select
                  v-if="prop === 'phoneType'"
                  v-model="row[prop]"
                  :placeholder="label"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in getTypesOfPhone"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
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
      </el-col>
    </el-row>

    <!-- СОГЛАСИЕ НА ИНФОРМИРОВАНИЕ ПУТЕМ ОСУЩЕСТВЛЕНИЯ ПРЯМЫХ КОНТАКТОВ С ПРИМЕНЕНИЕМ СРЕДСТВ СВЯЗИ -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 20px 0" :span="6">
        <el-checkbox
          v-model="getPersonInfo.personInfo.agreeToInform"
          label="Согласие на информирование участника с применением средств связи"
          class="contact-information-body"
          style="padding-bottom: 20px"
          @change="saveChange('idDataForCommunicationSaved')"
        />
      </el-col>
    </el-row>

    <!-- АДРЕСА -->
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="24">
        <el-divider content-position="left">
          <h2 class="el-contact-information-header">Адреса</h2>
          <transition name="fade">
            <el-tag
              v-if="getChangeableSection === 'isAddressDataSaved'"
              class="tag-margin"
              type="success"
            >
              Изменения сохранены
            </el-tag>
          </transition>
        </el-divider>
        <person-addresses
          @change="saveChange('isAddressDataSaved')"
          class="contact-information-body"
        />
      </el-col>
    </el-row>

    <customer-information-buttons @back="back" @next="next" />
  </div>
</template>

<script>
import CustomerInformationSteps from '@/components/CustomerInformationLayout/CustomerInformationSteps/CustomerInformationSteps';
import CustomerInformationButtons from '@/components/CustomerInformationLayout/CustomerInformationButtons/CustomerInformationButtons';
import { mapGetters } from 'vuex';
import PersonAddresses from '@/components/CustomerInformationLayout/ContactInformation/PersonAddresses/PersonAddresses';
import { Edit } from '@element-plus/icons';
import { Check } from '@element-plus/icons';
import { Close } from '@element-plus/icons';
import { Delete } from '@element-plus/icons';
import CustomerInformationHeader from '@/components/CustomerInformationLayout/CustomerInformationHeader/CustomerInformationHeader';

export default {
  name: 'ContactInformation',
  components: {
    CustomerInformationHeader,
    PersonAddresses,
    CustomerInformationSteps,
    CustomerInformationButtons,
    Edit,
    Check,
    Close,
    Delete,
  },
  data() {
    return {
      headerList: [
        {
          label: 'Тип телефона',
          prop: 'phoneType',
        },
        {
          label: 'Номер телефона',
          prop: 'phoneNumber',
        },
        {
          label: 'Добавочный номер',
          prop: 'extPhone',
        },
        {
          label: 'Комментарий',
          prop: 'description',
        },
      ],
      isAgree: false,
    };
  },
  computed: {
    ...mapGetters(['getPersonInfo', 'getTypesOfPhone', 'getChangeableSection']),
    phoneList() {
      return this.getPersonInfo.personInfo.phoneList.map((item) => {
        return { ...item, editMode: false };
      });
    },
  },
  methods: {
    saveChange(sectionName) {
      this.$store.dispatch('setChangeableSection', sectionName);
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
    },
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
      const phoneItem = this.getPersonInfo.personInfo.phoneList[index];
      for (let key in phoneItem) {
        row[key] = phoneItem[key];
      }
      row.editMode = false;
    },
    saveRow(index, row) {
      this.saveChange('idDataForCommunicationSaved');
      row.editMode = false;
      const phoneItem = this.getPersonInfo.personInfo.phoneList[index];
      for (let key in phoneItem) {
        phoneItem[key] = row[key];
      }
    },
    deleteRow(index) {
      this.saveChange('idDataForCommunicationSaved');
      this.getPersonInfo.personInfo.phoneList.splice(index, 1);
    },
    addRow() {
      this.getPersonInfo.personInfo.phoneList.push({
        personId: this.getPersonInfo.personInfo.personId,
        phoneType: '',
        phoneNumber: '',
        extPhone: '',
        description: '',
      });
      this.phoneList[this.phoneList.length - 1].editMode = true;
    },
    back() {
      this.$router.push({
        name: 'customerInfo',
      });
    },
    next() {
      this.$store.dispatch('sendPersonData', this.getPersonInfo);
      this.$router.push({
        name: 'customerFamily',
      });
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

.el-contact-information-header {
  font-style: normal;
  font-size: 20px;
  color: #333333;
}

.tag-margin {
  margin: 10px;
}

.el-form-input {
  width: 300px;
}

.el-table {
  width: calc(100% - 40px);
}

.button {
  margin: 20px 0 20px;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 5px 0;
  line-height: normal;
}

.el-icon {
  cursor: pointer;
}

@media screen and (max-width: 720px) {
  .el-contact-information-header {
    font-size: 14px;
  }

  .long-text {
    margin: 48px 0;
  }

  .contact-information-body {
    margin-left: 0 !important;
  }

  .el-form-input {
    width: 100%;
  }

  .el-checkbox {
    margin-top: 0;
  }

  .el-table {
    width: 100%;
  }

  .button {
    margin: 10px 0;
  }

  .el-row {
    flex-direction: column;
    width: 100%;
  }
}
</style>
