import React from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-danger">Network Error</h1>
      <p className="text-muted">Please check your internet connection and try again.</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
};

export default NetworkErrorPage;
