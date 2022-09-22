<template>
  <div class="block">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Number(numberOfPages)"
      @click="btnClick"
      @prev-click="prevBtnClick"
      @next-click="nextBtnClick"
    />
  </div>
</template>

<script>
import './stylesForPagination.css';
export default {
  name: 'Pagination',
  props: ['numberOfPages'],
  data() {
    return {
      clickedBtnNumber: 1,
    };
  },
  methods: {
    incrementClickedBtnNumber() {
      this.clickedBtnNumber++;
    },
    decrementClickedBtnNumber() {
      this.clickedBtnNumber--;
    },
    btnClick(event) {
      const isButton = event.target.tagName === 'LI';
      if (!isButton) {
        return;
      }
      this.$store.dispatch(
        'setPageNumber',
        Number(event.target.firstChild.data),
      );
      this.clickedBtnNumber = Number(event.target.firstChild.data);
    },
    nextBtnClick() {
      this.incrementClickedBtnNumber();
      this.$store.dispatch('setPageNumber', this.clickedBtnNumber);
    },
    prevBtnClick() {
      this.decrementClickedBtnNumber();
      this.$store.dispatch('setPageNumber', this.clickedBtnNumber);
    },
  },
};
</script>

<style scoped>
.block {
  text-align: center;
  margin: 15px;
}
</style>
