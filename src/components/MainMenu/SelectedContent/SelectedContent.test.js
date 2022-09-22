import { mount } from '@vue/test-utils';
import SelectedContent from './SelectedСontent';

describe('SelectedСontent.vue render', () => {
  test('renders correctly', () => {
    expect(mount(SelectedContent).element).toMatchSnapshot();
  });
});
