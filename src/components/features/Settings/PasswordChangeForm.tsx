import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { PasswordUpdateFormDefaultValues, type PasswordUpdateFormTypes } from '@/Forms/PasswordUpdate';
import PasswordInput from '@/components/ui/password_input/password-input';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { Button } from '@/components/ui/button';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch } from '@/Redux/Hooks';
import type { Dispatch, SetStateAction } from 'react';
import { updateAdminPassword } from '@/Redux/Settings/Slice';

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const UpdatePasswordForm = ({ setLoading }: Props) => {
  const passwordUpdateForm = useForm<PasswordUpdateFormTypes>({
    defaultValues: PasswordUpdateFormDefaultValues,
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: PasswordUpdateFormTypes) => {
    setLoading(true);
    dispatch(updateAdminPassword(data))
      .unwrap()
      .then((res) => {
        customToast.success(res.message ?? 'Password updated successfully.');
        passwordUpdateForm.reset();
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="mt-4 md:mt-0">
      <StatChartCard date={''} withDate={false} icon={'/icons/lock.svg'} title={'Password Update'}>
        <div className="mt-4">
          <FormProvider {...passwordUpdateForm}>
            
            <form onSubmit={passwordUpdateForm.handleSubmit(onSubmit)}>


              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
                <div>
                  <PasswordInput
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    label="New Password"
                    rules={{
                      required: 'Password must be at least 8 characters long, including one capital letter.',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long, including one capital letter.',
                      },
                      pattern: {
                        value: /^(?=.*[A-Z]).{8,}$/, // at least 1 uppercase & min 8 chars
                        message: 'Password must be at least 8 characters long, including one capital letter.',
                      },
                    }}
                    classNames="w-full h-[44px]"
                    icon={<Icon icon="/icons/lock.svg" className="text-black" />}
                    iconPosition="left"
                  />
                </div>

                <div>
                  <PasswordInput
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirm new password"
                    label="Confirm Password"
                    rules={{
                      required: 'Confirm New Password must be at least 8 characters long, including one capital letter.',
                      validate: (value: string) => value === passwordUpdateForm.getValues('password') || 'Passwords do not match',
                    }}
                    classNames="w-full h-[44px]"
                    icon={<Icon icon="/icons/lock.svg" className="text-black-100" />}
                    iconPosition="left"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white">
                Change Password
              </Button>
            </form>
          </FormProvider>
        </div>
      </StatChartCard>
    </div>
  );
};

export default UpdatePasswordForm;
