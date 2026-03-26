import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CreateAcademicYearForm from '@/components/features/AcademicYears/CreateAcademicYearForm';
import { useState } from 'react';

const CreateAcademicYearPage = () => {

    const [loading, setLoading] = useState<boolean>(false);

    
  return (
    <>
        <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Student</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateAcademicYearForm setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateAcademicYearPage