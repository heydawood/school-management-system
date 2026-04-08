import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch } from '@/Redux/Hooks';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { CreateAcademicYearDefaultValues, type CreateAcademicYearTypes } from '@/Forms/CreateAcademicYearForm';
import { createNewAcademicYear } from '@/Redux/AdminPanel/AcademicYears/Slice';
import { useNavigate } from 'react-router-dom';
import { useCreateAcademicYears } from '@/Hooks/TanStack/AcademicYears/useCreateAcademicYears';




interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateAcademicYearForm = ({ setLoading }: Props) => {



    const createAcademicYearForm = useForm<CreateAcademicYearTypes>({
    defaultValues: CreateAcademicYearDefaultValues,
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const createMutation = useCreateAcademicYears();

  const onSubmit = (data: CreateAcademicYearTypes) => {
    console.log("Submit clicked: ", data)
    createMutation.mutate(data, {
      onSuccess: () => {
        createAcademicYearForm.reset();

        navigate('/dashboard/academic-years');
      },
    });
  };



  return (
    <>
    <div className="mt-4 md:mt-0">
        <StatChartCard date={''} withDate={false} icon={'/icons/pencil.svg'} title={'New Academic Year Form'}>
          <div className="mt-4">
            <FormProvider {...createAcademicYearForm}>

              <form onSubmit={createAcademicYearForm.handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-6">
                  <Input
                  allowAsterisk={true}
                    label="Academic Year Name"
                    type="text"
                    placeholder="Enter Academic Year Name"
                    name='name'
                    rules={{
                      required: 'Academic Year Name is required',
                      minLength: {
                        value: 9,
                        message: 'Academic Year Name must be at least 9 characters long',
                      },
                    }}
                  />
                </div>

                {/* fromYear */}
                <div className="mb-6">
                  <Input
                  allowAsterisk={true}
                    label="From Year"
                    type="text"
                    placeholder="Enter From Year"
                    name='fromYear'
                    rules={{
                      required: 'From Year is required',
                      minLength: {
                        value: 4,
                        message: 'From Year must be at least 4 characters long',
                      },
                    }}
                  />
                </div>

                {/* toYear */}
                <div className="mb-6">
                  <Input
                  allowAsterisk={true}
                    label="To Year"
                    type="text"
                    placeholder="Enter To Year"
                    name='toYear'
                    rules={{
                      required: 'To Year is required',
                      minLength: {
                        value: 4,
                        message: 'To Year must be at least 4 characters long',
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
                    placeholder="Enter Created By"
                    name='createdBy'
                    rules={{
                      required: 'Created By is required',
                      minLength: {
                        value: 2,
                        message: 'Created By must be at least 2 characters long',
                      }}
                    }
                  />
                </div>


                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
                >
                  Create Academic Year
                </Button>
                
              </form>
            </FormProvider>
          </div>
        </StatChartCard>
      </div>
    </>
  )
}

export default CreateAcademicYearForm

