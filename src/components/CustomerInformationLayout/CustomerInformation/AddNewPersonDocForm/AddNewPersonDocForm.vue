<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    @edit="tabClose"
    @tab-click="changeTab"
  >
    <el-tab-pane
      v-for="item in paperListForTabs"
      :key="item.id"
      :label="typesOfDocument[item.paper.paperType]"
      :name="item.id"
      closable
    >
      <person-document-form
        @isPersonDocValid="isPersonDocValid"
        :item="item.paper"
        :id="item.id"
        @update-paper="updatePaper"
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
                v-for="item in filteredTypesOfDocumentList"
                :key="item.code"
                @click="addPaper(item.code)"
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
import PersonDocumentForm from '../DocumentForm/PersonDocumentForm';

export default {
  name: 'AddNewPersonDocForm',
  components: {
    PersonDocumentForm,
  },
  props: {
    paperList: Array,
  },
  data() {
    return {
      editableTabsValue: null,
      tabIndex: 0,
      documentsValidation: [],
      lastAddedPersonDocIndex: null,
    };
  },
  computed: {
    ...mapGetters(['getTypesOfDocuments']),
    typesOfDocument() {
      const types = {};
      this.getTypesOfDocuments.forEach((type) => {
        types[type.code] = type.name;
      });
      return types;
    },
    filteredTypesOfDocumentList() {
      return this.getTypesOfDocuments.filter(
        (item) =>
          !this.paperList.find((paper) => paper.paperType === item.code),
      );
    },
    paperListForTabs() {
      return this.paperList.map((item) => {
        return {
          id: String(this.tabIndex++),
          paper: item,
        };
      });
    },
  },
  watch: {
    paperListForTabs: {
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
    isPersonDocValid(paperValidation) {
      let index = this.documentsValidation.findIndex(
        (item) => item.id === paperValidation.id,
      );
      if (index === -1) {
        this.documentsValidation.push(paperValidation);
        this.lastAddedPersonDocIndex = this.documentsValidation.length - 1;
      } else {
        this.documentsValidation[index] = paperValidation;
        this.lastAddedPersonDocIndex = index;
      }
      this.$emit('submitPersonDocValue', this.checkValidationOfAllDocs());
    },
    checkValidationOfAllDocs() {
      let result = true;
      for (let key in this.documentsValidation) {
        result = result && this.documentsValidation[key].isValid;
      }
      return result;
    },
    tabClose(targetName) {
      const paper = this.paperListForTabs.find(
        (item) => item.id === targetName,
      ).paper;
      this.$emit('delete-paper', paper);
    },
    changeTab(clickedTab) {
      this.editableTabsValue = clickedTab.props.name;
    },
    updatePaper(newPaper) {
      const oldPaper = this.paperList.find(
        (item) => item.paperType === newPaper.paperType,
      );

      Object.keys(newPaper).forEach((key) => {
        oldPaper[key] = newPaper[key];
      });
    },
    addPaper(type) {
      this.$emit('add-paper', type);
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
