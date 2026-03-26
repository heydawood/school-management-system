import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setupInterceptor } from './Api';

const InterceptorSetup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Attach the interceptor globally
    setupInterceptor(dispatch, navigate);
  }, [dispatch, navigate]);

  return null;
};

export default InterceptorSetup;
