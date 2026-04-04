import { FormProvider, useForm } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { useFieldArray } from 'react-hook-form';
import { createNewExam } from '@/Redux/Exams/Slice';
import { CreateExamDefaultValues, type CreateExamTypes } from '@/Forms/CreateExamsTypes';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { usePrograms } from '@/Hooks/dropdowns/usePrograms';
import { useQuestions } from '@/Hooks/dropdowns/useQuestions';
import { useSubjects } from '@/Hooks/dropdowns/useSubjects';
import { useClassLevels } from '@/Hooks/dropdowns/useClassLevels';
import { useAcademicTerms } from '@/Hooks/dropdowns/useAcademicTerms';
import { useAcademicYears } from '@/Hooks/dropdowns/useAcademicYears';



const CreateExamForm = ({ setLoading }: any) => {
  const dispatch = useAppDispatch();


  //fetching progrm data
  const programsData = usePrograms(setLoading);

  //fetching years from db
  const academicYearsData = useAcademicYears(setLoading);

  //fetching ClassLevels from db
  const classLevelsData = useClassLevels(setLoading);

  //fetching terms from db
  const academicTermsData = useAcademicTerms(setLoading);

  //getting subjects
  const subjectsData = useSubjects(setLoading);

  //getting questions
  const questionsData = useQuestions(setLoading);


  const form = useForm<CreateExamTypes>({
    defaultValues: CreateExamDefaultValues,
    mode: 'onChange',
  });

  const { control, register } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });


  const { userId } = useAppSelector((state) => state.authTeacherReducer);

  const onSubmit = (data: CreateExamTypes) => {
    const formattedData = {
      ...data,
      //createdBy: userId, //  important
      questions: data.questions.map((q) => q.value),
    };

    console.log('Exam Payload:', formattedData);

    setLoading(true);

    dispatch(createNewExam(formattedData as any))
      .unwrap()
      .then((res: any) => {
        customToast.success(res.message ?? 'Exam created successfully');
        form.reset();
      })
      .catch((err: any) => {
        customToast.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <StatChartCard title="Create Exam Form" icon="/icons/pencil.svg" withDate={false} date="">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* BASIC INFO */}
          <Input placeholder='Subject Name' label="Exam Name" {...register('name', { required: true })} />
          <Input placeholder='Enter Description' label="Description" {...register('description', { required: true })} />
          <Input placeholder='Created By' label="Created By" {...register('createdBy', { required: true })} />

          {/* RELATIONS */}

          {/* Subject */}
          <div className="mb-6">
            <div className="mb-6">
              <Dropdown
                name="subject"
                label="Subject"
                placeholder="Select Subject"
                data={subjectsData}
                rules={{
                  required: 'Subject is required',
                }}
                allowAsterisk={true}
              />
            </div>
          </div>

          {/* Program */}
          <div className="mb-6">
            <Dropdown
              name="program"
              label="Program"
              placeholder="Select Program"
              data={programsData}
              rules={{
                required: 'Program is required',
              }}
              allowAsterisk={true}
            />
          </div>

          {/* Academic Term Select */}
          <div className="mb-6">
            <Dropdown
              name="academicTerm"
              label="Academic Term"
              placeholder="Select Academic Term"
              data={academicTermsData}
              rules={{
                required: 'Academic Term is required',
              }}
              allowAsterisk={true}
            />
          </div>

          {/* Academic Year Select */}
          <div className="mb-6">
            <Dropdown
              name="academicYear"
              label="Academic Year"
              placeholder="Select Academic Year"
              data={academicYearsData}
              rules={{
                required: 'Academic Year is required',
              }}
              allowAsterisk={true}
            />
          </div>



          {/* Class Level Select */}
          <div className="mb-6">
            <Dropdown
              name="classLevel"
              label="Class Level"
              placeholder="Select Class Level"
              data={classLevelsData}
              rules={{
                required: 'Class Level is required',
              }}
              allowAsterisk={true}
            />
          </div>

          {/* MARKS */}
          <Input placeholder='100' type="number" label="Total Marks" {...register('totalMark', { required: true })} />
          <Input placeholder='33' type="number" label="Pass Marks" {...register('passMark', { required: true })} />

          {/* TIME */}
          <Input placeholder='Date' type="date" label="Exam Date" {...register('examDate')} />
          <Input placeholder='12AM' label="Exam Time" {...register('examTime')} />
          <Input placeholder='60mins' label="Duration" {...register('duration')} />

          {/* TYPE */}
          <Input placeholder='Finals, Mid, etc' label="Exam Type" {...register('examType')} />
          <Input placeholder='Pending or Fulfuilled' label="Status" {...register('examStatus')} />

          {/* QUESTIONS */}
          <div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex mx-auto gap-2 mt-2 items-center">

                <Dropdown
                  name={`questions.${index}.value`}
                  label="Select Question"
                  placeholder="Choose question"
                  data={questionsData}
                  rules={{
                    required: 'Question is required',
                  }}
                  allowAsterisk
                />

                <div className="flex mt-7 gap-1">
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    Remove
                  </Button>

                  <Button type="button" onClick={() => append({ value: '' })}>
                    + Add
                  </Button>
                </div>

              </div>
            ))}
          </div>


          <Button type="submit" className="w-full bg-primary text-white">
            Create Exam
          </Button>

        </form>
      </FormProvider>
    </StatChartCard>
  );
};

export default CreateExamForm;