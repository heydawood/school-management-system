import { customToast } from '@/Common/Components/ShowToast';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import FileUploader from '@/components/ui/file_uploader/FileUploader';
import Input from '@/components/ui/input/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import type { SettingsFormTypes } from '@/Forms/Settings';
import type { BasicSettingsResponse } from '@/pages/Dashboard/Settings/Types';
import { commonFileUpload } from '@/Redux/Common/Slice';
import { useAppDispatch } from '@/Redux/Hooks';
import type { IFileUploadResponse } from '@/Utils/Types';
import { useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<SettingsFormTypes>;
  basicSetting: BasicSettingsResponse | undefined;
}

const UserInfoForm = ({ basicSetting, form }: Props) => {
  const [file, setFile] = useState<string>('');
  const dispatch = useAppDispatch();
  const { watch } = form;

  // File Upload
  const handleFileUpload = (files: FileList) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    dispatch(commonFileUpload(formData))
      .unwrap()
      .then((res: { message: string; data: IFileUploadResponse }) => {
        form.setValue('avatar', res?.data?.shortUrl);
        setFile(res?.data?.url);
        customToast.success(res.message || 'File uploaded successfully');
      })
      .catch((err) => {
        customToast.error(err);
      });
  };

  useEffect(() => {
    if (basicSetting) {
      setFile(basicSetting?.avatar || '');
    }
  }, [basicSetting]);

  return (
    <div>
      <div className="w-full p-4 border-2 border-neutral-975 rounded-xl">
        <div className="flex justify-center mb-5">
          <Avatar key={file} className="rounded-xl w-40 h-40 relative group">
            <FileUploader onFilesSelected={(files) => handleFileUpload(files)} accept="image/*" multiple={false}>
              <div className="absolute inset-0 bg-black-16  justify-center items-center hidden group-hover:flex cursor-pointer rounded-xl">
                <p className="text-paragraph font-semibold text-center text-white">Upload Photo</p>
              </div>
            </FileUploader>
            <AvatarImage src={file && file !== '' ? file : '/images/user-default.png'} alt="user" className="object-cover" />
          </Avatar>
        </div>
        <Separator className="my-2" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <Input
            name="name"
            placeholder="Name"
            type="text"
            label="Name"
            rules={{ required: 'Name is required' }}
            allowAsterisk
            icon={<Icon icon="/icons/user.svg" className="text-black-100" />}
            iconPosition="left"
          />
          <Input
            name="email"
            placeholder="Email"
            type="text"
            label="Email"
            rules={{ required: 'Email is required' }}
            allowAsterisk
            icon={<Icon icon="/icons/gmail.svg" className="text-black-100" />}
            iconPosition="left"
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
