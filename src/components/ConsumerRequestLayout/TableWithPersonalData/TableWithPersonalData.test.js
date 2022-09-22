import { mount } from '@vue/test-utils';
import TableWithPersonalData from './TableWithPersonalData';

describe('TableWithPersonalData.vue render', () => {
  test('renders correctly', () => {
    expect(mount(TableWithPersonalData).element).toMatchSnapshot();
  });
});
