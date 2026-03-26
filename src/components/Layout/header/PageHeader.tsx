// components/PageHeader.tsx
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  withDescription?: boolean;
  withBackButton?: boolean;
  backButton?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, withDescription = true, withBackButton = false, backButton }) => {
  return !withBackButton ? (
    <div className="">
      <h1 className="text-heading">{title}</h1>
      {withDescription && description && <p className="text-paragraph">{description}</p>}
    </div>
  ) : (
    <div className="flex items-center gap-4">
      {backButton}
      <h1 className="text-heading">{title}</h1>
    </div>
  );
};

export default PageHeader;
