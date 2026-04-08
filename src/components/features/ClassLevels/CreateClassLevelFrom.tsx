import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { CreateClassLevelDefaultValues, type CreateClassLevelTypes } from '@/Forms/CreateClassLevelTypes';
import { createNewClassLevel } from '@/Redux/AdminPanel/ClassLevels/Slice';
import { useFieldArray } from 'react-hook-form';
import type { SubjectsDataResponse } from '@/pages/Dashboard/AdminPanel/Subjects/Types';
import { getSubjects } from '@/Redux/AdminPanel/Subjects/Slice';
import type { StudentDataResponse } from '@/pages/Dashboard/AdminPanel/Students/Types';
import { getStudents } from '@/Redux/Students/Slice';
import type { TeacherDataResponse } from '@/pages/Dashboard/AdminPanel/Teachers/Types';
import { getTeachers } from '@/Redux/Teachers/Slice';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useCreateClassLevels } from '@/Hooks/TanStack/ClassLevels/useCreateClassLevels';
import { useStudentsOptions } from '@/Hooks/dropdowns/useStudents';
import { useSubjectsOptions } from '@/Hooks/dropdowns/useSubjects';



interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}



const CreateClassLevelFrom = ({ setLoading }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  //subjects data

  const subjectsData = useSubjectsOptions().options

  //students data

  const studentsData = useStudentsOptions().options

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



  const createClassLevelForm = useForm<CreateClassLevelTypes>({
    defaultValues: CreateClassLevelDefaultValues,
    mode: 'onChange',
  });

  //for feild Array
  const { control, register, handleSubmit } = createClassLevelForm;

  const { fields: studentFields, append: addStudent, remove: removeStudent } =
    useFieldArray({ control, name: 'students' });

  const { fields: subjectFields, append: addSubject, remove: removeSubject } =
    useFieldArray({ control, name: 'subjects' });

  const { fields: teacherFields, append: addTeacher, remove: removeTeacher } =
    useFieldArray({ control, name: 'teachers' });


  const createMutation = useCreateClassLevels();

  const onSubmit = (data: CreateClassLevelTypes) => {

    const formattedData = {
      ...data,
      students: data.students.map(s => s.value),
      subjects: data.subjects.map(s => s.value),
      teachers: data.teachers.map(t => t.value),
    };


    // console.log("Sent data:", formattedData)
    // setLoading(true);
    // dispatch(createNewClassLevel(formattedData as any))
    //   .unwrap()
    //   .then((res) => {
    //     customToast.success(res.message ?? 'Class Level created successfully.');
    //     createClassLevelForm.reset();
    //   })
    //   .catch((err) => {
    //     customToast.error(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    createMutation.mutate(formattedData, {
      onSuccess: () => {
        createClassLevelForm.reset();

        navigate('/dashboard/class-levels');
      },
    });

  };


  return (
    <>
      <div className="mt-4 md:mt-0">
        <StatChartCard date={''} withDate={false} icon={'/icons/pencil.svg'} title={'New Class Level Form'}>
          <div className="mt-4">
            <FormProvider {...createClassLevelForm}>

              <form onSubmit={createClassLevelForm.handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Class Level Name"
                    type="text"
                    placeholder="Enter Term Name"
                    name='name'
                    rules={{
                      required: 'Academic Year Name is required',
                      minLength: {
                        value: 3,
                        message: 'Class Level must be at least 3 characters long',
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


                {/* <div className='flex gap-2'> */}

                {/* students */}
                <div className="mb-6">
                  {studentFields.map((field, index) => (
                    <div key={field.id} >

                      <Dropdown
                      //classNames='w-80'
                        name={`students.${index}.value`}
                        label="Student"
                        placeholder="Select Student"
                        data={studentsData}
                        rules={{
                          required: 'Student is required',
                        }}
                        allowAsterisk
                        isSearchAble
                      />

                      <div className="mt-6 flex gap-1">
                        <Button
                          type="button"
                          disabled={studentFields.length === 1}
                          onClick={() => removeStudent(index)}
                        >
                          Remove
                        </Button>

                        <Button
                          type="button"
                          onClick={() => addStudent({ value: '' })}
                        >
                          + Add
                        </Button>
                      </div>

                    </div>
                  ))}
                </div>



                {/* subjects */}
                <div className="mb-6">

                  {subjectFields.map((field, index) => (
                    <div key={field.id} >

                      <Dropdown
                      
                        name={`subjects.${index}.value`}
                        label="Subject"
                        placeholder="Select Subject"
                        data={subjectsData}
                        rules={{
                          required: 'Subject is required',
                        }}
                        allowAsterisk
                        isSearchAble
                      />

                      <div className="mt-6 flex gap-1">
                        <Button
                          type="button"
                          disabled={subjectFields.length === 1}
                          onClick={() => removeSubject(index)}
                        >
                          Remove
                        </Button>

                        <Button
                          type="button"
                          onClick={() => addSubject({ value: '' })}
                        >
                          + Add
                        </Button>
                      </div>

                    </div>
                  ))}
                </div>



                {/* teachers */}
                <div className="mb-6">
                  {teacherFields.map((field, index) => (
                    <div key={field.id} >

                      <Dropdown
                      
                        name={`teachers.${index}.value`}
                        label="Teacher"
                        placeholder="Select Teacher"
                        data={teachersData}
                        rules={{
                          required: 'Teacher is required',
                        }}
                        allowAsterisk
                        isSearchAble
                      />

                      <div className="mt-6 flex gap-1">
                        <Button
                          type="button"
                          disabled={teacherFields.length === 1}
                          onClick={() => removeTeacher(index)}
                        >
                          Remove
                        </Button>

                        <Button
                          type="button"
                          onClick={() => addTeacher({ value: '' })}
                        >
                          + Add
                        </Button>
                      </div>

                    </div>
                  ))}
                </div>
                {/* </div> */}



                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
                  onClick={() => navigate('/dashboard/class-levels')}
                >
                  Create Class Level
                </Button>

              </form>
            </FormProvider>
          </div>
        </StatChartCard>
      </div>
    </>
  )
}

export default CreateClassLevelFrom