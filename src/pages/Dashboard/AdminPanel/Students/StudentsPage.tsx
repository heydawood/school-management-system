import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import * as routes from '@/routes/Index';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import StudentTable from '@/components/features/Student/StudentTable';
import type { StudentDataResponse } from './Types';
import { useStudents } from '@/Hooks/TanStack/Students/useStudents';



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



const StudentsPage = () => {

    const { pagination } = useAppSelector((state) => state.StudentRecords);
    
        const [loading, setLoading] = useState<boolean>(false);
        //const [data, setData] = useState<StudentDataResponse[]>([]);
        const [filters, setFilters] = useState<{ search: string }>({ search: '' });
    
    
        const navigate = useNavigate();
        // const dispatch = useAppDispatch();
    
        // const handleGetStudents = () => {
        //     setLoading(true);
        //     dispatch(getStudents())
        //       .unwrap()
        //       .then((res: StudentDataResponse[]) => {
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
        //     handleGetStudents();
        //   }, [dispatch]);

        const { data = [], isLoading } = useStudents();

  return (
    <div className="space-y-4">
          <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
            <Header
              title="All Students List"
              ActionButtons={
                <div className="flex gap-3 items-center">
                  <Button onClick={() => navigate(routes.StudentsCreate())} className="bg-primary rounded-xl px-5 py-5" type="button">
                    <Icon icon="/icons/add-circle.svg" className="mr-2 text-white" />
                    <p className='text-white'>Add New Student</p>
                  </Button>
                </div>
              }
              onChange={(e: any) => {}}
              logo={<Icon icon="/icons/student.svg" className="text-primary-800 w-6 h-6" />}
              logoClasses="bg-primary-25"
            />
             <StudentTable loading={loading} filters={filters} data={data} pagination={pagination} />
          </div>
        </div>
  )
}

export default StudentsPage