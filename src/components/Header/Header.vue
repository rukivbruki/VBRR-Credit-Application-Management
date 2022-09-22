<template>
  <div>
    <el-header>
      <el-row :gutter="20" style="margin: 0">
        <el-row style="margin: 0; justify-content: flex-start">
          <router-link
            style="padding: 0"
            :xs="10"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8"
            to="/"
            class="el-header-logo"
          />
          <section class="auth-info hidden-md-and-down">
            <ul>
              <li>
                <span>Подразделение:</span>
                <span>доп. офис "Береговой" ВБРР Москва</span>
              </li>
              <li><span>ФИО:</span><span>Иванов И.И.</span></li>
              <li><span>Роль:</span> <span>клиентский менеджер</span></li>
            </ul>
          </section>
        </el-row>
        <el-col
          style="padding: 0; text-align: center"
          :xs="11"
          :sm="6"
          :md="5"
          :lg="5"
          :xl="4"
        >
          <el-row
            class="el-row-links"
            :gutter="20"
            style="
              justify-content: center;
              background-color: rgb(51, 55, 56);
              margin-right: 0;
            "
          >
            <el-col
              style="padding: 0"
              class="el-header-upperLink"
              :xs="13"
              :sm="13"
              :md="14"
              :lg="12"
              :xl="12"
            >
              <el-link :underline="false" @click="mainMenuLinkClick">
                <router-link class="el-header-link" to="/"
                  >Главное меню
                </router-link>
              </el-link>
            </el-col>
            <el-col
              style="padding: 0"
              :xs="11"
              :sm="11"
              :md="10"
              :lg="10"
              :xl="10"
            >
              <el-link :underline="false" class="el-header-link">
                <img
                  src="../../assets/exit.svg"
                  alt=""
                  class="el-header-exit-logo"
                />Войти
              </el-link>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import 'element-plus/lib/theme-chalk/display.css';

export default defineComponent({
  beforeCreate() {
    sessionStorage.setItem('clickedTabIndex', '0');
  },
  methods: {
    mainMenuLinkClick() {
      window.location.reload();
    },
  },
});
</script>

<style scoped>
.el-header {
  color: #333;
  padding: 0;
  border-bottom: solid rgb(255, 211, 0);
}

.el-header-logo {
  flex-shrink: 0;
  width: 300px;
  height: 59.95px;
  background-color: rgb(255, 211, 0);
  background-image: url('../../assets/logo.svg');
  background-position: 1px 1px;
  background-repeat: no-repeat;
  background-size: 285px 56px;
}

.el-header-link {
  color: white;
  font-family: Roboto, serif;
  text-decoration: none;
  text-transform: uppercase;
}

.el-header-link:hover {
  color: rgb(103, 109, 111);
}

.el-header-exit-logo {
  padding-right: 5px;
  width: 15px;
}

.el-row {
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin: 0;
}

.auth-info ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  color: wheat;
  font-size: 14px;
}

.auth-info ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  color: #ffffff;
}

.auth-info ul li span:first-child {
  color: rgb(255, 211, 0);
  margin-right: 10px;
}

.auth-info ul li {
  display: flex;
  flex-wrap: wrap;
  margin-left: 25px;
}

@media screen and (max-width: 768px) {
  .el-header-logo {
    background-image: url('../../assets/shortLogo.svg');
    background-position: 7px 15px;
    background-repeat: no-repeat;
    background-size: 100px 20px;
    width: 120px;
  }
}
</style>
