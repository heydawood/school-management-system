import CreateExamForm from '@/components/features/Exams/CreateExamsForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const CreateExamsPage = () => {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
    <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Exam</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateExamForm setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateExamsPage