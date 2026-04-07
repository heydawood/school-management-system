import { FormProvider, useForm } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { createNewExam } from '@/Redux/Exams/Slice';
import { CreateExamDefaultValues, type CreateExamTypes } from '@/Forms/CreateExamsTypes';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { usePrograms } from '@/Hooks/dropdowns/usePrograms';
import { useSubjects } from '@/Hooks/dropdowns/useSubjects';
import { useClassLevels } from '@/Hooks/dropdowns/useClassLevels';
import { useAcademicTerms } from '@/Hooks/dropdowns/useAcademicTerms';
import { useAcademicYears } from '@/Hooks/dropdowns/useAcademicYears';
import { useNavigate } from 'react-router-dom';



const CreateExamForm = ({ setLoading }: any) => {
  const navigate = useNavigate();
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


  const form = useForm<CreateExamTypes>({
    defaultValues: CreateExamDefaultValues,
    mode: 'onChange',
  });

  const { control, register } = form;



  const onSubmit = (data: CreateExamTypes) => {
    setLoading(true);

    dispatch(createNewExam(data))
      .unwrap()
      .then((res: any) => {
        console.log('res: ', res)
        const examId = res.newExam._id;

        customToast.success("Exam created. Now add questions");

        navigate(`/dashboard/teacher/exams/${examId}/questions/create`);
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
          <Input allowAsterisk={true} placeholder='Subject Name' label="Exam Name"
          name='name'
          rules={{ required: true }}/>
          <Input
          allowAsterisk={true}
          placeholder='Enter Description'
          label="Description"
          name='description'
          rules={{ required: true }} />

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
          <Input placeholder='100'
           type="number"
           label="Total Marks"
           name='totalMark'
           allowAsterisk={true}
           rules={{
            required: 'Total Marks are required',
          }}
          />

          <Input
          name='passMark'
          placeholder='33'
          type="number"
          label="Pass Marks"
          allowAsterisk={true}
          rules={{
            required: 'Pass Marks are required',
          }}
           />

          {/* TIME */}
          <Input
          name='examDate'
          placeholder='Date'
          type="date"
          label="Exam Date"
          allowAsterisk={true}
          rules={{
            required: 'Exam Date is required',
          }} />

          <Input 
          name='examTime'
          placeholder='12AM'
          label="Exam Time"
          allowAsterisk={true}
          rules={{
            required: 'Exam Time is required',
          }}
           />

          <Input 
          name='duration'
          placeholder='60mins' 
          label="Duration" 
          allowAsterisk={true}
          rules={{
            required: 'Duration is required',
          }}
           />

          {/* TYPE */}
          <Input 
          name='examType'
          placeholder='Finals, Mid, etc'
          label="Exam Type"
          allowAsterisk={true}
          rules={{
            required: 'Exam Type is required',
          }}
          />

          <Input
          name='examStatus'
          placeholder='Pending or Fulfuilled'
          label="Status"
          allowAsterisk={true}
          rules={{
            required: 'Status is required',
          }}
          />


          <Button type="submit" className="w-full bg-primary text-white">
            Create Exam
          </Button>

        </form>
      </FormProvider>
    </StatChartCard>
  );
};

export default CreateExamForm;