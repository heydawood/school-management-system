import { Fragment, useEffect, useState, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';


interface Props {
    close: () => void;
    onDelete: () => void;
    deleting: boolean;
}

const DeleteProgramsModal: FC<Props> = ({ close, onDelete, deleting }) => {

    
  return (
            <Modal classNames="md:max-w-[40%]" closeModal={close}>
                <Fragment>
                    <Modalheader
                        logoClasses="bg-error-100"
                        customLogo={<Icon icon="/icons/trash.svg" className="text-error-600" />}
                        className="p-4"
                        contentLocation="left"
                        showCloseButton={true}
                        onCloseClick={close}
                    >
                        <div>
                            <h1 className="text-heading font-semibold">Delete Program</h1>
                            <p className="text-paragraph text-gray-500">Are you sure you want to delete this Program? This action cannot be undone.</p>
                        </div>
                    </Modalheader>

                    <Modalbody fixedHeight={false}>
                        <div className="p-4">
                            <p className="text-sm text-gray-600">
                                Once deleted, all associated data will be permanently removed.
                            </p>
                        </div>
                    </Modalbody>

                    <Modalfooter>
                        <Button 
                            onClick={onDelete} 
                            className="col-span-1 rounded-xl bg-error-600 hover:bg-error-700 text-white px-5 py-3 h-12"
                            disabled={deleting}

                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </Modalfooter>
                </Fragment>
            </Modal>
        );
    
}

export default DeleteProgramsModal

//DeleteProgramsModal