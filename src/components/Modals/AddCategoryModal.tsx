import { Fragment, useState } from 'react';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import { Button } from '../ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { CategoryFormDefaultValues, type CategoryFormTypes } from '@/Forms/Category';
import Input from '../ui/input/input';
import { useAppDispatch } from '@/Redux/Hooks';
import { createAdminWorkoutCategory } from '@/Redux/Workouts/Slice';
import { customToast } from '@/Common/Components/ShowToast';
import Loader from '../ui/loader/Loader';

interface Props {
  close: () => void;
  getCategories: () => void;
}
const AddCategoryModal = ({ close, getCategories }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<CategoryFormTypes>({
    defaultValues: CategoryFormDefaultValues,
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: CategoryFormTypes) => {
    const payload = {
      nameEn: data.name,
      nameAr: null,
      nameUr: null,
      isActive: true,
    };
    setLoading(true);
    dispatch(createAdminWorkoutCategory(payload))
      .unwrap()
      .then((res: any) => {
        close();
        getCategories && getCategories();
        customToast.success(res.message || 'Category created successfully');
      })
      .catch((err: any) => {
        customToast.error(err.message || 'Failed to create category');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      {loading && <Loader />}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Modal classNames={`md:max-w-[40%] md:min-w-[40%] h-fit overflow-x-auto scrollbar-thin`} closeModal={close}>
            <Fragment>
              <Modalheader
                logoClasses="bg-primary"
                customLogo={<Icon icon="/icons/dumbell.svg" className="text-white" />}
                className="p-4"
                contentLocation="left"
                showCloseButton={true}
                onCloseClick={close}
              >
                <div>
                  <h1 className="text-heading font-semibold">Add New Category</h1>
                  <p className="text-paragraph text-gray-500">Here you can add a new workout category.</p>
                </div>
              </Modalheader>
              <Modalbody fixedHeight={false}>
                <div>
                  <div className="mt-2">
                    <div>
                      <Input
                        name="name"
                        type="text"
                        label="Category Name"
                        placeholder="Enter category name"
                        classNames=" h-[44px]"
                        rules={{ required: 'Category name is required' }}
                        allowAsterisk
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full col-span-1 rounded-xl hover:text-white  mt-4 px-5 py-3 h-12">
                    Create Category
                  </Button>
                </div>
              </Modalbody>
            </Fragment>
          </Modal>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddCategoryModal;
