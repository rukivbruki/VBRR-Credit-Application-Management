<template>
  <div class="el-consumer-request-container">
    <el-divider content-position="left">
      <h2 class="el-consumer-request-header">Идентификация персоны</h2>
    </el-divider>
    <div class="el-consumer-request-warning">
      <p class="el-consumer-request-warning-text">
        ВАЖНО! Перед поиском клиента проверить персональные данные в Террасофте,
        передать данные в Афину. Исправления в Егаре заблокированы.
      </p>
    </div>
    <PersonalDataForms />
    <TableWithPersonalData
      :isSelectBtnClicked="isSelectBtnClicked"
      @select-person-id="selectedPersonId = $event"
    />
    <router-link
      class="el-link-inBtn"
      :to="`/consumer-request/${selectedPersonId}/info`"
    >
      <el-button v-if="getCroppedPersonList.length > 0" @click="selectBtnClick"
        >Выбрать
      </el-button>
    </router-link>
  </div>
</template>
<script>
import PersonalDataForms from '../PersonalDataForms/PersonalDataForms';
import TableWithPersonalData from '../TableWithPersonalData/TableWithPersonalData';
import { mapGetters } from 'vuex';

export default {
  name: 'ConsumerRequest',
  components: { PersonalDataForms, TableWithPersonalData },
  data() {
    return {
      isSelectBtnClicked: false,
      selectedPersonId: null,
    };
  },
  computed: mapGetters(['getCroppedPersonList']),
  methods: {
    selectBtnClick() {
      this.isSelectBtnClicked = true;
      setTimeout(() => (this.isSelectBtnClicked = false), 1000);
    },
  },
};
</script>

<style scoped>
.el-consumer-request-container {
  margin: 35px;
}

.el-consumer-request-header {
  font-style: normal;
  font-size: 20px;
  color: #333333;
}

.el-consumer-request-warning {
  display: none;
  background-color: rgb(255, 211, 0);
  margin-top: 5px;
  padding: 4px 4px 4px 20px;
}

.el-consumer-request-warning-text {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
}

.el-button {
  background-color: rgb(255, 211, 0);
  margin-bottom: 20px;
}

.el-link-inBtn {
  text-decoration: none;
  color: #606266;
}
</style>
