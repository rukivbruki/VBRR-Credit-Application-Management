<template>
  <el-form
    ref="form"
    label-position="top"
    :model="agreeForm"
    label-width="100px"
    class="family-information-body"
  >
    <el-form-item label="">
      <el-checkbox
        v-model="agreeForm.familyJur"
        label="Я подтверждаю, что я, мои близкие родственники или их близкие родственники являются лицами, осуществляющими функции единоличного исполнительного органа юридического лица / членами Совета директоров (Наблюдательного совета) / Правления / иного коллегиального органа управления юридического лица"
      />
    </el-form-item>
    <el-form-item label="">
      <el-checkbox
        v-model="agreeForm.owningVotingShares"
        label="Я подтверждаю, что я, мои близкие родственники или их близкие родственники являются лицами, владеющим голосующими акциями (долями) юридического лица"
      />
    </el-form-item>
    <el-form-item label="">
      <el-checkbox
        v-model="agreeForm.electedExecutive"
        label="Я подтверждаю, что я, мои близкие родственники или их близкие родственники являются лицами, по предложению которых назначен или избран единоличный исполнительный орган юридического лица/избрано более чем 50% количественного состава коллегиального исполнительного органа либо Совета директоров (Наблюдательного совета) юридического лица"
      />
    </el-form-item>
    <el-form-item label="">
      <el-checkbox
        v-model="agreeForm.familyRosGasOil"
        label="Я подтверждаю, что мои близкие родственники являются сотрудниками Банка «ВБРР» (АО) / ПАО НК «Роснефть»/ГК ПАО НК «Роснефть»"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'PersonAgreeForm',
  props: {
    personFormInfo: Object,
  },
  data() {
    return {
      agreeForm: {
        familyJur: this.personFormInfo.familyJur,
        owningVotingShares: this.personFormInfo.owningVotingShares,
        electedExecutive: this.personFormInfo.electedExecutive,
        familyRosGasOil: this.personFormInfo.familyRosGasOil,
      },
    };
  },
  watch: {
    agreeForm: {
      handler(newVal) {
        this.$emit('update-person-agree', newVal);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.el-checkbox {
  display: flex;
  align-items: center;
}
</style>
