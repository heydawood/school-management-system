import { useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import { useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';
import type { LearningHubResponse } from './Types';
import type { SingleLearningHubType } from '@/Forms/LearningHub';
import { deleteAdminLearningHub, getPaginatedLearningHub, getSingleLearningHub, updateAdminLearningHub } from '@/Redux/LearningHub/Slice';

export const useLearningHubActionManager = () => {
  const [singleLearningHub, setSingleLearningHub] = useState<SingleLearningHubType | undefined>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get diet plan
  const handleGetLearningHub = (filters: { page: number; limit: number }) => {
    dispatch(getPaginatedLearningHub(filters))
      .unwrap()
      .catch((err: any) => {
        customToast.error(err);
      })
      .finally(() => {});
  };

  // Get diet plan detail
  const handleGetSingleLearningHubDetail = (id: number) => {
    setLoading(true);
    dispatch(getSingleLearningHub(id))
      .unwrap()
      .then((res: SingleLearningHubType) => {
        setSingleLearningHub(res);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update diet plan
  const handleUpdateLearningHub = (id: number, payload: any) => {
    setLoading(true);
    dispatch(updateAdminLearningHub({ id, payload }))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Learning hub updated successfully');
        // handleGetSingleLearningHubDetail(+res?.dietPlanId!);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Delete diet plan
  const handleDeleteLearningHub = (id: number) => {
    setLoading(true);
    dispatch(deleteAdminLearningHub(id))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Learning hub deleted successfully');

        navigate(routes.LearningHubList());
      })
      .catch((err: any) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    singleLearningHub,
    handleGetLearningHub,
    handleGetSingleLearningHubDetail,
    handleUpdateLearningHub,
    handleDeleteLearningHub,
  };
};
