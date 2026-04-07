import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import { customToast } from '@/Common/Components/ShowToast';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { getAcademicYears } from '@/Redux/AcademicYears/Slice';
import { CreateYearGroupsDefaultValues, type CreateYearGroupsTypes } from '@/Forms/CreateYearGroupsTypes';
import { createNewYearGroup } from '@/Redux/YearGroups/Slice';
import { useNavigate } from 'react-router-dom';




interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateYearGroupForm = ({ setLoading }: Props) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  //fetching AcademicYears from db
  const [yeardata, setyearData] = useState<CreateYearGroupsTypes[]>([]);


  const handleGetAcademicYears = () => {
              setLoading(true);
              dispatch(getAcademicYears())
                .unwrap()
                .then((res: CreateYearGroupsTypes[]) => {
                  setyearData(res);
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




  const createYearGroupForm = useForm<CreateYearGroupsTypes>({
    defaultValues: CreateYearGroupsDefaultValues,
    mode: 'onChange',
  });


  const onSubmit = (data: CreateYearGroupsTypes) => {
    setLoading(true);
    console.log("Sent Data:", data)
    dispatch(createNewYearGroup(data))
      .unwrap()
      .then((res) => {
        customToast.success(res.message ?? 'YearGroup created successfully.');
        createYearGroupForm.reset();
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
        <StatChartCard date={''} withDate={false} icon={'/icons/pencil.svg'} title={'New Year Group Form'}>
          <div className="mt-4">
            <FormProvider {...createYearGroupForm}>

              <form onSubmit={createYearGroupForm.handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-6">
                  <Input
                    allowAsterisk={true}
                    label="Year Group Name"
                    type="text"
                    placeholder="Enter Year Group Name"
                    name='name'
                    rules={{
                      required: 'Year Group Name is required',
                      minLength: {
                        value: 3,
                        message: 'Academic Year Name must be at least 3 characters long',
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

                {/* Academic Year Select */}
                <div className="mb-6">
                  <Dropdown
                    name="academicYear" // IMPORTANT
                    label="Year"
                    placeholder="Select Year"
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
                  onClick={() => navigate('/dashboard/year-groups')}
                >
                  Create Year Group
                </Button>

              </form>
            </FormProvider>
          </div>
        </StatChartCard>
      </div>
    </>
  )
}

export default CreateYearGroupForm

//CreateYearGroupForm