import { SetSettingsFormDefaultValues, SettingsFormDefaultValues, type SettingsFormTypes } from '@/Forms/Settings';
import { FormProvider, useForm } from 'react-hook-form';
import UserInfoForm from './UserInfoForm';
import UpdatePasswordForm from './PasswordChangeForm';
import { useEffect, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { Button } from '@/components/ui/button';
import type { BasicSettingsResponse } from '@/pages/Dashboard/Settings/Types';
import { customToast } from '@/Common/Components/ShowToast';
import { updateAdminBasicSettings, updateTeacherBasicSettings } from '@/Redux/Settings/Slice';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setUserInfo } from '@/Redux/Auth/Slice';

const DownloadCard = ({ logo, title, logoClasses, onDownload }: { logo: ReactNode; title: string; logoClasses: string; onDownload: () => void }) => {
  return (
    <div className="border-2 border-neutral-975 p-4 rounded-xl grow">
      <div className="flex items-center flex-col gap-2">
        <div className={`h-12 w-12 flex justify-center items-center rounded-full ${logoClasses}`}>{logo}</div>
        <h3 className="text-subheading">{title}</h3>
        <Button variant={'link'} className="text-primary font-semibold" onClick={onDownload}>
          Download CSV
        </Button>
      </div>
    </div>
  );
};

const BasicSettingsComponent = ({ basicSetting, setLoading }: { basicSetting: BasicSettingsResponse | undefined; setLoading: Dispatch<SetStateAction<boolean>> }) => {
  const basicSettingsForm = useForm<SettingsFormTypes>({
    defaultValues: SettingsFormDefaultValues,
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.authTeacherReducer);

  const onSubmit = (data: SettingsFormTypes) => {
    setLoading(true);

    // Filter to only send name and email. i don't want to send the avatar because api only accepts name and email
    const payload = {
      name: data.name,
      email: data.email,
    };

    const teacherPayload = {
      teacherId: userId, // from redux, not form
      data: {
        name: data.name,
        email: data.email,
      },
    };


    const role = localStorage.getItem("role");

    let action;

    if (role === "admin") {
      action = updateAdminBasicSettings(payload);
    } 

    else if (role === "teacher") {
      console.log("Data:", payload);
      console.log("User ID:", userId);

    action = updateTeacherBasicSettings({
      teacherId: userId!,
      data: payload,
    });
    } 

    else if (role === "student") {
      action = updateStudentBasicSettings(payload);
    }

    if (!action) {
      customToast.error("Invalid role");
      setLoading(false);
      return;
    }

    dispatch(action)
      .unwrap()
      .then((res: { message: string; data: { name: string; avatar: string; email: string } }) => {
        customToast.success(res.message ?? 'Information saved successfully.');
        dispatch(setUserInfo({ avatar: res.data.avatar, name: res.data.name, userId: userId! }));
      })
      .catch((err: any) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (basicSetting) {
      basicSettingsForm.reset(SetSettingsFormDefaultValues(basicSetting));
    }
  }, [basicSetting]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormProvider {...basicSettingsForm}>
          <div>
            <form onSubmit={basicSettingsForm.handleSubmit(onSubmit)}>
              <UserInfoForm basicSetting={basicSetting} form={basicSettingsForm} />
              {/* <UserLanguageCard />
              <NotificationPrefCard form={basicSettingsForm} /> */}
            </form>
          </div>
        </FormProvider>

        <div>
          <UpdatePasswordForm setLoading={setLoading} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-10">
        <div className="flex gap-4 flex-col">
          <Button onClick={basicSettingsForm.handleSubmit(onSubmit)} className="bg-primary text-white w-full h-[44px] rounded-xl">
            Save Changes
          </Button>
          <Button
            onClick={() => basicSettingsForm.reset(SetSettingsFormDefaultValues(basicSetting!))}
            className="bg-primary-25 text-primary-800 hover:text-white hover:bg-primary w-full h-[44px] rounded-xl"
          >
            Discard Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicSettingsComponent;