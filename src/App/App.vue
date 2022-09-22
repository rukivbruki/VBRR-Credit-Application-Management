<template>
  <div>
    <el-container class="common-layout is-vertical">
      <Header></Header>
      <div>
        <Component :is="this.$route.meta.layout || 'div'">
          <router-view />
        </Component>
      </div>
      <Footer></Footer>
    </el-container>
  </div>
</template>

<script>
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import LeftSideMenu from '../components/MainMenu/LeftSideMenu/LeftSideMenu';
import SelectedContent from '../components/MainMenu/SelectedContent/SelectedСontent';

export default {
  components: { SelectedContent, LeftSideMenu, Footer, Header },
  beforeMount() {
    this.$store.dispatch('setAllDictionaries');
  },
};
</script>

<style>
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.common-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
