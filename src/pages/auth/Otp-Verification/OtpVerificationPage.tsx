import OtpVerificationForm from '@/components/features/Auth/OtpVerification';
import NextImage from '@/components/ui/nextImage/NextImage';
import { useAppSelector } from '@/Redux/Hooks';

const OtpVerificationPage = () => {
  const { email } = useAppSelector((state) => state.authReducer);
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 "
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
          <h2 className="text-gray-950 font-bold text-[24px] leading-[40px] 2xl:text-[32px]">Enter Verification Code</h2>
          <p className="font-medium 2xl:text-[16px] text-[12px] text-gray-400 leading-[24px]">
            Enter the 4-digit verification code we just sent to <span className="font-semibold text-black">{email}</span>{' '}
          </p>
        </div>
        <OtpVerificationForm email={email} />
      </div>
    </div>
  );
};

export default OtpVerificationPage;
