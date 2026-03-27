import CreateYearGroupForm from '@/components/features/YearGroups/CreateYearGroupForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const CreateYearGroupPage = () => {

    const [loading, setLoading] = useState<boolean>(false);

    
  return (
    <>
        <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Year Groups</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateYearGroupForm setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateYearGroupPage



//CreateYearGroupPage