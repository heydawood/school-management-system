import { useEffect, useState, type ReactNode } from 'react';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { getStudentExam } from '@/Redux/StudentExam/Slice';
import StudentExamTable from '@/components/features/StudentExam/StudentExamTable';
import type { StudentExamDataResponse } from './Types';

const Header = ({
  onChange,
  ActionButtons,
  logo,
  logoClasses,
  title,
}: {
  onChange: (e: any) => void;
  ActionButtons?: ReactNode;
  logo: ReactNode;
  logoClasses: string;
  title: string;
}) => (
  <div className="flex gap-4 justify-between items-center flex-wrap pb-4 mb-4 border-b border-neutral-975">
    <div className="flex items-center gap-3">
      <div className={`h-12 w-12 flex justify-center items-center rounded-full ${logoClasses}`}>{logo}</div>
      <h3 className="text-heading">{title}</h3>
    </div>
    {ActionButtons}
  </div>
);

function StudentExamPage() {

  const { pagination } = useAppSelector((state) => state.ResultsRecords);

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<StudentExamDataResponse[]>([]);
    const [filters, setFilters] = useState<{ search: string }>({ search: '' });


    const dispatch = useAppDispatch();

    const handleGetStudentExam = () => {
        setLoading(true);
        dispatch(getStudentExam())
          .unwrap()
          .then((res: StudentExamDataResponse[]) => {
            setData(res.exams);
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
        handleGetStudentExam();
      }, [dispatch]);

  return (
    <div className="space-y-4">
          <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
            <Header
              title="All Exams"
              ActionButtons={
                <div className="flex gap-3 items-center">
                  
                </div>
              }
              onChange={(e: any) => {}}
              logo={<Icon icon="/icons/user-management.svg" className="text-primary-800" />}
              logoClasses="bg-primary-25"
            />
             <StudentExamTable loading={loading} filters={filters} data={data} pagination={pagination} />
          </div>
         </div>
  )
}

export default StudentExamPage
