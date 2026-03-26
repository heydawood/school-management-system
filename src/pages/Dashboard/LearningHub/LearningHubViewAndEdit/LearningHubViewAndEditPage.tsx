import { customToast } from '@/Common/Components/ShowToast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch } from '@/Redux/Hooks';
import { useEffect, useState } from 'react';
import { usePage } from '@/Providers/PageProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useLearningHubActionManager } from '../LearningHubActionManager';
import LearningHubForm from '@/components/features/LearningHub/LearningHubForm';

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className="p-2 bg-neutral-200 hover:bg-neutral-300 text-black shadow-none" onClick={onClick}>
      <ChevronLeft size={20} />
    </Button>
  );
};

const LearningHubViewAndEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { pageInfo, setPageInfo } = usePage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { singleLearningHub, handleGetSingleLearningHubDetail, handleDeleteLearningHub, handleUpdateLearningHub } = useLearningHubActionManager();

  useEffect(() => {
    if (id) {
      handleGetSingleLearningHubDetail(Number(id));
      setPageInfo({ title: 'Learning Hub Detail', withBackButton: true, backButton: <BackButton onClick={() => navigate(-1)} /> });
    }
  }, [id, dispatch]);

  return (
    <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Learning Hub Overview</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <LearningHubForm learningHub={singleLearningHub} onDelete={handleDeleteLearningHub} onUpdate={handleUpdateLearningHub} />
      </CardContent>
    </Card>
  );
};

export default LearningHubViewAndEditPage;
