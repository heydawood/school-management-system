import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CreateTeacherForm from '@/components/features/Teacher/CreateTeacherForm';

const CreateTeachersPage = () => {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
     <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Teacher</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateTeacherForm setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateTeachersPage