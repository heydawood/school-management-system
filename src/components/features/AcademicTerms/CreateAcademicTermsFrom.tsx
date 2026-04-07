import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useAppDispatch } from '@/Redux/Hooks';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import { CreateAcademicTermDefaultValues, type CreateAcademicTermTypes } from '@/Forms/CreateAcademicTermTypes';
import { createNewAcademicTerm } from '@/Redux/AcademicTerms/Slice';
import { useNavigate } from 'react-router-dom';




interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateAcademicTermsFrom = ({ setLoading }: Props) => {



    const createAcademicTermForm = useForm<CreateAcademicTermTypes>({
    defaultValues: CreateAcademicTermDefaultValues,
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: CreateAcademicTermTypes) => {
    setLoading(true);
    console.log("Sent Data:", data)
    dispatch(createNewAcademicTerm(data))
      .unwrap()
      .then((res) => {
        customToast.success(res.message ?? 'Academic Term created successfully.');
        createAcademicTermForm.reset();
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
        <StatChartCard date={''} withDate={false} icon={'/icons/pencil.svg'} title={'New Academic Term Form'}>
          <div className="mt-4">
            <FormProvider {...createAcademicTermForm}>

              <form onSubmit={createAcademicTermForm.handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-6">
                  <Input
                  allowAsterisk={true}
                    label="Academic Term Name"
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
                        message: 'duration must be at least 3 characters long',
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


                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-[12px] bg-primary-500 hover:bg-primary-600 text-center text-white"
                  onClick={() => navigate('/dashboard/academic-terms')}
                >
                  Create Academic Term
                </Button>
                
              </form>
            </FormProvider>
          </div>
        </StatChartCard>
      </div>
    </>
  )
}

export default CreateAcademicTermsFrom

//CreateAcademicTermsFrom