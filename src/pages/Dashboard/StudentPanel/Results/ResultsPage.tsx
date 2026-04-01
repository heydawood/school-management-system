import { useEffect, useState, type ReactNode } from 'react';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import ResultsTable from '@/components/features/Results/ResultsTable';
import { getResults } from '@/Redux/Results/Slice';
import type { ResultsDataResponse } from './Types';

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

function ResultsPage() {

  const { pagination } = useAppSelector((state) => state.AdminRecords);

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ResultsDataResponse[]>([]);
    const [filters, setFilters] = useState<{ search: string }>({ search: '' });


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleGetResults = () => {
        setLoading(true);
        dispatch(getResults())
          .unwrap()
          .then((res: ResultsDataResponse[]) => {
            setData(res);
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
        handleGetResults();
      }, [dispatch]);

  return (
    <div className="space-y-4">
          <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
            <Header
              title="All Results"
              ActionButtons={
                <div className="flex gap-3 items-center">
                  
                </div>
              }
              onChange={(e: any) => {}}
              logo={<Icon icon="/icons/user-management.svg" className="text-primary-800" />}
              logoClasses="bg-primary-25"
            />
             <ResultsTable loading={loading} filters={filters} data={data} pagination={pagination} />
          </div>
         </div>
  )
}

export default ResultsPage
