import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import * as routes from '@/routes/Index';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import ProgramsTable from '@/components/features/Programs/ProgramsTable';
import type { ProgramsDataResponse } from './Types';
import { getPrograms } from '@/Redux/Programs/Slice';



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



const ProgramsPage = () => {

    const { pagination } = useAppSelector((state) => state.ProgramsRecords);
    
        const [loading, setLoading] = useState<boolean>(false);
        const [data, setData] = useState<ProgramsDataResponse[]>([]);
        const [filters, setFilters] = useState<{ search: string }>({ search: '' });
    
    
        const dispatch = useAppDispatch();
        const navigate = useNavigate();
    
        const handleGetPrograms = () => {
            setLoading(true);
            dispatch(getPrograms())
              .unwrap()
              .then((res: ProgramsDataResponse[]) => {
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
            handleGetPrograms();
          }, [dispatch]);

  return (
    <div className="space-y-4">
          <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
            <Header
              title="All Programs List"
              ActionButtons={
                <div className="flex gap-3 items-center">
                  <Button onClick={() => navigate(routes.ProgramsCreate())} className="bg-primary rounded-xl px-5 py-5" type="button">
                    <Icon icon="/icons/add-circle.svg" className="mr-2 text-white" />
                    <p className='text-white'>Add New Program</p>
                  </Button>
                </div>
              }
              onChange={(e: any) => {}}
              logo={<Icon icon="/icons/program.svg" className="text-primary-800 stroke-current w-6 h-6" />}
              logoClasses="bg-primary-25"
            />
             <ProgramsTable loading={loading} filters={filters} data={data} pagination={pagination} />
          </div>
        </div>
  )
}

export default ProgramsPage

