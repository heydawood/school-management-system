import React from 'react';
interface props {
  children: React.ReactElement;
}
const Modalfooter = ({ children }: props) => {
  return <div className="flex items-center justify-end p-6 border-t border-neutral-975 rounded-b">{children}</div>;
};

export default Modalfooter;
