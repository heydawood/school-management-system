import { Fragment, useEffect, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../ui/input/input';
import { defaultValues, setDefaultValues, type FormTypes } from '@/Forms/UpdateFormTypes';

interface Props {
  close: () => void;
  onUpdate: (updatedData: { name: string; description: string }) => void;
  classLevelsId: string | null;
  updating: boolean;
  initialName?: string;
  initialDescription?: string;
}

const UpdateClassLevelsModal: FC<Props> = ({
  close,
  updating,
  onUpdate,
  initialName = '',
  initialDescription = '',
}) => {

  const form = useForm<FormTypes>({
    defaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, reset } = form;

  // initial values 
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

    onUpdate({
      name: data.name,
      description: data.description,
    });
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
              Update Class Level
            </h1>
            <p className="text-paragraph text-muted-foreground">
              Modify the Class Level Name & Description below.
            </p>
          </div>
        </Modalheader>

        {/* FORM */}
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* BODY */}
            <Modalbody fixedHeight={false}>
              <div className="p-4 space-y-3">
                <Input
                  label="Class Level Name"
                  name="name"
                  placeholder="Enter class level name"
                  rules={{ required: 'Name is required' }}
                />
              </div>

              <div className="p-4 space-y-3">
                <Input
                  label="Class Level Description"
                  name="description"
                  placeholder="Enter description"
                  rules={{ required: 'Description is required' }}
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

export default UpdateClassLevelsModal;