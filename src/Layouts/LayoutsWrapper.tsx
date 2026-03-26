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
  return (
    <div>
      <AlertDialogProvider>
        <Toaster position="top-center" />
        {type === 'dashboard' ? <DashboardLayout>{children || <Outlet />}</DashboardLayout> : <RootLayout>{children || <Outlet />}</RootLayout>}
      </AlertDialogProvider>
    </div>
  );
};

export default LayoutWrapper;
