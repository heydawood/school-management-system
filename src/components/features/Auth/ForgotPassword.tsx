import { customToast } from '@/Common/Components/ShowToast';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { Label } from '@/components/ui/label';
import Loader from '@/components/ui/loader/Loader';
import RequiredAsterisk from '@/components/ui/requiredAsterisk';
import { ForgotPasswordFormDefaultValues, type ForgotPasswordFormTypes } from '@/Forms/ForgotPassword';
import { forgotPassword, setEmail } from '@/Redux/Auth/Slice';
import { useAppDispatch } from '@/Redux/Hooks';
import { is } from 'date-fns/locale';
import React, { use, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SVG from 'react-inlinesvg';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const forgotPasswordForm = useForm<ForgotPasswordFormTypes>({
    defaultValues: ForgotPasswordFormDefaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: ForgotPasswordFormTypes) => {
    setIsSubmitting(true);
    dispatch(forgotPassword(data.email))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'OTP sent to your email');
        dispatch(setEmail(data.email));
        navigate('/auth/verify-otp', { state: { email: data.email } });
        forgotPasswordForm.reset();
      })
      .catch((err) => {
        customToast.error(err || 'Something went wrong');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <FormProvider {...forgotPasswordForm}>
      {isSubmitting && <Loader />}
      <form onSubmit={forgotPasswordForm.handleSubmit(onSubmit)} className="space-y-4">
        <div className="">
          <Label>
            Email
            <span>
              <RequiredAsterisk />
            </span>
          </Label>
          <Input
            type="text"
            placeholder="Enter your email address"
            label=""
            classNames="w-full h-[44px] mb-4"
            name="email"
            rules={{
              required: 'Email is not correct, please check.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
                message: 'Email is not correct, please check.',
              },
            }}
            icon={<SVG src="/icons/gmail.svg" />}
            // icon="icons/email.svg"
            // icon={FaEnvelope
            iconPosition="left"
          />
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full h-[54px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center font-semibold text-[14px] 2xl:text-[18px] text-white"
        >
          Send Code
        </Button>
        <p className="text-center py-4 text-gray-25 font-semibold">
          Remember your password?{' '}
          <Link to="/auth/login" className="text-primary-500 font-bold">
            Log in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
