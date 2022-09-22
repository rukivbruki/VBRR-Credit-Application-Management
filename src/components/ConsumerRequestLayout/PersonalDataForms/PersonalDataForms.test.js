import { shallowMount } from '@vue/test-utils';
import PersonalDataForms from './PersonalDataForms';
describe('PersonalDataForms.vue render', () => {
  test('renders correctly', () => {
    expect(shallowMount(PersonalDataForms).element).toMatchSnapshot();
  });
});
