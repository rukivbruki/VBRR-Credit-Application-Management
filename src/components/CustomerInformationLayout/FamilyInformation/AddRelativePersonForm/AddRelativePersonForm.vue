<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    @edit="tabClose"
    @tab-click="changeTab"
  >
    <el-tab-pane
      v-for="item in relativePersonListForTabs"
      :key="item.id"
      :label="typesOfRelative[item.relativePerson.relationType]"
      :name="item.id"
      closable
    >
      <relative-person-form
        :item="item.relativePerson"
        @update-relative-person="updateRelativePerson"
      />
    </el-tab-pane>
    <el-tab-pane name="addNewForm" disabled>
      <template #label>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-plus" />
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in getTypesOfRelative"
                :key="item.code"
                @click="addRelativePerson(item.code)"
                >{{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters } from 'vuex';
import RelativePersonForm from '@/components/CustomerInformationLayout/FamilyInformation/RelativePersonForm/RelativePersonForm';

export default {
  name: 'AddRelativePersonForm',
  components: { RelativePersonForm },
  props: {
    relativePersonList: Array,
  },
  data() {
    return {
      editableTabsValue: null,
      tabIndex: 0,
    };
  },
  computed: {
    ...mapGetters(['getTypesOfRelative']),
    typesOfRelative() {
      const types = {};
      this.getTypesOfRelative.forEach((type) => {
        types[type.code] = type.name;
      });
      return types;
    },
    relativePersonListForTabs() {
      return this.relativePersonList.map((item) => {
        return {
          id: String(this.tabIndex++),
          relativePerson: item,
        };
      });
    },
  },
  watch: {
    relativePersonListForTabs: {
      handler(newVal) {
        if (newVal && newVal.length) {
          this.editableTabsValue =
            this.editableTabsValue === null
              ? newVal[0].id
              : newVal[newVal.length - 1].id;
        }
      },
      immediate: true,
    },
  },
  methods: {
    tabClose(targetName) {
      const relativePerson = this.relativePersonListForTabs.find(
        (item) => item.id === targetName,
      ).relativePerson;
      this.$emit('delete-relative-person', relativePerson);
    },
    changeTab(clickedTab) {
      this.editableTabsValue = clickedTab.props.name;
    },
    updateRelativePerson(newRelativePerson) {
      const oldRelativePerson = this.relativePersonList.find(
        (item) => item.paperType === newRelativePerson.paperType,
      );

      Object.keys(newRelativePerson).forEach((key) => {
        oldRelativePerson[key] = newRelativePerson[key];
      });
    },
    addRelativePerson(type) {
      this.$emit('add-relative-person', type);
    },
  },
};
</script>

<style scoped>
::v-deep .is-disabled {
  cursor: pointer;
}

@media screen and (max-width: 720px) {
  ::v-deep .el-tabs__nav.is-top {
    flex-direction: column;
    width: 100%;
  }
}
</style>
