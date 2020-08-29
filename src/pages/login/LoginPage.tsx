import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from "../../components/form/login/LoginForm";
import { checkAuth } from "../../auth/checkAuth";

function LoginPage() {
  const history = useHistory();

  useEffect(() => {
    if(checkAuth()) {
      history.push('/items');
    }
  }, [])

  return (
    <div className="container mx-auto">
      <h1 className="my-10 text-4xl">Login page</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;