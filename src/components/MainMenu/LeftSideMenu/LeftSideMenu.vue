<template>
  <el-aside>
    <el-tabs
      :tab-position="tabPosition"
      :stretch="true"
      type="border-card"
      @tab-click="tabClick"
    >
      <el-tab-pane label="Действия, пользователи, процессы" />
      <el-tab-pane label="Представления, данные, файлы" />
      <el-tab-pane label="Прочее, обслуживание, субъекты" />
      <el-tab-pane label="Кредитование, досье" />
      <el-tab-pane label="Нумерация договора" />
    </el-tabs>
  </el-aside>
</template>

<script>
import { defineComponent } from 'vue';
import './stylesForLeftSideMenu.css';

export default defineComponent({
  mounted() {
    this.clickedTabIndex = sessionStorage.getItem('clickedTabIndex');

    setTimeout(() => {
      let curTab = document.getElementById('tab-' + this.clickedTabIndex);

      this.clickedTabIndex && this.unselectTab();
      curTab.setAttribute('aria-selected', 'true');
      curTab.classList.add('is-active');
    }, 0);
  },
  methods: {
    tabClick(targetName) {
      this.$store.dispatch('changeCardsToShow', targetName.index);
      this.clickedTabIndex = targetName.index;
      sessionStorage.setItem('clickedTabIndex', targetName.index);
    },
    unselectTab() {
      const prevTab = document.getElementById('tab-0');

      prevTab.setAttribute('aria-selected', 'false');
      prevTab.classList.remove('is-active');
    },
  },
  data() {
    return {
      tabPosition: 'left',
      clickedTabIndex: 0,
    };
  },
});
</script>

<style scoped>
.el-aside {
  display: flex;
  align-content: center;
  --el-aside-width: 100%;
  color: #333;
  text-align: center;
  line-height: 1.5;
  background-color: #d3dce6;
}

.el-tabs {
  width: 100%;
}
</style>
