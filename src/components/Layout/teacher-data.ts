import { PageName } from '@/Utils/Constants';
import type { INavItem } from '@/Utils/Types';

export const teacherNavItems: INavItem[] = [
  {
    title: 'Dashboard',
    link: '/dashboard/teacher',
    icon: '/icons/teacher.svg',
    iconActive: '/icons/teacher-active.svg',
    pageName: PageName.DASHBOARD,
  },
  {
    title: 'Exams',
    link: '/dashboard/teacher/exams',
    icon: '/icons/class-level.svg',
    iconActive: '/icons/class-level-active.svg',
    pageName: PageName.EXAMS,
  },
  {
    title: 'Questions',
    link: '/dashboard/teacher/questions',
    icon: '/icons/academic-term.svg',
    iconActive: '/icons/academic-term-active.svg',
    pageName: PageName.QUESTIONS,
  },
  // {
  //   title: 'Results',
  //   link: '/dashboard/teacher/results',
  //   icon: '/icons/sidebar-chart-pie.svg',
  //   iconActive: '/icons/sidebar-chart-pie-active.svg',
  //   pageName: PageName.RESULTS,
  // },
];

export const TeacherApplicationPages = {
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