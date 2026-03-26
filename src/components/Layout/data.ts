import { PageName } from '@/Utils/Constants';
import type { INavItem } from '@/Utils/Types';

export const navItems: INavItem[] = [
  // {
  //   title: 'Dashboard',
  //   link: '/dashboard/home',
  //   icon: '/icons/home.svg',
  //   iconActive: '/icons/home-active.svg',
  //   pageName: PageName.DASHBOARD,
  // },
  // {
  //   title: 'User Management',
  //   link: '/dashboard/user-management',
  //   icon: '/icons/user-management.svg',
  //   iconActive: '/icons/user-management-active.svg',
  //   pageName: PageName.USER_MANAGEMENT,
  // },
  // {
  //   title: 'Workouts',
  //   link: '/dashboard/workouts',
  //   icon: '/icons/sidebar-dumbel.svg',
  //   iconActive: '/icons/sidebar-dumbel-active.svg',
  //   pageName: PageName.WORKOUTS,
  // },
  // {
  //   title: 'Workout Categories',
  //   link: '/dashboard/categories',
  //   icon: '/icons/sidebar-dumbel.svg',
  //   iconActive: '/icons/sidebar-dumbel-active.svg',
  //   pageName: PageName.CATEGORIES,
  // },
  // {
  //   title: 'Subscriptions',
  //   link: 'subscriptions',
  //   icon: '/icons/sidebar-badge-percent.svg',
  //   iconActive: '/icons/sidebar-badge-percent-active.svg',
  //   pageName: PageName.SUBSCRIPTIONS,
  // },
  // {
  //   title: 'Payments',
  //   link: '/dashboard/payments',
  //   icon: '/icons/sidebar-wallet.svg',
  //   iconActive: '/icons/sidebar-wallet-active.svg',
  //   pageName: PageName.PAYMENTS,
  // },
  // {
  //   title: 'Learning hubs',
  //   link: '/dashboard/learning-hub',
  //   icon: '/icons/user-management.svg',
  //   iconActive: '/icons/user-management-active.svg',
  //   pageName: PageName.DIET_PLANS,
  // },
  // {
  //   title: 'Analytics',
  //   link: '/dashboard/analytics',
  //   icon: '/icons/sidebar-chart-pie.svg',
  //   iconActive: '/icons/sidebar-chart-pie-active.svg',
  //   pageName: PageName.ANALYTICS,
  // },
  {
    title: 'Admins',
    link: '/dashboard/admins',
    icon: '/icons/user-management.svg',
    iconActive: '/icons/user-management-active.svg',
    pageName: PageName.ADMINS,
  },
  {
    title: 'Teachers',
    link: '/dashboard/teachers',
    icon: '/icons/teacher.svg',
    iconActive: '/icons/teacher-active.svg',
    pageName: PageName.TEACHERS,
  },
  {
    title: 'Students',
    link: '/dashboard/students',
    icon: '/icons/student.svg',
    iconActive: '/icons/student-active.svg',
    pageName: PageName.STUDENTS,
  },
  {
    title: 'Academic Years',
    link: '/dashboard/academic-years',
    icon: '/icons/academic-year.svg',
    iconActive: '/icons/academic-year-active.svg',
    pageName: PageName.ACADEMIC_YEARS,
  },
  {
    title: 'Academic Terms',
    link: '/dashboard/academic-terms',
    icon: '/icons/academic-term.svg',
    iconActive: '/icons/academic-term-active.svg',
    pageName: PageName.ACADEMIC_TERMS,
  },
  {
    title: 'Class Levels',
    link: '/dashboard/class-levels',
    icon: '/icons/class-level.svg',
    iconActive: '/icons/class-level-active.svg',
    pageName: PageName.CLASS_LEVELS,
  },
  {
    title: 'Programs',
    link: '/dashboard/programs',
    icon: '/icons/program.svg',
    iconActive: '/icons/program-active.svg',
    pageName: PageName.PROGRAMS,
  },
  {
    title: 'Subjects',
    link: '/dashboard/subjects',
    icon: '/icons/subject.svg',
    iconActive: '/icons/subject-active.svg',
    pageName: PageName.SUBJECTS,
  },
  {
    title: 'Year Groups',
    link: '/dashboard/year-groups',
    icon: '/icons/year-group.svg',
    iconActive: '/icons/year-group-active.svg',
    pageName: PageName.YEAR_GROUPS,
  },
  {
    title: 'Results',
    link: '/dashboard/results',
    icon: '/icons/sidebar-chart-pie.svg',
    iconActive: '/icons/sidebar-chart-pie-active.svg',
    pageName: PageName.RESULTS,
  },
];

export const ApplicationPages = {
  userManagement: {
    title: 'User Management',
    description: 'Here you can manage and see details of all users.',
  },
  workouts: {
    title: 'Workouts',
    description: 'Here you can manage and see details of all workout.',
  },
  subscriptions: {
    title: 'Subscriptions',
    description: 'Here you can manage and see details of all subscriptions.',
  },
  payments: {
    title: 'Payments',
    description: 'Here you can manage and see details of all payments.',
  },
  categories: {
    title: 'Categories',
    description: 'Here you can manage and see details of all categories.',
  },
  analytics: {
    title: 'Analytics',
    description: 'Here you can manage and see details of all analytics.',
  },
  settings: {
    title: 'Settings',
    description: 'Here you can see all of the settings of platform.',
  },
  dietPlan: {
    title: 'Learning Hub',
    description: 'Here you can manage and see details of all learning hub.',
  },
  
  admins: {
    title: 'Admins Page',
    description: 'Here you can manage and see details of all Admins.',
  },
  teachers: {
    title: 'Teachers Page',
    description: 'Here you can manage and see details of all Teachers.',
  },
  students: {
    title: 'Students Page',
    description: 'Here you can manage and see details of all Students.',
  },
  academicYears: {
    title: 'Academic Years Page',
    description: 'Here you can manage and see details of all Academic Years.',
  },
  academicTerms: {
    title: 'Academic Terms Page',
    description: 'Here you can manage and see details of all Academic Terms.',
  },
  classLevels: {
    title: 'Class Levels Page',
    description: 'Here you can manage and see details of all Class Levels.',
  },
  programs: {
    title: 'Programs Page',
    description: 'Here you can manage and see details of all Programs.',
  },
  subjects: {
    title: 'Subjects Page',
    description: 'Here you can manage and see details of all Subjects.',
  },
  yearGroups: {
    title: 'Year Groups Page',
    description: 'Here you can manage and see details of all Year Groups.',
  },
  results: {
    title: 'Results Page',
    description: 'Here you can manage and see details of all Results.',
  },

};
