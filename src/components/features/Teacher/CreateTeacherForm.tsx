import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import PasswordInput from '@/components/ui/password_input/password-input';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { CreateTeacherDefaultValues } from '@/Forms/CreateTeacherForm';
import type { CreateTeacherTypes } from '@/Forms/CreateTeacherForm';
import { createNewTeacher } from '@/Redux/Teachers/Slice';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { getAcademicYears } from '@/Redux/AcademicYears/Slice';
import type { AcademicYearDataResponse } from '@/pages/Dashboard/AcademicYears/Types';
import type { AcademicTermDataResponse } from '@/pages/Dashboard/AcademicTerms/Types';
import { getAcademicTerms } from '@/Redux/AcademicTerms/Slice';
import { getClassLevels } from '@/Redux/ClassLevels/Slice';
import type { ClassLevelDataResponse } from '@/pages/Dashboard/ClassLevels/Types';
import { getPrograms } from '@/Redux/Programs/Slice';
import type { ProgramsDataResponse } from '@/pages/Dashboard/Programs/Types';
import type { SubjectsDataResponse } from '@/pages/Dashboard/Subjects/Types';
import { getSubjects } from '@/Redux/Subjects/Slice';



interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateTeacherForm = ({ setLoading }: Props) => {

  const dispatch = useAppDispatch();


    //fetch subjects years for dropdown
  const [subjectsdata, setSubjectsData] = useState<SubjectsDataResponse[]>([]);

  const handleGetSubjects = () => {
              setLoading(true);
              dispatch(getSubjects())
                .unwrap()
                .then((res: SubjectsDataResponse[]) => {
                  setSubjectsData(res);
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

  const subjectsData = subjects.map((year) => ({
    name: year.name,
    value: year.id,
  }));



  //fetch academic years for dropdown
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




  const createTeacherForm = useForm<CreateTeacherTypes>({
    defaultValues: CreateTeacherDefaultValues,
    mode: 'onChange',
  });


  const onSubmit = (data: CreateTeacherTypes) => {
    console.log("Submit button: ",data)
    setLoading(true);
    dispatch(createNewTeacher(data))
      .unwrap()
      .then((res) => {
        customToast.success(res.message ?? 'Teacher created successfully.');
        createTeacherForm.reset();
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <>
      <div className="mt-4 md:mt-0">
        <StatChartCard date={''} withDate={false} icon={'/icons/user-add.svg'} title={'New Teacher Form'}>
          <div className="mt-4">
            <FormProvider {...createTeacherForm}>
              <form onSubmit={createTeacherForm.handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Full Name"
                    type="text"
                    placeholder="Enter Full Name"
                    {...createTeacherForm.register('name', {
                      required: 'Full Name is required',
                      minLength: {
                        value: 2,
                        message: 'Full Name must be at least 2 characters long',
                      },
                    })}
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Email Address"
                    type="email"
                    placeholder="Enter Email"
                    {...createTeacherForm.register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                </div>

                {/* Password Fields Grid */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
                  <div>
                    <PasswordInput
                      allowAsterisk={true}
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      label="Password"
                      rules={{
                        required: 'Password must be at least 8 characters long, including one capital letter.',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters long, including one capital letter.',
                        },
                        pattern: {
                          value: /^(?=.*[A-Z]).{8,}$/,
                          message: 'Password must be at least 8 characters long, including one capital letter.',
                        },
                      }}
                      classNames="w-full h-[44px]"
                      icon={<Icon icon="/icons/lock.svg" className="text-black" />}
                      iconPosition="left"
                    />
                  </div>

                  <div>
                    <PasswordInput
                      allowAsterisk={true}
                      type="password"
                      name="passwordConfirm"
                      placeholder="Confirm password"
                      label="Confirm Password"
                      rules={{
                        required: 'Please confirm your password.',
                        validate: (value: string) =>
                          value === createTeacherForm.getValues('password') || 'Passwords do not match',
                      }}
                      classNames="w-full h-[44px]"
                      icon={<Icon icon="/icons/lock.svg" className="text-black" />}
                      iconPosition="left"
                    />
                  </div>
                </div>

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

                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
                >
                  Create Teacher
                </Button>
              </form>
            </FormProvider>
          </div>
        </StatChartCard>
      </div>
    </>
  )
}

export default CreateTeacherForm