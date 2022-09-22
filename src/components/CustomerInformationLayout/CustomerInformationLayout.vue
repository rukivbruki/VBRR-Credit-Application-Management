<template>
  <div style="margin-right: 30px; margin-left: 30px">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'CustomerInformationLayout',
  props: {
    personId: String,
  },
  beforeMount() {
    this.$store.dispatch('setPersonDataInfo', this.personId);
  },
};
</script>

<style></style>
