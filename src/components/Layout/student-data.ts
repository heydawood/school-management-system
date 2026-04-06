import { PageName } from '@/Utils/Constants';
import type { INavItem } from '@/Utils/Types';

export const studentNavItems: INavItem[] = [
     {
         title: 'Submit Exams',
         link: '/dashboard/student/exams',
         icon: '/icons/sidebar-chart-pie.svg',
         iconActive: '/icons/sidebar-chart-pie-active.svg',
         pageName: PageName.EXAMS,
     },
];

export const StudentApplicationPages = {
  dashboard: {
    title: "Student's Dashboard",
    description: 'Overview of your teaching activities.',
  },
  exams: {
    title: 'Exams',
    description: 'View, attempt, and submit your exams.',
  },
  questions: {
    title: 'Questions',
    description: 'Add and manage exam questions.',
  },
  results: {
    title: 'Results',
    description: 'View and analyze student results.',
  },
  settings: {
    title: 'Settings',
    description: 'Manage your account settings.',
  },
};