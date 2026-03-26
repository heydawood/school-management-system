import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch } from '@/Redux/Hooks';
import type { Dispatch, SetStateAction } from 'react';
import PasswordInput from '@/components/ui/password_input/password-input';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { Button } from '@/components/ui/button';
import { CreateAdminDefaultValues, type CreateAdminTypes } from '@/Forms/CreateAdminForm';
import { createNewAdmin } from '@/Redux/Admin/Slice';
import Input from '@/components/ui/input/input';


interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateAdminForm = ({ setLoading }: Props) => {

  const createAdminForm = useForm<CreateAdminTypes>({
    defaultValues: CreateAdminDefaultValues,
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: CreateAdminTypes) => {
    setLoading(true);
    dispatch(createNewAdmin(data))
      .unwrap()
      .then((res) => {
        customToast.success(res.message ?? 'Admin created successfully.');
        createAdminForm.reset();
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
      <StatChartCard date={''} withDate={false} icon={'/icons/user-add.svg'} title={'New Admin Form'}>
        <div className="mt-4">
          <FormProvider {...createAdminForm}>
            <form onSubmit={createAdminForm.handleSubmit(onSubmit)}>

              {/* Name */}
              <div className="mb-6">
                <Input
                label='Full Name'
                  type="text"
                  placeholder="Enter Full Name"
                  {...createAdminForm.register('name', {
                    required: 'Full Name is required',
                    minLength: {
                      value: 2,
                      message: 'Full Name must be at least 2 characters long',
                    },
                  })}
                  
                />
                
              </div>

              {/* Email */}
              <div className="mb-6">
                
                <Input
                label='Email Address'
                  type="email"
                  placeholder="Enter Email"
                  {...createAdminForm.register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  
                />

                {/* {createAdminForm.formState.errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {createAdminForm.formState.errors.email.message}
                  </span>
                )} */}
                
              </div>

              {/* Password Fields Grid */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
                <div>
                  <PasswordInput
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    label="Password"
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
                    placeholder="Confirm password"
                    label="Confirm Password"
                    rules={{
                      required: 'Please confirm your password.',
                      validate: (value: string) =>
                        value === createAdminForm.getValues('password') || 'Passwords do not match',
                    }}
                    classNames="w-full h-[44px]"
                    icon={<Icon icon="/icons/lock.svg" className="text-black" />}
                    iconPosition="left"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
              >
                Create Admin
              </Button>
            </form>
          </FormProvider>
        </div>
      </StatChartCard>
    </div>
  );
};

export default CreateAdminForm;