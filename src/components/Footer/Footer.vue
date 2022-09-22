<template>
  <div class="el-footer-text">
    <el-footer
      ><p>
        Powered by ©
        <el-link href="https://www.egartech.ru/">EGAR Technology</el-link>
      </p>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.el-footer {
  text-align: center;
  line-height: 60px;
  font-family: Arial, serif;
  height: 2px;
  margin-top: 40px;
}
.el-footer > p {
  font-size: 12px;
  margin-top: 0;
}
.el-footer-text {
  color: white;
}
.el-link {
  font-size: 12px;
  text-decoration: underline;
}
</style>
