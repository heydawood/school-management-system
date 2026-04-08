import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { CreateSubjectsDefaultValues, type CreateSubjectsTypes } from '@/Forms/CreateSubjectsTypes';
import { createNewSubject } from '@/Redux/AdminPanel/Subjects/Slice';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { getAcademicTerms } from '@/Redux/AdminPanel/AcademicTerms/Slice';
import type { AcademicTermDataResponse } from '@/pages/Dashboard/AdminPanel/AcademicTerms/Types';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { getPrograms } from '@/Redux/AdminPanel/Programs/Slice';
import type { ProgramsDataResponse } from '@/pages/Dashboard/AdminPanel/Programs/Types';
import { useNavigate } from 'react-router-dom';
import type { TeacherDataResponse } from '@/pages/Dashboard/AdminPanel/Teachers/Types';
import { getTeachers } from '@/Redux/Teachers/Slice';
import { useAcademicTermsOptions } from '@/Hooks/dropdowns/useAcademicTerms';
import { useProgramsOptions } from '@/Hooks/dropdowns/usePrograms';
import { useCreateSubjects } from '@/Hooks/TanStack/Subjects/useCreateSubjects';




interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateSubjectForm = ({ setLoading }: Props) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    //teachers data
    const [teacherData, setTeacherData] = useState<TeacherDataResponse[]>([]);
  
    const handleGetTeachers = () => {
      setLoading(true);
      dispatch(getTeachers())
        .unwrap()
        .then((res: TeacherDataResponse[]) => {
          setTeacherData(res);
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
      handleGetTeachers();
    }, [dispatch]);
  
    const teachers = useAppSelector(
      (state) => state.TeacherRecords.teachers
    );
  
    const teachersData = teachers.map((teacher) => ({
      name: teacher.name,
      value: teacher.id,
    }));


  //fetching terms from db
  // const [termdata, setTermData] = useState<AcademicTermDataResponse[]>([]);


  // const handleGetAcademicTerms = () => {
  //   setLoading(true);
  //   dispatch(getAcademicTerms())
  //     .unwrap()
  //     .then((res: AcademicTermDataResponse[]) => {
  //       setTermData(res);
  //       console.log("Data:", res);
  //     })
  //     .catch((err) => {
  //       console.log("Error: ", err);
  //     })
  //     .finally(() => {
  //       setLoading(false);

  //     });
  // };

  // useEffect(() => {
  //   handleGetAcademicTerms();
  // }, [dispatch]);

  // const academicTerms = useAppSelector(
  //   (state) => state.AcademicTermsRecords.academicTerms
  // );

  // const academicTermsData = academicTerms.map((year) => ({
  //   name: year.name,
  //   value: year.id,
  // }));
  const academicTermsData = useAcademicTermsOptions().options; //new


  const programsData = useProgramsOptions().options



  const createSubjectsForm = useForm<CreateSubjectsTypes>({
    defaultValues: CreateSubjectsDefaultValues,
    mode: 'onChange',
  });


  // const onSubmit = (data: CreateSubjectsTypes) => {
  //   setLoading(true);
  //   console.log("Sent Data:", data)
  //   dispatch(createNewSubject(data))
  //     .unwrap()
  //     .then((res) => {
  //       customToast.success(res.message ?? 'Subjects created successfully.');
  //       createSubjectsForm.reset();
  //     })
  //     .catch((err) => {
  //       customToast.error(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  const createMutation = useCreateSubjects();
  const onSubmit = (data: CreateSubjectsTypes) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        createSubjectsForm.reset();

        navigate('/dashboard/subjects');
      },
    });
  };


  return (
    <>
      <div className="mt-4 md:mt-0">
        <StatChartCard date={''} withDate={false} icon={'/icons/pencil.svg'} title={'New Subject Form'}>
          <div className="mt-4">
            <FormProvider {...createSubjectsForm}>

              <form onSubmit={createSubjectsForm.handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Subject Name"
                    type="text"
                    placeholder="Enter Term Name"
                    name='name'
                    rules={{
                      required: 'Academic Year Name is required',
                      minLength: {
                        value: 3,
                        message: 'Academic Year Name must be at least 3 characters long',
                      },
                    }}
                  />
                </div>


                {/* description */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Description"
                    type="text"
                    placeholder="Enter Description"
                    name='description'
                    rules={{
                      required: 'Description is required',
                      minLength: {
                        value: 3,
                        message: 'Description must be at least 3 characters long',
                      },
                    }}
                  />
                </div>

                {/* duration */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Duration"
                    type="text"
                    placeholder="Enter duration"
                    name='duration'
                    rules={{
                      required: 'duration is required',
                      minLength: {
                        value: 3,
                        message: 'Duration must be at least 3 characters long',
                      },
                    }}
                  />
                </div>


                {/* teacher */}
                <div className="mb-6">
                  <Dropdown
                    name="teacher"
                    label="Teacher"
                    placeholder="Select Teacher"
                    data={teachersData}
                    rules={{
                      required: 'Teacher is required',
                    }}
                    allowAsterisk={true}
                    isSearchAble
                  />
                </div>

                {/* createdBy */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Created By"
                    type="text"
                    placeholder="Enter createdBy"
                    name='createdBy'
                    rules={{
                      required: 'createdBy is required',
                      minLength: {
                        value: 3,
                        message: 'createdBy must be at least 3 characters long',
                      },
                    }}
                    
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
                    isSearchAble
                  />
                </div>

                <div className="mb-6">
                  <Dropdown
                    name="programId" // IMPORTANT
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



                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
                  onClick={() => navigate('/dashboard/subjects')}
                >
                  Create Subject
                </Button>

              </form>
            </FormProvider>
          </div>
        </StatChartCard>
      </div>
    </>
  )
}

export default CreateSubjectForm
