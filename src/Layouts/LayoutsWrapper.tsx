import React from 'react';
import { Outlet } from 'react-router-dom';
import RootLayout from './Auth/Layout';
import DashboardLayout from './Dashboard/Layout';
import { Toaster } from '@/components/ui/sonner';
import { AlertDialogProvider } from '@/Common/Components/CustomAlert';

const LayoutWrapper: React.FC<{
  type: 'auth' | 'dashboard';
  children?: React.ReactNode;
}> = ({ type, children }) => {

  const role = localStorage.getItem("role"); //i added this role to make LayoutWrapper Role Aware

  return (
    <div>

      <AlertDialogProvider>

        <Toaster position="top-center" />

        {type === 'dashboard' ?(

        <DashboardLayout role={role} >{children || <Outlet />}</DashboardLayout>) :( //adding role in dashboard layout

        <RootLayout>{children || <Outlet />}</RootLayout>)}

      </AlertDialogProvider>

    </div>
  );
};

export default LayoutWrapper;
