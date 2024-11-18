import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SSOCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/user-profile');
  }, [navigate]);

  return <div>Processing login...</div>;
}

export default SSOCallback;