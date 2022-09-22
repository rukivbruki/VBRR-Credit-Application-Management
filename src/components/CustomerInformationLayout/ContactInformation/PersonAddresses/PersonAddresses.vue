<template>
  <el-tabs v-model="editableTabsValue" type="card" @tab-click="changeTab">
    <el-tab-pane
      v-for="item in getPersonInfo.personInfo.addressList"
      :key="item.addressInfoId"
      :label="typesOfAddresses[item.addressType]"
      :name="item.addressInfoId"
    >
      <person-address-form :item="item" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import PersonAddressForm from '@/components/CustomerInformationLayout/ContactInformation/PersonAddressForm/PersonAddressForm';
import { mapGetters } from 'vuex';
export default {
  name: 'PersonAddresses',
  components: { PersonAddressForm },
  data() {
    return {
      editableTabsValue: null,
    };
  },
  beforeMount() {
    this.prepareActiveTab();
  },
  computed: {
    ...mapGetters(['getPersonInfo', 'getTypesOfAddresses']),
    typesOfAddresses() {
      const types = {};
      this.getTypesOfAddresses.forEach((type) => {
        types[type.code] = type.name;
      });
      return types;
    },
  },
  watch: {
    getPersonInfo() {
      this.prepareActiveTab();
    },
  },
  methods: {
    prepareActiveTab() {
      if (
        !this.editableTabsValue &&
        this.getPersonInfo.personInfo.addressList.length
      ) {
        this.editableTabsValue =
          this.getPersonInfo.personInfo.addressList[0].addressInfoId;
      }
    },
    changeTab(clickedTab) {
      this.editableTabsValue = clickedTab.props.name;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 720px) {
  ::v-deep .el-tabs__nav.is-top {
    flex-direction: column;
    width: 100%;
  }
}
</style>
