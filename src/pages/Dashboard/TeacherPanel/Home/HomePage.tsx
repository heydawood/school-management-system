import {type ReactNode } from 'react';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useAppSelector } from '@/Redux/Hooks';
import { useTeacherManager } from '../../AdminPanel/Teachers/TeacherManager';

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

export default function HomePage() {

  const { pagination } = useAppSelector((state) => state.TeacherRecords);


 // const [profile, setProfile] = useState<TeacherProfileDataResponse | null>(null);

  // const fetchProfile = () => {
  //   setLoading(true);

  //   dispatch(getTeacherProfile())
  //     .unwrap()
  //     .then((res) => {
  //       console.log("Profile Response:", res);
  //       setProfile(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  const {getProfile} = useTeacherManager()

  //const { data = [], isLoading } = useTeacherProfile();
  const { data = [], isLoading } = getProfile();



  return (
    <div className="space-y-4">
      <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
        <Header
          title="My Profile"
          ActionButtons={
            <div className="flex gap-3 items-center">
            </div>
          }
          onChange={(e: any) => {}}
          logo={<Icon icon="/icons/teacher.svg" className="text-primary-800 w-6 h-6" />}
          logoClasses="bg-primary-25"
        />

        {/* Profile Card */}
         <div className="bg-white p-6 rounded-xl border">

          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">My Profile</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-medium">{data?.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{data?.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Teacher's ID</p>
              <p className="font-medium">{data?.teacherId}</p>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-lg font-semibold mb-4">Status</h2>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-gray-500 text-sm">Application Status</p>
              <p className="font-medium capitalize">
                {data?.applicationStatus}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Account Status</p>
              <p
                className={`font-medium ${data?.isSuspended ? 'text-red-500' : 'text-green-600'
                  }`}
              >
                {data?.isSuspended ? 'Suspended' : 'Active'}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Date Employed</p>
              <p className="font-medium">
                {data?.dateEmployed
                  ? new Date(data.dateEmployed).toLocaleDateString()
                  : '-'}
              </p>
            </div>

          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-lg font-semibold mb-4">Statistics</h2>

          <div className="flex gap-6">
            <div className="p-4 bg-primary-25 rounded-xl">
              <p className="text-sm text-gray-500">Exams Created</p>
              <p className="text-xl font-bold">
                {data?.examsCreated?.length || 0}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
