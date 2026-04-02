import { FormProvider, useForm } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { useFieldArray } from 'react-hook-form';
import { createNewExam } from '@/Redux/Exams/Slice';
import { CreateExamDefaultValues, type CreateExamTypes } from '@/Forms/CreateExamsTypes';
import { useEffect, useState } from 'react';
import type { ProgramsDataResponse } from '@/pages/Dashboard/Programs/Types';
import { getPrograms } from '@/Redux/Programs/Slice';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { getAcademicYears } from '@/Redux/AcademicYears/Slice';
import type { AcademicYearDataResponse } from '@/pages/Dashboard/AcademicYears/Types';
import { getClassLevels } from '@/Redux/ClassLevels/Slice';
import type { ClassLevelDataResponse } from '@/pages/Dashboard/ClassLevels/Types';
import type { AcademicTermDataResponse } from '@/pages/Dashboard/AcademicTerms/Types';
import { getAcademicTerms } from '@/Redux/AcademicTerms/Slice';
import { getSubjects } from '@/Redux/Subjects/Slice';
import type { SubjectsDataResponse } from '@/pages/Dashboard/Subjects/Types';
import type { QuestionsDataResponse } from '@/pages/Dashboard/TeacherPanel/Questions/Types';
import { getQuestions } from '@/Redux/Questions/Slice';



const CreateExamForm = ({ setLoading }: any) => {
  const dispatch = useAppDispatch();


  //fetching progrm data
  const [programsDataState, setProgramsDataState] = useState<ProgramsDataResponse[]>([]);

  const handleGetPrograms = () => {
    setLoading(true);
    dispatch(getPrograms())
      .unwrap()
      .then((res: ProgramsDataResponse[]) => {
        setProgramsDataState(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleGetPrograms();
  }, [dispatch]);

  const programsData = programsDataState.map((program) => ({
    name: program.name,
    value: program._id, // THIS is your programId
  }));

  //fetching years from db
  const [academicdata, setAcademicData] = useState<AcademicYearDataResponse[]>([]);

  const handleGetAcademicYears = () => {
    setLoading(true);
    dispatch(getAcademicYears())
      .unwrap()
      .then((res: AcademicYearDataResponse[]) => {
        setAcademicData(res);
        console.log("Data:", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setLoading(false);

      });
  };

  useEffect(() => {
    handleGetAcademicYears();
  }, [dispatch]);


  const academicYears = useAppSelector(
    (state) => state.AcademicYearsRecords.academicYears
  );

  const academicYearsData = academicYears.map((year) => ({
    name: year.name,
    value: year.id,
  }));

  //fetching ClassLevels from db
  const [classLeveldata, setClassLevel] = useState<AcademicYearDataResponse[]>([]);

  const handleGetClassLevels = () => {
    setLoading(true);
    dispatch(getClassLevels())
      .unwrap()
      .then((res: ClassLevelDataResponse[]) => {
        setClassLevel(res as any);
        console.log("Data:", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setLoading(false);

      });
  };

  useEffect(() => {
    handleGetClassLevels();
  }, [dispatch]);

  const classLevels = useAppSelector(
    (state) => state.ClassLevelsRecords.classLevels
  );

  const classLevelsData = classLevels.map((year) => ({
    name: year.name,
    value: year.id,
  }));

  //fetching terms from db
  const [termdata, setTermData] = useState<AcademicTermDataResponse[]>([]);


  const handleGetAcademicTerms = () => {
    setLoading(true);
    dispatch(getAcademicTerms())
      .unwrap()
      .then((res: AcademicTermDataResponse[]) => {
        setTermData(res);
        console.log("Data:", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setLoading(false);

      });
  };

  useEffect(() => {
    handleGetAcademicTerms();
  }, [dispatch]);

  const academicTerms = useAppSelector(
    (state) => state.AcademicTermsRecords.academicTerms
  );

  const academicTermsData = academicTerms.map((year) => ({
    name: year.name,
    value: year.id,
  }));


  //getting subjects

  const [subjectData, setSubjectData] = useState<SubjectsDataResponse[]>([]);

  const handleGetSubjects = () => {
    setLoading(true);
    dispatch(getSubjects())
      .unwrap()
      .then((res: SubjectsDataResponse[]) => {
        setSubjectData(res);
        console.log("Data:", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setLoading(false);

      });
  };

  useEffect(() => {
    handleGetSubjects();
  }, [dispatch]);

  const subjects = useAppSelector(
    (state) => state.SubjectsRecords.subjects
  );

  const subjectsData = subjects.map((subject) => ({
    name: subject.name,
    value: subject.id,
  }));

  //getting questions

  const [questionData, setQuestionData] = useState<QuestionsDataResponse[]>([]);

  const handleGetQuestion = () => {
    setLoading(true);
    dispatch(getQuestions())
      .unwrap()
      .then((res: QuestionsDataResponse[]) => {
        setQuestionData(res);
        console.log("Data:", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setLoading(false);

      });
  };

  useEffect(() => {
    handleGetQuestion();
  }, [dispatch]);

  const questions = useAppSelector(
    (state) => state.QuestionsRecords.questions
  );

  const QuestionsData = questions.map((question) => ({
    name: question.question,
    value: question.id,
  }));



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
                  data={QuestionsData}
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