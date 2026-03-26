import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch } from '@/Redux/Hooks';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { CreateClassLevelDefaultValues, type CreateClassLevelTypes } from '@/Forms/CreateClassLevelTypes';
import { createNewClassLevel } from '@/Redux/ClassLevels/Slice';
import { useFieldArray } from 'react-hook-form';





interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}



const CreateClassLevelFrom = ({ setLoading }: Props) => {

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

  const dispatch = useAppDispatch();

  const onSubmit = (data: CreateClassLevelTypes) => {

     const formattedData = {
    ...data,
    students: data.students.map(s => s.value),
    subjects: data.subjects.map(s => s.value),
    teachers: data.teachers.map(t => t.value),
  };
    
    
    console.log("Sent data:", formattedData)
    setLoading(true);
    dispatch(createNewClassLevel(formattedData as any))
      .unwrap()
      .then((res) => {
        customToast.success(res.message ?? 'Academic Term created successfully.');
        createClassLevelForm.reset();
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
        <StatChartCard date={''} withDate={false} icon={'/icons/user-add.svg'} title={'New Class Level Form'}>
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
                    {...createClassLevelForm.register('name', {
                      required: 'Academic Year Name is required',
                      minLength: {
                        value: 3,
                        message: 'Class Level must be at least 3 characters long',
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
                    {...createClassLevelForm.register('description', {
                      required: 'Description is required',
                      minLength: {
                        value: 3,
                        message: 'Description must be at least 3 characters long',
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
                    {...createClassLevelForm.register('createdBy', {
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
                      <Input
                      allowAsterisk={true}
                      label={"Students"}
                        placeholder="Enter student"
                        {...register(`students.${index}.value` as const, {
                          required: 'Student is required',
                        })}
                      />
                      <div className='mt-6 flex gap-1'>
                      <Button type="button" disabled={studentFields.length === 1} className={`${studentFields.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => removeStudent(index)}>
                        Remove
                      </Button>

                      <Button type="button" onClick={() => addStudent({ value: '' })}>
                    + Add Student
                  </Button>
                  </div>
                    </div>
                  ))}

                  
                </div>


                {/* subjects */}
                <div className="mb-6">

                  {subjectFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2 items-center">
                      
                      <Input
                      allowAsterisk={true}
                      label={"Subjects"}
                        placeholder="Enter subject"
                        {...register(`subjects.${index}.value` as const)}
                      />

                      <div className='mt-6 flex gap-1'>
                      <Button type="button"  disabled={subjectFields.length === 1} className={`${subjectFields.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => removeSubject(index)}>
                        Remove
                      </Button>

                      <Button type="button" onClick={() => addSubject({ value: '' })}>
                    + Add Subject
                  </Button>
                  </div>
                    </div>
                  ))}
                </div>


                {/* teachers */}
                <div className="mb-6">
                  

                  {teacherFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2 items-center">
                      <Input
                      allowAsterisk={true}
                      label={"Teachers"}
                        placeholder="Enter teacher"
                        {...register(`teachers.${index}.value` as const)}
                      />

                      <div className='mt-6 flex gap-1'>
                      <Button type="button" disabled={teacherFields.length === 1}className={`${teacherFields.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => removeTeacher(index)}>
                        Remove
                      </Button>

                      <Button type="button" onClick={() => addTeacher({ value: '' })}>
                    + Add Teacher
                  </Button>
                  </div>
                    </div>
                  ))}

                  
                </div>


                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
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
