import CreateAdminForm from '@/components/features/Admin/CreateAdminForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const CreateAdminsPage = () => {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
    <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Create New Admin</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CreateAdminForm setLoading={setLoading} />
      </CardContent>
    </Card>
    </>
  )
}

export default CreateAdminsPage