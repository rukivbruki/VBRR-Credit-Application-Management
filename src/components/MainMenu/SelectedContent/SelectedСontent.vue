<template>
  <div style="display: flex; flex-wrap: wrap; flex-direction: row">
    <slot />
    <el-main>
      <div class="el-main-flexContainer">
        <Card
          v-for="(card, id) in getCardsToShow"
          :key="card.name"
          :name="getCardsToShow[id].name"
          :links="getCardsToShow[id].links"
        />
      </div>
    </el-main>
  </div>
</template>

<script>
import Card from '../Card/Card';
import { mapGetters } from 'vuex';
export default {
  name: 'SelectedContent',
  components: { Card },
  computed: mapGetters(['getCardsToShow']),
};
</script>

<style scoped>
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 1.2;
  min-height: 100%;
  padding: 0;
  margin-top: 70px;
}

.el-main-flexContainer {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 400px;
  margin-bottom: 10px;
}

.box-card span {
  display: inline-block;
  width: 100%;
}
</style>
