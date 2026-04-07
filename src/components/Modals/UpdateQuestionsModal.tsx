import { Fragment, useEffect, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../ui/input/input';

interface FormValues {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

interface Props {
  close: () => void;
  onUpdate: (data: FormValues) => void;
  updating: boolean;
  initialData?: Partial<FormValues>;
}

const defaultValues: FormValues = {
  question: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  correctAnswer: '',
};

const UpdateQuestionModal: FC<Props> = ({
  close,
  updating,
  onUpdate,
  initialData,
}) => {

  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = form;

  // Prefill form
  useEffect(() => {
    if (initialData) {
      reset({
        ...defaultValues,
        ...initialData,
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: FormValues) => {
    onUpdate(data);
  };

  const selectedAnswer = watch('correctAnswer');

  return (
    <Modal classNames="md:max-w-[45%]" closeModal={close}>
      <Fragment>

        {/* HEADER */}
        <Modalheader
          logoClasses="bg-primary-100"
          customLogo={<Icon icon="/icons/pencil.svg" className="text-primary-600" />}
          className="p-4"
          contentLocation="left"
          showCloseButton
          onCloseClick={close}
        >
          <div>
            <h1 className="text-heading font-semibold">Update Question</h1>
            <p className="text-paragraph text-muted-foreground">
              Modify question and options below.
            </p>
          </div>
        </Modalheader>

        {/* BODY */}
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Modalbody>

              <div className="p-4 space-y-4">

                {/* Question */}
                <Input
                  name="question"
                  label="Question"
                  placeholder="Enter question"
                  rules={{ required: 'Question is required' }}
                />

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  {['optionA', 'optionB', 'optionC', 'optionD'].map((opt) => (
                    <Input
                      key={opt}
                      name={opt as keyof FormValues}
                      label={opt.replace('option', 'Option ')}
                      placeholder={`Enter ${opt}`}
                      rules={{ required: 'This option is required' }}
                      classNames={`${
                        selectedAnswer === opt
                          ? 'border-green-500 bg-green-50'
                          : ''
                      }`}
                    />
                  ))}
                </div>

                {/* Correct Answer */}
                <div>
                  <label className="text-sm font-medium">Correct Answer</label>

                  <select
                    {...form.register('correctAnswer', {
                      required: 'Please select correct answer',
                    })}
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                  >
                    <option value="">Select correct option</option>
                    <option value="optionA">Option A</option>
                    <option value="optionB">Option B</option>
                    <option value="optionC">Option C</option>
                    <option value="optionD">Option D</option>
                  </select>

                  {errors.correctAnswer && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.correctAnswer.message}
                    </p>
                  )}
                </div>

              </div>

            </Modalbody>

            {/* FOOTER */}
            <Modalfooter>
              <Button
                type="submit"
                className="rounded-xl bg-primary-500 hover:bg-primary-600 text-black px-5 py-3 h-12 w-full"
                disabled={updating || !isValid}
              >
                {updating ? 'Updating...' : 'Update Question'}
              </Button>
            </Modalfooter>

          </form>
        </FormProvider>

      </Fragment>
    </Modal>
  );
};

export default UpdateQuestionModal;