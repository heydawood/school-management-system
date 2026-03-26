import { customToast } from '@/Common/Components/ShowToast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Input from '@/components/ui/input/input';
import Loader from '@/components/ui/loader/Loader';
import PasswordInput from '@/components/ui/password_input/password-input';
import type { LoginFormTypes } from '@/Forms/Login';
import { adminLogin, setToken, setUserInfo } from '@/Redux/Auth/Slice';
import { useAppDispatch } from '@/Redux/Hooks';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SVG from 'react-inlinesvg';
import { Link, useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';
import type { AuthResponse } from '@/pages/auth/Types';

const LoginForm: React.FC = () => {
  const loginForm = useForm<LoginFormTypes>();

  const {
    formState: { isSubmitting },
  } = loginForm;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginFormTypes) => {

    dispatch(adminLogin(data))
      .unwrap()
      .then((response: { data: AuthResponse; message: string }) => {
        
        const accessToken= response.data.token;
        dispatch(setToken(accessToken));
        dispatch(setUserInfo({ avatar: response.data.avatar, userId: response.data.userId, name: response.data.name }));
        navigate('/dashboard/admin');

        customToast.success(response.message || 'Login successful!');
      })
      .catch((error) => {
        customToast.error(error || 'Login failed. Please try again.');
      });
  };
  return (
    <FormProvider {...loginForm}>
      {isSubmitting && <Loader />}
      
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
        <div className="">
          <Input
            type="text"
            placeholder="Enter your email address"
            label="Email"
            rules={{
              required: 'This field is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
            }}
            allowAsterisk
            classNames="w-full h-[44px]"
            name="email"
            icon={<SVG src="/icons/gmail.svg" />}
            iconPosition="left"
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            allowAsterisk
            type="password"
            name="password"
            rules={{
              required: 'This field is required',
            }}
            placeholder="Enter your password here"
            label="Password"
            classNames="w-full h-[44px]"
            icon={<SVG src="/icons/lock.svg" />}
            iconPosition="left"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="gap-3 flex items-center">
            <Checkbox />
            <span className="text-gray-950 text-[12px] 2xl:text-[14px] font-semibold cursor-pointer">Remember me</span>
          </div>
          <div>
            <Link to={routes.ForgotPassword()} className="text-primary-700 text-[12px] 2xl:text-[14px] font-semibold cursor-pointer">
              Forgot Password?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full h-[54px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center font-semibold text-[14px] 2xl:text-[18px] text-white">
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
