
import CreateQuestionsForm from '@/components/features/Questions/CreateQuestionsForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const CreateQuestionsPage = () => {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
    <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Question</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateQuestionsForm setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateQuestionsPage

//CreateQuestionsPage