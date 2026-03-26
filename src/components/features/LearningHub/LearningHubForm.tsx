import { customToast } from '@/Common/Components/ShowToast';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { useAppDispatch } from '@/Redux/Hooks';
import { useEffect, useState, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as routes from '@/routes/Index';
import { useCustomAlert } from '@/Common/Components/CustomAlert';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import Textarea from '@/components/ui/textarea/Textarea';
import FileDropzone from '@/components/ui/FileDropzone';
import FileUploader from '@/components/ui/file_uploader/FileUploader';
import { commonFileUpload } from '@/Redux/Common/Slice';
import type { IFileUploadResponse } from '@/Utils/Types';
import { LearningHubFormDefaultValues, SetLearningHubFormDefaultValues, type LearningHubFormTypes, type SingleLearningHubType } from '@/Forms/LearningHub';
import { createAdminLearningHub } from '@/Redux/LearningHub/Slice';

interface Props {
  learningHub?: SingleLearningHubType | undefined;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, payload: any) => void;
}

const LearningHubForm: FC<Props> = ({ learningHub, onDelete, onUpdate }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const showAlert = useCustomAlert();

  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');

  const learningHubForm = useForm<LearningHubFormTypes>({
    defaultValues: LearningHubFormDefaultValues,
    mode: 'onChange',
  });
  const {
    setValue,
    watch,
    formState: { isSubmitting },
  } = learningHubForm;

  const onSubmit = (data: LearningHubFormTypes) => {
    const payload = {
      titleEn: data.titleEn,
      titleAr: null,
      titleUr: null,
      image: data?.image ?? null,
      video: data?.video ?? null,
      description: data?.description ?? null,
    };
    if (!data.image && !data.video) {
      learningHubForm.setError('image', {
        type: 'manual',
        message: 'Please provide an image or video before submitting',
      });
      return;
    }

    dispatch(createAdminLearningHub(payload))
      .unwrap()
      .then((res: { message: string; data: { dietPlanId: number } }) => {
        customToast.success(res.message || 'Learning Hub created successfully');
        learningHubForm.reset();
        navigate(routes.LearningHubEdit(res.data.dietPlanId));
      })
      .catch((err: any) => {
        customToast.error(err || 'Failed to create Learning Hub');
        learningHubForm.reset();
      })
      .finally(() => {});
  };

  const updateLearningHub = () => {
    const data = learningHubForm.getValues();
    if (!data.image && !data.video) {
      learningHubForm.setError('image', {
        type: 'manual',
        message: 'Please provide an image or video before submitting',
      });
      return;
    }
    const payload = {
      titleEn: data.titleEn,
      titleAr: null,
      titleUr: null,
      image: data?.image ?? null,
      video: data?.video ?? null,
      description: data?.description ?? null,
    };

    if (id) {
      onUpdate?.(+id, payload);
      setEditing(false);
    }
  };

  const deleteLearningHub = () => {
    showAlert({
      title: 'Delete Learning Hub',
      description: 'Are you sure you want to delete this learning hub? Deleted learning hub will no longer be able to access again.',
      confirmText: 'Yes',
      cancelText: 'No',
      customLogo: <Icon icon="/icons/trash.svg" />,
      logoClasses: 'bg-error-100 text-error',
      onConfirm: () => {
        onDelete?.(learningHub?.dietPlanId!);
      },
      classNames: {
        confirmButton: 'hover:bg-error bg-error-25 text-error-800 hover:text-white rounded-xl',
        cancelButton: 'border border-neutral-975 bg-transparent hover:bg-primary hover:border-primary hover:text-white rounded-xl',
      },
    });
  };

  // File Upload
  const handleFileUpload = (files: FileList, type: 'image' | 'video') => {
    setUploading(true);

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    dispatch(commonFileUpload(formData))
      .unwrap()
      .then((res: { message: string; data: IFileUploadResponse }) => {
        if (type === 'image') {
          setValue('image', res?.data?.shortUrl);
          setImage(res?.data?.url);
        } else {
          setValue('video', res?.data?.shortUrl);
          setFile(res?.data?.url);
        }
        learningHubForm.clearErrors('image');
        customToast.success(res.message || 'File uploaded successfully');
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  useEffect(() => {
    if (learningHub) {
      learningHubForm.reset(SetLearningHubFormDefaultValues(learningHub));
      setImage(learningHub?.imageFullUrl);
      setFile(learningHub?.videoFullUrl);
    }
  }, [id, learningHub]);

  return (
    <div>
      {isSubmitting && <p>Submitting...</p>}
      <FormProvider {...learningHubForm}>
        <form onSubmit={learningHubForm.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                disabled={id && !editing}
                allowAsterisk
                type="text"
                placeholder="Enter learning hub title"
                label="Learning hub"
                classNames=" h-[44px]"
                rules={{ required: 'Learning hub is required' }}
                name="titleEn"
              />
            </div>
            <div className="col-span-2">
              <Textarea
                placeholder="Enter learning hub description"
                label="Description"
                name="description"
                rows="4"
                className="h-[40px]"
                rules={{ required: 'Learning hub description is required' }}
              />
            </div>
            <div>
              <FileDropzone title="Drag or upload learning hub video here." key={watch('video')} filePath={file} fileType="Video" />

              {!uploading ? (
                <FileUploader onFilesSelected={(files) => handleFileUpload(files, 'video')} accept="video/*" multiple={false}>
                  <p className="text-center text-paragraph font-semibold hover:underline hover:text-primary text-gray-700">Upload Video</p>
                </FileUploader>
              ) : (
                <p className="text-center text-paragraph font-semibold text-gray-700">Uploading...</p>
              )}
            </div>
            <div>
              <FileDropzone title="Drag or upload learning hub image here." key={watch('image')} filePath={image} fileType="Image" />

              {!uploading ? (
                <FileUploader onFilesSelected={(files) => handleFileUpload(files, 'image')} accept="image/*" multiple={false}>
                  <p className="text-center text-paragraph font-semibold hover:underline hover:text-primary text-gray-700">Upload Image</p>
                </FileUploader>
              ) : (
                <p className="text-center text-paragraph font-semibold text-gray-700">Uploading...</p>
              )}
            </div>
            <p className="text-error-500 text-sm">{learningHubForm.formState.errors.image?.message || learningHubForm.formState.errors.video?.message}</p>
          </div>

          {!id ? (
            <Button type="submit" className="w-full h-[44px] mt-4 rounded-xl bg-primary-25 text-primary-800 hover:text-white">
              Create Learning Hub
            </Button>
          ) : editing ? (
            <Button type="button" onClick={updateLearningHub} className="w-full h-[44px] mt-4 rounded-xl bg-primary-25 text-primary-800 hover:text-white">
              Update Learning Hub
            </Button>
          ) : (
            <div className="mt-4 flex justify-between items-center gap-2">
              <Button onClick={() => setEditing(true)} type="button" className="w-full h-[44px] mt-4 rounded-xl bg-primary-25 text-primary-800 hover:text-white">
                Edit Learning Hub
              </Button>
              <Button type="button" onClick={deleteLearningHub} className="w-full h-[44px] mt-4 rounded-xl bg-error-25 text-error-800 hover:text-white hover:bg-error">
                Delete Learning Hub
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default LearningHubForm;
