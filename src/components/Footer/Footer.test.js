import { shallowMount } from '@vue/test-utils';
import Footer from './Footer.vue';
describe('Footer.vue render', () => {
  test('renders correctly', () => {
    expect(shallowMount(Footer).element).toMatchSnapshot();
  });
});
