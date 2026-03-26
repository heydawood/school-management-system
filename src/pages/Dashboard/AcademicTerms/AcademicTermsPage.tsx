import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import * as routes from '@/routes/Index';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import AcademicTermsTable from '@/components/features/AcademicTerms/AcademicTermsTable';
import type { AcademicTermDataResponse } from './Types';
import { getAcademicTerms } from '@/Redux/AcademicTerms/Slice';



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



const AcademicTermsPage = () => {

    const { pagination } = useAppSelector((state) => state.AcademicTermsRecords);
    
        const [loading, setLoading] = useState<boolean>(false);
        const [data, setData] = useState<AcademicTermDataResponse[]>([]);
        const [filters, setFilters] = useState<{ search: string }>({ search: '' });
    
    
        const dispatch = useAppDispatch();
        const navigate = useNavigate();
    
        const handleGetAcademicTerms = () => {
            setLoading(true);
            dispatch(getAcademicTerms())
              .unwrap()
              .then((res: AcademicTermDataResponse[]) => {
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
            handleGetAcademicTerms();
          }, [dispatch]);

  return (
    <div className="space-y-4">
          <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
            <Header
              title="All Academic Terms List"
              ActionButtons={
                <div className="flex gap-3 items-center">
                  <Button onClick={() => navigate(routes.AcademicTermsCreate())} className="bg-primary rounded-xl px-5 py-5" type="button">
                    <Icon icon="/icons/add-circle.svg" className="mr-2 text-white" />
                    Add New Academic Term
                  </Button>
                </div>
              }
              onChange={(e: any) => {}}
              logo={<Icon icon="/icons/teacher.svg" className="text-primary-800" />}
              logoClasses="bg-primary-25"
            />
             <AcademicTermsTable loading={loading} filters={filters} data={data} pagination={pagination} />
          </div>
        </div>
  )
}

export default AcademicTermsPage
