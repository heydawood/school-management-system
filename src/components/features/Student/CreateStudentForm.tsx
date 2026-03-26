import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch } from '@/Redux/Hooks';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import PasswordInput from '@/components/ui/password_input/password-input';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { CreateStudentDefaultValues } from '@/Forms/CreateStudentForm';
import type { CreateStudentTypes } from '@/Forms/CreateStudentForm';
import { createNewStudent } from '@/Redux/Students/Slice';
import { useAppSelector } from '@/Redux/Hooks';
import { getAcademicYears } from '@/Redux/AcademicYears/Slice';
import type { AcademicYearDataResponse } from '@/pages/Dashboard/AcademicYears/Types';
import { getClassLevels } from '@/Redux/ClassLevels/Slice';
import type { ClassLevelDataResponse } from '@/pages/Dashboard/ClassLevels/Types';


const programsData = [
  { name: 'Science', value: 'Science' },
  { name: 'Commerce', value: 'Commerce' },
  { name: 'Arts', value: 'Arts' },
];

const classLevelsData = [
  { name: 'Grade 1', value: 'Grade 1' },
  { name: 'Grade 2', value: 'Grade 2' },
  { name: 'Grade 3', value: 'Grade 3' },
];




interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateStudentForm = ({ setLoading }: Props) => {

  const [academicdata, setAcademicData] = useState<AcademicYearDataResponse[]>([]);
  const [classLeveldata, setClassLevel] = useState<AcademicYearDataResponse[]>([]);


  const dispatch = useAppDispatch();


  //fetching years from db
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





  const createStudentForm = useForm<CreateStudentTypes>({
    defaultValues: CreateStudentDefaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: CreateStudentTypes) => {
    setLoading(true);
    dispatch(createNewStudent(data))
      .unwrap()
      .then((res) => {
        customToast.success(res.message ?? 'Student created successfully.');
        createStudentForm.reset();
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
        <StatChartCard date={''} withDate={false} icon={'/icons/user-add.svg'} title={'New Student Form'}>
          <div className="mt-4">
            <FormProvider {...createStudentForm}>
              <form onSubmit={createStudentForm.handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Full Name"
                    type="text"
                    placeholder="Enter Full Name"
                    {...createStudentForm.register('name', {
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
                    {...createStudentForm.register('email', {
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
                          value === createStudentForm.getValues('password') || 'Passwords do not match',
                      }}
                      classNames="w-full h-[44px]"
                      icon={<Icon icon="/icons/lock.svg" className="text-black" />}
                      iconPosition="left"
                    />
                  </div>
                </div>

                {/* Subject */}
                {/* <div className="mb-6">
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
                </div> */}

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
                {/* <div className="mb-6">
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
                </div> */}

                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
                >
                  Create Student
                </Button>
              </form>
            </FormProvider>
          </div>
        </StatChartCard>
      </div>
    </>
  )
}

export default CreateStudentForm