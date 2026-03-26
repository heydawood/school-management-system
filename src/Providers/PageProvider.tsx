'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface PageInfo {
  title: string;
  description?: string;
  backButton?: React.ReactNode;
  withBackButton?: boolean;
  withDescription?: boolean;
}

interface PageContextType {
  pageInfo: PageInfo;
  setPageInfo: (info: PageInfo) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    title: '',
    description: '',
  });

  return <PageContext.Provider value={{ pageInfo, setPageInfo }}>{children}</PageContext.Provider>;
};

export const usePage = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};
