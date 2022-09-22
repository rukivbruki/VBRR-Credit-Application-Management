<template>
  <el-form
    ref="form"
    :model="form"
    label-width="160px"
    label-position="top"
    :rules="rules"
  >
    <el-row style="margin: 0" :gutter="20">
      <el-col style="padding: 0" :span="6">
        <el-form-item prop="surname" label="Фамилия">
          <el-input
            @keydown="enterClick"
            class="el-form-input"
            v-model="form.surname"
            @click="inputClick"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item prop="name" label="Имя">
          <el-input
            @keydown="enterClick"
            class="el-form-input"
            v-model="form.name"
            @click="inputClick"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item prop="patronymic" label="Отчество">
          <el-input
            @keydown="enterClick"
            class="el-form-input"
            v-model="form.patronymic"
            @click="inputClick"
          />
        </el-form-item>
      </el-col>
      <el-col style="padding: 0" :span="6">
        <el-form-item prop="birthday" label="Дата рождения">
          <el-col class="el-form-input" style="padding: 0">
            <el-date-picker
              type="date"
              placeholder="Введите дату"
              v-model="form.birthdayDate"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="button">
      <el-button
        @click="findBtnClick"
        style="background-color: rgb(255, 211, 0)"
        >Найти
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PersonalDataForms',
  data() {
    let isEngSymbols = function (text) {
      return /[a-z]/i.test(text);
    };
    let validateName = (rule, value, callback) => {
      if (value === '' || value.length < 3 || isEngSymbols(value)) {
        callback(
          new Error(
            'Входные данные не могут быть короче 3 символов и содержать английские буквы',
          ),
        );
      } else {
        this.$refs.ruleForm.validateField('surname');
        callback();
      }
    };
    return {
      form: {
        name: undefined,
        surname: undefined,
        patronymic: undefined,
        birthdayDate: undefined,
      },
      rules: {
        surname: [{ required: true, validator: validateName, trigger: 'blur' }],
        name: [{ validator: validateName, trigger: 'blur' }],
        patronymic: [{ validator: validateName, trigger: 'blur' }],
        birthday: [
          {
            type: 'date',
            required: false,
            message: 'Введите дату рождения',
            trigger: 'change',
          },
        ],
      },
    };
  },
  created() {
    window.addEventListener('resize', this.resizeOfWindow);
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeOfWindow);
  },
  mounted() {
    this.resizeOfWindow();
  },
  computed: mapGetters(['getPersonDataList']),
  watch: {
    getPersonDataList: function () {
      if (this.getPersonDataList) {
        const findBtn = this.$el.querySelector('.el-disable');
        findBtn.classList.remove('is-disabled', 'el-disable');
        findBtn.removeAttribute('disabled');
      }
    },
  },
  methods: {
    inputClick(event) {
      event.target.style.caretColor = 'auto';
    },
    enterClick(event) {
      if (event.keyCode === 13) {
        let btn = document.querySelector('.el-button');
        btn.setAttribute('disabled', '');
        btn.classList.add('is-disabled', 'el-disable');
        this.findPerson();
        event.target.style.caretColor = 'transparent';
      }
    },
    findPerson() {
      const formData = {
        FirstName: this.form.name,
        LastName: this.form.surname,
        MiddleName: this.form.patronymic,
        Birthday: this.form.birthdayDate
          ? this.form.birthdayDate.toLocaleDateString()
          : undefined,
      };
      if (formData.Birthday) {
        formData.Option = 'Equals';
      }
      this.$store.dispatch('findPersonDataListByParams', formData);
    },
    findBtnClick(event) {
      const isButton = event.target.tagName === 'BUTTON';
      const btn = isButton ? event.target : event.target.parentNode;
      btn.setAttribute('disabled', '');
      btn.classList.add('is-disabled', 'el-disable');
      this.findPerson();
    },
    resizeOfWindow() {
      if (window.innerWidth < 570) {
        this.$el.querySelectorAll('.el-form-item').forEach((element) => {
          element.setAttribute(
            'style',
            'display: flex;\n' + '    flex-direction: column;',
          );
        });
      } else {
        this.$el.querySelectorAll('.el-form-item').forEach((element) => {
          element.setAttribute('style', '');
        });
      }
    },
  },
};
</script>

<style scoped>
.el-form-input {
  width: 300px;
}

.el-form-item {
  margin-bottom: 0;
}

.button {
  margin: 40px 0 20px;
}

@media screen and (max-width: 1050px) {
  .el-row {
    flex-direction: column;
  }
}

@media screen and (max-width: 650px) {
  .el-form-input {
    width: 250px;
  }
}

@media screen and (max-width: 570px) {
  .el-form-input {
    width: 400px;
  }
}

@media screen and (max-width: 470px) {
  .el-form-input {
    width: 310px;
  }
}
</style>
