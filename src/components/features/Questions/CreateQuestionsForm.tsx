import { FormProvider, useForm } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch } from '@/Redux/Hooks';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { createNewQuestion } from '@/Redux/Questions/Slice';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateQuestionDefaultValues, type CreateQuestionTypes } from '@/Forms/CreateQuestionsFormTypes';
import { useCreateQuestions } from '@/Hooks/TanStack/Questions/useCreateQuestions';

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}


const CreateQuestionsForm = ({ setLoading }: Props) => {
  const navigate = useNavigate();

  const { examId } = useParams();

  const form = useForm<CreateQuestionTypes>({
    defaultValues: CreateQuestionDefaultValues,
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();


  

  // const onSubmit = (data: CreateQuestionTypes) => {

  //   if (!examId) {
  //     customToast.error("Exam ID missing");
  //     return;
  //   }

  //   console.log('Submit:', data);

  //   setLoading(true);
  //   dispatch(createNewQuestion({ examId, data }))
  //     .unwrap()
  //     .then((res) => {
  //       customToast.success(res.message ?? 'Question created successfully.');
  //       form.reset();
  //     })
  //     .catch((err) => {
  //       customToast.error(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
const createMutation = useCreateQuestions();
  const onSubmit = (data: CreateQuestionTypes) => {
    if (!examId) {
      customToast.error('Exam ID missing');
      return;
    }

    console.log('Submit:', data);

    createMutation.mutate(
      {
        examId,
        data,
      },
      {
        onSuccess: () => {
          form.reset();
        },

        onError: (err: any) => {
          customToast.error(err?.message || 'Something went wrong');
        },
      }
    );
  };


  return (
    <div className="mt-4 md:mt-0">
      <StatChartCard
        date={''}
        withDate={false}
        icon={'/icons/pencil.svg'}
        title={'New Question Form'}
      >
        <div className="mt-4">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              {/* Question */}
              <div className="mb-6">
                <Input
                  allowAsterisk
                  label="Question"
                  placeholder="Enter question"
                  name='question'
                  rules={{
                    required: 'Question is required',
                    minLength: {
                      value: 5,
                      message: 'Question must be at least 5 characters',
                    },
                  }}
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <Input
                  allowAsterisk
                  label="Option A"
                  placeholder="Enter option A"
                  name='optionA'
                  rules={{ required: 'Option A is required' }}
                />

                <Input
                  allowAsterisk
                  label="Option B"
                  placeholder="Enter option B"
                  name='optionB'
                  rules={{ required: 'Option B is required' }}
                />

                <Input
                  allowAsterisk
                  label="Option C"
                  placeholder="Enter option C"
                  name='optionC'
                  rules={{ required: 'Option C is required' }}
                />

                <Input
                  allowAsterisk
                  label="Option D"
                  placeholder="Enter option D"
                  name='optionD'
                  rules={{ required: 'Option D is required' }}
                />

              </div>

              {/* Correct Answer Dropdown */}

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


              </div>


              {/* Is Correct */}
              <div className="mb-6 flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  {...form.register('isCorrect')}
                  className="w-4 h-4"
                />
                <label className="text-sm">Mark as Correct</label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full mb-3 h-[44px] rounded-[12px] bg-green-500 hover:bg-green-600 text-white"
              >
                {createMutation.isPending ? 'Saving...' : 'Save Question'}
              </Button>


            </form>

            <Button className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-white" onClick={() => navigate('/dashboard/teacher/exams')}>
              Go Back
            </Button>

          </FormProvider>
        </div>
      </StatChartCard>
    </div>
  );
};

export default CreateQuestionsForm;