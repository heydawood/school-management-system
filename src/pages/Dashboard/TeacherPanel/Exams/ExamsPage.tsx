import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import * as routes from '@/routes/Index';
import { getExams } from '@/Redux/Exams/Slice';
import ExamsTable from '@/components/features/Exams/ExamsTable';
import type { ExamsDataResponse } from './Types';
import { useExams } from '@/Hooks/TanStack/Exams/useExams';

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

function ExamsPage() {

  const { pagination } = useAppSelector((state) => state.ExamsRecords);

    const [loading, setLoading] = useState<boolean>(false);
   // const [data, setData] = useState<ExamsDataResponse[]>([]);
    const [filters, setFilters] = useState<{ search: string }>({ search: '' });


    const navigate = useNavigate();
    // const dispatch = useAppDispatch();

    // const handleGetExams = () => {
    //     setLoading(true);
    //     dispatch(getExams())
    //       .unwrap()
    //       .then((res: ExamsDataResponse[]) => {
    //         setData(res);
    //         console.log("Data:", res);
    //       })
    //       .catch((err) => {
    //         console.log("Error: ", err);
    //       })
    //       .finally(() => {
    //         setLoading(false);
            
    //       });
    //   };
    
    //   useEffect(() => {
    //     handleGetExams();
    //   }, [dispatch]);

      const { data = [], isLoading } = useExams();

  return (
    <div className="space-y-4">
          <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
            <Header
              title="All Exams List"
              ActionButtons={
                <div className="flex gap-3 items-center">
                  <Button onClick={() => navigate(routes.ExamCreate())} className="bg-primary rounded-xl px-5 py-5" type="button">
                    <Icon icon="/icons/add-circle.svg" className="mr-2 text-white" />
                    <p className='text-white'>Add New Exam</p>
                  </Button>
                </div>
              }
              onChange={(e: any) => {}}
              logo={<Icon icon="/icons/class-level.svg" className="text-primary-800 w-6 h-6" />}
              logoClasses="bg-primary-25"
            />
             <ExamsTable loading={loading} filters={filters} data={data} pagination={pagination} />
          </div>
         </div>
  )
}

export default ExamsPage


//ExamsPage