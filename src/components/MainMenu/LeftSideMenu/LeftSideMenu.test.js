import { shallowMount } from '@vue/test-utils';
import LeftSideMenu from './LeftSideMenu';
describe('LeftSideMenu.vue render', () => {
  test('renders correctly', () => {
    expect(shallowMount(LeftSideMenu).element).toMatchSnapshot();
  });
});
