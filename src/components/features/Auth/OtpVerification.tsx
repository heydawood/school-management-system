import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { OtpVerificationFormDefaultValues, type OtpVerificationFormTypes } from '@/Forms/OtpVerification';
import { useAppDispatch } from '@/Redux/Hooks';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';
import { resendOtp, setOtp, verifyOtp } from '@/Redux/Auth/Slice';
import { customToast } from '@/Common/Components/ShowToast';
import Loader from '@/components/ui/loader/Loader';

const OtpVerificationForm: React.FC<{ email: string | null }> = ({ email }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const otpVerificationForm = useForm<OtpVerificationFormTypes>({
    defaultValues: OtpVerificationFormDefaultValues,
    mode: 'onChange',
  });

  const { setValue } = otpVerificationForm;

  const onSubmit = (data: OtpVerificationFormTypes) => {
    setIsSubmitting(true);
    dispatch(verifyOtp({ email: email!, otp: +data.otp }))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'OTP sent to your email');
        dispatch(setOtp(data.otp));
        navigate(routes.ResetPassword());
        otpVerificationForm.reset();
      })
      .catch((err) => {
        customToast.error(err || 'Something went wrong');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleResend = () => {
    setIsSubmitting(true);
    dispatch(resendOtp({ email: email! }))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'OTP sent to your email');
        otpVerificationForm.reset();
      })
      .catch((err) => {
        customToast.error(err || 'Something went wrong');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <FormProvider {...otpVerificationForm}>
      {isSubmitting && <Loader />}
      <form onSubmit={otpVerificationForm.handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full">
          <InputOTP className="w-full" onChange={(val) => setValue('otp', val)} maxLength={6}>
            <div className="w-full grid grid-cols-4">
              <InputOTPGroup className="gap-2 w-full">
                <InputOTPSlot index={0} className="rounded-xl w-full h-14 border-2  mx-2  text-2xl" />
              </InputOTPGroup>
              <InputOTPGroup className="gap-2 w-full">
                <InputOTPSlot index={1} className="rounded-xl w-full h-14 border-2  mx-2 text-2xl" />
              </InputOTPGroup>
              <InputOTPGroup className="gap-2 w-full">
                <InputOTPSlot index={2} className="rounded-xl w-full h-14 border-2  mx-2 text-2xl" />
              </InputOTPGroup>
              <InputOTPGroup className="gap-2 w-full">
                <InputOTPSlot index={3} className="rounded-xl w-full h-14 border-2  mx-2 text-2xl" />
              </InputOTPGroup>
            </div>
          </InputOTP>
        </div>

        <p className="text-center text-sm py-4 text-gray-25 font-semibold">
          Didn’t receive the verification code?
          <Button variant={'link'} type="button" onClick={handleResend} className="text-primary-500 ps-2 text-sm font-bold">
            Resend
          </Button>
        </p>

        <Button type="submit" className="w-full h-[54px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center font-semibold text-[14px] 2xl:text-[18px] text-white">
          Continue
        </Button>
      </form>
    </FormProvider>
  );
};

export default OtpVerificationForm;
