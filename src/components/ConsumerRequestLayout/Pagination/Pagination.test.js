import { shallowMount } from '@vue/test-utils';
import Pagination from './Pagination';

describe('Pagination.vue render', () => {
  test('renders correctly', () => {
    expect(shallowMount(Pagination).element).toMatchSnapshot();
  });
});
