import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { useFieldArray } from 'react-hook-form';
import { CreateProgramsDefaultValues, type CreateProgramsTypes } from '@/Forms/CreateProgramTypes';
import { createNewProgram } from '@/Redux/Programs/Slice';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import type { TeacherDataResponse } from '@/pages/Dashboard/AdminPanel/Teachers/Types';
import { getTeachers } from '@/Redux/Teachers/Slice';
import type { StudentDataResponse } from '@/pages/Dashboard/AdminPanel/Students/Types';
import { getStudents } from '@/Redux/Students/Slice';
import { getSubjects } from '@/Redux/Subjects/Slice';
import type { SubjectsDataResponse } from '@/pages/Dashboard/AdminPanel/Subjects/Types';
import { useNavigate } from 'react-router-dom';



interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}



const CreateProgramForm = ({ setLoading }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    //subjects data
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
  
  
    //students data
    const [studentData, setStudentData] = useState<StudentDataResponse[]>([]);
  
    const handleGetStudents = () => {
      setLoading(true);
      dispatch(getStudents())
        .unwrap()
        .then((res: StudentDataResponse[]) => {
          setStudentData(res);
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
      handleGetStudents();
    }, [dispatch]);
  
    const students = useAppSelector(
      (state) => state.StudentRecords.students
    );
  
    const studentsData = students.map((student) => ({
      name: student.name,
      value: student.id,
    }));

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




  const createProgramsForm = useForm<CreateProgramsTypes>({
    defaultValues: CreateProgramsDefaultValues,
    mode: 'onChange',
  });

  //for feild Array
  const { control, register, handleSubmit } = createProgramsForm;

  const { fields: studentFields, append: addStudent, remove: removeStudent } =
    useFieldArray({ control, name: 'students' });

  const { fields: subjectFields, append: addSubject, remove: removeSubject } =
    useFieldArray({ control, name: 'subjects' });

  const { fields: teacherFields, append: addTeacher, remove: removeTeacher } =
    useFieldArray({ control, name: 'teachers' });



  const onSubmit = (data: CreateProgramsTypes) => {

    const formattedData = {
      ...data,
      // returing new array of values instead of objects because of backend schema
      students: data.students.map(s => s.value),
      subjects: data.subjects.map(s => s.value),
      teachers: data.teachers.map(t => t.value),
    };


    console.log("Sent data:", formattedData)
    setLoading(true);
    dispatch(createNewProgram(formattedData as any))
      .unwrap()
      .then((res) => {
        customToast.success(res.message ?? 'Academic Term created successfully.');
        createProgramsForm.reset();
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
        <StatChartCard date={''} withDate={false} icon={'/icons/pencil.svg'} title={'New Program Form'}>
          <div className="mt-4">
            <FormProvider {...createProgramsForm}>

              <form onSubmit={createProgramsForm.handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Program Name"
                    type="text"
                    placeholder="Enter Program Name"
                    {...createProgramsForm.register('name', {
                      required: 'Program Name is required',
                      minLength: {
                        value: 3,
                        message: 'Program must be at least 3 characters long',
                      },
                    })}
                  />
                </div>


                {/* description */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Description"
                    type="text"
                    placeholder="Enter Description"
                    {...createProgramsForm.register('description', {
                      required: 'Description is required',
                      minLength: {
                        value: 3,
                        message: 'Description must be at least 3 characters long',
                      },
                    })}
                  />
                </div>

                {/* duration */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Duration"
                    type="text"
                    placeholder="Enter duration"
                    {...createProgramsForm.register('duration', {
                      required: 'Duration is required',
                      minLength: {
                        value: 3,
                        message: 'Description must be at least 3 characters long',
                      },
                    })}
                  />
                </div>

                {/* Code */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Code"
                    type="text"
                    placeholder="Enter Code"
                    {...createProgramsForm.register('code', {
                      required: 'Code is required',
                      minLength: {
                        value: 3,
                        message: 'Code must be at least 3 characters long',
                      },
                    })}
                  />
                </div>


                {/* createdBy */}

                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Created By"
                    type="text"
                    placeholder="Enter createdBy"
                    {...createProgramsForm.register('createdBy', {
                      required: 'createdBy is required',
                      minLength: {
                        value: 3,
                        message: 'createdBy must be at least 3 characters long',
                      },
                    })}
                  />
                </div>


                {/* students */}
                <div className="mb-6">
                  {studentFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2 items-center">

                      <Dropdown
                        classNames='w-80'
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
                    <div key={field.id} className="flex gap-2 mb-2 items-center">

                      <Dropdown
                        classNames='w-80'
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
                    <div key={field.id} className="flex gap-2 mb-2 items-center">

                      <Dropdown
                        classNames='w-80'
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


                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
                  onClick={() => navigate('/dashboard/programs')}
                >
                  Create Programs
                </Button>

              </form>
            </FormProvider>
          </div>
        </StatChartCard>
      </div>
    </>
  )
}

export default CreateProgramForm


//CreateProgramForm