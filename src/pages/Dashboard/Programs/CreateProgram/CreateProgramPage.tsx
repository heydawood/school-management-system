import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import CreateProgramForm from '@/components/features/Programs/CreateProgramForm';

const CreateProgramPage = () => {

    const [loading, setLoading] = useState<boolean>(false);

    
  return (
    <>
        <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Programs</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateProgramForm setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateProgramPage

//CreateProgramPage