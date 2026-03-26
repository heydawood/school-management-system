import { customToast } from '@/Common/Components/ShowToast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/ui/password_input/password-input';
import RequiredAsterisk from '@/components/ui/requiredAsterisk';
import type { ResetPasswordFormTypes } from '@/Forms/ResetPassword';
import { clearForgotFlow, resetPassword } from '@/Redux/Auth/Slice';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SVG from 'react-inlinesvg';
import { useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';
import Loader from '@/components/ui/loader/Loader';

const ResetPasswordForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, otp } = useAppSelector((state) => state.authReducer);
  const resetPasswordForm = useForm<ResetPasswordFormTypes>();

  const onSubmit = (data: ResetPasswordFormTypes) => {
    setIsSubmitting(true);
    const payload = {
      email: email as string,
      password: data.password,
      passwordConfirmation: data.confirmPassword,
      passwordResetCode: Number(otp),
    };
    dispatch(resetPassword(payload))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'OTP sent to your email');
        dispatch(clearForgotFlow());
        navigate(routes.Login());
        resetPasswordForm.reset();
      })
      .catch((err) => {
        customToast.error(err || 'Something went wrong');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <FormProvider {...resetPasswordForm}>
      {isSubmitting && <Loader />}
      <form onSubmit={resetPasswordForm.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6">
          <Label>
            Password
            <span>
              <RequiredAsterisk />
            </span>
          </Label>
          <PasswordInput
            type="password"
            name="password"
            placeholder="Enter your password here"
            label=""
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
            icon={<SVG src="/icons/lock.svg" />}
            iconPosition="left"
          />
        </div>

        <div className="mb-6">
          <Label>
            Confirm Password
            <span>
              <RequiredAsterisk />
            </span>
          </Label>
          <PasswordInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password here"
            label=""
            rules={{
              required: 'Confirm Password must be at least 8 characters long, including one capital letter.',
              validate: (value: string) => value === resetPasswordForm.getValues('password') || 'Passwords do not match',
            }}
            classNames="w-full h-[44px]"
            icon={<SVG src="/icons/lock.svg" />}
            iconPosition="left"
          />
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full h-[54px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center font-semibold text-[14px] 2xl:text-[18px] text-white"
        >
          Confirm
        </Button>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;
