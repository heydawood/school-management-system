import { Button } from '@/components/ui/button';
import Modalbody from '@/components/ui/modal/Body';
import Modalfooter from '@/components/ui/modal/Footer';
import Modalheader from '@/components/ui/modal/Header';
import Modal from '@/components/ui/modal/Modal';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { Fragment, type FC } from 'react';
import { Plus } from 'lucide-react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import Input from '@/components/ui/input/input';
import SVG from 'react-inlinesvg';
import type { GetSubscriptions } from '@/pages/Dashboard/Subscriptions/Types';
import { MAX_Char_LENGTH } from '@/Utils/Constants';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch } from '@/Redux/Hooks';
import { getSubscriptionList, removeSubscriptionFeature, updateSingleSubscription } from '@/Redux/Subscription/Slice';
import { useCustomAlert } from '@/Common/Components/CustomAlert';
import { truncateText } from '@/Utils/Helpers';

interface Props {
  close: () => void;
  subscriptionData: GetSubscriptions | null;
}

const UpdateSubscriptionModal: FC<Props> = ({ close, subscriptionData }) => {
  const showAlert = useCustomAlert();

  const dispatch = useAppDispatch();
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      id: subscriptionData?.planId ?? '',
      price: subscriptionData?.price ?? '',
      name: subscriptionData?.planName ?? '',
      features: subscriptionData?.items?.map((item) => ({
        featureId: item?.itemId,
        feature: item?.itemName ?? '',
      })) ?? [{ featureId: undefined, feature: '' }],
    },
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features',
  });

  const onSubmit = async (data: any) => {
    const formData = {
      nameEn: data?.name ?? '',
      nameAr: '',
      nameUr: '',
      price: Number(data?.price) || 0,
      items: data?.features?.map((item: any) => ({
        itemId: Number(item?.featureId),
        itemEn: item?.feature ?? '',
        itemAr: '',
        itemUr: '',
      })),
    };

    dispatch(updateSingleSubscription({ id: data?.id, payload: formData }))
      .unwrap()
      .then((response) => {
        dispatch(getSubscriptionList());
        close();
        customToast.success(response.message || 'Successfully Updated!');
      })
      .catch((error) => {
        customToast.error(error || 'Please try again.');
      });
  };

  const handleRemoveFeature = (index: number, featureId?: string) => {
    showAlert({
      title: 'Delete Feature',
      description: 'Are you sure you want to delete this feature? Once deleted, it cannot be recovered.',
      confirmText: 'Yes',
      cancelText: 'No',
      customLogo: <Icon icon="/icons/trash.svg" />,
      logoClasses: 'bg-error-100 text-error',
      onConfirm: () => {
        if (featureId) {
          dispatch(removeSubscriptionFeature({ id: featureId }))
            .unwrap()
            .then((response) => {
              remove(index);
              customToast.success(response.message || 'Successfully deleted!');
            })
            .catch((error) => {
              customToast.error(error || 'Please try again.');
            });
        } else {
          remove(index);
        }
      },
      classNames: {
        confirmButton: 'hover:bg-error bg-error-25 text-error-800 hover:text-white rounded-xl',
        cancelButton: 'border border-neutral-975 bg-transparent hover:bg-primary hover:border-primary hover:text-white rounded-xl',
      },
    });
  };

  return (
    <Modal classNames="md:max-w-[624px] md:min-w-[624px] overflow-x-auto scrollbar-thin" closeModal={close}>
      <Fragment>
        <Modalheader
          logoClasses="bg-primary-500"
          customLogo={<Icon icon="/icons/sidebar-badge-percent.svg" className="text-white" />}
          className="p-6"
          contentLocation="left"
          showCloseButton={true}
          onCloseClick={close}
        >
          <div>
            <h1 className="text-heading break-all font-semibold">Update {truncateText(subscriptionData?.planName!, 30) ?? ''}</h1>
            <p className="text-paragraph break-all text-gray-500">Edit the followings to update {truncateText(subscriptionData?.planName!, 100) ?? ''} subscription.</p>
          </div>
        </Modalheader>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <Modalbody className="px-6 py-3" fixedHeight={false}>
              <div className="space-y-2 max-h-[60vh]">
                {/* Price */}
                <div>
                  <Input
                    type="text"
                    name="price"
                    label="Subscription Price"
                    placeholder="Enter subscription price"
                    icon={<SVG src="/icons/coin-dollar.svg" />}
                    iconPosition="right"
                  />
                </div>

                {/* Name */}
                <div>
                  <Input type="text" name="name" label="Subscription Name" placeholder="Enter subscription name" maxLength={MAX_Char_LENGTH} />
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="relative mb-2">
                      <Input type="text" name={`features.${index}.feature`} placeholder={`Feature ${index + 1}`} label="Feature List" maxLength={MAX_Char_LENGTH} />

                      {fields.length > 1 && (
                        <button type="button" className="absolute top-0 right-0 text-error-500 font-normal text-sm" onClick={() => handleRemoveFeature(index, field?.featureId)}>
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    className="rounded-lg flex items-center justify-center gap-2 w-full h-[44px] bg-primary-25 hover:bg-primary-50"
                    onClick={() => append({ featureId: undefined, feature: '' })}
                  >
                    <span className="h-5 w-5 rounded-full bg-primary-800 flex items-center justify-center">
                      <Plus />
                    </span>
                    <span className="text-primary-800 font-semibold text-[16px]">Add Another Feature</span>
                  </Button>
                </div>
              </div>
            </Modalbody>

            <Modalfooter>
              <div className="grid grid-cols-4 w-full gap-3">
                <Button onClick={close} type="button" variant="outline" className="w-full col-span-1 rounded-xl hover:bg-primary hover:text-white mt-2 px-5 py-3 h-12">
                  Close
                </Button>

                <Button type="submit" className="w-full col-span-3 rounded-xl text-white mt-2 px-5 py-3 h-12">
                  Update Subscription
                </Button>
              </div>
            </Modalfooter>
          </form>
        </FormProvider>
      </Fragment>
    </Modal>
  );
};

export default UpdateSubscriptionModal;
