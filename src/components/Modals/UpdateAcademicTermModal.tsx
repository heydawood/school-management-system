import { Fragment, useEffect, useState, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import { defaultValues, setDefaultValues, type FormTypes } from '@/Forms/UpdateFormTypes';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../ui/input/input';

interface Props {
    close: () => void;
    onUpdate: (updatedData: { name: string; description: string }) => void;
    academicTermId: string | null;
    updating: boolean;
    initialName?: string; // pass existing name
    initialDescription?: string; // pass existing description
}

const UpdateAcademicTermModal: FC<Props> = ({
    close,
    updating,
    onUpdate,
    initialName = '',
    initialDescription = ''
}) => {
    
    // useEffect(() => {
    //     setName(initialName);
    //     setDescription(initialDescription);
    // }, [initialName, initialDescription]);

    const form = useForm<FormTypes>({
        defaultValues,
        mode: 'onChange',
    });

    const { register, handleSubmit, reset } = form;

    useEffect(() => {
        reset(
            setDefaultValues({
                name: initialName,
                description: initialDescription,
            })
        );
    }, [initialName, initialDescription, reset]);

    const onSubmit = (data: FormTypes) => {
        if (!data.name.trim()) return;
        onUpdate(data);
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
                            Update Academic Term
                        </h1>
                        <p className="text-paragraph text-muted-foreground">
                            Modify the academic term below.
                        </p>
                    </div>
                </Modalheader>

                {/* BODY */}
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Modalbody fixedHeight={false}>
                            <div className="p-4 space-y-3">

                                {/* <label className="text-sm font-medium">
                                    Academic Term Name
                                </label> */}

                                <Input
                                label='Academic Term Name'
                                name='name'
                                rules={{ required: true }}
                                placeholder="Enter term name"
                                //className="w-full border rounded-lg px-4 py-2"
                                />

                            </div>

                            <div className="p-4 space-y-3">

                                <label className="text-sm font-medium">
                                    Description
                                </label>

                                <Input
                                    name='description'
                                    rules={{ required: true }}
                                    label='Description'
                                    placeholder="Enter description"
                                   // className="w-full border rounded-lg px-4 py-2"
                                />

                            </div>
                        </Modalbody>

                        {/* FOOTER */}
                        <Modalfooter>
                            <Button
                                type="submit"
                                disabled={updating}
                                className="rounded-xl bg-primary-500 text-black px-5 py-3 h-12"
                            >
                                {updating ? 'Updating...' : 'Update'}
                            </Button>
                        </Modalfooter>

                    </form>
                </FormProvider>

            </Fragment>
        </Modal>
    );
};

export default UpdateAcademicTermModal;