<template>
  <div class="flexRow buttonsContainer">
    <div class="flexRow">
      <el-popover v-model:visible="visible" placement="top" :width="320">
        <p>Удалить заявку?</p>
        <el-row style="margin: 0; justify-content: end">
          <el-button size="mini" type="text" @click="visible = false"
            >Нет</el-button
          >
          <el-button type="primary" size="mini" @click="deleteRequestConfirm"
            >Да</el-button
          >
        </el-row>
        <template #reference>
          <el-link href="javascript:void(0)" :underline="false">
            <img
              class="delete-icon"
              src="../../../assets/trash_icon.svg"
              alt=""
            />
          </el-link>
        </template>
      </el-popover>

      <el-button
        v-if="isFirstStep"
        class="el-button-bottom-small"
        @click="reloadData"
      >
        Обновить данные
      </el-button>
      <el-button v-else class="el-button-bottom-small" @click="back">
        Назад
      </el-button>
      <el-button v-if="isCreditOption" class="el-button-bottom-small">
        Печать анкеты
      </el-button>
      <el-button v-if="isCreditOption" class="el-button-bottom">
        Печать анкеты, приложение №1
      </el-button>
      <el-button class="el-button-bottom-small next-button" @click="next">
        Далее
      </el-button>
    </div>
    <el-button v-if="isCreditOption" class="el-button-bottom">
      Назад к заявкам
    </el-button>
    <el-button v-else class="el-button-bottom"> Сохранить и выйти </el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerInformationButtons',
  computed: {
    ...mapGetters(['getIsFormValid']),
  },
  props: {
    isFirstStep: {
      type: Boolean,
      default: false,
    },
    isCreditOption: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    if (!this.getIsFormValid) {
      const btn = document.querySelector('.next-button');
      btn.classList.add('is-disabled');
      btn.setAttribute('disabled', '');
    }
  },
  watch: {
    getIsFormValid(newVal) {
      const btn = document.querySelector('.next-button');
      if (newVal) {
        btn.classList.remove('is-disabled');
        btn.removeAttribute('disabled');
      } else {
        btn.classList.add('is-disabled');
        btn.setAttribute('disabled', '');
      }
    },
  },
  methods: {
    deleteRequestConfirm() {
      this.visible = false;
      this.$router.push('/');
    },
    reloadData() {
      this.$emit('reload-data');
    },
    back() {
      this.$emit('back');
    },
    next(event) {
      this.$emit('next', event.target);
    },
  },
};
</script>

<style>
.el-button--primary {
  background-color: #ffffff;
  color: #333333;
  border: 1px solid #dcdfe6;
}

.el-button--mini {
  min-width: 85px;
  min-height: 30px;
  font-size: 14px;
}

.el-button--mini:hover,
.el-button--mini:focus {
  color: #4c4c4c;
}

.el-popover p {
  font-size: 16px;
}

.flexRow {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.el-button:focus,
.el-button:hover {
  background-color: #ffd101;
}

.delete-icon {
  width: 25px;
  height: 25px;
  padding-right: 20px;
}

@media screen and (max-width: 720px) {
  .flexRow {
    flex-direction: column;
    height: auto !important;
    max-width: 250px;
  }

  .buttonsContainer {
    height: 180px;
  }

  .el-button-bottom-small {
    width: 100%;
  }

  .el-button-bottom {
    width: 100%;
  }

  .el-button {
    margin: 5px 0 !important;
  }
}
</style>
