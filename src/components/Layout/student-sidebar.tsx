'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { TeacherApplicationPages, teacherNavItems } from './teacher-data';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { removeToken } from '@/Redux/Auth/Slice';
import * as routes from '@/routes/Index';
import { useEffect } from 'react';
import { usePage } from '@/Providers/PageProvider';
import { useCustomAlert } from '@/Common/Components/CustomAlert';
import Icon from '../ui/svg_icon/SvgIcon';
import { StudentApplicationPages, studentNavItems } from './student-data';

const Logo = () => {
  return (
    <div className="flex gap-2 w-full py-1 items-center justify-start">
      <img src="/images/logo22.png" alt="School Management System logo" className="h-[44px] object-cover" />
      <h2 className="font-bold text-primary-dark">School Management System</h2>
    </div>
  );
};

export default function StudentSidebar() {
  const pathName = useLocation().pathname;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showAlert = useCustomAlert();
  const { setPageInfo } = usePage();
  const { name } = useAppSelector((state) => state.authReducer);

  const logout = () => {
    showAlert({
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      confirmText: 'Yes',
      cancelText: 'No',
      customLogo: <Icon icon="/icons/logout.svg" />,
      logoClasses: 'bg-error-100 text-error',
      onConfirm: () => {
        dispatch(removeToken());
        navigate(routes.Login());
      },
    });
  };

  useEffect(() => {
    const pageMatch = studentNavItems.find((item) => pathName.includes(item.link));
    if (pathName === routes.Dashboard()) {
      setPageInfo({ title: `Hello ${name} 👋🏻`, description: `Here’s what’s happening in your apps.` });
      return;
    }
    // if (pathName === routes.Settings()) {
    //   const page = TeacherApplicationPages['settings'];
    //   setPageInfo({ title: page.title, description: page.description });
    //   return;
    // }

    if (pageMatch) {
      const page = StudentApplicationPages[pageMatch.pageName as keyof typeof StudentApplicationPages];
      if (page) {
        setPageInfo({ title: page.title, description: page.description });
      }
    }
  }, [pathName, setPageInfo]);

  return (
    <Sidebar className="border-sidebar-ring border-r-2 p-3 bg-sidebar-background">
      <SidebarHeader className="mb-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.link} end={item.link === '/dashboard/student'}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        className={`flex items-center h-[50px] px-4 rounded-xl ${isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'hover:bg-sidebar-hover text-muted-dark'
                          }`}
                      >
                        <SVG
                          src={isActive ? item.iconActive : item.icon}
                          style={{ width: '24px', height: '24px' }}
                        />
                        <span className="text-sm">{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        

        <button
          onClick={logout}
          type="button"
          className="flex items-center gap-2 hover:bg-sidebar-hover rounded-xl h-[50px] px-4"
        >
          <SVG src="/icons/logout.svg" style={{ width: '24px', height: '24px' }} />
          <span className="text-sm">Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}