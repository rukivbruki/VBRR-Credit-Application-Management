<template>
  <el-row
    class="customer-info-header"
    style="margin-left: -30px; margin-right: -30px"
    :gutter="20"
  >
    <el-col :span="6">
      <p class="customer-info-header-item">
        Фамилия: {{ getPersonInfo.personInfo.lastName }}
      </p>
      <p class="customer-info-header-item">
        Имя: {{ getPersonInfo.personInfo.firstName }}
      </p>
      <p class="customer-info-header-item">
        Отчество: {{ getPersonInfo.personInfo.middleName }}
      </p>
    </el-col>
    <el-col :span="16">
      <p class="customer-info-header-item">
        Дата рождения: {{ getPersonInfo.personInfo.birthDay }}
      </p>
      <p class="customer-info-header-item">
        Серия: {{ mainDocument.paperSeries }}
      </p>
      <p class="customer-info-header-item">
        Номер: {{ mainDocument.paperNumber }}
      </p>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerInformationHeader',
  computed: {
    ...mapGetters(['getPersonInfo']),
    mainDocument() {
      let passport = null;

      if (this.getPersonInfo.personInfo.paperList.length > 0) {
        passport = this.getPersonInfo.personInfo.paperList.find(
          (item) => item.main,
        );
      }

      return passport ? passport : { paperSeries: '', paperNumber: '' };
    },
  },
};
</script>
<style scoped>
.customer-info-header {
  font-size: 14px;
  color: #606266;
}

.customer-info-header > div {
  padding: 0;
}

@media screen and (max-width: 720px) {
  .customer-info-header {
    margin-top: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .customer-info-header > div {
    max-width: 100%;
  }

  .customer-info-header-item {
    margin: 0 0 10px 0;
  }
}
</style>
