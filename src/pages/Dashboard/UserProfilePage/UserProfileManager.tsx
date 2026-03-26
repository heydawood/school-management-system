import { useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import { getUserProfile, updateUserStatus } from '@/Redux/UserProfile/Slice';
import type { UserProfileResponse } from './Types';
import { useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';

export const useUserProfileManager = () => {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get User Profile
  const handleGetUserProfile = (id: number) => {
    setLoading(true);
    dispatch(getUserProfile(id))
      .unwrap()
      .then((res: UserProfileResponse) => {
        setUserProfile(res);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update User Status
  const handleUpdateUserStatus = (id: number) => {
    setLoading(true);
    dispatch(updateUserStatus(id))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'User blocked successfully');
        navigate(routes.UsersList());
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleGetUserProfile, userProfile, loading, handleUpdateUserStatus };
};
