import { shallowMount } from '@vue/test-utils';
import Header from './Header';
describe('Header.vue render', () => {
  test('renders correctly', () => {
    expect(shallowMount(Header).element).toMatchSnapshot();
  });
});
