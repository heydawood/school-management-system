import ResetPasswordForm from '@/components/features/Auth/ResetPassword';
import NextImage from '@/components/ui/nextImage/NextImage';

const ResetPasswordPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 select-none"
      style={{
        backgroundImage: 'url("/images/auth-bg.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="shadow bg-white-100 w-[548px] h-auto rounded-[24px] border border-grayLight-975 px-6 py-8 gap-8 space-y-8">
        <NextImage image="/images/logo1.svg" width={132} height={32} classNames="w-[132px] h-[32px] m-0 p-0" />
        <div className="space-y-2 mt-8">
          <h2 className="text-gray-950 font-bold text-[24px] leading-[40px] 2xl:text-[32px]">Set a New Password</h2>
          <p className="font-medium 2xl:text-[16px] text-[12px] text-gray-400 leading-[24px]">For your security, choose a new password that’s different from your old one.</p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
