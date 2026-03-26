import React from 'react';
interface props {
  children: React.ReactElement;
  classNames: string;
  closeModal: () => void;
  backDrop?: boolean;
  allowClickOutside?: boolean;
}
const Modal: React.FC<props> = ({ children, classNames, closeModal, backDrop = true, allowClickOutside = true }) => {
  const handleClickOutside = () => {
    if (allowClickOutside) {
      closeModal();
    }
  };

  return (
    <>
      {backDrop && <div className="fixed inset-0 z-50 bg-black-48"></div>}
      <div onClick={handleClickOutside} className="justify-center items-center flex overflow-hidden modal-enter  fixed inset-0 z-50 outline-none focus:outline-none">
        <div onClick={(e) => e.stopPropagation()} className={`relative w-[90%] my-6 mx-auto ${classNames}`}>
          <div className="border-0 rounded-lg  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  m-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
