import { mount } from '@vue/test-utils';
import ConsumerRequest from './ConsumerRequest';
describe('ConsumerRequest.vue render', () => {
  test('renders correctly', () => {
    expect(mount(ConsumerRequest).element).toMatchSnapshot();
  });
});
