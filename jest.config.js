module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testMatch: ['./**/(*.)(spec|test).js?(x)'],
};
