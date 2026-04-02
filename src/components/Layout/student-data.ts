import { PageName } from '@/Utils/Constants';
import type { INavItem } from '@/Utils/Types';

export const studentNavItems: INavItem[] = [
    {
        title: 'Results',
        link: '/dashboard/student',
        icon: '/icons/sidebar-chart-pie.svg',
        iconActive: '/icons/sidebar-chart-pie-active.svg',
        pageName: PageName.RESULTS,
    },
    // {
    //     title: 'Submit Exams',
    //     link: '/dashboard/student',
    //     icon: '/icons/sidebar-chart-pie.svg',
    //     iconActive: '/icons/sidebar-chart-pie-active.svg',
    //     pageName: PageName.EXAMS,
    // },
];

export const StudentApplicationPages = {
  dashboard: {
    title: "Teacher's Dashboard",
    description: 'Overview of your teaching activities.',
  },
  exams: {
    title: 'Exams',
    description: 'Create and manage your exams.',
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