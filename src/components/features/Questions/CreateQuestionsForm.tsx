// import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
// import StatChartCard from '../Dashboard/StatChartCard';
// import { customToast } from '@/Common/Components/ShowToast';
// import { useAppDispatch } from '@/Redux/Hooks';
// import type { Dispatch, SetStateAction } from 'react';
// import { Button } from '@/components/ui/button';
// import Input from '@/components/ui/input/input';
// import { CreateAcademicYearDefaultValues, type CreateAcademicYearTypes } from '@/Forms/CreateAcademicYearForm';
// import { createNewAcademicYear } from '@/Redux/AcademicYears/Slice';




// interface Props {
//   setLoading: Dispatch<SetStateAction<boolean>>;
// }

// const CreateQuestionsForm = ({ setLoading }: Props) => {



//     const createQuestionsForm = useForm<CreateAcademicYearTypes>({
//     defaultValues: CreateAcademicYearDefaultValues,
//     mode: 'onChange',
//   });

//   const dispatch = useAppDispatch();

//   const onSubmit = (data: CreateAcademicYearTypes) => {
//     console.log("Submit clicked: ", data)
//     setLoading(true);
//     dispatch(createNewAcademicYear(data))
//       .unwrap()
//       .then((res) => {
//         customToast.success(res.message ?? 'Academic year created successfully.');
//         createQuestionsForm.reset();
//       })
//       .catch((err) => {
//         customToast.error(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };



//   return (
//     <>
//     <div className="mt-4 md:mt-0">
//         <StatChartCard date={''} withDate={false} icon={'/icons/pencil.svg'} title={'New Question Form'}>
//           <div className="mt-4">
//             <FormProvider {...createQuestionsForm}>

//               <form onSubmit={createQuestionsForm.handleSubmit(onSubmit)}>

//                 {/* Name */}
//                 <div className="mb-6">
//                   <Input
//                   allowAsterisk={true}
//                     label="Question"
//                     type="text"
//                     placeholder="Enter Question"
//                     {...createQuestionsForm.register('name', {
//                       required: 'Question is required',
//                       minLength: {
//                         value: 9,
//                         message: 'Question must be at least 9 characters long',
//                       },
//                     })}
//                   />
//                 </div>

//                 {/* fromYear */}
//                 <div className="mb-6">
//                   <Input
//                   allowAsterisk={true}
//                     label="From Year"
//                     type="text"
//                     placeholder="Enter From Year"
//                     {...createQuestionsForm.register('fromYear', {
//                       required: 'From Year is required',
//                       minLength: {
//                         value: 4,
//                         message: 'From Year must be at least 4 characters long',
//                       },
//                     })}
//                   />
//                 </div>

//                 {/* toYear */}
//                 <div className="mb-6">
//                   <Input
//                   allowAsterisk={true}
//                     label="To Year"
//                     type="text"
//                     placeholder="Enter To Year"
//                     {...createQuestionsForm.register('toYear', {
//                       required: 'To Year is required',
//                       minLength: {
//                         value: 4,
//                         message: 'To Year must be at least 4 characters long',
//                       },
//                     })}
//                   />
//                 </div>

//                 {/* createdBy */}
//                   <div className="mb-6">
//                   <Input
//                   allowAsterisk={true}
//                     label="Created By"
//                     type="text"
//                     placeholder="Enter Created By"
//                     {...createQuestionsForm.register('createdBy', {
//                       required: 'Created By is required',
//                       minLength: {
//                         value: 2,
//                         message: 'Created By must be at least 2 characters long',
//                       },
//                     })}
//                   />
//                 </div>


//                 <Button
//                   type="submit"
//                   className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
//                 >
//                   Create Question
//                 </Button>
                
//               </form>
//             </FormProvider>
//           </div>
//         </StatChartCard>
//       </div>
//     </>
//   )
// }

// export default CreateQuestionsForm

import { FormProvider, useForm } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch } from '@/Redux/Hooks';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { createNewQuestion } from '@/Redux/Questions/Slice';
import { useParams } from 'react-router-dom';

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

type CreateQuestionTypes = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  isCorrect: boolean;
  createdBy: string;
};

const defaultValues: CreateQuestionTypes = {
  question: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  correctAnswer: '',
  isCorrect: false,
  createdBy: '',
};

const CreateQuestionsForm = ({ setLoading }: Props) => {

    const { examId } = useParams();

  const form = useForm<CreateQuestionTypes>({
    defaultValues,
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: CreateQuestionTypes) => {

    if (!examId) {
    customToast.error("Exam ID missing");
    return;
  }

    console.log('Submit:', data);

    setLoading(true);
    // dispatch(createNewQuestion(data as any))
    //   .unwrap()
    //   .then((res) => {
    //     customToast.success(res.message ?? 'Question created successfully.');
    //     form.reset();
    //   })
    //   .catch((err) => {
    //     customToast.error(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    dispatch(createNewQuestion({ examId, data }))
    .unwrap()
    .then((res) => {
      customToast.success(res.message ?? 'Question created successfully.');
      form.reset();
    })
    .catch((err) => {
      customToast.error(err);
    })
    .finally(() => {
      setLoading(false);
    });
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
                  {...form.register('question', {
                    required: 'Question is required',
                    minLength: {
                      value: 5,
                      message: 'Question must be at least 5 characters',
                    },
                  })}
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <Input
                  allowAsterisk
                  label="Option A"
                  placeholder="Enter option A"
                  {...form.register('optionA', { required: 'Option A is required' })}
                />

                <Input
                  allowAsterisk
                  label="Option B"
                  placeholder="Enter option B"
                  {...form.register('optionB', { required: 'Option B is required' })}
                />

                <Input
                  allowAsterisk
                  label="Option C"
                  placeholder="Enter option C"
                  {...form.register('optionC', { required: 'Option C is required' })}
                />

                <Input
                  allowAsterisk
                  label="Option D"
                  placeholder="Enter option D"
                  {...form.register('optionD', { required: 'Option D is required' })}
                />

              </div>

              {/* Correct Answer Dropdown */}
              {/* <div className="mb-6">
                <Dropdown
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="Select correct option"
                  allowAsterisk
                  data={[
                    { label: 'Option A', value: 'optionA' },
                    { label: 'Option B', value: 'optionB' },
                    { label: 'Option C', value: 'optionC' },
                    { label: 'Option D', value: 'optionD' },
                  ]}
                  rules={{
                    required: 'Correct answer is required',
                  }}
                />
              </div> */}

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

              {/* Created By */}
              <div className="mb-6">
                <Input
                  allowAsterisk
                  label="Created By"
                  placeholder="Enter creator ID"
                  {...form.register('createdBy', {
                    required: 'Created By is required',
                  })}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-white"
              >
                Create Question
              </Button>

            </form>
          </FormProvider>
        </div>
      </StatChartCard>
    </div>
  );
};

export default CreateQuestionsForm;




//CreateQuestionsForm