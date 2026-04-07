import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 className='text-2xl font-semibold text-red-600 mb-1'>Access Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <Button
      className='mt-2'
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
