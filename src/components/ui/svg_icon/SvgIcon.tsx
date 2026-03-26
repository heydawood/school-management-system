import { type FC } from 'react';
import SVG from 'react-inlinesvg';

interface Props {
  icon: string;
  className?: string;
}

const Icon: FC<Props> = ({ icon, className }) => {
  return (
    <SVG
      src={icon}
      className={className}
      preProcessor={(code) => {
        return code.replaceAll(/fill=".*?"/g, 'fill="currentColor"');
      }}
    />
  );
};

export default Icon;
