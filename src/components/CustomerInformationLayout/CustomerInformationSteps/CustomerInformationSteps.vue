<template>
  <div class="steps">
    <el-steps :active="active" finish-status="success">
      <el-step title="Ввод заявки" />
      <el-step
        title="Шаг 1: Сведения о клиенте"
        @click="goToStep('customerInfo')"
      >
        <template #icon> 1 </template>
      </el-step>
      <el-step
        title="Шаг 2: Контактная информация"
        @click="goToStep('customerContacts')"
      >
        <template #icon> 2 </template>
      </el-step>
      <el-step
        title="Шаг 3: Сведения о семье, личные данные"
        @click="goToStep('customerFamily')"
      >
        <template #icon> 3 </template>
      </el-step>
      <el-step
        title="Шаг 4: Информация о трудоустройстве"
        @click="goToStep('customerEmployment')"
      >
        <template #icon> 4 </template>
      </el-step>
      <el-step
        title="Шаг 5: Сведения о доходах и расходах клиента"
        @click="goToStep('customerBudget')"
      >
        <template #icon> 5 </template>
      </el-step>
      <el-step
        style="max-width: none; flex-shrink: unset"
        title="Шаг 6: Кредитные обязательства"
        @click="goToStep('customerCredits')"
      >
        <template #icon> 6 </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: 'CustomerInformationSteps',
  props: {
    active: Number,
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeOfWindow);
  },
  mounted() {
    window.addEventListener('resize', this.resizeOfWindow);
    this.resizeOfWindow();
  },
  methods: {
    goToStep(stepName) {
      this.$router.push({ name: stepName });
    },
    changeStepsDirection(isScreenSmall) {
      let row = this.$el.querySelector('.el-steps');
      let stepsCollection = this.$el.querySelectorAll('.el-step');
      if (isScreenSmall) {
        row.classList.remove('el-steps--horizontal');
        row.classList.add('el-steps--vertical');
        row.setAttribute('direction', 'vertical');
        row.setAttribute('style', 'margin-top: 30px');
        stepsCollection.forEach((element) => {
          element.classList.remove('is-horizontal');
          element.classList.add('is-vertical');
        });
      } else {
        row.classList.add('el-steps--horizontal');
        row.classList.remove('el-steps--vertical');
        row.setAttribute('direction', 'horizontal');
        row.setAttribute('style', 'width: 70wh');
        stepsCollection.forEach((element) => {
          element.classList.add('is-horizontal');
          element.classList.remove('is-vertical');
        });
      }
    },
    resizeOfWindow() {
      if (window.innerWidth < 570) {
        this.changeStepsDirection(true);
        this.$el.querySelectorAll('.el-form-item').forEach((element) => {
          element.setAttribute(
            'style',
            'display: flex;\n' + '    flex-direction: column;',
          );
        });
      } else {
        this.changeStepsDirection(false);
        this.$el.querySelectorAll('.el-form-item').forEach((element) => {
          element.setAttribute('style', '');
        });
      }
    },
  },
};
</script>

<style scoped>
.steps {
  position: sticky;
  top: 0;
  padding: 25px 0 25px 30px;
  margin: 0 -30px 0 -30px;
  background-color: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

::v-deep .el-step__icon {
  cursor: pointer;
}
</style>
