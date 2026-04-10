import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import type { Dispatch, SetStateAction } from 'react';
import PasswordInput from '@/components/ui/password_input/password-input';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { Button } from '@/components/ui/button';
import { CreateAdminDefaultValues, type CreateAdminTypes } from '@/Forms/CreateAdminForm';
import Input from '@/components/ui/input/input';
import { useNavigate } from 'react-router-dom';
import { useAdminManager } from '@/pages/Dashboard/AdminPanel/Admins/AdminManager';


interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateAdminForm = ({ setLoading }: Props) => {

  const createAdminForm = useForm<CreateAdminTypes>({
    defaultValues: CreateAdminDefaultValues,
    mode: 'onChange',
  });

  //const dispatch = useAppDispatch();
  const navigate = useNavigate();

//  const createMutation = useCreateAdmin();

//   const onSubmit = (data: CreateAdminTypes) => {
//     createMutation.mutate(data, {
//       onSuccess: () => {
//         createAdminForm.reset();
//         navigate('/dashboard/admins');
//       },
//       onError: (err: any) => {
//         customToast.error(err?.message);
//       },
//     });
//   };


const { createNewAdmin, isCreating } = useAdminManager();

  const onSubmit = (data: CreateAdminTypes) => {
    createNewAdmin(data, {
      onSuccess: () => {
        createAdminForm.reset();
        navigate('/dashboard/admins');
      },
      onError: (err: any) => {
        customToast.error(err?.message);
      },
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
                  name='name'
                  rules={{
                    required: 'Full Name is required',
                    minLength: {
                      value: 2,
                      message: 'Full Name must be at least 2 characters long',
                    }}
                  }
                />
                
              </div>

              {/* Email */}
              <div className="mb-6">
                
                <Input
                label='Email Address'
                  type="email"
                  placeholder="Enter Email"
                  name='email'
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  }}
                />
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
                onClick={() => navigate('/dashboard/admins')}

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