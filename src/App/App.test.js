import { mount } from '@vue/test-utils';
import App from './App';
describe('App.vue render', () => {
  test('renders correctly', () => {
    expect(mount(App).element).toMatchSnapshot();
  });
});
