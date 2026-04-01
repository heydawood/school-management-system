import Cookie from 'js-cookie';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Layout/app-sidebar';
import Header from '@/components/Layout/header/Header';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackError } from '@/Common/Components/FallbackError';
import { PageProvider } from '@/Providers/PageProvider';
import TeacherSidebar from '@/components/Layout/teacher-sidebar';
import StudentSidebar from '@/components/Layout/student-sidebar';


//adding role here to render sidebar dynamically. recieving role from layout wrapper
export default function DashboardLayout({ children, role }: { children: React.ReactNode; role: string | null; }) {
  // Persisting the sidebar state in the cookie.
  const defaultOpen = Cookie.get('sidebar:state') ? Cookie.get('sidebar:state') === 'true' : true;
  return (
    <div className={`flex w-full`}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <PageProvider>

          {role === "admin" && <AppSidebar />}
          {role === "teacher" && <TeacherSidebar />}
          {role === "student" && <StudentSidebar />}

          <div className="flex flex-1 flex-col overflow-hidden">
            <Header showExpandButton={true} />
            <ErrorBoundary
              FallbackComponent={FallbackError}
              onReset={() => {
                // Optional: reset global state, clear cache, or reload page
                window.location.reload();
              }}
            >
              <main className="flex-1 px-6 py-4 bg-neutral-25">{children}</main>
            </ErrorBoundary>
          </div>
        </PageProvider>
      </SidebarProvider>
    </div>
  );
}
