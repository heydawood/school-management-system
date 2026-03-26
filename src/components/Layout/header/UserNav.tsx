import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/Hooks/useTheme';
import { useAppSelector } from '@/Redux/Hooks';

const UserNav = () => {

const { isDark, toggleTheme } = useTheme();


  const { avatar, userId, name } = useAppSelector((state) => state.authReducer);
  return (
    <div className="flex items-center gap-2">
      <span className="cursor-pointer">
        <Avatar className="rounded-lg">
          <AvatarImage src={avatar || '/images/logged-user.jpg'} alt="user" className="object-cover" />
        </Avatar>
      </span>

      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="bg-primary-100 hover:bg-primary-200 p-2 rounded-full"
      >
        {isDark ? "🌞" : "🌙"}
      </button>

      <div className="hidden sm:block">

         <span><img className='h-10 w-10 rounded-full object-cover' src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profile" /></span>

         {/* <p className="text-sm font-semibold">{name ?? ''}</p> */}
        <p className="text-sm text-gray-700">Admin</p>
      </div>
    </div>
  );
};

export default UserNav;
