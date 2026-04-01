// import { Navigate } from "react-router-dom";

// const RoleGuard = ({
//   children,
//   allowedRoles,
// }: {
//   children: React.ReactNode;
//   allowedRoles: string[];
// }) => {
    
//   const role = localStorage.getItem("role");

//   if (!role || !allowedRoles.includes(role)) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// export default RoleGuard;

import { Navigate } from 'react-router-dom';

const RoleGuard = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(role)) {

    // Redirecting based on roles
    if (role === 'admin') return <Navigate to="/dashboard/admins" replace />;
    if (role === 'teacher') return <Navigate to="/dashboard/teacher" replace />;
    if (role === 'student') return <Navigate to="/dashboard/student" replace />;

    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default RoleGuard;
