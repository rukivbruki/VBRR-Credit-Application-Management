import { shallowMount } from '@vue/test-utils';
import Card from './Card.vue';
describe('Card.vue render', () => {
  test('renders correctly', () => {
    expect(shallowMount(Card).element).toMatchSnapshot();
  });
});
