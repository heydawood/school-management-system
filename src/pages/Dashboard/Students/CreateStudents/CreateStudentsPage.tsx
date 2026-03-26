import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CreateTeacherForm from '@/components/features/Teacher/CreateTeacherForm';
import { useState } from 'react';
import CreateStudentForm from '@/components/features/Student/CreateStudentForm';

const CreateStudentsPage = () => {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
        <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Student</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateStudentForm setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateStudentsPage