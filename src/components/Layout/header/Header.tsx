'use client';
import { usePage } from '@/Providers/PageProvider';
import PageHeader from './PageHeader';
import UserNav from './UserNav';
import { SidebarTrigger } from '@/components/ui/sidebar';
import SVG from 'react-inlinesvg';

interface HeaderProps {
  showExpandButton?: boolean;
}

const Header = ({ showExpandButton = true }: HeaderProps) => {
  const { pageInfo } = usePage();
  return (
    <div className="max-h-[76px] py-4 px-6 flex border-b-2 bg-white border-theme-border justify-between items-center">
      {showExpandButton && (
        <SidebarTrigger className="sm:hidden">
          <SVG src="/icons/bars.svg" style={{ width: '24px', height: '24px' }} />
        </SidebarTrigger>
      )}
      <div className="hidden md:block">
        <PageHeader
          backButton={pageInfo.backButton}
          withBackButton={pageInfo.withBackButton}
          withDescription={pageInfo.withDescription}
          title={pageInfo.title}
          description={pageInfo.description}
        />
      </div>
      <UserNav />
    </div>
  );
};

export default Header;
