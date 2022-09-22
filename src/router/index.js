import { createRouter, createWebHistory } from 'vue-router';
import LeftSideMenu from '../components/MainMenu/LeftSideMenu/LeftSideMenu';
import SelectedContent from '../components/MainMenu/SelectedContent/SelectedСontent';
import ConsumerRequest from '../components/ConsumerRequestLayout/ConsumerRequest/ConsumerRequest';
import CustomerInformation from '../components/CustomerInformationLayout/CustomerInformation/СustomerInformation';
import ContactInformation from '@/components/CustomerInformationLayout/ContactInformation/ContactInformation';
import CustomerInformationLayout from '@/components/CustomerInformationLayout/CustomerInformationLayout';
import SelectCreditOption from '../components/SelectCreditOption/SelectCreditOption';
import FamilyInformation from '@/components/CustomerInformationLayout/FamilyInformation/FamilyInformation';
import EmploymentInformation from '@/components/CustomerInformationLayout/EmploymentInformation/EmploymentInformation';
import BudgetInformation from '@/components/CustomerInformationLayout/BudgetInformation/BudgetInformation';
import CreditLiabilitiesInformation from '@/components/CustomerInformationLayout/CreditLiabilitiesInformation/CreditLiabilitiesInformation';

const routes = [
  {
    path: '/',
    component: LeftSideMenu,
    meta: { layout: SelectedContent },
  },
  {
    path: '/consumer-request',
    component: ConsumerRequest,
  },
  {
    path: '/consumer-request/:personId',
    component: CustomerInformationLayout,
    props: true,
    children: [
      {
        path: 'info',
        name: 'customerInfo',
        component: CustomerInformation,
      },
      {
        path: 'contacts',
        name: 'customerContacts',
        component: ContactInformation,
      },
      {
        path: 'family',
        name: 'customerFamily',
        component: FamilyInformation,
      },
      {
        path: 'employment',
        name: 'customerEmployment',
        component: EmploymentInformation,
      },
      {
        path: 'budget',
        name: 'customerBudget',
        component: BudgetInformation,
      },
      {
        path: 'credits',
        name: 'customerCredits',
        component: CreditLiabilitiesInformation,
      },
      {
        path: 'credit-option',
        name: 'selectCreditOption',
        component: SelectCreditOption,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/consumer-request',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
