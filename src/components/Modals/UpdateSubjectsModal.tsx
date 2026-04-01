import { Fragment, useEffect, useState, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';

interface Props {
    close: () => void;
    onUpdate: (updatedData: { name: string; description: string}) => void;
    subjectsId: string | null;
    updating: boolean;
    initialName?: string; // pass existing name
    initialDescription?: string; // pass existing description
}

const UpdateSubjectsModal: FC<Props> = ({
    close,
    updating,
    onUpdate,
    initialName = '',
    initialDescription = ''
}) => {

    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);

    useEffect(() => {
        setName(initialName);
        setDescription(initialDescription);
    }, [initialName, initialDescription]);

    const handleSubmit = () => {
        if (!name.trim()) return;

        onUpdate({ name, description });
    };

    return (
        <Modal classNames="md:max-w-[40%]" closeModal={close}>
            <Fragment>

                {/* HEADER */}
                <Modalheader
                    logoClasses="bg-primary-100"
                    customLogo={<Icon icon="/icons/pencil.svg" className="text-primary-600" />}
                    className="p-4"
                    contentLocation="left"
                    showCloseButton={true}
                    onCloseClick={close}
                >
                    <div>
                        <h1 className="text-heading font-semibold">
                            Update Subjects
                        </h1>
                        <p className="text-paragraph text-muted-foreground">
                            Modify the Subjects Name & Description below.
                        </p>
                    </div>
                </Modalheader>

                {/* BODY */}
                <Modalbody fixedHeight={false}>
                    <div className="p-4 space-y-3">

                        <label className="text-sm font-medium">
                            Subjects Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter year name (e.g. 2023-2024)"
                            className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                    </div>
                    
            
                    <div className="p-4 space-y-3">

                        <label className="text-sm font-medium">
                            Subjects Description
                        </label>

                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Description(e.g. second term)"
                            className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                    </div>
                </Modalbody>

                {/* FOOTER */}
                <Modalfooter>

                    <Button
                        onClick={handleSubmit}
                        className="rounded-xl bg-primary-500 hover:bg-primary-600 text-black px-5 py-3 h-12"
                        disabled={updating || !name.trim()}
                    >
                        {updating ? 'Updating...' : 'Update'}
                    </Button>

                </Modalfooter>

            </Fragment>
        </Modal>
    );
};

export default UpdateSubjectsModal;


//UpdateSubjectsModal