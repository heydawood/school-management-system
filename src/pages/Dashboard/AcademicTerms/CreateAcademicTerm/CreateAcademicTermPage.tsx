import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import CreateAcademicTermsFrom from '@/components/features/AcademicTerms/CreateAcademicTermsFrom';

const CreateAcademicTermPage = () => {

    const [loading, setLoading] = useState<boolean>(false);

    
  return (
    <>
        <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Terms</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateAcademicTermsFrom setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateAcademicTermPage

//CreateAcademicTermPage