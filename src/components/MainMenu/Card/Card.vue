<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span
          ><b>{{ name }}</b></span
        >
      </div>
    </template>
    <div class="item">
      <el-link v-for="link in links" :key="link" :underline="false">
        <router-link class="el-card-link" :to="link.linkPath">
          <span class="el-span-link">
            {{ link.linkName }}
          </span>
        </router-link>
      </el-link>
    </div>
  </el-card>
</template>

<script>
import './stylesForCard.css';

export default {
  name: 'Card',
  props: ['name', 'links'],
};
</script>

<style scoped>
.item {
  border-bottom: 2px solid rgba(213, 213, 213, 0.29);
  display: block;
}

.el-span-link {
  border-top: 2px solid rgba(213, 213, 213, 0.29);
  border-bottom: none;
}

.el-link:hover {
  background-color: rgba(213, 213, 213, 0.29);
}

.box-card {
  width: 350px;
  margin-bottom: 10px;
  line-height: 0.3;
}

.box-card span {
  display: inline-block;
  width: 100%;
  padding: 10px 0;
}

.el-card-link {
  color: black;
  text-decoration: none;
  font-size: 20px;
  width: 100%;
}

.card-header {
  text-transform: uppercase;
  padding-top: 15px;
}

.el-link {
  width: 100%;
}

.el-link.el-link--default {
  line-height: 2;
}
</style>
