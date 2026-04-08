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
import { getAcademicYears } from '@/Redux/AdminPanel/AcademicYears/Slice';
import type { AcademicYearDataResponse } from '@/pages/Dashboard/AdminPanel/AcademicYears/Types';
import { getClassLevels } from '@/Redux/AdminPanel/ClassLevels/Slice';
import type { ClassLevelDataResponse } from '@/pages/Dashboard/AdminPanel/ClassLevels/Types';
import { getPrograms } from '@/Redux/AdminPanel/Programs/Slice';
import type { ProgramsDataResponse } from '@/pages/Dashboard/AdminPanel/Programs/Types';
import { useNavigate } from 'react-router-dom';
import { useProgramsOptions } from '@/Hooks/dropdowns/usePrograms';
import { usePrograms } from '@/Hooks/TanStack/Programs/usePrograms';
import { useClassLevelsOptions } from '@/Hooks/dropdowns/useClassLevels';
import { useAcademicYearsOptions } from '@/Hooks/dropdowns/useAcademicYears';
import { useCreateStudents } from '@/Hooks/TanStack/Students/useCreateStudents';



interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateStudentForm = ({ setLoading }: Props) => {



  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //fetching progrm data
  const programsData = useProgramsOptions().options;


  //fetching years from db
  const academicYearsData = useAcademicYearsOptions().options;

  //fetching ClassLevels from db
  const classLevelsData = useClassLevelsOptions().options



  const createStudentForm = useForm<CreateStudentTypes>({
    defaultValues: CreateStudentDefaultValues,
    mode: 'onChange',
  });

  const createMutation = useCreateStudents();

  const onSubmit = (data: CreateStudentTypes) => {
    console.log("Button clicked:", data)

     createMutation.mutate(data, {
      onSuccess: () => {
        createStudentForm.reset();

        navigate('/dashboard/students');
      },
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
                    name='name'
                    rules={{
                      required: 'Full Name is required',
                      minLength: {
                        value: 2,
                        message: 'Full Name must be at least 2 characters long',
                      },
                    }}
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Email Address"
                    type="email"
                    placeholder="Enter Email"
                    name='email'
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address',
                      },
                    }}
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
                    isSearchAble
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
                    isSearchAble
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
                    isSearchAble
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
                  onClick={() => navigate('/dashboard/students')}
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