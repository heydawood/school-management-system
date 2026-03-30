'use client';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { ApplicationPages, navItems } from './data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { removeToken } from '@/Redux/Auth/Slice';
import * as routes from '@/routes/Index';
import { useEffect } from 'react';
import { usePage } from '@/Providers/PageProvider';
import { useCustomAlert } from '@/Common/Components/CustomAlert';
import Icon from '../ui/svg_icon/SvgIcon';

const Logo = () => {
  return (
    <div className="flex gap-2 w-full py-1 items-center justify-start">
      <img src="/images/logo22.png" alt="School Management System logo" className="h-[44px] object-cover" />
      <h2 className="font-bold text-primary-dark">School Management System</h2>
    </div>
  );
};

export function AppSidebar() {
  const pathName = useLocation().pathname;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showAlert = useCustomAlert();
  const { pageInfo, setPageInfo } = usePage();
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
        dispatch(removeToken()); //coming from the admin auth slice
        navigate(routes.Login());
      },
      classNames: {
        confirmButton: 'hover:bg-error bg-error-25 text-error-800 hover:text-white rounded-xl',
        cancelButton: 'border border-neutral-975 bg-transparent hover:bg-primary hover:border-primary hover:text-white rounded-xl',
      },
    });
  };

  useEffect(() => {
    const pageMatch = navItems.find((item) => pathName.includes(item.link));
    if (pathName === routes.Dashboard()) {
      setPageInfo({ title: `Hello ${name} 👋🏻`, description: `Here’s what’s happening in your apps.` });
      return;
    }
    if (pathName === routes.Settings()) {
      const page = ApplicationPages['settings'];
      setPageInfo({ title: page.title, description: page.description });
      return;
    }

    if (pageMatch) {
      const page = ApplicationPages[pageMatch.pageName as keyof typeof ApplicationPages];
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
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className="group/item">
                  <SidebarMenuButton
                    isActive={pathName.includes(item.link)}
                    className={`flex items-center text-muted-dark h-[50px] px-4 py-0 rounded-xl ${pathName.includes(item.link) ? 'hover:bg-sidebar-accent' : ''}`}
                    asChild
                  >
                    <Link className="py-5 flex items-center" to={item.link}>
                      <SVG src={pathName.includes(item.link) ? item.iconActive : item.icon} style={{ width: '24px', height: '24px' }} />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="">
        <Link
          to={routes.Settings()}
          onClick={() => {
            const page = ApplicationPages['settings'];
            setPageInfo({ title: page.title, description: page.description });
          }}
          className={`flex items-center gap-2 h-[50px] rounded-xl ${
            pathName.includes('/dashboard/settings') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-hover text-muted-dark'
          }  rounded-lg px-4`}
        >
          <SVG src={pathName.includes('/dashboard/settings') ? '/icons/settings-active.svg' : '/icons/settings.svg'} style={{ width: '24px', height: '24px' }} />
          <span className="text-sm">Settings</span>
        </Link>
        <button onClick={logout} type="button" className="flex justify-start hover:bg-sidebar-hover items-center gap-2 !py-3 rounded-xl h-[50px] px-4">
          <SVG src={'/icons/logout.svg'} style={{ width: '24px', height: '24px' }} />
          <span className="text-sm">Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
