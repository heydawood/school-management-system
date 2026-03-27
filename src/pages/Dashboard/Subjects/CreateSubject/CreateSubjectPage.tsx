import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import CreateProgramForm from '@/components/features/Programs/CreateProgramForm';
import CreateSubjectForm from '@/components/features/Subjects/CreateSubjectForm';

const CreateSubjectPage = () => {

    const [loading, setLoading] = useState<boolean>(false);

    
  return (
    <>
        <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Subjects</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateSubjectForm setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateSubjectPage


//CreateSubjectPage